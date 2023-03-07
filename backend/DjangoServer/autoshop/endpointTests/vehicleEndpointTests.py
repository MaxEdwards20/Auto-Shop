from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from datetime import datetime, timedelta
from uuid import uuid4
from ..models import Vehicle, Reservation, AutoUser
import json
from .helperTestFunctions import createUser, createVehicle
class TestVehicleEndpoints(TestCase):
    def setUp(self):
        self.client = Client()
        self.baseURL = "http://localhost:8000/"
        self.today = datetime.now().date()
        self.start_date = self.today + timedelta(days=1)
        self.end_date = self.today + timedelta(days=5)

        # Create vehicles
        v1 = {"vehicleType": "Chevrolet", "name":"Cruze", "vin": 202004, "image": "imageurl"}
        v2 = {"vehicleType": "Honda", "name":"Civic", "vin": 202205, "image": "imageurl"}
        v3 = {"vehicleType": "Ford", "name":"F150", "vin": 202103, "image": "imageurl"}
        self.vehicle1 = createVehicle(self.client, v1)
        self.vehicle2 = createVehicle(self.client, v2)
        self.vehicle3 = createVehicle(self.client, v3)

        # Create User
        self.user1 = createUser(self.client)
        self.user2 = createUser(self.client)
        self.user3 = createUser(self.client)

        # # Create reservations
        # Reservation.objects.create(vehicle=self.vehicle1, autoUser=self.user1 , startDate=self.start_date, endDate=self.end_date)
        # Reservation.objects.create(vehicle=self.vehicle2, autoUser=self.user2, startDate=self.start_date, endDate=self.end_date)


    def testCreateVehicle(self):
        vehicleData = {'vehicleType': "Chevrolet", 'name': "Cruze", 'vin': str(uuid4()), "image": ""}
        response = self.client.post(reverse('createVehicle'), data=vehicleData)
        self.assertEqual(response.status_code, 200)
        # Ensure we can't make vehicle again
        response = self.client.post(reverse('createVehicle'), data=vehicleData)
        self.assertEqual(response.status_code, 400)


    def testUpdateVehicle(self):
        vehicle = createVehicle(self.client)
        updatedData = {"name": "bandwagon", "isPending": True, "isPurchased": True, "location": "world"}
        response = self.client.put(reverse("vehicleRouter", kwargs={"id": vehicle['id']}), data=updatedData, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        updatedVehicle = json.loads(response.content)['vehicle']
        for key in updatedData:
            self.assertEqual(updatedVehicle[key], updatedData[key])


    def testDeleteVehicle(self):
        vehicle = createVehicle(self.client)
        response = self.client.delete(f"{self.baseURL}vehicle/{vehicle['id']}")
        self.assertEqual(response.status_code, 200)
        # ensure we can't access that vehicle anymore
        response = self.client.get(f"{self.baseURL}vehicle/{vehicle['id']}")
        self.assertEqual(response.status_code, 404)
        # can't delete a vehicle that doesn't exist
        response = self.client.delete(f"{self.baseURL}vehicle/123")
        self.assertEqual(response.status_code, 404)

    def testGetVehicle(self):
        vehicle = createVehicle(self.client)
        response = self.client.get((f"{self.baseURL}vehicle/{vehicle['id']}"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'vehicle')
        # Make sure we don't get a vehicle that doesn't exist
        response = self.client.get((f"{self.baseURL}vehicle/99999"))
        self.assertEqual(response.status_code, 404)
        response = self.client.get((f"{self.baseURL}vehicle/INVALID"))
        self.assertEqual(response.status_code, 404)


    def test_get_available_vehicles(self):
        url = reverse('getAllAvailableVehicles')
        data = {'startDate': self.start_date, 'endDate': self.end_date}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.vehicle3['id'])
        self.assertEqual(response.data[0]['vehicleType'], self.vehicle3['vehicleType'])






