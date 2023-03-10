# Generated by Django 4.1.7 on 2023-03-10 00:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AutoUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=50)),
                ('phoneNumber', models.CharField(max_length=50)),
                ('permission', models.CharField(choices=[('user', 'user'), ('admin', 'admin'), ('employee', 'employee')], default='user', max_length=20)),
                ('balance', models.FloatField(default=0)),
                ('needHelp', models.BooleanField(default=False)),
                ('ethicsViolation', models.TextField(default='None')),
                ('location', models.CharField(default='unknown', max_length=50)),
                ('hoursWorked', models.IntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicleType', models.CharField(default='car', max_length=20)),
                ('name', models.CharField(max_length=200)),
                ('vin', models.CharField(default='vehicle', max_length=17)),
                ('location', models.CharField(default='Logan', max_length=200)),
                ('imageURL', models.URLField(default=None)),
                ('imageFile', models.ImageField(default=None, upload_to='')),
                ('isPurchased', models.BooleanField(default=False)),
                ('isPending', models.BooleanField(default=False)),
                ('isInsured', models.BooleanField(default=False)),
                ('isLoadJacked', models.BooleanField(default=False)),
                ('pricePerDay', models.IntegerField(default=100)),
                ('purchasePrice', models.IntegerField(default=5000)),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('amountDue', models.FloatField(default=100)),
                ('autoUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='autoshop.autouser')),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='autoshop.vehicle')),
            ],
        ),
    ]
