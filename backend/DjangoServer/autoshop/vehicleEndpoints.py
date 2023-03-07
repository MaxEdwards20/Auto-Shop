from django.http import HttpRequest
from .models import Vehicle
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import VehicleSerializer
from .helperFunctions import __getReqBody, __update_cors


def checkValidCreateVehicle(request, response):
    if request.method == 'POST':
        if 'name' not in request.POST:
            response['error'] = 'Please enter the name of the vehicle.'
        if 'vehicleType' not in request.POST:
            response['error'] = 'Please enter the vehicle type.'
        if 'image' not in request.POST:
            response['error'] = 'Please provide an image reference.'
        if 'vin' not in request.POST:
            response['error'] = 'Please provide a vin '
    if request.method == 'GET':
        response['error'] = 'You must use a post request when creating a vehicle.'
    # check to see if the vehicle already exists.
    if 'vin' in request.POST and 'error' not in response:
        vin = request.POST['vin']
        vehicle = Vehicle.objects.filter(vin=vin)
        if vehicle:
            response['error'] = 'This vehicle already exists.'
    return response


def checkValidVehicleRequest(request, response):
    if 'vin' not in request.GET:
        response['error'] = "You must enter a valid vin"
    else:
        vin = request.GET['vin']
        try:
            Vehicle.objects.get(vin=vin)
        except Vehicle.DoesNotExist:
            response['error'] = 'you must enter a valid vin'
    return response


@csrf_exempt
def createVehicle(request):
    response = {}
    response = checkValidCreateVehicle(request, response)
    if 'error' not in response:
        vehicle = createVehicleDatabase(request)
        vehicleInfo = getVehicleInfoDatabase(vehicle.id)
        response = vehicleInfo
        j = JsonResponse(response)
    else:
        j = JsonResponse(response)
        j.status_code = 400
    return __update_cors(j, request)


def createVehicleDatabase(request: HttpRequest):
    newVehicle = Vehicle()
    parsedBody = __getReqBody(request)
    newVehicle.name = parsedBody['name']
    newVehicle.vehicleType = parsedBody['vehicleType']
    newVehicle.image = parsedBody['image']
    newVehicle.vin = parsedBody['vin']
    newVehicle.isInsured = False
    newVehicle.isPending = False
    newVehicle.isLoadJacked = False
    newVehicle.location = "lot"
    newVehicle.isPurchased = False
    newVehicle.save()
    return newVehicle


def deleteVehicleInfo(request, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    vehicleData = getVehicleInfoDatabase(id)
    response = {vehicleData}
    vehicle.delete()
    j = JsonResponse(response)
    if not response:
        j.status_code = 400
    return __update_cors(j, request)


def getAllVehicles(request: HttpRequest):
    allVehicles = Vehicle.objects.all()
    myDict = {}
    for vehicle in allVehicles:
        serializer = VehicleSerializer(vehicle)
        data = serializer.data
        myDict[vehicle.id] = data
    j = JsonResponse(myDict, safe=False)
    return __update_cors(j, request)


def getVehicleInfo(request: HttpRequest, id):
    response = getVehicleInfoDatabase(id)
    j = JsonResponse(response)
    return __update_cors(j, request)


def getVehicleInfoDatabase(id):
    vehicleModel = get_object_or_404(Vehicle, pk=id)
    serializer = VehicleSerializer(vehicleModel)
    return serializer.data


def updateVehicleInfo(request: HttpRequest, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    response = {}
    myData = request.PUT

    if 'name' in myData:
        vehicle.name = myData['name']
        response['name'] = myData['name']
    if 'vin' in myData:
        vehicle.vin = myData['vin']
        response['vin'] = myData['vin']
    if 'isPurchased' in myData:
        vehicle.isPurchased = myData['isPurchased']
        response['isPurchased'] = myData['isPurchased']
    if 'isPending' in myData:
        vehicle.isPending = myData['isPending']
        response['isPending'] = myData['isPending']
    if 'reservedDays' in myData:
        vehicle.reservedDays = myData['reservedDays']
        response['reservedDays'] = myData['reservedDays']
    if 'location' in myData:
        vehicle.location = myData['location']
        response['location'] = myData['location']
    if 'vehicleType' in myData:
        vehicle.email = myData['vehicleType']
        response['vehicleType'] = myData['vehicleType']
    if 'isInsured' in myData:
        vehicle.isInsured = myData['isInsured']
        response['isInsured'] = myData['isInsured']
    if 'isLoadJacked' in myData:
        vehicle.isLoadJacked = myData['isLoadJacked']
        response['isLoadJacked'] = myData['isLoadJacked']
    if 'dateCheckedOut' in myData:
        vehicle.dateCheckedOut = myData['dateCheckedOut']
        response['dateCheckedOut'] = myData['dateCheckedOut']
    if 'dateCheckedIn' in myData:
        vehicle.dateCheckedIn = myData['dateCheckedIn']
        response['dateCheckedIn'] = myData['dateCheckedIn']
    if 'image' in myData:
        vehicle.image = myData['image']
        response['image'] = myData['image']

    vehicle.save()
    j = JsonResponse(response)
    if not response:
        j.status_code = 400
    else:
        response = getVehicleInfoDatabase(id)
        j = JsonResponse(response)
    return __update_cors(j, request)


def vehicleAvailability(request: HttpRequest, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    response = {'name': vehicle.name,
                'reservedDays': vehicle.reservedDays,
                'dateCheckedOut': vehicle.dateCheckedOut,
                'dateCheckedIn': vehicle.dateCheckedIn,
                }
    j = JsonResponse(response)
    return __update_cors(j, request)


