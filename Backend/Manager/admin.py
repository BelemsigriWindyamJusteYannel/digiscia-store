from django.contrib import admin
from .models import utilisateur, categorie, produit, commande, commandeproduit, paiement

admin.site.register(utilisateur)
admin.site.register(categorie)
admin.site.register(produit)
admin.site.register(commande)
admin.site.register(commandeproduit)
admin.site.register(paiement)