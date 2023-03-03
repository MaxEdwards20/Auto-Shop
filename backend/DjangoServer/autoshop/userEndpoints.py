from django.http import HttpRequest, HttpResponse
from .models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User as Person
from .serializers import UserSerializer
from rest_framework.renderers import JSONRenderer
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
    user = get_object_or_404(User.objects.filter(email=email))
    userInfo = __getUserInfoDatabase(user.id)
    response = userInfo
    j = JsonResponse(response)
    return __update_cors(j, request)

@csrf_exempt
def createUser(request: HttpRequest):
    print(request)
    parsedBody = __getReqBody(request)
    response = __validateCreateUserBody(request, parsedBody)
    # https://www.django-rest-framework.org/tutorial/1-serialization/
    if 'error' in response:
        j = JsonResponse(response)
        j.status_code = 400
    else:
        user = __createUserDatabase(parsedBody)
        j = JsonResponse(UserSerializer(user).data)
        # TODO: Return the serialized user here
    return __update_cors(j, request)


@csrf_exempt
def deleteUser(request, id):
    user = get_object_or_404(User, pk=id)
    userData = __getUserInfoDatabase(id)
    response = {userData}
    user.delete()
    j = JsonResponse(response)
    if not response:
        j.status_code = 400
    return __update_cors(j, request)

@csrf_exempt
def getUser(request: HttpRequest, id):
    response = __getUserInfoDatabase(id)
    j = JsonResponse(response, safe=False)
    return __update_cors(j, request)

@csrf_exempt
def getUsers(request: HttpRequest):
    # TODO: Add some validation that id of user requesting this is an admin or manager
    allUsers = User.objects.all()
    myDict = {}
    for user in allUsers:
        serializer = UserSerializer(user)
        data = serializer.data
        myDict[user.id] = data
    j = JsonResponse(myDict, safe=False)
    return __update_cors(j, request)

@csrf_exempt
def updateUser(request: HttpRequest, id):
    user = get_object_or_404(User, pk=id)
    parsedBody = __getReqBody(request)
    response = {}
    # Actually update the user
    for key in ['name', 'permission', 'balance', 'needHelp', 'ethicsViolation', 'location', 'email']:
        if key in parsedBody:
            setattr(user, key, parsedBody[key])
            response[key]= parsedBody[key]
    user.save()
    j = JsonResponse(UserSerializer(user).data) # return the newly saved user
    return __update_cors(j, request)


def __createUserDatabase(parsedBody) -> User:
    newUser = User()
    newUserAuth = Person.objects.create_user(first_name=parsedBody['name'],
                                             username=parsedBody['email'],
                                             password=parsedBody['password'],
                                             )
    newUserAuth.save()
    # newUserAuth should have the id correct?
    newUser.email = parsedBody['email']
    newUser.permission = 'user'
    newUser.name = parsedBody['name']
    newUser.location = 'unknown'
    newUser.balance = 0
    newUser.needHelp = False
    newUser.ethicsViolation = 'None'
    newUser.save()
    return newUser

def __getUserInfoDatabase(id):
    userModel = get_object_or_404(User, pk=id)
    serializer = UserSerializer(userModel)
    return serializer.data
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
        # These all overwrite eachother
        for item in NEEDED_PARAMS:
            if item not in parsedBody:
                response['error'] = "Need an email, password, name and phoneNumber"
    if request.method == 'GET':
        response['error'] = 'You must use a post request when creating a user.'
    # check to see if the email already exists.
    if 'email' in parsedBody and 'error' not in response:
        email = parsedBody['email']
        user = User.objects.filter(email=email)
        if user:
            response['error'] = 'This user already exists.'
    return response

def __update_cors(j, request):
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

def __getReqBody(request: HttpRequest) -> dict:
    if request.POST:
        parsedBody = request.POST
    else:
        parsedBody = json.loads(request.body)
    return parsedBody