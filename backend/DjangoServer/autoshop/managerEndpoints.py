from django.http import HttpRequest, HttpResponse
from .models import AutoUser, Reservation
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .serializers import AutoUserSerializer, ReservationSerializer
from .helperFunctions import __update_cors, __getReqBody

ADMIN_PASS = "admin123"
ADMIN_USERNAME = "admin123"

@csrf_exempt
def initializeDatabase():
    # First check to make sure we have an admin user or not, create if not there
    admin = AutoUser.objects.filter(permission="admin", email=ADMIN_PASS, password=ADMIN_PASS)
    if not admin:
        admin =  __createManager()
    return __makeJSONResponse(admin.pk)

def getManager():
    admin = AutoUser.objects.filter(permission="admin", email=ADMIN_PASS, password=ADMIN_PASS)
    return __makeJSONResponse(admin.pk)

def __createManager():
    admin = User.objects.create_user(username=ADMIN_USERNAME, password=ADMIN_PASS)
    AutoUser.objects.create(email=ADMIN_USERNAME, name="Dan's Auto Management", phoneNumber = "4357551111", user=admin, permission="admin")
    return admin


def __makeJSONResponse(userID: int) -> JsonResponse:
    return JsonResponse(__getUserInfo(userID))

def __getUserInfo(userID: int) -> dict:
    return {"user": __getSerializedUserInfo(userID),
                         "reservations": __getSerializedReservations(userID)}
def __getSerializedReservations(userID: int):
    return [ReservationSerializer(reservation).data for reservation in Reservation.objects.all() if reservation.autoUser.pk ==userID]

def __getSerializedUserInfo(id):
    userModel = get_object_or_404(AutoUser, pk=id)
    return AutoUserSerializer(userModel).data