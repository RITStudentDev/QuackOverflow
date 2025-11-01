from django.urls import path, include
from .views import get_user_data
from django.conf.urls.static import static
from django.conf import settings


url_patterns = [
    path('user_data/<str:pk>/', get_user_data),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)