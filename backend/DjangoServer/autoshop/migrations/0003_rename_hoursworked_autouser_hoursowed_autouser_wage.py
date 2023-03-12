# Generated by Django 4.1.7 on 2023-03-10 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('autoshop', '0002_populateVehicles'),
    ]

    operations = [
        migrations.RenameField(
            model_name='autouser',
            old_name='hoursWorked',
            new_name='hoursOwed',
        ),
        migrations.AddField(
            model_name='autouser',
            name='wage',
            field=models.FloatField(default=7.25),
        ),
    ]