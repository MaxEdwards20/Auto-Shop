





from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('getUserInfo', views.getUserInfoApi, name='getUserInfoApi'),
    # http://${location.host}/autoshop/getUserInfo?username=${username}
    path('getVehicleInfo', views.getVehicleInfoApi, name='getVehicleInfoApi'),
    # http://${location.host}/autoshop/getVehicleInfo?vim=${vim}
]
