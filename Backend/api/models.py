from django.db import models

class Client(models.Model):
    first_name = models.CharField(max_length=258)
    last_name = models.CharField(max_length=256)
    city = models.CharField(max_length=256)
    sign_in_date = models.DateField()
    code_postale = models.CharField(max_length=20)  # ✅ code postal sous forme textuelle

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Category(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()  # ✅ description plus libre
    adding_date = models.DateField()
    stock = models.IntegerField()
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    promotion = models.DecimalField(max_digits=5, decimal_places=2)  # ✅ promotion en pourcentage
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="products")

    def __str__(self):
        return self.name

class Comment(models.Model):
    content = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="comments")
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"Comment by {self.client} on {self.product}"

ORDER_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('processing', 'Processing'),
    ('shipped', 'Shipped'),
    ('cancelled', 'Cancelled'),
]

class Order(models.Model):
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES)  # ✅ champ à choix
    date_order = models.DateField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="orders")

    def __str__(self):
        return f"Order #{self.id} - {self.client}"

PAYMENT_STATUS_CHOICES = [
    ('paid', 'Paid'),
    ('unpaid', 'Unpaid'),
    ('refunded', 'Refunded'),
]

PAYMENT_TYPE_CHOICES = [
    ('card', 'Card'),
    ('paypal', 'PayPal'),
    ('cash', 'Cash'),
]

class Payment(models.Model):
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES)
    type = models.CharField(max_length=20, choices=PAYMENT_TYPE_CHOICES)
    date_payment = models.DateField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")

    def __str__(self):
        return f"Payment for Order #{self.order.id}"

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_products")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="order_products")
    quantity = models.IntegerField()
    oneself_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('order', 'product')  # ✅ contrainte d’unicité

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order #{self.order.id}"
