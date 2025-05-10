from django.db import models

class utilisateur (models.Model):
    id_utilisateur = models.IntegerField()
    nom = models.CharField(max_length=256)
    prenom = models.CharField(max_length=256)
    email = models.CharField(max_length=256)
    mot_de_passe = models.CharField(max_length=256)
    adresse = models.CharField(max_length=256)
    telephone = models.CharField(max_length=256)


class produit (models.Model):
    id_produit = models.IntegerField()
    nom = models.CharField(max_length=256)
    description = models.CharField(max_length=256)
    prix = models.IntegerField()
    stock = models.IntegerField()
    image_url = models.CharField(max_length=256)
    id_categorie = models.CharField(max_length=256)

class paiement (models.Model):
    id_paiement = models.IntegerField()
    id_commande = models.IntegerField()
    montant = models.IntegerField()
    date_paiement = models.DateField()
    mode_paiement = models.CharField(max_length=256)


class commande (models.Model):
    id_commande = models.IntegerField()
    id_utilisateur = models.IntegerField()
    date_commande = models.DateField()
    statut_commande = models.CharField(max_length=256)


class categorie (models.Model):
    id_categorie = models.IntegerField()
    nom_categorie = models.CharField(max_length=256)

class commandeproduit (models.Model):
    id_commande_produit = models.IntegerField()
    id_commande = models.IntegerField()
    id_produit = models.IntegerField()
    quantite = models.IntegerField()
    prix_unitaire = models.IntegerField()

   