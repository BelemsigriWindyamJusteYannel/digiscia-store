from rest_framework import serializers
from .models import utilisateur, categorie, produit, commande, commandeproduit, paiement

class utilisateurSerializer(serializers.ModelSerializer):
    class Meta: 
        model: utilisateur
        fields = ['id_utilisateur','nom','prenom','email','mot_de_passe','adresse','telephone']
    