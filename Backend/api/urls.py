from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # URLs d'authentification JWT
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    #path('logout/', views.logout_view, name='logout'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Endpoint pour obtenir les tokens
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Endpoint pour rafraîchir le token
    path('profile/', views.user_profile_view, name='user_profile'),
    path('client/update/', views.client_detail_view, name='client_update'),

    # URLs pour les catégories
    path('categories/', views.category_list_view, name='category_list_create'),
    path('categories/<int:pk>/', views.category_detail_view, name='category_detail'),

    # URLs pour les produits
    path('products/', views.product_list_view, name='product_list_create'),
    path('products/<int:pk>/', views.product_detail_view, name='product_detail'),
    path('products/search/', views.search_products_similar, name='search-products'),
    # Rating
    path('products/rate/<int:product_id>/', views.product_rate, name='product-detail-api'),

    # URLs pour les commentaires
    path('comments/', views.comment_list_create_view, name='comment_list_create'),
    path('comments/<int:pk>/', views.comment_detail_view, name='comment_detail'),

    # URLs pour les commandes
    path('orders/', views.order_list_create_view, name='order_list_create'),
    path('orders/<int:pk>/', views.order_detail_view, name='order_detail'),
    path('orders/<int:order_pk>/products/', views.order_product_list_create_delete_view, name='order_product_list_create_delete'),

    # URLs pour les paiements
    path('orders/<int:order_pk>/payment/', views.payment_list_create_view, name='payment_list_create'),
    
    # Send emails
    path('send-email/', views.send_email, name='send_email'),

]

