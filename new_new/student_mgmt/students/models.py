from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        Group, related_name='customuser_groups', blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission, related_name='customuser_permissions', blank=True
    )

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=20)
    class_name = models.CharField(max_length=100)
    marks = models.JSONField(default=dict)

    def __str__(self):
        return self.user.username

class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username
