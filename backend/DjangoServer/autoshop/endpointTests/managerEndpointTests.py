#TODO

# Maxwell Edwards


from django.test import TestCase, Client
from django.http import HttpRequest
from typing import List
from django.urls import reverse
from rest_framework import status
from datetime import datetime, timedelta
from ..models import Reservation, Vehicle, AutoUser
from .helperTestFunctions import createUser, createVehicle, createReservation, BASE_URL
from ..helperFunctions import parseDates
from .helperTestFunctions import BASE_URL
from ..managerEndpoints import ADMIN_PASS, ADMIN_USERNAME
import json


class TestManagerEndpoints(TestCase):
    def setUp(self):
        self.client = Client()
        self.employee = createUser(self.client, permission="employee")
        self.manager = createUser(self.client, permission="admin")

    def test_initializeDatabase_success(self):
        response = self.client.post(f"{BASE_URL}manager/init", data={})
        self.assertEqual(response.status_code, 200)
        employeeCount = 0
        userCount = 0
        managerCount = 0
        for user in AutoUser.objects.all():
            if user.permission == "employee":
                employeeCount += 1
            elif user.permission == "user":
                userCount += 1
            elif user.permission == "admin":
                managerCount += 1
        self.assertGreaterEqual(employeeCount, 10)
        self.assertGreaterEqual(managerCount, 1)
        self.assertGreaterEqual(userCount, 10)
        # Make sure the second time we call it doesn't return any errors
        response = self.client.post(f"{BASE_URL}manager/init", data={})
        self.assertEqual(response.status_code, 200)


    def test_initializeDatabase_invalid_method(self):
        response = self.client.get(f"{BASE_URL}manager/init")
        self.assertEqual(response.status_code, 400)


    def test_getManager_invalid_method(self):
        response = self.client.post(f"{BASE_URL}manager")
        self.assertEqual(response.status_code, 400)


    def test_payEmployee_success(self):
        amount = 100
        data = {'amount': amount, 'managerID': self.manager['id']}
        response = self.client.post(reverse('payEmployee', args=[self.employee['id']]), data=data)
        self.assertEqual(response.status_code, 200)
        usersSet = AutoUser.objects.filter(pk=self.employee['id'])
        # Have to iterate because its a query set
        for user in usersSet:
            self.assertEqual(int(self.employee['balance']) + amount, user.balance )
        self.assertTrue("user" in json.loads(response.content))

    def test_payEmployee_invalid_method(self):
        response = self.client.get(reverse('payEmployee', args=[self.employee['id']]))
        self.assertEqual(response.status_code, 400)

    def test_payEmployee_missing_data(self):
        data = {'amount': '100'}
        response = self.client.post(reverse('payEmployee', args=[self.employee['id']]), data=data)
        self.assertEqual(response.status_code, 400)
        # Assert that the response contains an error message

    def test_payEmployee_invalid_employeeID(self):
        data = {'amount': '100', 'managerID': '1'}
        response = self.client.post(reverse('payEmployee', args=[999]), data=data)
        self.assertEqual(response.status_code, 404)



