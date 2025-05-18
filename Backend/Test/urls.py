from django.urls import path
from . import views

urlpatterns = [
    path('clients/', views.get_all_clients, name='clients'),
    path('categories/', views.get_all_categories, name='categories'),
    path('products/', views.get_all_products, name='products'),
    path('send-email/', views.send_email, name='send_email'),
]