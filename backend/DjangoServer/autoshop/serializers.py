from rest_framework import serializers
from .models import AutoUser, Vehicle


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoUser
        fields = ('name', 'id', 'permission', 'balance', 'needHelp', 'ethicsViolation',
                  'location', 'email', 'phoneNumber')

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('name', 'id', 'vin', 'location', 'isPurchased', 'isPending',
                  'reservedDays', 'vehicleType', 'isInsured', 'isLoadJacked',
                  'dateCheckedOut', 'dateCheckedIn', 'image')
