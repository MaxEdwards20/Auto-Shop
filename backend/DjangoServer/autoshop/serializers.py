from rest_framework import serializers
from .models import AutoUser, Vehicle, Reservation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoUser
        fields = ('name', 'id', 'permission', 'balance', 'needHelp', 'ethicsViolation',
                  'location', 'email', 'phoneNumber')

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('name', 'id', 'vin', 'location', 'isPurchased', 'isPending', 'vehicleType', 'isInsured', 'isLoadJacked', 'image')


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('vehicle', 'autoUser', 'startDate', 'endDate', 'amountDue', 'id')
