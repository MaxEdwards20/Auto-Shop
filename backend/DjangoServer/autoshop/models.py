# Create your models here.
from django.db import models
from django.contrib.auth.models import User
class Vehicle(models.Model):
    vehicleType = models.CharField(max_length=20, default="car")
    name = models.CharField(max_length=200)
    vin = models.CharField(max_length=17, default="vehicle") # I am not sure we need this -max
    location = models.CharField(max_length=200, default="Logan")
    imageURL = models.URLField(default=None)
    imageFile = models.ImageField(default=None)
    isPurchased = models.BooleanField(default=False)
    isPending = models.BooleanField(default=False)
    isInsured = models.BooleanField(default=False)
    isLoadJacked = models.BooleanField(default=False)
    pricePerDay = models.IntegerField(default=100)

    def __str__(self):
        return self.name


class AutoUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    PERMISSION_CHOICES = (("user", "user"), ("admin", "admin"), ("employee", "employee"))
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=50)
    phoneNumber = models.CharField(max_length=50)
    permission = models.CharField(max_length=20, choices=PERMISSION_CHOICES, default="user")
    balance = models.FloatField(default=0)
    needHelp = models.BooleanField(default=False)
    ethicsViolation = models.TextField(default="None")
    location = models.CharField(max_length=50, default="unknown")
    hoursWorked = models.IntegerField(default=0)

class Reservation(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    autoUser = models.ForeignKey(AutoUser, on_delete=models.CASCADE)
    startDate = models.DateField()
    endDate = models.DateField()
    amountDue = models.FloatField(default=100)

    def __str__(self):
        return f"Vehicle: {self.vehicle.name} User: {self.autoUser.name} "
