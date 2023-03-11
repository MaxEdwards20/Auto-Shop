# Maxwell Edwards
from django.http import HttpRequest, HttpResponse
import datetime
import json
from .models import AutoUser, Reservation
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .serializers import AutoUserSerializer, ReservationSerializer

def update_cors(j: JsonResponse, request: HttpRequest) -> JsonResponse:
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

def getReqBody(request: HttpRequest) -> dict:
    if request.POST:
        parsedBody = request.POST
    else:
        parsedBody = json.loads(request.body)
    return parsedBody


def parseDates(request: HttpRequest) -> tuple:
    parsedBody = getReqBody(request)
    startDate = parsedBody['startDate'][:10]
    endDate = parsedBody['endDate'][:10]
    startDate = datetime.datetime.strptime(startDate, "%Y-%m-%d").date()
    endDate = datetime.datetime.strptime(endDate, "%Y-%m-%d").date()
    return (startDate , endDate)

def error400(request: HttpRequest, message: str = "Incorrect usage") -> JsonResponse:
    return update_cors(JsonResponse({'error': message}, status=400, safe=False), request)

def error401(request: HttpRequest) -> JsonResponse:
    return update_cors(JsonResponse({'error': "Unauthorized access"}, status=401, safe=False), request)

def vehicleIsAvailable(startDate, endDate, reservation: Reservation) -> bool:
    return reservation.startDate > endDate or reservation.endDate < startDate


def makeUserJSONResponse(userID: int) -> JsonResponse:
    return JsonResponse(createUserTransferObject(userID))

def createUserTransferObject(userID: int) -> dict:
    return {"user": __getSerializedUserInfo(userID),
                         "reservations": __getSerializedReservations(userID)}
def __getSerializedReservations(userID: int):
    return [ReservationSerializer(reservation).data for reservation in Reservation.objects.all() if reservation.autoUser.pk ==userID]

def __getSerializedUserInfo(id):
    userModel = get_object_or_404(AutoUser, pk=id)
    return AutoUserSerializer(userModel).data