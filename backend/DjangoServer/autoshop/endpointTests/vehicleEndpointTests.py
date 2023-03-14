from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from datetime import datetime, timedelta
from uuid import uuid4
from ..models import Vehicle, Reservation, AutoUser
import json
from .helperTestFunctions import createUser, createVehicle, BASE_URL

class TestVehicleEndpoints(TestCase):
    def setUp(self):
        self.client = Client()

    def testCreateVehicle(self):
        vehicleData = {'vehicleType': "Chevrolet", 'name': "Cruze", 'vin': str(uuid4()), "image": ""}
        response = self.client.post(reverse('createVehicle'), data=vehicleData)
        self.assertEqual(response.status_code, 200)


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
        response = self.client.delete(f"{BASE_URL}vehicle/{vehicle['id']}")
        self.assertEqual(response.status_code, 200)
        # ensure we can't access that vehicle anymore
        response = self.client.get(f"{BASE_URL}vehicle/{vehicle['id']}")
        self.assertEqual(response.status_code, 404)
        # can't delete a vehicle that doesn't exist
        response = self.client.delete(f"{BASE_URL}vehicle/123")
        self.assertEqual(response.status_code, 404)

    def testGetVehicle(self):
        vehicle = createVehicle(self.client)
        response = self.client.get((f"{BASE_URL}vehicle/{vehicle['id']}"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'vehicle')
        # Make sure we don't get a vehicle that doesn't exist
        response = self.client.get((f"{BASE_URL}vehicle/99999"))
        self.assertEqual(response.status_code, 404)
        response = self.client.get((f"{BASE_URL}vehicle/INVALID"))
        self.assertEqual(response.status_code, 404)

    def testGetAllVehicles(self):
        response = self.client.get(reverse('getAllVehicles'))
        self.assertEqual(response.status_code, 200)
        vehicles = json.loads(response.content)['vehicles']
        self.assertGreaterEqual(len(vehicles), 5)
        vehicle = vehicles[0]
        self.assertTrue('pricePerDay' in vehicle)
        self.assertTrue('imageURL' in vehicle)


    def testGetAllVehiclesReturnsUnpurchased(self):
        newVehicle = createVehicle(self.client)
        response = self.client.get(reverse('getAllVehicles'))
        self.assertEqual(response.status_code, 200)
        vehicles = json.loads(response.content)['vehicles']
        self.assertGreaterEqual(len(vehicles), 5)
        vehicle = vehicles[0]
        self.assertTrue('pricePerDay' in vehicle)
        self.assertTrue('imageURL' in vehicle)
        # ensure
        for vehicle in vehicles:
            if vehicle['id'] == newVehicle['id']:
                self.assertFalse(vehicle['isPurchased'])

    def testGetAvailableVehicles(self):
        today = datetime.now().date()
        start_date = today + timedelta(days=1)
        end_date = today + timedelta(days=5)
        data = {'startDate': start_date, 'endDate': end_date}
        for _ in range(3): createVehicle(self.client)
        response = self.client.post(reverse('getAllAvailableVehicles'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        vehicles = json.loads(response.content)['vehicles']
        self.assertGreaterEqual(len(vehicles), 3)

    def testGetAvailableVehiclesWithReservations(self):
        # Create vehicles
        v1 = {"vehicleType": "Chevrolet", "name":"Cruze", "vin": 202004, "image": "imageurl"}
        v2 = {"vehicleType": "Honda", "name":"Civic", "vin": 202205, "image": "imageurl"}
        v3 = {"vehicleType": "Ford", "name":"F150", "vin": 202103, "image": "imageurl"}
        vehicle1 = createVehicle(self.client, v1)
        vehicle2 = createVehicle(self.client, v2)
        vehicle3 = createVehicle(self.client, v3)

        # Create User
        user1 = createUser(self.client)
        user2 = createUser(self.client)
        user3 = createUser(self.client)

        # # Create reservations
        # Reservation.objects.create(vehicle=self.vehicle1, autoUser=self.user1 , startDate=self.start_date, endDate=self.end_date)
        # Reservation.objects.create(vehicle=self.vehicle2, autoUser=self.user2, startDate=self.start_date, endDate=self.end_date)


    def testPurchaseVehicle(self):
        v1 = createVehicle(self.client)
        response = self.client.get((f"{BASE_URL}vehicle/{v1['id']}"))
        self.assertEqual(response.status_code, 200)
        testVehicle = json.loads(response.content)['vehicle']
        self.assertFalse(testVehicle['isPurchased'])
        user = createUser(self.client, permission="admin")
        response = self.client.post(f"{BASE_URL}vehicle/{v1['id']}/purchase", data={"userID": user['id']})
        self.assertEqual(response.status_code, 200)
        response = self.client.get((f"{BASE_URL}vehicle/{v1['id']}"))
        self.assertEqual(response.status_code, 200)
        resVehicle = json.loads(response.content)['vehicle']
        self.assertTrue(resVehicle['isPurchased'])

    def testPurchaseVehicleInvalidPermissions(self):
        v1 = createVehicle(self.client)
        response = self.client.get((f"{BASE_URL}vehicle/{v1['id']}"))
        self.assertEqual(response.status_code, 200)
        testVehicle = json.loads(response.content)['vehicle']
        self.assertFalse(testVehicle['isPurchased'])
        user = createUser(self.client)
        response = self.client.post(f"{BASE_URL}vehicle/{v1['id']}/purchase", data={"userID": user['id']})
        self.assertEqual(response.status_code, 400)
        response = self.client.get((f"{BASE_URL}vehicle/{v1['id']}"))
        self.assertEqual(response.status_code, 200)
        resVehicle = json.loads(response.content)['vehicle']
        self.assertFalse(resVehicle['isPurchased'])




