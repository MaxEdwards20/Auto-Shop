# Generated by Django 4.1.7 on 2023-03-08 00:30

from django.db import migrations

from django.db import migrations

def populate_db(apps, schema_editor):
    Vehicle = apps.get_model('autoshop', 'Vehicle')
    # default vehicles
    Vehicle.objects.create(name="Toyota Camry", vin="ZAMGJ45A390047326", vehicleType="", imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qPl0klIzw6f7Q142ZHjoKAHaEK%26pid%3DApi&f=1&ipt=8d006f8577bac6366ce5b74c63dc486b9d2b2c75431eb777ea868719e497618a&ipo=images")
    Vehicle.objects.create(name="Hyundai Elantra", vin="KMHD25LE1DU042025", vehicleType="",  imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.rbbx-bgnjCnxpQ0FWS7SigHaE8%26pid%3DApi&f=1&ipt=5c3faad3bc258976d49340d789ed6cbf45ef61f4f158a4b268cb0e6b034bbed9&ipo=images")
    Vehicle.objects.create(name="Batmobile", vin="JH4CC2650NC000393", vehicleType="", pricePerDay=2000, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.MZYgmPyleX4SQ-S-b34vKwHaEK%26pid%3DApi&f=1&ipt=0c0daaf3d576d0c67c91b6dc596890da62eda8f20a8909a19296c7ce515319cf&ipo=images")
    Vehicle.objects.create(name="Superman Cape", vin="WDDDJ72X97A116339", vehicleType="", pricePerDay=15000, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.602l4GojlP4-mftq7Mw5HgHaDt%26pid%3DApi&f=1&ipt=d5b9661c726be1ff983125577aa316bddb0d37cc90c4bb8a7eafadd879653666&ipo=images")
    Vehicle.objects.create(name="Red Camaro", vin="camaro", vehicleType="", pricePerDay=1200, imageURL="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.chevrolet.com%2Fperformance%2Fcamaro&psig=AOvVaw1mTLI77CrDE9oEhb8JG_xO&ust=1678319527986000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDs9cyBy_0CFQAAAAAdAAAAABAD")
    Vehicle.objects.create(name="Black Camaro", vin="camaro", vehicleType="", imageURL="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.chevrolet.com%2Fperformance%2Fcamaro&psig=AOvVaw1mTLI77CrDE9oEhb8JG_xO&ust=1678319527986000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDs9cyBy_0CFQAAAAAdAAAAABAH")
    Vehicle.objects.create(name="Silver Camaro", vin="camaro", vehicleType="", imageURL="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.chevrolet.com%2Fperformance%2Fcamaro&psig=AOvVaw1mTLI77CrDE9oEhb8JG_xO&ust=1678319527986000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDs9cyBy_0CFQAAAAAdAAAAABAQ")

class Migration(migrations.Migration):

    dependencies = [
        ('autoshop', '0001_initial'),
    ]

    operations = [migrations.RunPython(populate_db), ]