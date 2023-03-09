
from django.urls import path

from . import views

urlpatterns = [
    # See documentation here https://docs.djangoproject.com/en/4.1/topics/http/urls/
    # users
    path('user', views.userRouter, name='createUser'),  # POST
    path('user/<int:id>', views.userRouter, name='userRouter'), #  GET, PUT, DEL
    path('user/<int:id>/addMoney', views.userAddMoney, name="addMoney"),
    path('user/<int:id>/removeMoney', views.userRemoveMoney, name="removeMoney"),
    path('user/login', views.authenticateUser, name='authenticateUser'),
    path('user/all', views.getUsers, name="getAllUsers"), # Get all Users to show
    path('user/<int:id>/reservations', views.getUser, name='getUserReservations'),

    # vehicles
    path('vehicle', views.vehicleRouter, name='createVehicle'),  # POST
    path('vehicle/<int:id>', views.vehicleRouter, name='vehicleRouter' ),# GET, PUT, DEL
    path('vehicle/all', views.getAllVehicles, name="getAllVehicles"), # Get all vehicles to show
    path('vehicle/available', views.getAllAvailableVehicles, name="getAllAvailableVehicles"),
    path('vehicle/<int:id>/available', views.vehicleAvailability, name='vehicleAvailability'),
    path('vehicle/<int:id>/purchase', views.purchaseVehicle, name='purchaseVehicle'),
    path('vehicle/all', views.getAllVehicles, name="getAllVehicles"), # Get all vehicles to show

    # reservations
    path('reservation', views.reservationRouter, name='createReservation'),  # POST
    path('reservation/<int:id>', views.reservationRouter, name='reservationRouter'), # GET, DEL

    # manager
    path("manager/init", views.initializeDatabase, name="initalizeDatabase"),
    path("manager/", views.getManager, name="getManager"),
]
