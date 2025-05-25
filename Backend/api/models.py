# --- Partie 2: Définition des modèles (ecommerce/models.py) ---
# ecommerce/models.py
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone # Importez timezone pour les valeurs par défaut de date/heure

# === Client ===
class Client(models.Model):
    # id_client est implicite (PK par défaut de Django)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    first_name = models.CharField(max_length=256) # Caractère (256)
    last_name = models.CharField(max_length=256) # Caractère (256)
    city = models.CharField(max_length=256) # Caractère (256)
    sign_in_date = models.DateField(auto_now_add=True) # Date
    code_postale = models.CharField(max_length=20) # Entier (représenté comme chaîne pour les codes postaux)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# === Category ===
class Category(models.Model):
    # id_category est implicite (PK par défaut de Django)
    name = models.CharField(max_length=256) # Caractère (256)

    def __str__(self):
        return self.name

# === Product ===
class Product(models.Model):
    # id_product est implicite (PK par défaut de Django)
    name = models.CharField(max_length=256) # Caractère (256)
    description = models.TextField() # Caractère (256) -> TextField pour plus de contenu
    adding_date = models.DateField(auto_now_add=True) # Date
    stock = models.IntegerField() # Entier
    current_price = models.DecimalField(max_digits=10, decimal_places=2) # Réel -> DecimalField
    promotion = models.DecimalField(max_digits=5, decimal_places=2, default=0.00) # Entier -> DecimalField pour pourcentage
    image = models.ImageField(upload_to='products/', null=True, blank=True) # <Indéfini> -> ImageField

    # Relation "appartient" avec Category (0,1)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="products")

    def __str__(self):
        return self.name

# === Comment ===
class Comment(models.Model):
    # id_comment est implicite (PK par défaut de Django)
    content = models.TextField() # Entier -> TextField pour le contenu textuel
    created_at = models.DateTimeField(auto_now_add=True) # Ajout d'une date de création pour les commentaires

    # Relation "réaliser" avec Client (1,1)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="comments")
    # Relation "correspond" avec Product (0,n)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"Comment by {self.client.user.username} on {self.product.name}"

# === Order ===
ORDER_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('processing', 'Processing'),
    ('shipped', 'Shipped'),
    ('cancelled', 'Cancelled'),
    ('delivered', 'Delivered'), # Ajout d'un statut "delivered"
]

class Order(models.Model):
    # id_order est implicite (PK par défaut de Django)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending') # Caractère (256) -> CharField avec choix
    date_order = models.DateField(auto_now_add=True) # Date

    # Ajout d'un champ pour le montant total de la commande
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    # Relation "effectuer" avec Client (1,1)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="orders")

    def __str__(self):
        return f"Order #{self.id} - {self.client.user.username}"

# === Payment ===
PAYMENT_STATUS_CHOICES = [
    ('paid', 'Paid'),
    ('unpaid', 'Unpaid'),
    ('refunded', 'Refunded'),
]

PAYMENT_TYPE_CHOICES = [
    ('card', 'Card'),
    ('paypal', 'PayPal'),
    ('cash', 'Cash'),
    ('bank_transfer', 'Bank Transfer'), # Ajout d'un type
]

class Payment(models.Model):
    # id_payment est implicite (PK par défaut de Django)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='unpaid') # Caractère (256) -> CharField avec choix
    type = models.CharField(max_length=20, choices=PAYMENT_TYPE_CHOICES, default='card') # Caractère (256) -> CharField avec choix
    date_payment = models.DateField(auto_now_add=True) # Date
    value = models.DecimalField(max_digits=10, decimal_places=2) # Réel -> DecimalField

    # Relation "couter" avec Order (1,1)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")

    def __str__(self):
        return f"Payment for Order #{self.order.id} - {self.status}"

# === OrderProduct (Table de liaison pour la relation Many-to-Many entre Order et Product) ===
class OrderProduct(models.Model):
    # id_order_product est implicite (PK par défaut de Django)
    # Relation "Ajouter" avec Order (1,n)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_products")
    # Relation "intervient" avec Product (0,n)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="order_products")

    quantity = models.IntegerField() # Entier
    oneself_price = models.DecimalField(max_digits=10, decimal_places=2) # Réel (prix du produit au moment de l'ajout à la commande)

    class Meta:
        # Assure qu'un produit ne peut être ajouté qu'une seule fois par commande (la quantité est mise à jour)
        unique_together = ('order', 'product')

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order #{self.order.id}"
