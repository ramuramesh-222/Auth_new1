from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('students.urls')),  # student app routes
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]





# Here's how to test your Django JWT login and student management system using Postman. You’ll be able to:

# ✅ Register users (student/teacher)
# ✅ Login with JWT
# ✅ Use the access token to interact with protected endpoints (e.g., view marks, CRUD students/teachers)

# 🔧 Step 1: Register a Student
# Endpoint:
# POST http://localhost:8000/api/register/student/

# Body (JSON):

# json
# Copy
# Edit
# {
#   "user": {
#     "username": "student1",
#     "email": "student1@example.com",
#     "password": "password123"
#   },
#   "roll_number": "STU001",
#   "class_name": "10A"
# }
# 🔧 Step 2: Register a Teacher
# Endpoint:
# POST http://localhost:8000/api/register/teacher/

# Body (JSON):

# json
# Copy
# Edit
# {
#   "user": {
#     "username": "teacher1",
#     "email": "teacher1@example.com",
#     "password": "password123"
#   },
#   "subject": "Math",
#   "employee_id": "EMP123"
# }
# 🔐 Step 3: Login via JWT
# Endpoint:
# POST http://localhost:8000/api/token/

# Body (JSON):

# json
# Copy
# Edit
# {
#   "username": "teacher1",
#   "password": "password123"
# }
# Response:

# json
# Copy
# Edit
# {
#   "refresh": "your_refresh_token",
#   "access": "your_access_token"
# }
# 🧪 Step 4: Use Access Token in Postman
# Go to the Headers tab in Postman and add:

# makefile
# Copy
# Edit
# Key: Authorization
# Value: Bearer your_access_token
# 🔄 Step 5: Example Authorized Request (Teacher views students)
# Endpoint:
# GET http://localhost:8000/api/teacher-student/

# Authorization header must contain the access token as shown above.

