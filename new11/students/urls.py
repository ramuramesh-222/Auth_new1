from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterStudentView,
    RegisterTeacherView,
    StudentProfileView,
    TeacherStudentListCreateView,
    TeacherUpdateStudentView,
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('admin/register/student/', RegisterStudentView.as_view()),
    path('admin/register/teacher/', RegisterTeacherView.as_view()),

    path('student/profile/', StudentProfileView.as_view()),

    path('teacher/students/', TeacherStudentListCreateView.as_view()),
    path('teacher/student/<int:pk>/', TeacherUpdateStudentView.as_view()),
]
