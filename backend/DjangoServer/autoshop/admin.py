from django.contrib import admin
from .models import Vehicle, AutoUser, Reservation
# Register your models here.
admin.site.register(Vehicle)
admin.site.register(AutoUser)
admin.site.register(Reservation)