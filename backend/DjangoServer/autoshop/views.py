from .serializers import UserSerializer, VehicleSerializer
from .userEndpoints import *
from .vehicleEndpoints import *
from .reservationEndpoints import *

@csrf_exempt
def userRouter(request: HttpRequest, id = 0):
    if request.method == "PUT":
        return updateUser(request, id)
    elif request.method == "GET":
        return getUser(request, id)
    elif request.method == "DELETE":
        return deleteUser(request, id)
    elif request.method == "POST":
        return createUser(request)


@csrf_exempt
def vehicleRouter(request: HttpRequest, id = 0):
    if request.method == "PUT":
        return updateVehicle(request, id)
    elif request.method == "GET":
        return getVehicle(request, id)
    elif request.method == "DELETE":
        return deleteVehicle(request, id)
    elif request.method == "POST":
        return createVehicle(request)



