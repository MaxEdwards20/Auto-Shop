# Create your models here.
from django.db import models

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
    image = models.TextField()
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
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE )
    autoUser = models.ForeignKey(AutoUser, on_delete=models.CASCADE)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    amountDue = models.FloatField(default=100)

    def __str__(self):
        return self.vehicle.name + " from " + self.startDate + " to " + self.endDate
