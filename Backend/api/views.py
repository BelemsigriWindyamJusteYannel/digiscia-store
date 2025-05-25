# --- Partie 4: Création des vues API (ecommerce/views.py) ---
# ecommerce/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Client, Category, Product, Comment, Order, Payment, OrderProduct
from .serializers import (
    UserRegistrationSerializer, ClientSerializer, CategorySerializer,
    ProductSerializer, CommentSerializer, OrderSerializer,
    PaymentSerializer, OrderProductSerializer
)
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.db.models import F # Pour les opérations atomiques sur les champs

# --- Vues d'authentification JWT ---

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    """
    Vue API pour l'inscription d'un nouvel utilisateur et la création de son profil Client.
    Renvoie les tokens JWT (access et refresh).
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save() # La méthode create du sérialiseur gère la création de User et Client
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Utilisateur et profil client créés avec succès",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "email": user.email
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Vue API pour la connexion d'un utilisateur.
    Authentifie l'utilisateur et renvoie les tokens JWT (access et refresh).
    """
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Connexion réussie",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "email": user.email
        }, status=status.HTTP_200_OK)
    else:
        return Response(
            {"detail": "Nom d'utilisateur ou mot de passe invalide."},
            status=status.HTTP_401_UNAUTHORIZED
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Vue API pour la déconnexion d'un utilisateur.
    Blackliste le refresh token actuel, invalidant ainsi les tokens futurs.
    """
    try:
        refresh_token = request.data.get("refresh") # Le client doit envoyer son refresh token
        if not refresh_token:
            return Response({"detail": "Refresh token manquant."}, status=status.HTTP_400_BAD_REQUEST)
        token = RefreshToken(refresh_token)
        token.blacklist() # Blackliste le token de rafraîchissement
        return Response({"message": "Déconnexion réussie."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": f"Erreur lors de la déconnexion: {e}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    """
    Vue pour récupérer les détails du profil de l'utilisateur connecté.
    """
    try:
        client_profile = request.user.client_profile
        serializer = ClientSerializer(client_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Client.DoesNotExist:
        return Response({"detail": "Profil client non trouvé."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": f"Erreur lors de la récupération du profil: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# --- Vues E-commerce ---

@api_view(['GET', 'POST'])
@permission_classes([AllowAny]) # GET pour tous, POST pour IsAdminUser
def category_list_create_view(request):
    """
    Liste toutes les catégories ou en crée une nouvelle.
    """
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if not request.user.is_staff: # Seuls les administrateurs peuvent créer des catégories
            return Response({"detail": "Vous n'avez pas la permission de créer une catégorie."}, status=status.HTTP_403_FORBIDDEN)
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny]) # GET pour tous, PUT/DELETE pour IsAdminUser
def category_detail_view(request, pk):
    """
    Récupère, met à jour ou supprime une catégorie.
    """
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not request.user.is_staff: # Seuls les administrateurs peuvent modifier
            return Response({"detail": "Vous n'avez pas la permission de modifier cette catégorie."}, status=status.HTTP_403_FORBIDDEN)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if not request.user.is_staff: # Seuls les administrateurs peuvent supprimer
            return Response({"detail": "Vous n'avez pas la permission de supprimer cette catégorie."}, status=status.HTTP_403_FORBIDDEN)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny]) # GET pour tous, POST pour IsAdminUser
def product_list_create_view(request):
    """
    Liste tous les produits ou en crée un nouveau.
    """
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if not request.user.is_staff: # Seuls les administrateurs peuvent créer des produits
            return Response({"detail": "Vous n'avez pas la permission de créer un produit."}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny]) # GET pour tous, PUT/DELETE pour IsAdminUser
def product_detail_view(request, pk):
    """
    Récupère, met à jour ou supprime un produit.
    """
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not request.user.is_staff: # Seuls les administrateurs peuvent modifier
            return Response({"detail": "Vous n'avez pas la permission de modifier ce produit."}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if not request.user.is_staff: # Seuls les administrateurs peuvent supprimer
            return Response({"detail": "Vous n'avez pas la permission de supprimer ce produit."}, status=status.HTTP_403_FORBIDDEN)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny]) # GET pour tous, POST pour IsAuthenticated
def comment_list_create_view(request):
    """
    Liste tous les commentaires ou en crée un nouveau.
    """
    if request.method == 'GET':
        # Filtrer les commentaires par produit si un product_id est fourni dans les paramètres de requête
        product_id = request.query_params.get('product_id')
        if product_id:
            comments = Comment.objects.filter(product__id=product_id)
        else:
            comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({"detail": "Authentification requise pour ajouter un commentaire."}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            client_profile = request.user.client_profile
        except Client.DoesNotExist:
            return Response({"detail": "Profil client non trouvé pour l'utilisateur connecté."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        # Le sérialiseur gérera l'association du produit via 'product' dans data
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            # Sauvegarde le commentaire en associant le client connecté
            serializer.save(client=client_profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated]) # Seuls l'auteur ou l'admin peuvent modifier/supprimer
def comment_detail_view(request, pk):
    """
    Récupère, met à jour ou supprime un commentaire.
    """
    comment = get_object_or_404(Comment, pk=pk)
    
    # Vérifie la permission de l'utilisateur
    is_owner = comment.client.user == request.user
    is_admin = request.user.is_staff

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not (is_owner or is_admin):
            return Response({"detail": "Vous n'avez pas la permission de modifier ce commentaire."}, status=status.HTTP_403_FORBIDDEN)
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if not (is_owner or is_admin):
            return Response({"detail": "Vous n'avez pas la permission de supprimer ce commentaire."}, status=status.HTTP_403_FORBIDDEN)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated]) # Les commandes ne peuvent être vues/créées que par des utilisateurs authentifiés
def order_list_create_view(request):
    """
    Liste les commandes de l'utilisateur connecté ou crée une nouvelle commande.
    """
    try:
        client_profile = request.user.client_profile
    except Client.DoesNotExist:
        return Response({"detail": "Profil client non trouvé pour l'utilisateur."}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        orders = Order.objects.filter(client=client_profile).order_by('-date_order') # Tri par date décroissante
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Le corps de la requête devrait contenir une liste de produits avec leurs quantités
        # Exemple: {"products": [{"product_id": 1, "quantity": 2}, {"product_id": 3, "quantity": 1}]}
        
        products_data = request.data.get('products', [])
        if not products_data:
            return Response({"detail": "Aucun produit fourni pour la commande."}, status=status.HTTP_400_BAD_REQUEST)
        
        with transaction.atomic(): # Assure l'atomicité de la création de commande
            order = Order.objects.create(client=client_profile, status='pending')
            total_amount = 0

            for item_data in products_data:
                product_id = item_data.get('product_id')
                quantity = item_data.get('quantity')

                if not product_id or not quantity or not isinstance(quantity, int) or quantity <= 0:
                    transaction.set_rollback(True)
                    return Response({"detail": "Données de produit invalides (product_id ou quantity) dans la commande."}, status=status.HTTP_400_BAD_REQUEST)
                
                product = get_object_or_404(Product, pk=product_id)

                if product.stock < quantity:
                    transaction.set_rollback(True)
                    return Response({"detail": f"Stock insuffisant pour le produit {product.name}. Stock disponible: {product.stock}"}, status=status.HTTP_400_BAD_REQUEST)
                
                oneself_price = product.current_price # Capture le prix actuel au moment de la commande
                OrderProduct.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    oneself_price=oneself_price
                )
                # Utilisation de F() pour une mise à jour atomique du stock
                Product.objects.filter(pk=product_id).update(stock=F('stock') - quantity)
                
                total_amount += oneself_price * quantity
            
            order.total_amount = total_amount
            order.save()

            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def order_detail_view(request, pk):
    """
    Récupère, met à jour ou supprime une commande spécifique de l'utilisateur connecté.
    """
    try:
        client_profile = request.user.client_profile
    except Client.DoesNotExist:
        return Response({"detail": "Profil client non trouvé pour l'utilisateur."}, status=status.HTTP_400_BAD_REQUEST)

    order = get_object_or_404(Order, pk=pk, client=client_profile) # S'assure que l'utilisateur est le propriétaire de la commande

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    elif request.method == 'PUT':
        data = request.data.copy()
        
        # Un utilisateur normal ne peut que "annuler" sa commande si elle est en attente ou en cours de traitement
        if 'status' in data:
            if request.user.is_staff: # Si l'utilisateur est un administrateur
                pass # L'admin peut changer le statut librement
            elif data['status'] == 'cancelled' and order.status in ['pending', 'processing']:
                # L'utilisateur peut annuler une commande en attente ou en cours de traitement
                pass
            else:
                return Response({"detail": "Vous n'êtes pas autorisé à modifier le statut de cette commande de cette manière."}, status=status.HTTP_403_FORBIDDEN)
        
        # Empêcher la modification du total_amount ou client directement via PUT par un utilisateur
        if 'total_amount' in data or 'client' in data:
            if not request.user.is_staff:
                return Response({"detail": "Vous n'êtes pas autorisé à modifier le montant total ou le client de la commande."}, status=status.HTTP_403_FORBIDDEN)

        serializer = OrderSerializer(order, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        # La suppression d'une commande est généralement réservée aux administrateurs ou pour des cas spécifiques
        # Ici, nous permettons à l'utilisateur de supprimer sa propre commande si elle est "pending"
        if order.status != 'pending' and not request.user.is_staff:
             return Response({"detail": "Vous ne pouvez supprimer que les commandes en attente."}, status=status.HTTP_403_FORBIDDEN)
        
        with transaction.atomic():
            # Remettre les produits en stock avant de supprimer la commande
            for order_product in order.order_products.all():
                product = order_product.product
                # Utilisation de F() pour une mise à jour atomique du stock
                Product.objects.filter(pk=product.pk).update(stock=F('stock') + order_product.quantity)
            order.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'DELETE']) # Ajout de DELETE pour supprimer un OrderProduct d'une commande
@permission_classes([IsAuthenticated]) # Seuls les utilisateurs authentifiés peuvent ajouter/voir/supprimer des produits à une commande
def order_product_list_create_delete_view(request, order_pk):
    """
    Liste les produits d'une commande spécifique, ajoute un produit à cette commande ou supprime un produit.
    """
    try:
        client_profile = request.user.client_profile
    except Client.DoesNotExist:
        return Response({"detail": "Profil client non trouvé pour l'utilisateur."}, status=status.HTTP_400_BAD_REQUEST)
    
    order = get_object_or_404(Order, pk=order_pk, client=client_profile)

    if request.method == 'GET':
        order_products = OrderProduct.objects.filter(order=order)
        serializer = OrderProductSerializer(order_products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Ajout d'un produit à une commande existante
        product_id = request.data.get('product_id') # Changement de 'product' à 'product_id' pour plus de clarté
        quantity = request.data.get('quantity')

        if not product_id or not quantity or not isinstance(quantity, int) or quantity <= 0:
            return Response({"detail": "Veuillez fournir un ID de produit et une quantité valide."}, status=status.HTTP_400_BAD_REQUEST)
        
        product = get_object_or_404(Product, pk=product_id)

        if product.stock < quantity:
            return Response({"detail": f"Stock insuffisant pour le produit {product.name}. Stock disponible: {product.stock}"}, status=status.HTTP_400_BAD_REQUEST)
        
        with transaction.atomic():
            # Vérifie si le produit existe déjà dans la commande
            order_product, created = OrderProduct.objects.get_or_create(
                order=order,
                product=product,
                defaults={'quantity': quantity, 'oneself_price': product.current_price}
            )
            if not created:
                # Si le produit existe déjà, met à jour la quantité
                order_product.quantity += quantity
                order_product.save()
            
            # Diminue le stock du produit
            Product.objects.filter(pk=product_id).update(stock=F('stock') - quantity)
            
            # Mettre à jour le total de la commande
            order.total_amount += order_product.oneself_price * quantity
            order.save()

            serializer = OrderProductSerializer(order_product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        # Supprime un produit d'une commande
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({"detail": "Veuillez fournir l'ID du produit à supprimer."}, status=status.HTTP_400_BAD_REQUEST)
        
        order_product = get_object_or_404(OrderProduct, order=order, product__id=product_id)

        with transaction.atomic():
            # Remettre le stock du produit
            product = order_product.product
            Product.objects.filter(pk=product.pk).update(stock=F('stock') + order_product.quantity)
            
            # Mettre à jour le total de la commande
            order.total_amount -= order_product.oneself_price * order_product.quantity
            order.save()

            order_product.delete()
            return Response({"message": "Produit retiré de la commande."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST']) # GET pour voir, POST pour créer un paiement pour une commande
@permission_classes([IsAuthenticated])
def payment_list_create_view(request, order_pk):
    """
    Récupère les détails de paiement pour une commande spécifique de l'utilisateur connecté ou crée un paiement.
    """
    try:
        client_profile = request.user.client_profile
    except Client.DoesNotExist:
        return Response({"detail": "Profil client non trouvé pour l'utilisateur."}, status=status.HTTP_400_BAD_REQUEST)
    
    order = get_object_or_404(Order, pk=order_pk, client=client_profile)

    if request.method == 'GET':
        payment = get_object_or_404(Payment, order=order)
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Crée un paiement pour la commande spécifiée
        if hasattr(order, 'payment'):
            return Response({"detail": "Un paiement existe déjà pour cette commande."}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data.copy()
        data['order'] = order.id # Associe le paiement à la commande
        data['value'] = order.total_amount # La valeur du paiement est le total de la commande

        serializer = PaymentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(order=order)
            # Mettre à jour le statut de la commande si le paiement est 'paid'
            if serializer.validated_data.get('status') == 'paid':
                order.status = 'processing' # Ou 'shipped' selon votre logique métier
                order.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# EMAIL SENDER
@api_view(['POST'])
@permission_classes([AllowAny])
def send_email(request):
    data = request.data
    to = data.get('to')
    subject = data.get('subject')
    message = data.get('message')

    if not (to and subject and message):
        return Response({"error": "Champs requis manquants"}, status=400)

    send_mail(
        subject,
        message,
        from_email=None,
        recipient_list=[to]
    )

    return Response({'status': 'Email envoyé avec succès'})
