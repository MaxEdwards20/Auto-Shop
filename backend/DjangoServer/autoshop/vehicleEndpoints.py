from django.http import HttpRequest, HttpResponse, JsonResponse
from .models import Vehicle, Reservation
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .serializers import VehicleSerializer
from .helperFunctions import __getReqBody, __update_cors, parseDates, vehicleIsAvailable
import datetime

@csrf_exempt
def createVehicle(request: HttpRequest):
    parsedBody = __getReqBody(request)
    response = __validateCreateVehicleBody(request, parsedBody)
    if 'error' in response:
        return __update_cors(JsonResponse(response, status=400), request)
    vehicle = __createVehicleDatabase(parsedBody)
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data})
    return __update_cors(j, request)

@csrf_exempt
def deleteVehicle(request, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data})
    vehicle.delete()
    return __update_cors(j, request)

@csrf_exempt
def getVehicle(request: HttpRequest, id):
    response = __getSerializedVehicleInfo(id)
    j = JsonResponse({"vehicle": response}, safe=False)
    return __update_cors(j, request)

@csrf_exempt
def getAllVehicles(request: HttpRequest):
    vehicles = [VehicleSerializer(vehicle).data for vehicle in Vehicle.objects.all()]
    j = JsonResponse({"vehicles": vehicles}, safe=False)
    return __update_cors(j, request)

@csrf_exempt
def getAllAvailableVehicles(request: HttpRequest):
    startDate, endDate = parseDates(request)
    availableVehicles = []
    unavailableVehicles = set()
    # Note all unavailable vehicles
    for reservation in Reservation.objects.all():
        if not vehicleIsAvailable(startDate, endDate, reservation):
            unavailableVehicles.add(reservation.vehicle.pk)
    # Get all vehicles that are not unavailable
    for vehicle in Vehicle.objects.all():
        if vehicle.pk not in unavailableVehicles:
            availableVehicles.append(VehicleSerializer(vehicle).data)
    j = JsonResponse({"vehicles": availableVehicles})
    return __update_cors(j, request)


@csrf_exempt
def updateVehicle(request: HttpRequest, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    parsedBody = __getReqBody(request)
    for key in ['name', 'vin', 'isPurchased', 'isPending','location', 'vehicleType','isInsured', 'isLoadJacked', 'image' ]:
        if key in parsedBody:
            setattr(vehicle, key, parsedBody[key])
    vehicle.save()
    j = JsonResponse({"vehicle": VehicleSerializer(vehicle).data})
    return __update_cors(j, request)

@csrf_exempt
def vehicleAvailability(request: HttpRequest, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    response = {'name': vehicle.name,
                'reservedDays': vehicle.reservedDays,
                'dateCheckedOut': vehicle.dateCheckedOut,
                'dateCheckedIn': vehicle.dateCheckedIn,
                }
    j = JsonResponse(response)
    return __update_cors(j, request)


def __validateCreateVehicleBody(request: HttpRequest, parsedBody: dict):
    NEEDED_PARAMS = {'name', 'vehicleType', 'image', 'vin'}
    res = {}
    if request.method == 'POST':
        for item in NEEDED_PARAMS:
            if item not in parsedBody:
               res['error'] = "Need all " + str(NEEDED_PARAMS)
    else:
        res['error'] = 'You must use a post request when creating a vehicle.'
    # check to see if the vehicle already exists.
    if 'vin' in parsedBody and 'error' not in parsedBody:
        vin = parsedBody['vin']
        vehicle = Vehicle.objects.filter(vin=vin)
        if vehicle:
            res['error'] = 'This vehicle already exists.'
    return res


def __checkValidGetVehicle(request, response):
    if 'vin' not in request.GET:
        response['error'] = "You must enter a valid vin"
    else:
        vin = request.GET['vin']
        try:
            Vehicle.objects.get(vin=vin)
        except Vehicle.DoesNotExist:
            response['error'] = 'you must enter a valid vin'
    return response


def __createVehicleDatabase(parsedBody: dict):
    newVehicle = Vehicle()
    newVehicle.name = parsedBody['name']
    newVehicle.vehicleType = parsedBody['vehicleType']
    newVehicle.imageURL = parsedBody['image']
    newVehicle.vin = parsedBody['vin']
    newVehicle.isInsured = False
    newVehicle.isPending = False
    newVehicle.isLoadJacked = False
    newVehicle.location = "lot"
    newVehicle.isPurchased = False
    newVehicle.save()
    return newVehicle

def __getSerializedVehicleInfo(id):
    vehicleModel = get_object_or_404(Vehicle, pk=id)
    serializer = VehicleSerializer(vehicleModel)
    return serializer.data
