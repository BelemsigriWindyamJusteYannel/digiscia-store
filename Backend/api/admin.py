from django.contrib import admin

# Register your models here.
from .models import Client, Order, Product, Category, Payment, OrderProduct, Comment

# Register your models here.

models = [Client, Order, Product, Category, Payment, OrderProduct, Comment]
admin.site.register(models)