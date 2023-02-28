





from django.urls import path

from . import views

urlpatterns = [
    # Are we able to specify in the path and know whether this is a GET POST DEL or PUT request? For example: GET users/1 returns user with id 1, while PUT users/1 updates certain values for that user
    path('getUserInfo', views.getUserInfoApi, name='getUserInfoApi'), # let's switch this to /user/ID, where ID is a numeric userID.
    # http://${location.host}/autoshop/getUserInfo?username=${username}
    path('getVehicleInfo', views.getVehicleInfoApi, name='getVehicleInfoApi'), # let's switch this to /vehicle/ID, where ID is a numeric vehicle ID
    # http://${location.host}/autoshop/getVehicleInfo?vim=${vim}
    path('user/create', views.createUser, name='createUser')
    # http://${location.host}/autoshop/user/create?name=${name}
    # might change how these work... leave like this for now. 
    #path('user/addUserBalance', views.addUserBalance, name='addUserBalance')
    # http://${location.host}/autoshop/user/create?name=${name}
]
