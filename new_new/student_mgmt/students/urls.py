from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentRegisterView,
    TeacherRegisterView,
    StudentViewSet,
    TeacherStudentCRUDView,
    AdminStudentView,
    AdminTeacherView
)

router = DefaultRouter()
router.register(r'my-student', StudentViewSet, basename='my-student')
router.register(r'teacher-student', TeacherStudentCRUDView, basename='teacher-student')
router.register(r'admin-students', AdminStudentView, basename='admin-students')
router.register(r'admin-teachers', AdminTeacherView, basename='admin-teachers')

urlpatterns = [
    path('register/student/', StudentRegisterView.as_view()),
    path('register/teacher/', TeacherRegisterView.as_view()),
    path('', include(router.urls)),
]


# ✅ Summary of API Endpoints:
# Role	Action	Endpoint
# Student	View own profile & marks	GET /mystudent/
# Teacher	CRUD on students	/teacher/students/
# Admin	CRUD on students	/admin/students/
# Admin	CRUD on teachers	/admin/teachers/
# Public	Register student	POST /register/student/
# Public	Register teacher	POST /register/teacher/