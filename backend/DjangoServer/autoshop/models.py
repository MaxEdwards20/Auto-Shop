# Create your models here.
from django.db import models

class Vehicle(models.Model):
    name = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)
    vehicleType = models.CharField(max_length=20)
    location = models.CharField(max_length=200, default="Logan")
    isPurchased = models.BooleanField(default=False)
    isPending = models.BooleanField(default=False)
    isInsured = models.BooleanField(default=False)
    isLoadJacked = models.BooleanField(default=False)
    image = models.ImageField(default=None)
    # string to the url of the image
    # automatically assigns an id to each instance
    def __str__(self):
        return self.name


class AutoUser(models.Model):
    PERMISSION_CHOICES = (("user", "user"), ("admin", "admin"), ("employee", "employee"))
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=50)
    phoneNumber = models.CharField(max_length=50)
    permission = models.CharField(max_length=20, choices=PERMISSION_CHOICES, default="user")
    balance = models.FloatField(default=0)
    needHelp = models.BooleanField(default=False)
    ethicsViolation = models.TextField(default="None")
    location = models.CharField(max_length=50, default="unknown")

class Reservation(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    autoUser = models.ForeignKey(AutoUser, on_delete=models.CASCADE)
    startDate = models.DateField()
    endDate = models.DateField()
    amountDue = models.FloatField(default=100)

    def __str__(self):
        return self.vehicle.name + " from " + self.startDate + " to " + self.endDate
