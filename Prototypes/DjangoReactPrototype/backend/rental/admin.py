from django.contrib import admin
from .models import Rental
# Register your models here.

class RentalAdmin(admin.ModelAdmin):
    list_display = ('vin', 'make', 'model', 'edition', 'year', 'color', 'mileage', 'titleType')

admin.site.register(Rental, RentalAdmin)
