from rest_framework import serializers
from .models import AutoUser, Vehicle, Reservation

class AutoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoUser
        fields = ('name', 'id', 'permission', 'balance', 'needsHelp', 'ethicsViolation',
                  'location', 'email', 'phoneNumber', 'hoursOwed', 'wage')

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('name', 'id', 'vin', 'vehicleType', 'location', 'isPurchased', 'isPending', 'vehicleType',
                   'isLoadJacked', 'imageURL', 'pricePerDay', 'purchasePrice')
        


class ReservationSerializer(serializers.ModelSerializer):
    autoUser = AutoUserSerializer(read_only=True)
    vehicle = VehicleSerializer(read_only=True)
    class Meta:
        model = Reservation
        fields = ("vehicle", 'autoUser', 'startDate', 'endDate', 'amountDue', 'id', 'isInsured', 'isCheckedOut')
