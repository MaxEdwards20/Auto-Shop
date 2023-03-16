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

        self.client.post(reverse("createUser"), data={'email': 123, 'password': '123',
                                                      'name': 'test', 'phoneNumber': '1'})
        response = self.client.post(reverse("createUser"), data={'email': 123, 'password': '123',
                                                      'name': 'test', 'phoneNumber': '1'})
        self.assertEqual(response.status_code, 400)

    def testUpdateUser(self):
        # Create a new user to be able to update
        data = createUser(self.client)
        # Make sure we are getting back the entire object with its id value
        id = data['id']
        updatedData = {
            'name': 'Jane Doe',
            'balance': 200,
            'needsHelp': False,
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
        content = json.loads(response.content)
        self.assertContains(response, 'user')
        self.assertContains(response, 'reservations')
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
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(response.status_code, 200)
        self.assertEqual(updatedUser['balance'], user['balance'] + 100)

    def testRemoveMoneyUser(self):
        user = createUser(self.client)
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 200)
        response = self.client.post(BASE_URL + f"user/{user['id']}/removeMoney", data={'amount': 100})
        self.assertEqual(response.status_code, 200)
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(response.status_code, 200)
        self.assertEqual(updatedUser['balance'], user['balance'] - 100)

    def testUpdatePermissions(self):
        user = createUser(self.client)
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 200)

        response = self.client.post(BASE_URL + f'user/{user["id"]}/permission', data={'permission': 'user'})
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(updatedUser['permission'], 'user')

        response = self.client.post(BASE_URL + f'user/{user["id"]}/permission', data={'permission': 'admin'})
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(updatedUser['permission'], 'admin')

        response = self.client.post(BASE_URL + f'user/{user["id"]}/permission', data={'permission': 'employee'})
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(updatedUser['permission'], 'employee')

        response = self.client.post(BASE_URL + f'user/{user["id"]}/permission', data={'permission': 'superuser'})
        self.assertEqual(response.status_code, 400)

    def testNeedsHelp(self):
        user = createUser(self.client)
        response = self.client.get(BASE_URL + f"user/{user['id']}")
        self.assertEqual(response.status_code, 200)

        response = self.client.post(BASE_URL + f'user/{user["id"]}/needs-help', data={'needsHelp': False,
                                                                                     'location': 'the ditch'})
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(updatedUser['needsHelp'], False)
        self.assertEqual(updatedUser['location'], 'the ditch')

        response = self.client.post(BASE_URL + f'user/{user["id"]}/needs-help', data={'needsHelp': True,
                                                                                     'location': 'the ditch'})
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(updatedUser['needsHelp'], True)
        self.assertEqual(updatedUser['location'], 'the ditch')

        response = self.client.post(BASE_URL + f'user/{user["id"]}/needs-help', data={'needsHelp': True,
                                                                                     'location': 'side railing'})
        self.assertEqual(response.status_code, 200)
        updatedUser = json.loads(response.content)['user']
        self.assertEqual(updatedUser['needsHelp'], True)
        self.assertEqual(updatedUser['location'], 'side railing')

        response = self.client.post(BASE_URL + f'user/{user["id"]}/needs-help', data={'location': 'the ditch'})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(BASE_URL + f'user/{user["id"]}/needs-help', data={'needsHelp': True})
        self.assertEqual(response.status_code, 400)

    def testEveryoneNeedsHelp(self):
        user1 = createUser(self.client)
        user2 = createUser(self.client)
        user3 = createUser(self.client)
        user4 = createUser(self.client)
        user5 = createUser(self.client)

        self.client.post(BASE_URL + f'user/{user1["id"]}/needs-help', data={'needsHelp': True,
                                                                                     'location': 'the ditch'})
        self.client.post(BASE_URL + f'user/{user3["id"]}/needs-help', data={'needsHelp': True,
                                                                                     'location': 'the ditch'})
        self.client.post(BASE_URL + f'user/{user4["id"]}/needs-help', data={'needsHelp': True,
                                                                                     'location': 'the ditch'})

        response = self.client.get(BASE_URL + 'user/needs-help')
        self.assertEqual(response.status_code, 200)
        responseData = json.loads(response.content)['users']
        needHelpIds = set()
        for user in responseData:
            needHelpIds.add(user['user']['id'])


        self.assertTrue(1 in needHelpIds)
        self.assertTrue(3 in needHelpIds)
        self.assertTrue(4 in needHelpIds)
        self.assertFalse(2 in needHelpIds)






