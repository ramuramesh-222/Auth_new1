"""
URL configuration for student_mgmt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import register_teacher


urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register_teacher),
    path('api/', include('students.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]




# ✅ Available Django API URLs
# Endpoint	Method	Purpose
# /admin/	GET	Django admin panel
# /register/	POST	Register a teacher (custom view)
# /api/students/	GET/POST	List or create students
# /api/students/<id>/	GET/PUT/DELETE	Retrieve, update, or delete a student
# /api/teachers/	GET/POST	List or create teachers (if set)
# /api/teachers/<id>/	GET/PUT/DELETE	Retrieve, update, or delete a teacher
# /api/token/	POST	Obtain access/refresh JWT tokens
# /api/token/refresh/	POST	Refresh access token