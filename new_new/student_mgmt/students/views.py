from rest_framework import generics, viewsets, permissions
from .models import Student, Teacher
from .serializers import (
    RegisterStudentSerializer,
    RegisterTeacherSerializer
)
from django.contrib.auth import get_user_model

User = get_user_model()

# Registration Views
class StudentRegisterView(generics.CreateAPIView):
    serializer_class = RegisterStudentSerializer
    permission_classes = [permissions.AllowAny]

class TeacherRegisterView(generics.CreateAPIView):
    serializer_class = RegisterTeacherSerializer
    permission_classes = [permissions.AllowAny]

# Student views their own data
class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RegisterStudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Student.objects.filter(user=self.request.user)

# Teacher can manage students
class TeacherStudentCRUDView(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = RegisterStudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_teacher:
            return self.queryset
        return Student.objects.none()

# Admin can manage teachers and students
class AdminStudentView(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = RegisterStudentSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminTeacherView(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = RegisterTeacherSerializer
    permission_classes = [permissions.IsAdminUser]
