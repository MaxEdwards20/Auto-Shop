from django.test import TestCase, Client
from django.urls import reverse
import json
from uuid import uuid4
class TestUserEndpoints(TestCase):
    def setUp(self):
        self.client = Client()
        self.userData = {'email': str(uuid4()), 'password': '123', 'name': 'test', 'phoneNumber': '1'}

    def testCreateUser(self):
        response = self.client.post("http://localhost:8000/user", data=self.userData)
        self.assertEqual(response.status_code, 200)

    def testUpdateUser(self):
        # Create a new user to be able to update
        data = self.__createUser()
        # Make sure we are getting back the entire object with its id value
        id = data['id']
        updatedData = {
            'name': 'Jane Doe',
            'balance': 200,
            'needHelp': False,
            'ethicsViolation': 'Yes',
            'location': 'Los Angeles',
            'email': self.userData['email']
        }
        response = self.client.put("http://localhost:8000/user/"+ str(id), data=updatedData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        for key in updatedData:
            self.assertEqual(updatedUser[key], updatedData[key])


    def testDeleteUser(self):
        user = self.__createUser()
        response = self.client.delete(f"http://localhost:8000/user/{user['id']}")
        self.assertEqual(response.status_code, 200)
        # make sure we can't get that user anymore
        response = self.client.get(f"http://localhost:8000/user/{user['id']}")
        self.assertEqual(response.status_code, 404)
        # make sure we can't delete a user that doesn't exist
        response = self.client.delete(f"http://localhost:8000/user/{user['id']}")
        self.assertEqual(response.status_code, 404)


    def testGetuser(self):
        user = self.__createUser()
        response = self.client.get(f"http://localhost:8000/user/{user['id']}")
        self.assertEqual(response.status_code, 200)
        # Make sure we can't get a user that doesn't exist
        response = self.client.get(f"http://localhost:8000/user/99999")
        self.assertEqual(response.status_code, 404)
        response = self.client.get(f"http://localhost:8000/user/INVALID")
        self.assertEqual(response.status_code, 404)



    def __createUser(self):
        response = self.client.post("http://localhost:8000/user", data=self.userData)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)['user']
        self.assertIn('id', data)
        return data


