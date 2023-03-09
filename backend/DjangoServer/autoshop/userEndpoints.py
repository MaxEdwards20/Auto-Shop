from django.http import HttpRequest, HttpResponse
from .models import AutoUser, Reservation
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .serializers import AutoUserSerializer, ReservationSerializer
from .helperFunctions import update_cors, getReqBody, error400, error401
from .managerEndpoints import ADMIN_USERNAME, ADMIN_PASS
import json

@csrf_exempt
def authenticateUser(request: HttpRequest):
    parsedBody = getReqBody(request)
    # Check if the request has the correct formatting
    response = __validateAuthenticationBody(request, parsedBody)
    if 'error' in response:
        return error401(request)
    email = parsedBody['email']
    password = parsedBody['password']
    # Check if actually valid user
    user = authenticate(request, username=email, password=password)
    if not user:
        return error401(request)
    j = __makeJSONResponse(user.pk)
    return update_cors(j, request)

@csrf_exempt
def createUser(request: HttpRequest):
    # https://www.django-rest-framework.org/tutorial/1-serialization/
    parsedBody = getReqBody(request)
    if not __validateCreateUserBody(request, parsedBody):
        return error400(request)
    user = __createUserDatabase(parsedBody)
    j = __makeJSONResponse(user.pk)
    return update_cors(j, request)

@csrf_exempt
def deleteUser(request, id):
    user = get_object_or_404(AutoUser, pk=id)
    response = JsonResponse({"user": AutoUserSerializer(user).data})
    user.delete()
    return update_cors(response, request)

@csrf_exempt
def getUser(request: HttpRequest, id):
    j = __makeJSONResponse(id)
    return update_cors(j, request)

@csrf_exempt
def getAllUsers(request: HttpRequest, id: int):
    if request.method != "GET":
        return error400(request)
    try:
        admin = AutoUser.objects.get(permission="admin", email=ADMIN_PASS)
    except Exception as e:
        return error400(request, "Admin doesn't exist")
    if id != admin.pk:
        return error401(request)
    allUsersList = [__getUserInfo(user.pk) for user in AutoUser.objects.all()]
    j = JsonResponse({"users": allUsersList})
    return update_cors(j, request)

@csrf_exempt
def updateUserPermission(request: HttpRequest, id: int):
    # TODO: Write unit test for this
    parsedBody = getReqBody(request)
    if request.method != "POST" or 'permission' not in parsedBody:
        return error400(request)
    user: AutoUser = get_object_or_404(AutoUser, pk=id)
    validPermissionValues = {"user", "admin", "employee"}
    if parsedBody['permission'] not in validPermissionValues:
        return error400(request, "Not a valid permission")
    user.permission = parsedBody['permission']
    user.save()
    return __makeJSONResponse(user.pk)



@csrf_exempt
def updateUser(request: HttpRequest, id):
    user = get_object_or_404(AutoUser, pk=id)
    parsedBody = getReqBody(request)
    # Actually update the user
    for key in ['name', 'permission', 'balance', 'needHelp', 'ethicsViolation', 'location', 'email']:
        if key in parsedBody:
            setattr(user, key, parsedBody[key])
    user.save()
    j = __makeJSONResponse(user.pk) # return the newly saved user
    return update_cors(j, request)
@csrf_exempt
def userAddMoney(request: HttpRequest, id):
    user = get_object_or_404(AutoUser, pk=id)
    parsedBody = getReqBody(request)
    newBalance = user.balance + abs(int(parsedBody.get('amount')))
    user.balance = newBalance
    user.save()
    j = __makeJSONResponse(user.pk)  # return the newly saved user
    return update_cors(j, request)

@csrf_exempt
def userRemoveMoney(request: HttpRequest, id):
    user = get_object_or_404(AutoUser, pk=id)
    parsedBody = getReqBody(request)
    newBalance = user.balance - abs(int(parsedBody.get('amount')))
    user.balance = newBalance
    user.save()
    j = __makeJSONResponse(user.pk)  # return the newly saved user
    return update_cors(j, request)


def __createUserDatabase(parsedBody) -> AutoUser:
    newUserAuth = User.objects.create_user(
                                             username=parsedBody['email'],
                                             password=parsedBody['password'],
                                             )


    newUser = AutoUser.objects.create(email=parsedBody['email'], name=parsedBody['name'], phoneNumber = parsedBody['phoneNumber'], user=newUserAuth, permission=(parsedBody.get('permission') or "user"))
    return newUser

def __makeJSONResponse(userID: int) -> JsonResponse:
    return JsonResponse(__getUserInfo(userID))

def __getUserInfo(userID: int) -> dict:
    return {"user": __getSerializedUserInfo(userID),
                         "reservations": __getSerializedReservations(userID)}
def __getSerializedReservations(userID: int):
    return [ReservationSerializer(reservation).data for reservation in Reservation.objects.all() if reservation.autoUser.pk ==userID]

def __getSerializedUserInfo(id):
    userModel = get_object_or_404(AutoUser, pk=id)
    return AutoUserSerializer(userModel).data
def __validateAuthenticationBody(request, parsedBody: dict) -> dict:
    response = {}
    if request.method == 'POST':
        if 'password' not in parsedBody:
            response['error'] = 'You must enter a valid password.'
        if 'email' not in parsedBody:
            response['error'] = 'Please enter your email.'
    if request.method == 'GET':
        response['error'] = 'You must use a post request when authenticating a user.'
    return response
def __validateCreateUserBody(request: HttpRequest, parsedBody: dict) -> bool:
    NEEDED_PARAMS = {'password', 'name', 'email', 'phoneNumber'}
    if request.method != "POST":
        return False
    for item in NEEDED_PARAMS:
        if item not in parsedBody:
            return False
    # check to see if the email already exists.
    email = parsedBody['email']
    #TODO: Add a unit test to ensure an existing user will get an error
    try:
        AutoUser.objects.get(email=email)
    except Exception as e:
        # item doesn't exist, so we are good
        return True
    return False

