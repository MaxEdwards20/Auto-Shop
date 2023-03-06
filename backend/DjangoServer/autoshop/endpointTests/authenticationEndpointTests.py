from django.test import TestCase, Client
import uuid
import json
# Create your tests here.

class TestAuthentication(TestCase):
    def setUp(self):
        self.client = Client()
        self.data = {'name': 'test', 'email': f'test@gmail.com{uuid.uuid4()}', 'password': 'testpass', 'phoneNumber': '2222222'}
        response = self.client.post('http://localhost:8000/user', data=self.data)
        self.assertEqual(response.status_code, 200)

    def testValidAuthentication(self):
        response = self.client.post('http://localhost:8000/user/login', data={'email': self.data['email'], 'password': self.data['password']})
        self.assertEqual(response.status_code, 200)
        responseBody = json.loads(response.content)
        for key in self.data:
            if key == 'password': # We don't want the password back
                self.assertIsNone(responseBody.get(key))
            else:
                self.assertEqual(responseBody.get(key), self.data.get(key))

    def testUnauthenticatedUser(self):
        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': 'INVALID', "password": "INVALID"})
        self.assertEqual(response.status_code, 401)
        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': self.data['email'], "password": "INVALID"})
        self.assertEqual(response.status_code, 401)

        response = self.client.post('http://localhost:8000/user/login',
                                    data={'email': 'INVALID', "password": "testpass"})
        self.assertEqual(response.status_code, 401)