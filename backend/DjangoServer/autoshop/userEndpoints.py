from django.http import HttpRequest, HttpResponse
from .models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User as Person
from .serializers import UserSerializer
import json

@csrf_exempt
def authenticateUser(request: HttpRequest):
    response = {}
    parsedBody = json.loads(request.body)
    response = checkValidAuthenticate(request, response, parsedBody)
    if 'error' not in response:
        email = parsedBody['email']
        password = parsedBody['password']
        user = authenticate(request, username=email, password=password)
        if user is not None:
            user = get_object_or_404(User.objects.filter(email=email))
            userInfo = getUserInfoDatabase(user.id)
            response = userInfo
            j = JsonResponse(response)

        else:
            j = JsonResponse(response)
            j.status_code = 401
    else:
        j = JsonResponse(response)
        j.status_code = 401
    return process_cors(j, request)

def checkValidAuthenticate(request, response, parsedBody):
    if request.method == 'POST':
        if 'password' not in parsedBody:
            response['error'] = 'You must enter a valid password.'
        if 'email' not in parsedBody:
            response['error'] = 'Please enter your email.'
    if request.method == 'GET':
        response['error'] = 'You must use a post request when authenticating a user.'
    return response

def validateCreateUserBody(request: HttpRequest, response: HttpResponse, parsedBody: dict) -> HttpResponse:
    NEEDED_PARAMS = {'password', 'name', 'email', 'phoneNumber'}
    if request.method == 'POST':
        # These all overwrite eachother
        for item in NEEDED_PARAMS:
            if item not in parsedBody:
                response['error'] = "Need a email, password, name and phone"
    if request.method == 'GET':
        response['error'] = 'You must use a post request when creating a user.'
    # check to see if the email already exists.
    if 'email' in parsedBody and 'error' not in response:
        email = parsedBody['email']
        user = User.objects.filter(email=email)
        if user:
            response['error'] = 'This user already exists.'
    print(f"Valid user response: {response}")
    return response

@csrf_exempt
def createUser(request: HttpRequest):
    print(f"Request BODY: {request.body}")
    if request.body:
        parsedBody = json.loads(request.body)
    else:
        parsedBody = request.POST
    response = validateCreateUserBody(request, {}, parsedBody)
    if 'error' in response:
        j = JsonResponse(response)
        j.status_code = 400
    else:
        user = createUserDatabase( parsedBody)
        j = JsonResponse(response)
        # TODO: Return the serialized user here
    return process_cors(j, request)

def createUserDatabase( parsedBody) -> User:
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

def deleteUserInfo(request, id):
    user = get_object_or_404(User, pk=id)
    userData = getUserInfoDatabase(id)
    response = {userData}
    user.delete()
    j = JsonResponse(response)
    if not response:
        j.status_code = 400
    return process_cors(j, request)

def getAllUsers(request: HttpRequest):
    allUsers = User.objects.all()
    myDict = {}
    for user in allUsers:
        serializer = UserSerializer(user)
        data = serializer.data
        myDict[user.id] = data
    j = JsonResponse(myDict, safe=False)
    return process_cors(j, request)

def getUserInfo(request: HttpRequest, id):
    response = getUserInfoDatabase(id)
    j = JsonResponse(response, safe=False)
    return process_cors(j, request)

def getUserInfoDatabase(id):
    userModel = get_object_or_404(User, pk=id)
    serializer = UserSerializer(userModel)
    return serializer.data

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
    if not response:
        j.status_code = 400
    else:
        response = getUserInfoDatabase(id)
        j = JsonResponse(response)
    return process_cors(j, request)


def process_cors(j, request):
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j