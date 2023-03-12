from django.http import HttpRequest, HttpResponse
from .models import AutoUser, Reservation
from django.shortcuts import get_object_or_404
from typing import List
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .serializers import AutoUserSerializer, ReservationSerializer
from .helperFunctions import update_cors, getReqBody, error400, error401, makeUserJSONResponse, createUserTransferObject
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
    if  request.method != "POST":
        return error400(request)
    parsedBody = getReqBody(request)
    NEEDED_ITEMS = {"amount", "managerID"}
    for key in NEEDED_ITEMS:
        if key not in parsedBody:
            return error400(request)
    employee: AutoUser = get_object_or_404(AutoUser, pk=employeeID)
    amount = int(parsedBody['amount'])
    totalAmountDue = employee.hoursOwed * employee.wage
    difference = totalAmountDue - amount
    if difference == 0:
        employee.hoursOwed = 0  # reset hours back to zero
    else:
        employee.hoursOwed = round(difference/ employee.wage, 2)
    employee.balance += int(parsedBody['amount'])
    employee.save()
    return makeUserJSONResponse(employee.pk)

@csrf_exempt
def addHoursWorked(request: HttpRequest, employeeID: int):
    #TODO: Unit tests
    if  request.method != "POST":
        return error400(request)
    parsedBody = getReqBody(request)
    NEEDED_ITEMS = {"hours", "managerID"}
    for key in NEEDED_ITEMS:
        if key not in parsedBody:
            return error400(request)
    employee: AutoUser = get_object_or_404(AutoUser, pk=employeeID)
    employee.hoursOwed += float(parsedBody['hours'])
    employee.save()
    return makeUserJSONResponse(employee.pk)




def _handleCreateManager():
    for user in  AutoUser.objects.all():
        if user.email == ADMIN_USERNAME and user.permission == "admin":
            return user

    for user in User.objects.all():
        if user.username == ADMIN_USERNAME and user.password == ADMIN_PASS:
            return user
    # admin was not there
    return  __createManager()

def _handleCreateUsers():
    for i in range(10):
        usernameEmail = f"user{i}@email.com"
        checkAndCreateUser(usernameEmail, "user", i)
def _handleCreateEmployees():
    EMPLOYEE_USERNAME = "employme"
    EMPLOYEE_PASS = "employme"
    checkAndCreateUser(EMPLOYEE_USERNAME, "employee", 11, password=EMPLOYEE_PASS)
    for i in range(10):
        usernameEmail = f"employee{i}@dansauto.com"
        checkAndCreateUser(usernameEmail, "employee", i)

def __createManager():
    admin = User.objects.create_user(username=ADMIN_USERNAME, password=ADMIN_PASS)
    AutoUser.objects.create(email=ADMIN_USERNAME, name="Dan's Auto Management", phoneNumber = "4357551111", user=admin, permission="admin")
    return admin

def checkAndCreateUser(email, permission, i: int, password = None):
    if password:
        user = User.objects.filter(username=email, password=password)
        if not user:
            user = AutoUser.objects.filter(email=email)
    else:
        password = str(uuid4())
        for user in AutoUser.objects.all():
            if user.email == email:
                return
    if not user:
        user = User.objects.create_user(username=email, password=password)
        autoUser = AutoUser.objects.create(email=email, name=f"Demo {permission} {i}", phoneNumber="111-111-1111", balance=random.randint(0, 10000), user=user, permission=permission, hoursOwed=random.randint(0, 30))
