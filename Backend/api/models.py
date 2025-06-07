from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

# Create your models here.

# Client
class Client(models.Model):
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    city = models.CharField(max_length=256)
    phone_number = models.CharField(max_length=10)
    sign_in_date = models.DateField(auto_now_add=True)
    postal_code = models.IntegerField()
    # fk
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client_profile")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
# Category
class Category(models.Model):
    name = models.CharField(max_length=256)
    
    def __str__(self):
        return f"{self.name}"
    
# Product
class Product(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    adding_date = models.DateField(auto_now_add=True)
    stock = models.IntegerField()
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    promotion = models.DecimalField(max_digits=5, decimal_places=2, default=0.00) # Entier -> DecimalField pour pourcentage
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    # fk
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="products")

    def __str__(self):
        return f"{self.name}"
    
# Comment
class Comment(models.Model):
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveSmallIntegerField(default=0)
    # fk
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="comments")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"Comment by {self.client.user.username} on {self.product.name}"
    
# order status Choices 
ORDER_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('processing', 'Processing'),
    ('shipped', 'Shipped'),
    ('cancelled', 'Cancelled'),
    ('delivered', 'Delivered'), # Ajout d'un statut "delivered"
]

def get_default_planned_date():
    return timezone.now().date() + timedelta(days=7)
# Order
class Order(models.Model):
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    order_date = models.DateField(auto_now_add=True)
    delivery_planned_date = models.DateField(default=get_default_planned_date) 
    delivery_date = models.DateField(null=True, blank=True) 
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    # fk
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="orders")

    def __str__(self):
        return f"Order #{self.id} - {self.client.user.username}"
    
# Payment type choice
PAYMENT_TYPE_CHOICES = [
    ('card', 'Card'),
    ('paypal', 'PayPal'),
    ('cash', 'Cash'),
    ('bank_transfer', 'Bank Transfer'), # Ajout d'un type
]
# Payment status
PAYMENT_STATUS_CHOICES = [
    ('paid', 'Paid'),
    ('unpaid', 'Unpaid'),
    ('refunded', 'Refunded'),
]
# Payment
class Payment(models.Model):
    type = models.CharField(max_length=20, choices=PAYMENT_TYPE_CHOICES, default='cash')
    payment_date = models.DateField(auto_now_add=True)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    # fk
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")

    def __str__(self):
        return f"Payment for Order #{self.order.id} - {self.status}"

# Order_Product
class OrderProduct(models.Model):
    quantity = models.IntegerField()
    oneself_price = models.DecimalField(max_digits=10, decimal_places=2) 
    # fk
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_products")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="order_products")

    class Meta:
        # Assure qu'un produit ne peut être ajouté qu'une seule fois par commande (la quantité est mise à jour)
        unique_together = ('order', 'product')

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order #{self.order.id}"