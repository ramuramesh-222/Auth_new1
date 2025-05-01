from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Teacher
from .serializers import TeacherSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
# students/views.py


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer



# students/views.py


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_me(request):
    student = request.user.student  # if you have OneToOneField to User
    serializer = StudentSerializer(student)
    return Response(serializer.data)
