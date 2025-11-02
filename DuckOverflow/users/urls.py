from django.urls import path, include
from .views import create_user, get_user_data, CustomTokenObtainPairView, CustomTokenRefreshView
from django.conf.urls.static import static
from django.conf import settings



urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', create_user, name='signup'),
    path('user_data/<str:pk>/', get_user_data),
    path('signup/', create_user, name='user_signup'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)