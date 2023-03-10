from django.http import HttpRequest, HttpResponse
from .models import AutoUser, Reservation
from django.shortcuts import get_object_or_404
from typing import List
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .serializers import AutoUserSerializer, ReservationSerializer
from .helperFunctions import update_cors, getReqBody, error400, error401, makeUserJSONResponse
from uuid import uuid4
import random

ADMIN_USERNAME = "admin123"
ADMIN_PASS = "admin123"

@csrf_exempt
def initializeDatabase(request: HttpRequest):
    if request.method != "POST":
        return error400(request)
    admin = _handleCreateManager()
    users = _handleCreateUsers()
    employees = _handleCreateEmployees()

    return makeUserJSONResponse(admin.pk)
    # First check to make sure we have an admin user or not, create if not there


@csrf_exempt
def getManager(request: HttpRequest):
    if request.method != "GET":
        return error400(request)
    users = User.objects.filter(password=ADMIN_PASS)
    admin = get_object_or_404(User, password=ADMIN_PASS, username=ADMIN_USERNAME )
    return makeUserJSONResponse(admin.pk)

@csrf_exempt
def payEmployee(request: HttpRequest, employeeID: int):
    #TODO: Unit tests
    if  request.method != "POST":
        return error400(request)
    parsedBody = getReqBody(request)
    NEEDED_ITEMS = {"amount", "managerID"}
    for key in NEEDED_ITEMS:
        if key not in parsedBody:
            return error400(request)
    employee: AutoUser = get_object_or_404(AutoUser, pk=employeeID)
    employee.hoursOwed = 0 # reset hours back to zero
    employee.balance += int(parsedBody['amount'])
    employee.save()
    return makeUserJSONResponse(employee.pk)

def _handleCreateManager():
    allUsers: List[AutoUser] = AutoUser.objects.all()
    for user in allUsers:
        if user.email == ADMIN_USERNAME and user.permission == "admin":
            return user
    # admin was not there
    return  __createManager()

def _handleCreateUsers():
    for i in range(10):
        usernameEmail = f"user{i}@email.com"
        user = AutoUser.objects.filter(email=usernameEmail)
        if not user:
            user = User.objects.create_user(username=str(uuid4()), password=str(uuid4()))
            AutoUser.objects.create(email=usernameEmail, name=f"Demo User {i}", phoneNumber="111-111-1111", balance=random.randint(0, 10000), user=user)

def _handleCreateEmployees():
    for i in range(10):
        usernameEmail = f"employee{i}@dansauto.com"
        user = AutoUser.objects.filter(email=usernameEmail)
        if not user:
            user = User.objects.create_user(username=str(uuid4()), password=str(uuid4()))
            autoUser = AutoUser.objects.create(email=usernameEmail, name=f"Demo Employee {i}", phoneNumber="111-111-1111", balance=random.randint(0, 10000), user=user, permission="employee")
def __createManager():
    admin = User.objects.create_user(username=ADMIN_USERNAME, password=ADMIN_PASS)
    AutoUser.objects.create(email=ADMIN_USERNAME, name="Dan's Auto Management", phoneNumber = "4357551111", user=admin, permission="admin")
    return admin



