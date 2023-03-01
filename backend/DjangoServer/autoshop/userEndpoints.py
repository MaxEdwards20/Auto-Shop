from django.http import HttpRequest
from .models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User as Person
from .serializers import UserSerializer

@csrf_exempt
def authenticateUser(request):
    response = {}
    response = checkValidAuthenticate(request, response)
    if 'error' not in response:
        email = request.POST['email']
        password = request.POST['password']
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
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

def checkValidAuthenticate(request, response):
    if request.method == 'POST':
        if 'password' not in request.POST:
            response['error'] = 'You must enter a valid password.'
        if 'email' not in request.POST:
            response['error'] = 'Please enter your email.'
    if request.method == 'GET':
        response['error'] = 'You must use a post request when authenticating a user.'
    return response

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
    # check to see if the email already exists.
    if 'email' in request.POST and 'error' not in response:
        email = request.POST['email']
        user = User.objects.filter(email=email)
        if user:
            response['error'] = 'This user already exists.'
    return response

@csrf_exempt
def createUser(request):
    response = {}
    response = checkValidCreateUser(request, response)
    if 'error' not in response:
        user = createUserDatabase(request)
        userData = getUserInfoDatabase(user.id)
        response = userData
        j = JsonResponse(response)
    else:
        j = JsonResponse(response)
        j.status_code = 400
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

def createUserDatabase(request):
    newUser = User()
    newUserAuth = Person.objects.create_user(first_name=request.POST['name'],
                                             username=request.POST['email'],
                                             password=request.POST['password'],
                                             )
    newUserAuth.save()
    newUser.email = request.POST['email']
    newUser.permission = 'user'
    newUser.name = request.POST['name']
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
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

def getAllUsers(request: HttpRequest):
    allUsers = User.objects.all()
    myDict = {}
    for user in allUsers:
        serializer = UserSerializer(user)
        data = serializer.data
        myDict[user.id] = data
    j = JsonResponse(myDict, safe=False)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

def getUserInfo(request: HttpRequest, id):
    response = getUserInfoDatabase(id)
    j = JsonResponse(response, safe=False)
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

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
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j


