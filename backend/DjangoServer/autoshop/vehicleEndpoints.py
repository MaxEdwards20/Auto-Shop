from django.http import HttpRequest, HttpResponse, JsonResponse
from .models import Vehicle, Reservation, AutoUser
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .serializers import VehicleSerializer
from .helperFunctions import getReqBody, update_cors, parseDates, vehicleIsAvailable, error400, error401

@csrf_exempt
def createVehicle(request: HttpRequest):
    parsedBody = getReqBody(request)
    if not __validateCreateVehicleBody(request, parsedBody):
        return error400(request)
    vehicle = __createVehicleDatabase(parsedBody)
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data}, safe=False)
    return update_cors(j, request)

@csrf_exempt
def deleteVehicle(request, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data}, safe=False)
    vehicle.delete()
    return update_cors(j, request)

@csrf_exempt
def getVehicle(request: HttpRequest, id):
    response = VehicleSerializer(get_object_or_404(Vehicle, pk=id)).data
    j = JsonResponse({"vehicle": response}, safe=False)
    return update_cors(j, request)

@csrf_exempt
def getAllVehicles(request: HttpRequest):
    vehicles = [VehicleSerializer(vehicle).data for vehicle in Vehicle.objects.all()]
    j = JsonResponse({"vehicles": vehicles}, safe=False)
    return update_cors(j, request)

@csrf_exempt
def getAllPurchasedVehicles(request: HttpRequest):
    vehicles = [VehicleSerializer(vehicle).data for vehicle in Vehicle.objects.all() if vehicle.isPurchased]
    j = JsonResponse({"vehicles": vehicles}, safe=False)
    return update_cors(j, request)

@csrf_exempt
def getAllAvailableVehicles(request: HttpRequest):
    startDate, endDate = parseDates(request)
    availableVehicles = []
    alreadyReserved = set()
    # Note all unavailable vehicles
    for reservation in Reservation.objects.all():
        if not vehicleIsAvailable(startDate, endDate, reservation):
            alreadyReserved.add(reservation.vehicle.pk)

    # Get all vehicles that are not unavailable
    for vehicle in Vehicle.objects.all():
        if vehicle.pk not in alreadyReserved and vehicle.isPurchased:
            availableVehicles.append(VehicleSerializer(vehicle).data)

    vehicles = sorted(availableVehicles, key=lambda vehicle: int(vehicle['pricePerDay']))
    j = JsonResponse({"vehicles": vehicles}, safe=False)
    return update_cors(j, request)


@csrf_exempt
def lowJackVehicle(request: HttpRequest, id: int):
    # Todo create unit tests
    if request.method != 'POST':
        return error400(request)
    NEEDED_PARAMS = {'isLoadJacked'}
    parsedBody = getReqBody(request)
    for key in NEEDED_PARAMS:
        if key not in parsedBody:
            return error400(request)
    vehicle = get_object_or_404(Vehicle, pk=id)
    vehicle.isLoadJacked = parsedBody['isLoadJacked']
    vehicle.save()
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data}, safe=False)
    return update_cors(j, request)


@csrf_exempt
def updateVehicle(request: HttpRequest, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    parsedBody = getReqBody(request)
    for key in ['name', 'vin', 'isPurchased', 'isPending','location', 'vehicleType','isInsured', 'isLoadJacked', 'image' ]:
        if key in parsedBody:
            setattr(vehicle, key, parsedBody[key])
    vehicle.save()
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data}, safe=False)
    return update_cors(j, request)

@csrf_exempt
def vehicleAvailability(request: HttpRequest, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data}, safe=False)
    return update_cors(j, request)


@csrf_exempt
def purchaseVehicle(request: HttpRequest, id: int):
    parsedBody = getReqBody(request)
    vehicle = get_object_or_404(Vehicle, pk=id)
    # verify we have userID
    if 'userID' not in parsedBody:
        return error400(request)
    user: AutoUser = get_object_or_404(AutoUser, pk=int(parsedBody['userID']))
    # verify the user has proper permissions
    if user.permission != "admin":
        return error400(request)
    vehicle.isPurchased = True
    vehicle.save()
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data}, safe=False)
    return update_cors(j, request)

@csrf_exempt
def sellVehicle(request: HttpRequest, id: int):
    if not request.method == "POST":
        return error400(request)
    vehicle = get_object_or_404(Vehicle, pk=id)
    vehicle.isPurchased = False
    vehicle.save()
    for reservation in Reservation.objects.all():
        if reservation.vehicle.pk == id:
            reservation.delete()
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data}, safe=False)
    return update_cors(j, request)
def __validateCreateVehicleBody(request: HttpRequest, parsedBody: dict) -> bool:
    NEEDED_PARAMS = {'name', 'image'}
    if request.method != "POST": return False
    for item in NEEDED_PARAMS:
        if item not in parsedBody:
            return False
    return True

def __createVehicleDatabase(parsedBody: dict):
    newVehicle = Vehicle()
    newVehicle.name = parsedBody['name']
    newVehicle.vehicleType = parsedBody['vehicleType']
    newVehicle.imageURL = parsedBody['image']
    newVehicle.save()
    return newVehicle

