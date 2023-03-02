
from django.test import TestCase, Client
from uuid import uuid4
class TestUserEndpoints(TestCase):
    def setUp(self):
        self.client = Client()
        self.email = uuid4()

    def testCreateUser(self):
        response = self.client.post("http://localhost:8000/user", data={'email': self.email, 'password': '123', 'name': 'test', 'phoneNumber': '1'})
        self.assertEqual(response.status_code, 200)