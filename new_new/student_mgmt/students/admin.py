from django.contrib import admin
from .models import Student, Teacher, CustomUser

admin.site.register(CustomUser)
admin.site.register(Student)
admin.site.register(Teacher)
