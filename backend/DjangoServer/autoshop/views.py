from django.views.decorators.csrf import csrf_exempt
from .userEndpoints import authenticateUser, createUser, deleteUser, getUser, getUsers, updateUser, userAddMoney, userRemoveMoney
from .vehicleEndpoints import createVehicle, deleteVehicle, getVehicle, getAllAvailableVehicles, getAllVehicles, updateVehicle, vehicleAvailability, purchaseVehicle
from .reservationEndpoints import createReservation, deleteReservation, getReservation
from .managerEndpoints import initializeDatabase, getManager
from django.http import HttpRequest
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



@csrf_exempt
def reservationRouter(request: HttpRequest, id=0):
    if request.method == "GET":
        return getReservation(request, id)
    elif request.method == "DELETE":
        return deleteReservation(request, id)
    elif request.method == "POST":
        return createReservation(request)