from django.shortcuts import render
from django.http import HttpResponseBadRequest, HttpRequest
from .models import User, Vehicle
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User as Person

@csrf_exempt
def userRouter(request: HttpRequest, id):
    if request.method == "PUT":
        return updateUserInfo(request, id)
    elif request.method == "GET":
        return getUserInfo(request, id)
    elif request.method == "DELETE":
        return deleteUserInfo(request, id)

@csrf_exempt
def vehicleRouter(request: HttpRequest, id):
    if request.method == "PUT":
        return updateVehicleInfo(request, id)
    elif request.method == "GET":
        return getVehicleInfo(request, id)
    elif request.method == "DELETE":
        return deleteVehicleInfo(request, id)


def updateVehicleInfo(request: HttpRequest, id):
    vehicle = get_object_or_404(Vehicle, pk=id)
    response = {}
    myData = request.PUT

    if 'name' in myData:
        vehicle.name = myData['name']
        response['name'] = myData['name']
    if 'vim' in myData:
        vehicle.vim = myData['vim']
        response['vim'] = myData['vim']
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
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def updateUserInfo(request: HttpRequest, id):
    user = get_object_or_404(User, pk=id)
    response = {}
    myData = request.PUT

    if 'name' in myData:
        user.name = myData['name']
        response['name'] = myData['name']
    if 'permission' in myData:
        user.permission = myData['permission']
        response['permission'] = myData['permission']
    if 'balance' in myData:
        user.balance = myData['balance']
        response['balance'] = myData['balance']
    if 'needHelp' in myData:
        user.needHelp = myData['needHelp']
        response['needHelp'] = myData['needHelp']
    if 'ethicsViolation' in myData:
        user.ethicsViolation = myData['ethicsViolation']
        response['ethicsViolation'] = myData['ethicsViolation']
    if 'location' in myData:
        user.location = myData['location']
        response['location'] = myData['location']
    if 'email' in myData:
        user.email = myData['email']
        response['email'] = myData['email']

    user.save()
    j = JsonResponse(response)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def deleteUserInfo(request, id):
    # TODO
    pass

def deleteVehicleInfo(request, id):
    # TODO
    pass


def getUserInfo(request: HttpRequest, id):
    response = getUserInfoDatabase(id)
    j = JsonResponse(response)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def getVehicleInfo(request: HttpRequest, id):
    response = getVehicleInfoDatabase(id)
    j = JsonResponse(response)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def getAllUsers(request: HttpRequest):
    allUsers = User.objects.all()
    myDict = [{'id': instance.id, 'name': instance.name, 'email': instance.email} for instance in allUsers]
    j = JsonResponse(myDict, safe=False)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def getAllVehicles(request: HttpRequest):
    allVehicles = Vehicle.objects.all()
    myDict = [{'id': instance.id, 'name': instance.name, 'vehicleType': instance.vehicleType} for instance in allVehicles]
    j = JsonResponse(myDict, safe=False)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def checkValidVehicleRequest(request, response):
    if 'vim' not in request.GET:
        response['error'] = "You must enter a valid vim"
    else:
        vim = request.GET['vim']
        try:
            Vehicle.objects.get(vim=vim)
        except Vehicle.DoesNotExist:
            response['error'] = 'you must enter a valid vim'
    return response


def getVehicleInfoDatabase(id):
    vehicleModel = get_object_or_404(Vehicle, pk=id)
    response = {'name': vehicleModel.name,
                'vim': vehicleModel.vim,
                'location': vehicleModel.location,
                'isPurchased': vehicleModel.isPurchased,
                'isPending': vehicleModel.isPending,
                'reservedDays': vehicleModel.reservedDays,
                'vehicleType': vehicleModel.vehicleType,
                'isInsured': vehicleModel.isInsured,
                'isLoadJacked': vehicleModel.isLoadJacked,
                'dateCheckedOut': vehicleModel.dateCheckedOut,
                'dateCheckedIn': vehicleModel.dateCheckedIn,
                'image': vehicleModel.image,
                }
    return response


def getUserInfoDatabase(id):
    userModel = get_object_or_404(User, pk=id)
    response = {'name': userModel.name,
                'balance': userModel.balance,
                'permission': userModel.permission,
                'email': userModel.email,
                'needHelp': userModel.needHelp,
                'ethicsViolation': userModel.ethicsViolation,
                'location': userModel.location,
                'id': userModel.id,
                }
    return response


@csrf_exempt
def authenticateUser(request):
    response = {}
    response = checkValidAuthenticate(request, response)
    if 'error' not in response:
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, username=email, password=password)
        if user is not None:
            userInfo = getUserInfoDatabase(email)
            response = userInfo
            j = JsonResponse(response)

        else:
            j = JsonResponse(response)
    else:
        j = JsonResponse(response)
        j.status_code = 401
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def checkValidAuthenticate(request, response):
    if request.method == 'POST':
        if 'password' not in request.POST:
            response['error'] = 'You must enter a valid password.'
        if 'email' not in request.POST:
            response['error'] = 'Please enter your email.'
    if request.method == 'GET':
        response['error'] = 'You must use a post request when authenticating a user.'
    return response


@csrf_exempt
def createUser(request):
    response = {}
    response = checkValidCreateUser(request, response)
    if 'error' not in response:
        createUserDatabase(request)
        response = {'status': 'created new user'}
        j = JsonResponse(response)
    else:
        j = JsonResponse(response)
        j.status_code = 400
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def checkValidCreateUser(request, response):
    if request.method == 'POST':
        if 'password' not in request.POST:
            response['error'] = 'You must enter a valid password.'
        if 'name' not in request.POST:
            response['error'] = 'Please enter your name.'
        if 'phone' not in request.POST:
            response['error'] = 'Please enter your phone number.'
        if 'email' not in request.POST:
            response['error'] = 'Please enter your email.'
    if request.method == 'GET':
        response['error'] = 'You must use a post request when creating a user.'
    # check to see if the email already exists.
    if 'email' in request.POST and 'error' not in response:
        email = request.POST['email']
        user = User.objects.filter(email=email)
        if user:
            response['error'] = 'This user already exists.'
    return response


def createUserDatabase(request):
    newUser = User()
    newUserAuth = Person.objects.create_user(first_name=request.POST['name'],
                                             username=request.POST['email'],
                                             password=request.POST['password'],
                                             )
    newUserAuth.save()
    newUser.email = request.POST['email']
    newUser.permission = 'user'
    newUser.name = request.POST['name']
    newUser.location = 'unknown'
    newUser.balance = 0
    newUser.needHelp = False
    newUser.ethicsViolation = 'None'
    newUser.save()


@csrf_exempt
def createVehicle(request):
    response = {}
    response = checkValidCreateVehicle(request, response)
    if 'error' not in response:
        createVehicleDatabase(request)
        j = JsonResponse(response)
    else:
        j = JsonResponse(response)
        j.status_code = 400
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def checkValidCreateVehicle(request, response):
    if request.method == 'POST':
        if 'name' not in request.POST:
            response['error'] = 'Please enter the name of the vehicle.'
        if 'vehicleType' not in request.POST:
            response['error'] = 'Please enter the vehicle type.'
        if 'image' not in request.POST:
            response['error'] = 'Please provide an image reference.'
        if 'vim' not in request.POST:
            response['error'] = 'Please provide a vim '
    if request.method == 'GET':
        response['error'] = 'You must use a post request when creating a vehicle.'
    # check to see if the vehicle already exists.
    if 'vim' in request.POST and 'error' not in response:
        vim = request.POST['vim']
        vehicle = Vehicle.objects.filter(vim=vim)
        if vehicle:
            response['error'] = 'This vehicle already exists.'
    return response


def createVehicleDatabase(request):
    newVehicle = Vehicle()
    newVehicle.name = request.POST['name']
    newVehicle.vehicleType = request.POST['vehicleType']
    newVehicle.image = request.POST['image']
    newVehicle.vim = request.POST['vim']
    newVehicle.isInsured = False
    newVehicle.isPending = False
    newVehicle.isLoadJacked = False
    newVehicle.location = "lot"
    newVehicle.isPurchased = False
    newVehicle.save()
