# Generated by Django 4.1.6 on 2023-02-07 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Rental',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=50)),
                ('make', models.CharField(max_length=50)),
                ('model', models.CharField(max_length=50)),
                ('edition', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('color', models.CharField(max_length=50)),
                ('mileage', models.IntegerField()),
                ('titleType', models.CharField(max_length=50)),
            ],
        ),
    ]
