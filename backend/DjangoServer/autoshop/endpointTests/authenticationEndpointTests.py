from django.test import TestCase, Client
import uuid
from django.contrib.auth.models import User as Person
import json
# Create your tests here.

class TestAuthentication(TestCase):
    def setUp(self):
        self.client = Client()
        self.email = f'test@gmail.com{uuid.uuid4()}'
        response = self.client.post('http://localhost:8000/user', data={'name': 'test', 'email': self.email,
                                                                        'password': 'testpass', 'phoneNumber': '2222222'})
        self.assertEqual(response.status_code, 200)

    def testValidAuthentication(self):
        response = self.client.post('http://localhost:8000/user/login', data={'email': self.email, "password": "testpass"})
        self.assertEqual(response.status_code, 200)

    def testUnauthenticatedUser(self):
        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': 'INVALID', "password": "INVALID"})
        self.assertEqual(response.status_code, 401)
        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': self.email, "password": "INVALID"})
        self.assertEqual(response.status_code, 401)

        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': 'INVALID', "password": "testpass"})
        self.assertEqual(response.status_code, 401)