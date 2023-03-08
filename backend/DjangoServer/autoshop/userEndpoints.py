from django.http import HttpRequest, HttpResponse
from .models import AutoUser, Reservation
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .serializers import AutoUserSerializer, ReservationSerializer
from .helperFunctions import __update_cors, __getReqBody
import json

@csrf_exempt
def authenticateUser(request: HttpRequest):
    parsedBody = __getReqBody(request)
    # Check if the request has the correct formatting
    response = __validateAuthenticationBody(request, parsedBody)
    if 'error' in response:
        return __update_cors(JsonResponse(response, status=401), request)
    email = parsedBody['email']
    password = parsedBody['password']
    # Check if actually valid user
    user = authenticate(request, username=email, password=password)
    if not user:
        return __update_cors(JsonResponse(response, status=401), request)
    j = __makeJSONResponse(user.pk)
    return __update_cors(j, request)

@csrf_exempt
def createUser(request: HttpRequest):
    # https://www.django-rest-framework.org/tutorial/1-serialization/
    parsedBody = __getReqBody(request)
    response = __validateCreateUserBody(request, parsedBody)
    if 'error' in response:
        return __update_cors(JsonResponse(response, status=400), request)
    user = __createUserDatabase(parsedBody)
    j = __makeJSONResponse(user.pk)
    return __update_cors(j, request)

@csrf_exempt
def deleteUser(request, id):
    user = get_object_or_404(AutoUser, pk=id)
    response = JsonResponse({"user": AutoUserSerializer(user).data})
    user.delete()
    return __update_cors(response, request)

@csrf_exempt
def getUser(request: HttpRequest, id):
    j = __makeJSONResponse(id)
    return __update_cors(j, request)

@csrf_exempt
def getUsers(request: HttpRequest):
    # TODO: Add some validation that id of user requesting this is an admin or manager
    allUsersList = [__getUserInfo(user.pk) for user in AutoUser.objects.all()]
    j = JsonResponse({"users": allUsersList})
    return __update_cors(j, request)


@csrf_exempt
def updateUser(request: HttpRequest, id):
    user = get_object_or_404(AutoUser, pk=id)
    parsedBody = __getReqBody(request)
    # Actually update the user
    for key in ['name', 'permission', 'balance', 'needHelp', 'ethicsViolation', 'location', 'email']:
        if key in parsedBody:
            setattr(user, key, parsedBody[key])
    user.save()
    j = __makeJSONResponse(user.pk) # return the newly saved user
    return __update_cors(j, request)
@csrf_exempt
def userAddMoney(request: HttpRequest, id):
    user = get_object_or_404(AutoUser, pk=id)
    parsedBody = __getReqBody(request)
    newBalance = user.balance + abs(int(parsedBody.get('amount')))
    user.balance = newBalance
    user.save()
    j = __makeJSONResponse(user.pk)  # return the newly saved user
    return __update_cors(j, request)

@csrf_exempt
def userRemoveMoney(request: HttpRequest, id):
    user = get_object_or_404(AutoUser, pk=id)
    parsedBody = __getReqBody(request)
    newBalance = user.balance - abs(int(parsedBody.get('amount')))
    user.balance = newBalance
    user.save()
    j = __makeJSONResponse(user.pk)  # return the newly saved user
    return __update_cors(j, request)

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
def __validateCreateUserBody(request: HttpRequest, parsedBody: dict) -> dict:
    response = {}
    NEEDED_PARAMS = {'password', 'name', 'email', 'phoneNumber'}
    if request.method == 'POST':
        for item in NEEDED_PARAMS:
            if item not in parsedBody:
                response['error'] = "Need an email, password, name and phoneNumber"
    if request.method == 'GET':
        response['error'] = 'You must use a post request when creating a user.'
    # check to see if the email already exists.
    if 'email' in parsedBody and 'error' not in response:
        email = parsedBody['email']
        user = AutoUser.objects.filter(email=email)
        if user:
            response['error'] = 'This user already exists.'
    return response

