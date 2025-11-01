from django.contrib import admin
from django.urls import path, include
from _temporaryhome import views as temp_home_views

from users.views import CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', temp_home_views.render_home),
    path('api/', include('users.urls')),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]
