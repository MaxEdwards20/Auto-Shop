# Generated by Django 4.1.1 on 2023-03-14 17:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('autoshop', '0005_remove_vehicle_isinsured_reservation_isinsured'),
    ]

    operations = [
        migrations.RenameField(
            model_name='autouser',
            old_name='needHelp',
            new_name='needsHelp',
        ),
    ]
