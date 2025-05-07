from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import CustomUser, StudentProfile
from .serializers import (
    RegisterStudentSerializer,
    RegisterTeacherSerializer,
    StudentProfileSerializer,
    UserSerializer
)

class RegisterStudentView(generics.CreateAPIView):
    serializer_class = RegisterStudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            return Response({'error': 'Only admin can register students'}, status=403)
        return super().post(request, *args, **kwargs)

class RegisterTeacherView(generics.CreateAPIView):
    serializer_class = RegisterTeacherSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            return Response({'error': 'Only admin can register teachers'}, status=403)
        return super().post(request, *args, **kwargs)

class StudentProfileView(generics.RetrieveAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'student':
            return Response({'error': 'Not authorized'}, status=403)
        profile = StudentProfile.objects.get(user=request.user)
        return Response(self.serializer_class(profile).data)

class TeacherStudentListCreateView(generics.ListCreateAPIView):
    serializer_class = RegisterStudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(role='student')

    def perform_create(self, serializer):
        if self.request.user.role != 'teacher':
            raise PermissionError("Only teachers can add students")
        student = serializer.save(role='student')
        StudentProfile.objects.create(user=student)

class TeacherUpdateStudentView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        if self.request.user.role != 'teacher':
            raise PermissionError("Only teachers can update student marks")
        return super().get_object()
