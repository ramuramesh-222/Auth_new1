
# Register your models here.
# students/admin.py
from django.contrib import admin
from .models import Student

class StudentAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(teacher=request.user)

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.teacher = request.user
        super().save_model(request, obj, form, change)

admin.site.register(Student, StudentAdmin)
