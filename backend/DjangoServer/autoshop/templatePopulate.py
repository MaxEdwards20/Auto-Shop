# python manage.py makemigrations --empty autoshop --name populate
# python manage.py makemigrations $ python manage.py migrate


from django.db import migrations
from uuid import uuid4
from datetime import datetime, timedelta
import random
from django.contrib.auth import get_user_model
def populate_db(apps, schema_editor):
    return
    AutoUser = apps.get_model('autoshop', 'AutoUser')
    Vehicle = apps.get_model('autoshop', 'Vehicle')
    Reservation = apps.get_model('autoshop', 'Reservation')
    User = get_user_model()

    def createAutoUsers(user, permission, email):
        AutoUser.objects.create(user=user, permission=permission, email=email)

    # Create some users
    counter = 0
    for user in User.objects.all():
        if counter < 11:
            autoUser = createAutoUsers(user, permission='user', email=f"{uuid4()}@gmail.com")
        for i in range(10):
            vehicle = Vehicle(name=f"Vehicle {i}", location="1234 Main St", image="https://www.google.com",
                              vin=str(uuid4()))
            vehicle.save()
            for i in range(10):
                if random.randint(0, 10) % 2 == 0:
                    startDate = datetime.today() + timedelta(days=i)
                else:
                    startDate = datetime.today() - timedelta(days=i)
                endDate = startDate + timedelta(days=random.randint(0, 5))
                reservation = Reservation(autoUser=autoUser, vehicle=vehicle, startDate=startDate, endDate=endDate)
                reservation.save()
            vehicle = Vehicle(name=f"Free Vehicle {i}", location="1234 Main St", image="https://www.google.com",
                              vin=str(uuid4()), vehicleType="Chevrolet", isPurchased=True)
            vehicle.save()

        # Create Admin
        autoUser = createAutoUsers(user, "admin", "admin123")

        # Create Employee
        autoUser = createAutoUsers(user, "employee", "employee123")

        # Create basic autoUser
        autoUser = createAutoUsers(user,"user", email="abc")


class Migration(migrations.Migration):

    dependencies = [
        ('autoshop', '0002_populate'),
    ]

    operations = [migrations.RunPython(populate_db),
    ]