# Maxwell Edwards
from django.http import HttpRequest, HttpResponse
from django.http import JsonResponse
import datetime
import json
from .models import Reservation

def update_cors(j: JsonResponse, request: HttpRequest) -> JsonResponse:
    if 'Origin' in request.headers:
        j['Access-Control-Allow-Origin'] = request.headers['Origin']
    else:
        j['Access-Control-Allow-Origin'] = '*'
    return j

def getReqBody(request: HttpRequest) -> dict:
    if request.POST:
        parsedBody = request.POST
    else:
        parsedBody = json.loads(request.body)
    return parsedBody


def parseDates(request: HttpRequest) -> tuple:
    parsedBody = getReqBody(request)
    startDate = parsedBody['startDate'][:10]
    endDate = parsedBody['endDate'][:10]
    startDate = datetime.datetime.strptime(startDate, "%Y-%m-%d").date()
    endDate = datetime.datetime.strptime(endDate, "%Y-%m-%d").date()
    return (startDate , endDate)

def error400(request: HttpRequest, message: str = "Incorrect usage") -> JsonResponse:
    return update_cors(JsonResponse({'error': message}, status=400, safe=False), request)

def error401(request: HttpRequest) -> JsonResponse:
    return update_cors(JsonResponse({'error': "Unauthorized access"}, status=401, safe=False), request)

def vehicleIsAvailable(startDate, endDate, reservation: Reservation) -> bool:
    return reservation.startDate > endDate or reservation.endDate < startDate