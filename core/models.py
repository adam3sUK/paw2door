from django.db import models
from django.db.models.base import Model


# Create your models here.
class Shelter(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Pet(models.Model):
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    image = models.ImageField(blank=True, null=True)
    
    def __str__(self):
        return self.name