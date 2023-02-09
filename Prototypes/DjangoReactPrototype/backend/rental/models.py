from django.db import models

# Create your models here.

class Rental(models.Model):
    vin = models.CharField(max_length=50)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    edition = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=50)
    mileage = models.IntegerField()
    titleType = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.year} {self.make} {self.model} {self.edition} - VIN: {self.vin}'
    