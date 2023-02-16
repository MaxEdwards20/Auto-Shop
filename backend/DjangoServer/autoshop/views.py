from django.shortcuts import render
from django.http import HttpResponse
from .models import User, Vehicle
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


def index(request):
    return HttpResponse("Hello, world. This is the Django Prototype!.")
# Create your views here.

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
                'password': userModel.password,
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

