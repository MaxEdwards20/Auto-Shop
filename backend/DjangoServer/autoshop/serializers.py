from rest_framework import serializers
from .models import AutoUser, Vehicle, Reservation

class AutoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoUser
        fields = ('name', 'id', 'permission', 'balance', 'needHelp', 'ethicsViolation',
                  'location', 'email', 'phoneNumber')

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('name', 'id', 'vin', 'vehicleType', 'location', 'isPurchased', 'isPending', 'vehicleType', 'isInsured', 'isLoadJacked', 'imageURL', 'pricePerDay', 'purchasePrice')


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('vehicle', 'autoUser', 'startDate', 'endDate', 'amountDue', 'id')
