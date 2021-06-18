from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

jwt_views = [
    path('', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
]

urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path('backend/api/auth/token/', include(jwt_views)),
    path('backend/api/', include('post.urls')),
    path('backend/api/', include('userprofile.urls')),
    path('backend/api/', include('registration.urls')),
    path('backend/api/', include('friendrequest.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
