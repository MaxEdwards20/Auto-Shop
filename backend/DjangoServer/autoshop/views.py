from django.shortcuts import render
from django.http import HttpResponse
from .models import User, Vehicle
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt


def getUserInfoApi(request):
    response = {}
    response = checkValidUserRequest(request, response)
    if 'error' not in response:
        username = request.GET['username']
        response = getUserInfoDatabase(username)
    j = JsonResponse(response)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def getVehicleInfoApi(request):
    response = {}
    response = checkValidVehicleRequest(request, response)
    if 'error' not in response:
        vim = request.GET['vim']
        response = getVehicleInfoDatabase(vim)
    j = JsonResponse(response)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


def checkValidUserRequest(request, response):
    if 'username' not in request.GET:
        response['error'] = "You must enter in a valid username"
    else:
        username = request.GET['username']
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            response['error'] = 'you must enter a valid username'
    return response


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


def getVehicleInfoDatabase(vim):
    vehicleModel = get_object_or_404(Vehicle.objects.filter(vim=vim))
    response = {'name': vehicleModel.name,
                'vim': vim,
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


def getUserInfoDatabase(username):
    userModel = get_object_or_404(User.objects.filter(username=username))
    response = {'username': userModel.username,
                'name': userModel.name,
                'birthDate': userModel.birthDate,
                'balance': userModel.balance,
                'accessLevel': userModel.accessLevel,
                'email': userModel.email,
                'phone': userModel.phone,
                'needHelp': userModel.needHelp,
                'ethicsViolation': userModel.ethicsViolation,
                'location': userModel.location,
                }
    return response


def authenticateUser(username, password):
    user = authenticate(username, password)
    if user is not None:
        return True
    else:
        return False

@csrf_exempt
def createUser(request):
    response = {}
    response = checkValidCreateUser(request, response)
    if 'error' not in response:
        createUserDatabase(request)
        response['userCreated'] = True
    j = JsonResponse(response)
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
    #check to see if the email already exists.
    if 'email' in request.POST:
        email = request.POST['email']
        user = User.objects.filter(email=email)
        if user:
            response['error'] = 'This user already exists.'
    return response

def createUserDatabase(request):
    newUser = User()
    newUser.user.email = request.POST['email']
    newUser.user.username = request.POST['email']
    newUser.user.password = request.POST['password']
    newUser.email = request.POST['email']
    newUser.permission = 'user'
    newUser.name = request.POST['name']
    newUser.location = 'unknown'
    newUser.balance = 0
    newUser.needHelp = False
    newUser.ethicsViolation = 'None'
    newUser.save()



