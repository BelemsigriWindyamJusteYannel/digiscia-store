from django.contrib import admin
from .models import Client, Category, Product, Comment, Order, Payment, OrderProduct

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'city', 'phone_number', 'sign_in_date', 'postal_code', 'user')
    search_fields = ('first_name', 'last_name', 'city', 'user__username')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'stock', 'current_price', 'promotion', 'adding_date')
    list_filter = ('category', 'adding_date')
    search_fields = ('name',)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('client', 'product', 'created_date')
    search_fields = ('client__user__username', 'product__name')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'status', 'order_date', 'total_amount')
    list_filter = ('status', 'order_date')
    search_fields = ('client__user__username',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'type', 'payment_date', 'value')
    list_filter = ('type', 'payment_date')

@admin.register(OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'oneself_price')
