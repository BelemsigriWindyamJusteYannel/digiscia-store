# --- Partie 3: Création des sérialiseurs (ecommerce/serializers.py) ---
# ecommerce/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Client, Category, Product, Comment, Order, Payment, OrderProduct

# Sérialiseur pour l'inscription (crée User et Client)
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)
    city = serializers.CharField(write_only=True, required=True)
    code_postale = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'city', 'code_postale')
        extra_kwargs = {'email': {'required': True}}

    def create(self, validated_data):
        # Extrait les données du profil client
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        city = validated_data.pop('city')
        code_postale = validated_data.pop('code_postale')

        # Crée l'utilisateur
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Crée le profil client lié à l'utilisateur
        Client.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            city=city,
            code_postale=code_postale
        )
        return user

# Sérialiseur pour les détails de l'utilisateur (pour les vues protégées)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Sérialiseur pour le profil Client (lecture seule ou mise à jour)
class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) # Affiche les détails de l'utilisateur lié
    class Meta:
        model = Client
        fields = '__all__'

# Sérialiseur pour la catégorie
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# Sérialiseur pour le produit
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True) # Affiche le nom de la catégorie
    class Meta:
        model = Product
        fields = '__all__' # Inclut 'image'

# Sérialiseur pour les commentaires
class CommentSerializer(serializers.ModelSerializer):
    client_username = serializers.CharField(source='client.user.username', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('client', 'product', 'created_at') # Le client et le produit sont définis par la vue, la date est auto

# Sérialiseur pour les produits dans une commande (OrderProduct)
class OrderProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.current_price', max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = OrderProduct
        fields = ('id', 'product', 'product_name', 'product_price', 'quantity', 'oneself_price')
        read_only_fields = ('oneself_price',) # Le prix est fixé au moment de l'ajout

# Sérialiseur pour les commandes
class OrderSerializer(serializers.ModelSerializer):
    order_products = OrderProductSerializer(many=True, read_only=True) # Liste des produits dans la commande
    client_username = serializers.CharField(source='client.user.username', read_only=True)
    payment_status = serializers.CharField(source='payment.status', read_only=True) # Affiche le statut du paiement

    class Meta:
        model = Order
        fields = ('id', 'status', 'date_order', 'client', 'client_username', 'total_amount', 'order_products', 'payment_status')
        read_only_fields = ('client', 'total_amount', 'date_order') # Le client est défini par la vue, le total et la date sont calculés/auto

# Sérialiseur pour les paiements
class PaymentSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='order.id', read_only=True)
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ('order', 'date_payment') # L'ordre est défini par la vue, la date est auto
