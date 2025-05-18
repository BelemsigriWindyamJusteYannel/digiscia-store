from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Client, Category, Product
from .serializers import ClientSerializer, CategorySerializer, ProductSerializer

@api_view(['GET'])
def get_all_clients(request):
    clients = Client.objects.all()
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)









from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        to = data.get('to')
        subject = data.get('subject')
        message = data.get('message')

        send_mail(
            subject,
            message,
            from_email=None,  # utilisera EMAIL_HOST_USER par défaut
            recipient_list=[to]
        )

        return JsonResponse({'status': 'Email envoyé'})