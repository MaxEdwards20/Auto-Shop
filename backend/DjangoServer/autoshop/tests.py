from django.test import TestCase, Client
from django.contrib.auth.models import User as Person
import json
# Create your tests here.

class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = Person.objects.create_user(username="testuser", password="testpass")

    def testAuthentication(self):
        response = self.client.post('http://localhost:8000/user/login', data={'email': 'testuser', "password": "testpass"})
        self.assertEqual(response.status_code, 200)

    def testUnauthenticatedUser(self):
        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': 'INVALID', "password": "INVALID"})
        self.assertEqual(response.status_code, 401)
        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': 'testuser', "password": "INVALID"})
        self.assertEqual(response.status_code, 401)

        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': 'INVALID', "password": "testpass"})
        self.assertEqual(response.status_code, 401)