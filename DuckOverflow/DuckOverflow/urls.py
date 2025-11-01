from django.contrib import admin
from django.urls import path, include
from _temporaryhome import views as temp_home_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', temp_home_views.render_home),
    path('api/', include('users.urls')),
]
