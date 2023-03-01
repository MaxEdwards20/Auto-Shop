from .serializers import UserSerializer, VehicleSerializer
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


