# Maxwell Edwards
from django.http import HttpRequest, HttpResponse
from .models import AutoUser
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User as Person
from .serializers import UserSerializer
import json

def __update_cors(j: JsonResponse, request: HttpRequest) -> JsonResponse:
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