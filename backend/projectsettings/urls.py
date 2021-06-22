from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views

schema_view = get_schema_view(
   openapi.Info(
      title="Motion API Documentation",
      default_version='v1',
      description="Team 3: Robert, Alex, Bolor, and Karim - all endpoints must be prepended with backend/api/",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="learn@propulsionacademy.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,  # Set to False restrict access to protected endpoints
   permission_classes=(permissions.AllowAny,),  # Permissions for docs access
)

jwt_views = [
    path('', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
]

urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path('backend/api/auth/token/', include(jwt_views)),
    path('backend/api/', include('post.urls')),
    path('backend/api/', include('user.urls')),
    path('backend/api/', include('registration.urls')),
    path('backend/api/', include('friendrequest.urls')),
    path('backend/api/', include('comment.urls')),
    path('backend/api/docs/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
