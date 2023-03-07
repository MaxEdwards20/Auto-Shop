# Maxwell Edwards
import json
from django.urls import reverse
from uuid import uuid4


def createUser(client, userData=None):
    if not userData:
        userData ={'email': str(uuid4()), 'password': '123', 'name': 'test', 'phoneNumber': '1'}
    response = client.post(reverse('createUser'), data=userData)
    assert (response.status_code == 200)
    data = json.loads(response.content)['user']
    return data


def createVehicle(client, vehicleData=None):
    if not vehicleData:
        vehicleData = {'vehicleType': "Chevrolet", 'name': "Cruze", 'vin': str(uuid4()), 'image': "imageurl"}
    response = client.post(reverse('createVehicle'), data=vehicleData, type=json)
    if not response.status_code == 200:
        print(f"ERROR: {response.content}")
    assert (response.status_code == 200)
    data = json.loads(response.content)['vehicle']
    return data
