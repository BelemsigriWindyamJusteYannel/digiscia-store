from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('api/send-email/', views.send_email, name='send_email'),
    #path('api/clients/', views.client_list),
    #path('api/clients/<int:pk>/', views.Client_Detail),
    path('api/products/', views.product_list),
    path('api/products/<int:pk>/', views.product_detail),
    path('api/categories/', views.category_list),
    path('api/categories/<int:pk>/', views.category_detail),
    path('api/orders/', views.order_list),
    path('api/orders/<int:pk>/', views.order_detail),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)