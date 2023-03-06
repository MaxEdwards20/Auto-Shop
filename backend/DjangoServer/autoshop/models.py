from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User as Person


class Vehicle(models.Model):
    name = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)
    location = models.CharField(max_length=200)
    isPurchased = models.BooleanField()
    isPending = models.BooleanField()
    reservedDays = models.JSONField(null=True)
    vehicleType = models.CharField(max_length=20)
    isInsured = models.BooleanField()
    isLoadJacked = models.BooleanField()
    dateCheckedOut = models.DateTimeField(null=True)
    dateCheckedIn = models.DateTimeField(null=True)
    image = models.TextField()  # string to the url of the image

    # automatically assigns an id to each instance

    def __str__(self):
        return self.name


class User(models.Model):
    # email, phone, username, password, permissions are all accessed through this object.
    name = models.CharField(max_length=200)
    permission = models.CharField(max_length=20)
    # automatically assigns an id to each instance
    balance = models.FloatField()
    needHelp = models.BooleanField()
    ethicsViolation = models.TextField(blank=True)
    location = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

    ## TODO: Do we need password storage here?

    def __str__(self):
        return self.name
