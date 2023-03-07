





from django.urls import path

from . import views

urlpatterns = [


    # See documentation here https://docs.djangoproject.com/en/4.1/topics/http/urls/
    # users
    path('user', views.userRouter, name='createUser'), #POST create user
    path('user/<int:id>', views.userRouter, name='updateUser'), # endpoint for GET, PUT, and DEL requests
    path('user/<int:id>/addMoney', views.addMoney, name="addMoney"),
    path('user/<int:id>/removeMoney', views.removeMoney, name="removeMoney"),
    path('user/<int:id>/reservation', views.createReservation, name="createReservation"),
    path('user/login', views.authenticateUser, name='authenticateUser'),
    path('user/all', views.getUsers, name="getAllUsers"), # Get all Users to show


    # vehicles
    path('vehicle', views.createVehicle, name='createVehicle'), #POST create vehicle
    path('vehicle/<int:id>', views.vehicleRouter, name='vehicleRouter',),# endpoint for GET, PUT, and DEL requests
    path('vehicle/all', views.getAllVehicles, name="getAllVehicles"), # Get all vehicles to show
    path('vehicle/available', views.getAllAvailableVehicles, name="getAllAvailableVehicles"),
    path('vehicle/<int:id>/available', views.vehicleAvailability, name='vehicleAvailability'),
    path('vehicle/all', views.getAllVehicles, name="getAllVehicles") # Get all vehicles to show

]
