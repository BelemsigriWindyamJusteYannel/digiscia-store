from django.http import JsonResponse
from .models import utilisateur, categorie, produit, commande, commandeproduit, paiement
from .serializers import utilisateurSerializer

def liste_utilisateur(request):
    users = utilisateur.objects.all()
    serializer = utilisateurSerializer(users,many=True)
    return JsonResponse(serializer.data, safe=False)