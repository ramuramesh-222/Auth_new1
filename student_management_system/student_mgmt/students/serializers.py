from rest_framework import serializers
from .models import Student
# from .models import CustomUser  # or from users.models
from .models import Teacher


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
# students/serializers.py


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
