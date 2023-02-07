from django.db import models

# Create your models here.
from django.db import models


class Car(models.Model):
    car_type = models.CharField(max_length=200)    
    car_color = models.CharField(max_length=200)
    def __str__(self):
        return self.car_type

class Customer(models.Model):
    customer_name = models.CharField(max_length=200)
    birth_date = models.DateTimeField('date of birth')
    def __str__(self):
        return self.customer_name

