from rest_framework import serializers
from .models import Student
# from .models import CustomUser  # or from users.models


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
