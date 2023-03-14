# Maxwell Edwards


from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from datetime import datetime, timedelta
from ..models import Reservation, Vehicle, AutoUser
from .helperTestFunctions import createUser, createVehicle, createReservation, BASE_URL
from ..helperFunctions import parseDates
import json

class TestReservationEndpoints(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = createUser(self.client)
        self.vehicle = createVehicle(self.client)
        self.startDate = datetime.today().date() + timedelta(days=2)
        self.endDate = self.startDate + timedelta(days=5)
        self.isInsured = False

    def testCreateReservation(self):
        url = reverse('createReservation')
        data = {'startDate': str(self.startDate), 'endDate': str(self.endDate), 'vehicleID': self.vehicle['id'],
                "userID": self.user['id'], 'isInsured': False}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        reservation = json.loads(response.content)['reservation']
        clientNeeds = ['startDate', 'endDate', 'vehicle', 'amountDue']
        for item in clientNeeds: self.assertTrue(item in reservation)


        reservationObject = Reservation.objects.filter(vehicle=self.vehicle['id'], autoUser=self.user['id'],
                                                       startDate=self.startDate, endDate=self.endDate).first()
        self.assertIsNotNone(reservationObject)
        self.assertEqual(reservationObject.vehicle.pk, self.vehicle['id'])
        self.assertEqual(reservationObject.autoUser.pk, self.user['id'])
        self.assertEqual(reservationObject.startDate, self.startDate)
        self.assertEqual(reservationObject.endDate, self.endDate)

    def testCreateReservationInvalidVehicleId(self):
        url = reverse('createReservation')
        data = {'startDate': str(self.startDate), 'endDate': str(self.endDate), 'vehicleID': 100,
                "userID": self.user['id'], 'isInsured': False}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def testCreateReservationInvalidUserId(self):
        url = reverse('createReservation')
        data = {'startDate': str(self.startDate), 'endDate': str(self.endDate), 'vehicleID': self.vehicle['id'],
                "userID": 199, 'isInsured': False}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def testCreateReservationUnavailableVehicle(self):
        # Reserve the vehicle for the given dates
        startDate = datetime.today()
        endDate = startDate + timedelta(days=5)
        response = createReservation(self.client, self.vehicle, createUser(self.client), startDate=startDate, endDate=endDate)

        data = {'startDate': str(self.startDate), 'endDate': str(self.endDate), 'vehicleID': self.vehicle['id'],
                "userID": self.user['id']}
        response = self.client.post(reverse('createReservation'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def testOneUserMultipleReservations(self):
        user = createUser(self.client)
        vehicle1 = createVehicle(self.client)
        vehicle2 = createVehicle(self.client)
        createReservation(self.client, vehicle1, user)
        createReservation(self.client, vehicle2, user)

    def testDeleteReservation(self):
        user = createUser(self.client)
        vehicle = createVehicle(self.client)
        reservation = createReservation(self.client, user=user, vehicle=vehicle, isInsured = self.isInsured)
        url = f"{BASE_URL}reservation/{reservation['id']}"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 200)
        # make sure we can't get that user anymore
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
        # make sure we can't delete a user that doesn't exist
        response = self.client.delete(f"{BASE_URL}reservation/19999")
        self.assertEqual(response.status_code, 404)
        response = self.client.delete(f"{BASE_URL}reservation/INVALID")
        self.assertEqual(response.status_code, 404)
