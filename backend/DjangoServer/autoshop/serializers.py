from rest_framework import serializers
from .models import User, Vehicle


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'id', 'permission', 'balance', 'needHelp', 'ethicsViolation',
                  'location', 'email')

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('name', 'id', 'vin', 'location', 'isPurchased', 'isPending',
                  'reservedDays', 'vehicleType', 'isInsured', 'isLoadJacked',
                  'dateCheckedOut', 'dateCheckedIn', 'image')
