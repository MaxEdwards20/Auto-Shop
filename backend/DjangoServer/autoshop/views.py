from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User as Person
from .userEndpoints import *
from .vehicleEndpoints import *


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

