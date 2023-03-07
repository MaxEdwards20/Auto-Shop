# Maxwell Edwards
from .models import Reservation, Vehicle, AutoUser
from django.http import HttpRequest, JsonResponse
from .serializers import UserSerializer, VehicleSerializer, ReservationSerializer
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .helperFunctions import __getReqBody, __update_cors, parseDates, vehicleIsAvailable

@csrf_exempt
def createReservation(request: HttpRequest):
    parsedBody = __getReqBody(request)
    valid = __validateCreateReservationBody(request, parsedBody)
    if not valid:
        return __update_cors(JsonResponse({'error': "missing params or wrong method"}, status=400), request)
    available = __validateReservationAvailable(request, parsedBody)
    if not available:
        return __update_cors(JsonResponse({'error': "This car is not available during these dates"}, status=400), request)
    newReservation = __createReservationDatabase(parsedBody, request)
    j = JsonResponse({"reservation": ReservationSerializer(newReservation).data})
    return __update_cors(j, request)


@csrf_exempt
def deleteReservation(request: HttpRequest, id: int):
    reservation = get_object_or_404(Reservation, pk=id)
    response = JsonResponse({'reservation': ReservationSerializer(reservation).data})
    reservation.delete()
    return __update_cors(response, request)


@csrf_exempt
def getReservation(request: HttpRequest, id:int):
    reservation = get_object_or_404(Reservation, pk=id)
    j = JsonResponse({"reservation": ReservationSerializer(reservation).data})
    return __update_cors(j ,request)


def __createReservationDatabase(parsedBody: dict, request: HttpRequest) -> Reservation:
    vehicle = __getVehicle(int(parsedBody['vehicleID']))
    user = __getUser(int(parsedBody['userID']))
    newReservation = Reservation()
    newReservation.vehicle = vehicle
    newReservation.autoUser = user
    newReservation.startDate, newReservation.endDate = parseDates(request)
    newReservation.save()
    return newReservation


def __getUser(userID: int):
    return get_object_or_404(AutoUser, pk=userID)


def __getVehicle(vehicleID: int):
    return get_object_or_404(Vehicle, pk=vehicleID)


def __validateCreateReservationBody(request: HttpRequest, parsedBody: dict) -> bool:
    if request.method != "POST":
        return False
    NEEDED_PARAMS = {'startDate', 'endDate', 'vehicleID', "userID"}
    for key in NEEDED_PARAMS:
        if key not in parsedBody: return False
    return True

def __validateReservationAvailable(request: HttpRequest, parsedBody: dict) -> bool:
    for reservation in Reservation.objects.all():
        if reservation.vehicle.pk == int(parsedBody['vehicleID']):
            startDate, endDate = parseDates(request)
            return vehicleIsAvailable(startDate=startDate, endDate=endDate, reservation=reservation)
    return True



