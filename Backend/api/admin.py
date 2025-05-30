from django.contrib import admin

# Register your models here.
from .models import Client, Order, Product, Category, Payment, OrderProduct, Comment

models = [Client, Order, Product, Category, Payment, OrderProduct, Comment]
admin.site.register(models)