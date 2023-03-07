from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

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
    PERMISSION_CHOICES = ("user", "admin", "employee")
    # email, phone, password, permissions are all accessed through this object.
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=50)
    phoneNumber = models.CharField(max_length=50)
    permission = models.CharField(max_length=20, choices=PERMISSION_CHOICES, default="user")
    # automatically assigns an id to each instance
    balance = models.FloatField(default=0)
    needHelp = models.BooleanField(default=False)
    ethicsViolation = models.TextField(blank=True)
    location = models.CharField(max_length=50)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        AutoUser.objects.create(user=instance)
@receiver(post_save, sender=User)
def save_auto_user(sender, instance, **kwargs):
    instance.autoUser.save()

class Reservation(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE )
    user = models.ForeignKey(AutoUser, on_delete=models.CASCADE)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    amountDue = models.FloatField()

    def __str__(self):
        return self.vehicle.name + " from " + self.startDate + " to " + self.endDate
