





from django.urls import path

from . import views

urlpatterns = [
    # Are we able to specify in the path and know whether this is a GET POST DEL or PUT request? For example:
    # GET users/1 returns user with id 1, while PUT users/1 updates certain values for that user
    path('user/ID', views.getUserInfoApi, name='getUserInfoApi'), # let's switch this to /user/ID, where ID is a numeric userID.
    # http://${location.host}/autoshop/getUserInfo?username=${username}
    path('vehicle/ID', views.getVehicleInfoApi, name='getVehicleInfoApi'), # let's switch this to /vehicle/ID, where ID is a numeric vehicle ID
    # http://${location.host}/autoshop/vehicle/ID?vim=${vim}
    path('user/create', views.createUser, name='createUser'),
    # http://${location.host}/autoshop/user/create?name=${name}
    path('user/authenticate', views.authenticateUser, name='authenticateUser')
]
