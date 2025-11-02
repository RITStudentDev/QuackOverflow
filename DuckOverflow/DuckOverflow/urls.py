from django.contrib import admin
from django.urls import path, include, re_path
from _temporaryhome import views as home_views

from users.views import CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('posts.urls')),
    path('api/', include('users.urls')),

    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),

    re_path(r'^.*$', home_views.index, name='index'),
]
