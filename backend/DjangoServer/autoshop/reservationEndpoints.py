# Maxwell Edwards
from .models import Reservation, Vehicle, AutoUser
from django.http import HttpRequest, JsonResponse
from .serializers import AutoUserSerializer, VehicleSerializer, ReservationSerializer
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .helperFunctions import getReqBody, update_cors, parseDates, vehicleIsAvailable, error400, error401
from datetime import datetime, timedelta
@csrf_exempt
def createReservation(request: HttpRequest):
    parsedBody = getReqBody(request)
    valid = __validateCreateReservationBody(request, parsedBody)
    if not valid:
        return error400(request)
    available = __validateReservationAvailable(request, parsedBody)
    if not available:
        return error400(request, "Vehicle unavailable these days")
    newReservation = __createReservationDatabase(parsedBody, request)
    j = JsonResponse({"reservation": ReservationSerializer(newReservation).data})
    return update_cors(j, request)


@csrf_exempt
def deleteReservation(request: HttpRequest, id: int):
    reservation = get_object_or_404(Reservation, pk=id)
    response = JsonResponse({'reservation': ReservationSerializer(reservation).data})
    reservation.delete()
    return update_cors(response, request)


@csrf_exempt
def getReservation(request: HttpRequest, id:int):
    reservation = get_object_or_404(Reservation, pk=id)
    j = JsonResponse({"reservation": ReservationSerializer(reservation).data})
    return update_cors(j, request)

@csrf_exempt
def calculateCost(request: HttpRequest):
    #TODO Write unit tests for this
    if request.method != "POST":
        return error400(request)
    parsedBody = getReqBody(request)
    if not ('startDate' in parsedBody and 'endDate' in parsedBody and 'pricePerDay'):
        return error400(request)
    startDate, endDate = parseDates(request)
    diff: timedelta = endDate - startDate
    pricePerDay = int(parsedBody['pricePerDay'])
    total = pricePerDay * (diff.days + 1) # no difference means you rent for 1 day, every day after is another fee
    if total == 0:
        total = pricePerDay
    print(f'Diff days: {diff}. Total Cost: {total}')
    j = JsonResponse({"total": total})
    return update_cors(j, request)

@csrf_exempt
def getAllReservations(request: HttpRequest):
    reservations = Reservation.objects.all()
    j = JsonResponse({"reservations": [ReservationSerializer(reservation).data for reservation in reservations]})
    return update_cors(j, request)

@csrf_exempt
def getAllCheckedOutReservations(request: HttpRequest):
    #TODO Unit tests
    reservations = Reservation.objects.all()
    j = JsonResponse({"reservations": [ReservationSerializer(reservation).data for reservation in reservations if reservation.isCheckedOut]})
    return update_cors(j, request)

@csrf_exempt
def getAllCheckedInReservations(request: HttpRequest):
    # TODO unit tests
    reservations = Reservation.objects.all()
    j = JsonResponse({"reservations": [ReservationSerializer(reservation).data for reservation in reservations if not reservation.isCheckedOut]})
    return update_cors(j, request)

@csrf_exempt
def checkIn(request: HttpRequest, id: int):
    if not request.method == "POST":
        return error400(request)
    reservation = get_object_or_404(Reservation, pk=id)
    reservation.isCheckedOut = False
    reservation.save()
    j = JsonResponse({"reservation": ReservationSerializer(reservation).data})
    return update_cors(j, request)

@csrf_exempt
def checkOut(request: HttpRequest, id: int):
    if not request.method == "POST":
        return error400(request)
    reservation = get_object_or_404(Reservation, pk=id)
    reservation.isCheckedOut = True
    reservation.save()
    j = JsonResponse({"reservation": ReservationSerializer(reservation).data})
    return update_cors(j, request)


def __createReservationDatabase(parsedBody: dict, request: HttpRequest) -> Reservation:
    vehicle = __getVehicle(int(parsedBody['vehicleID']))
    user = __getUser(int(parsedBody['userID']))
    newReservation = Reservation()
    newReservation.vehicle = vehicle
    newReservation.autoUser = user
    newReservation.startDate, newReservation.endDate = parseDates(request)
    newReservation.isInsured = parsedBody['isInsured']
    newReservation.save()
    return newReservation


def __getUser(userID: int):
    return get_object_or_404(AutoUser, pk=userID)


def __getVehicle(vehicleID: int):
    return get_object_or_404(Vehicle, pk=vehicleID)


def __validateCreateReservationBody(request: HttpRequest, parsedBody: dict) -> bool:
    if request.method != "POST":
        return False
    NEEDED_PARAMS = {'startDate', 'endDate', 'vehicleID', "userID", "isInsured"}
    for key in NEEDED_PARAMS:
        if key not in parsedBody:
            return False
    return True

def __validateReservationAvailable(request: HttpRequest, parsedBody: dict) -> bool:
    for reservation in Reservation.objects.all():
        if reservation.vehicle.pk == int(parsedBody['vehicleID']):
            startDate, endDate = parseDates(request)
            return vehicleIsAvailable(startDate=startDate, endDate=endDate, reservation=reservation)
    return True



