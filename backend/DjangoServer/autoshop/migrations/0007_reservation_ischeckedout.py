# Generated by Django 4.1.7 on 2023-03-22 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('autoshop', '0006_rename_needhelp_autouser_needshelp'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='isCheckedOut',
            field=models.BooleanField(default=False),
        ),
    ]
