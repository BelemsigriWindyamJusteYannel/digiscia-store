from django.db import models

# Create your models here.
from django.db import models

class Client(models.Model):
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    city = models.CharField(max_length=256)
    sign_in_date = models.DateField()
    code_postale = models.IntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Order(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=256)
    date_order = models.DateField()

    def __str__(self):
        return f"Order {self.id} - {self.status}"


class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    status = models.CharField(max_length=256)
    type = models.CharField(max_length=256)
    date_payment = models.DateField()
    value = models.FloatField()

    def __str__(self):
        return f"Payment for Order {self.order.id}"


class Category(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=256)
    description = models.CharField(max_length=256)
    adding_date = models.DateField()
    stock = models.IntegerField()
    current_price = models.FloatField()
    promotion = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')

    def __str__(self):
        return self.name


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_products')
    quantity = models.IntegerField()
    oneself_price = models.FloatField()  # prix unitaire au moment de la commande

    class Meta:
        unique_together = ('order', 'product')  # chaque produit ne peut apparaître qu'une fois par commande

    def __str__(self):
        return f"{self.product.name} x{self.quantity} in Order {self.order.id}"


class Comment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='comments')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=256)

    def __str__(self):
        return f"Comment by {self.client} on {self.product}"
