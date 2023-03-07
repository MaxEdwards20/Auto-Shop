# Maxwell Edwards


from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from datetime import datetime, timedelta
from ..models import Reservation, Vehicle, AutoUser
from .helperTestFunctions import createUser, createVehicle
import json

class TestReservationEndpoints(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = createUser(self.client)
        self.vehicle = createVehicle(self.client)
        self.startDate = datetime.today().date() + timedelta(days=2)
        self.endDate = self.startDate + timedelta(days=5)

    def test_create_reservation(self):
        url = reverse('createReservation', kwargs={'id': self.user['id']})
        data = {'startDate': str(self.startDate), 'endDate': str(self.endDate), 'vehicleId': self.vehicle['id']}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        reservation = Reservation.objects.filter(vehicle=self.vehicle, user=self.user, startDate=self.startDate, endDate=self.endDate).first()
        self.assertIsNotNone(reservation)
        self.assertEqual(reservation.vehicle, self.vehicle)
        self.assertEqual(reservation.user, self.user)
        self.assertEqual(reservation.startDate, self.startDate)
        self.assertEqual(reservation.endDate, self.endDate)

    def test_create_reservation_with_invalid_vehicle_id(self):
        url = reverse('createReservation', kwargs={'id': self.user['id']})
        data = {'startDate': str(self.startDate), 'endDate': str(self.endDate), 'vehicleId': 100}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_reservation_with_unavailable_vehicle(self):
        # Reserve the vehicle for the given dates
        Reservation.objects.create(vehicle=self.vehicle, user=self.user, startDate=self.startDate, endDate=self.endDate)
        url = reverse('createReservation', kwargs={'id': self.user.id})
        data = {'startDate': str(self.startDate), 'endDate': str(self.endDate), 'vehicleId': self.vehicle.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Vehicle is not available for the selected dates')

