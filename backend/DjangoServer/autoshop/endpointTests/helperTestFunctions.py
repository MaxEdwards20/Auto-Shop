# Maxwell Edwards
import json
from django.urls import reverse
from uuid import uuid4
from ..models import AutoUser, Reservation, Vehicle
from datetime import datetime, timedelta
from ..serializers import VehicleSerializer, AutoUserSerializer, ReservationSerializer

BASE_URL = "http://localhost:8000/"
def createUser(client, userData=None, permission="user") -> dict:
    if not userData:
        userData = {'email': str(uuid4()), 'password': '123', 'name': 'test', 'phoneNumber': '1', 'permission': permission}
    response = client.post(reverse('createUser'), data=userData)
    assert (response.status_code == 200)
    return json.loads(response.content)['user']


def createVehicle(client, vehicleData=None) -> dict:
    if not vehicleData:
        vehicleData = {'vehicleType': "Chevrolet", 'name': "Cruze", 'vin': str(uuid4()), 'image': "imageurl"}
    response = client.post(reverse('createVehicle'), data=vehicleData, type=json)
    if not response.status_code == 200:
        print(f"ERROR: {response.content}")
    assert (response.status_code == 200)
    return json.loads(response.content)['vehicle']



def createReservation(client, vehicle: dict, user: dict, startDate= None, endDate = None) -> dict:
    url = reverse('createReservation')
    if not startDate:
        startDate = datetime.today().date() + timedelta(days=2)
    if not endDate:
        endDate = startDate + timedelta(days=5)
    data = {'startDate': str(startDate), 'endDate': str(endDate), 'vehicleID': vehicle['id'], 'userID': user['id']}
    response = client.post(url, data, format='json')
    assert(response.status_code == 200)
    return json.loads(response.content)['reservation']


