from rest_framework import serializers
from .models import Rental

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('id', 'vin', 'make', 'model', 'edition', 'year', 'color', 'mileage', 'titleType')
