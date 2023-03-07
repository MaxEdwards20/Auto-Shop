from django.test import TestCase, Client
from django.urls import reverse
import json
from uuid import uuid4
from .helperTestFunctions import createUser, BASE_URL

class TestUserEndpoints(TestCase):
    def setUp(self):
        self.client = Client()
        self.userData = {'email': str(uuid4()), 'password': '123', 'name': 'test', 'phoneNumber': '1'}

    def testCreateUser(self):
        response = self.client.post(reverse("createUser"), data=self.userData)
        self.assertEqual(response.status_code, 200)
        # Make sure it is there
        user = json.loads(response.content)['user']
        res = self.client.get(f"{BASE_URL}user/{user['id']}")
        self.assertEqual(res.status_code, 200)


    def testUpdateUser(self):
        # Create a new user to be able to update
        data = createUser(self.client)
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
        response = self.client.put(BASE_URL + f"user/{str(id)}", data=updatedData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        for key in updatedData:
            self.assertEqual(updatedUser[key], updatedData[key])


    def testDeleteUser(self):
        user = createUser(self.client)
        response = self.client.delete(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 200)
        # make sure we can't get that user anymore
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 404)
        # make sure we can't delete a user that doesn't exist
        response = self.client.delete(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 404)


    def testGetuser(self):
        user = createUser(self.client)
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'user')
        # Make sure we can't get a user that doesn't exist
        response = self.client.get(BASE_URL + f"user/99999")
        self.assertEqual(response.status_code, 404)
        response = self.client.get(BASE_URL + f"user/INVALID")
        self.assertEqual(response.status_code, 404)


    def testAddMoneyUser(self):
        user = createUser(self.client)
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 200)
        response = self.client.post(BASE_URL + f"user/{user['id']}/addMoney", data={'amount': 100})
        self.assertEqual(response.status_code, 200)
        response =  self.client.get(BASE_URL + f"user/{user['id']}")
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(response.status_code, 200)
        self.assertEqual(updatedUser['balance'], user['balance'] + 100)


    def testRemoveMoneyUser(self):
        user = createUser(self.client)
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 200)
        response = self.client.post(BASE_URL + f"user/{user['id']}/removeMoney", data={'amount': 100})
        self.assertEqual(response.status_code, 200)
        response =  self.client.get(BASE_URL + f"user/{user['id']}")
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(response.status_code, 200)
        self.assertEqual(updatedUser['balance'], user['balance'] - 100)



