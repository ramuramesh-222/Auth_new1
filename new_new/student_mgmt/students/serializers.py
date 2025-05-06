from rest_framework import serializers
from .models import CustomUser, Student, Teacher
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_student', 'is_teacher', 'is_admin']

class RegisterStudentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Student
        fields = ['id', 'user', 'roll_number', 'class_name', 'marks']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, is_student=True)
        return Student.objects.create(user=user, **validated_data)

class RegisterTeacherSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Teacher
        fields = ['id', 'user', 'subject', 'employee_id']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, is_teacher=True)
        return Teacher.objects.create(user=user, **validated_data)
