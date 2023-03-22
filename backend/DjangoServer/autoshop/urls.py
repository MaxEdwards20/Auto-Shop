
from django.urls import path

from . import views

urlpatterns = [
    # See documentation here https://docs.djangoproject.com/en/4.1/topics/http/urls/
    # users
    path('user', views.userRouter, name='createUser'),  # POST
    path('user/<int:id>', views.userRouter, name='userRouter'), #  GET, PUT, DEL
    path('user/<int:id>/addMoney', views.userAddMoney, name="addMoney"),
    path('user/<int:id>/removeMoney', views.userRemoveMoney, name="removeMoney"),
    path('user/<int:id>/all', views.getAllUsers, name="getAllUsers"),  # Get all Users to show
    path('user/<int:id>/permission', views.updateUserPermission, name="updatePermission"),  # Get all Users to show

    path('user/login', views.authenticateUser, name='authenticateUser'),
    path('user/<int:id>/reservations', views.getUser, name='getUserReservations'),
    path('user/<int:userID>/needs-help', views.needsHelp, name="userNeedsHelp"),
    path("user/needs-help", views.everyoneThatNeedsHelp, name="everyoneNeedsHelp"),

    # vehicles
    path('vehicle', views.vehicleRouter, name='createVehicle'),  # POST
    path('vehicle/<int:id>', views.vehicleRouter, name='vehicleRouter' ),# GET, PUT, DEL
    path('vehicle/<int:id>/available', views.vehicleAvailability, name='vehicleAvailability'),
    path('vehicle/<int:id>/purchase', views.purchaseVehicle, name='purchaseVehicle'),
    path('vehicle/<int:id>/sell', views.sellVehicle, name='sellVehicle'),
    path('vehicle/<int:id>/low-jack', views.lowJackVehicle, name='lowJackVehicle'),
    path('vehicle/all', views.getAllVehicles, name="getAllVehicles"), # Get all vehicles to show
    path('vehicle/all/purchased', views.getAllPurchasedVehicles, name="getAllPurchasedVehicles"),
    path('vehicle/available', views.getAllAvailableVehicles, name="getAllAvailableVehicles"),

    # reservations
    path('reservation', views.reservationRouter, name='createReservation'),  # POST
    path('reservation/<int:id>', views.reservationRouter, name='reservationRouter'), # GET, DEL
    path('reservation/cost', views.calculateCost, name="calculateCost"),
    path('reservation/all', views.getAllReservations, name="getAllReservations"), # Get all reservations to show,
    path('reservation/checked-out', views.getAllCheckedOutReservations, name="getAllCheckedOutReservations"),
    path('reservation/checked-in', views.getAllCheckedInReservations, name="getAllCheckedInReservations"),
    path('reservation/<int:id>/check-in', views.checkIn, name="checkInReservation"),
    path('reservation/<int:id>/check-out', views.checkOut, name="checkoutReservation"),

    # manager
    path("manager/init", views.initializeDatabase, name="initalizeDatabase"),
    path("manager/<int:employeeID>", views.payEmployee, name="payEmployee"),
    path("manager/<int:employeeID>/hours", views.addHoursWorked, name="logHours"),
    path("manager", views.getManager, name="getManager"),
]
