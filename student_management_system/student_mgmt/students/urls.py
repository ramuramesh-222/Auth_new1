from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet
from .views import TeacherViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet, basename='teacher')

urlpatterns = [
    path('', include(router.urls)),
    
]


# students/urls.py

# from django.urls import path
# from . import views

# urlpatterns = [
#     path('students/', views.StudentListCreateView.as_view()),
#     path('students/<int:pk>/', views.StudentRetrieveUpdateDestroyView.as_view()),

#     path('teachers/', views.TeacherListCreateView.as_view()),
#     path('teachers/<int:pk>/', views.TeacherRetrieveUpdateDestroyView.as_view()),

#     path('students/me/', views.student_me),  # Optional: for student profile view
# ]