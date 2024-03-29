from django.db import migrations

def populate_db(apps, schema_editor):
    Vehicle = apps.get_model('autoshop', 'Vehicle')
    # default vehicles
    Vehicle.objects.create(name="Old Batmobile", vin="ZAMGJ45A390047326",isPurchased=True, vehicleType="", pricePerDay=650, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qPl0klIzw6f7Q142ZHjoKAHaEK%26pid%3DApi&f=1&ipt=8d006f8577bac6366ce5b74c63dc486b9d2b2c75431eb777ea868719e497618a&ipo=images")
    Vehicle.objects.create(name="Super Jet", vin="KMHD25LE1DU042025",isPurchased=True, vehicleType="",  imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.rbbx-bgnjCnxpQ0FWS7SigHaE8%26pid%3DApi&f=1&ipt=5c3faad3bc258976d49340d789ed6cbf45ef61f4f158a4b268cb0e6b034bbed9&ipo=images")
    Vehicle.objects.create(name="Batcycle", vin="JH4CC2650NC000393",isPurchased=True, vehicleType="", pricePerDay=2000, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.MZYgmPyleX4SQ-S-b34vKwHaEK%26pid%3DApi&f=1&ipt=0c0daaf3d576d0c67c91b6dc596890da62eda8f20a8909a19296c7ce515319cf&ipo=images")
    Vehicle.objects.create(name="Superman Cape", vin="WDDDJ72X97A116339",isPurchased=True, vehicleType="", pricePerDay=15000, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.602l4GojlP4-mftq7Mw5HgHaDt%26pid%3DApi&f=1&ipt=d5b9661c726be1ff983125577aa316bddb0d37cc90c4bb8a7eafadd879653666&ipo=images")
    Vehicle.objects.create(name="Red Camaro", vin="camaro",isPurchased=True, vehicleType="", pricePerDay=1200, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LdV8aI-mOHtEO8tGRTpAtAHaEK%26pid%3DApi&f=1&ipt=816e07fe44d1ebbf26ae5bbcf0d3ad20fff8fafd8e6a17ef2f566c5eaff3b3d1&ipo=images")
    Vehicle.objects.create(name="Black Camaro", vin="camaro",isPurchased=True, vehicleType="", imageURL=
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Z9pqTfEuNXJF_-A5hCBgbgHaEr%26pid%3DApi&f=1&ipt=3c490744798d67b20ff3d46544c92edaec063a00fa68151797b7fa79ca8d6c6e&ipo=images")
    Vehicle.objects.create(name="Silver Camaro", vin="camaro",isPurchased=True, vehicleType="", imageURL=
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hpx3ydjbEb9RVILHNlpsyAHaEo%26pid%3DApi&f=1&ipt=f85259e9cf5c1069036f538d26ddf7777287c2ec1c048206094ecbff16bc14b0&ipo=images")
    Vehicle.objects.create(name="Incredicar", vin="incredible",isPurchased=True, vehicleType="", pricePerDay=500, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mzLxZ8V6-XHmrpl9ndY-WwHaEV%26pid%3DApi&f=1&ipt=ece2341dfd5c781f54c48e005813a4e60fe08e50422b27377c680df53fe567ed&ipo=images"
    )
    Vehicle.objects.create(name="Undersized Van", vin="small",isPurchased=True, vehicleType="", pricePerDay=30, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kaypZ9vMBTtB-hGlz8r5SAHaDe%26pid%3DApi&f=1&ipt=693b0a63d3363dd1ee5f8e5546015893a00b3fe2779fefd53222f4b615ebb00a&ipo=images"
    )
    Vehicle.objects.create(name="Top Gun Motorcycle", vin="topGun",isPurchased=True, vehicleType="motorcycle", pricePerDay=3000, imageURL="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.bikebound.com%2Fwp-content%2Fuploads%2F2019%2F08%2FTop-Gun-2-Maverick-Motorcycle.jpg&f=1&nofb=1&ipt=0d887bab11ca84d658a3d57fea2e0791049113b24e95116c8b2a25532d1e2ad1&ipo=images"
    )
    Vehicle.objects.create(name="Mario's Kart", vin="mario",isPurchased=True, vehicleType="kart", pricePerDay=1500, imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.vg247.com%2Fcurrent%2F2011%2F08%2F64487_CTRP_AMK_char01_1_ad_psd_jpgcopy.jpg&f=1&nofb=1&ipt=83b567579da9086b6864cee5001ebf911f90f8c2ce7978009fad2584ad2387a6&ipo=images"
    )
    Vehicle.objects.create(name="Optimus Prime Vehicle", vin="transformers",isPurchased=True, vehicleType="optimusTransformer", pricePerDay=850, imageURL=
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp3252479.jpg&f=1&nofb=1&ipt=d0b4d2da5a74babd9850e679e31418899addf8961f7248f1009ca6a27caf8122&ipo=images"

    )
    Vehicle.objects.create(name="Optimus Prime Transformed", vin="transformers1",isPurchased=True, vehicleType="optimusTransformed", pricePerDay=8500, imageURL=
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fwallpapers%2Foptimus-prime-transformers-digital-art-zg.jpg&f=1&nofb=1&ipt=14cde3402c35666d4da65df302e33e89810c80969545a6169dfcbfe4d7408a4b&ipo=images"

    )
    Vehicle.objects.create(name="Bumblebee Transformed", vehicleType="bumbleeTransformed", pricePerDay=8500, imageURL=
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.TAq1L-7ul2YS7bdTpIHRZwHaHa%26pid%3DApi&f=1&ipt=b1b044b1426205b4d5e3c2190c26ba5e3f72f427f466a1263629e52c9e239c29&ipo=images"
   )
    Vehicle.objects.create(name="Your Own Two Feet", pricePerDay=50, isPurchased=True, imageURL=
       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.NiR71XR7g9aU9K44dMq6_QHaFj%26pid%3DApi&f=1&ipt=a61b9f4922f6e46f76bc18e8dd03ab223f36a6da36af44556cdee2e7d0aa747e&ipo=images"
   )
    Vehicle.objects.create(name="Motorscooter", vehicleType="motorcycle", imageURL=
                           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.xSRtBiql_RFB4XnND2IjLQHaFI%26pid%3DApi&f=1&ipt=64249d15a4c7e18e4580fa96cd9f17340e1fa86b2f4d72af06edcc9acef0a823&ipo=images"
                           )
    Vehicle.objects.create(name="White Motorscooter", vehicleType="motorcycle", imageURL=
                           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6HKJ2vQsu5e9tpZHHAJ7IQHaHa%26pid%3DApi&f=1&ipt=250b7a23ff25dc8101d2167ff15a67511f420753ed54b71756b0b6a907c3cb32&ipo=images"
                           )
    Vehicle.objects.create(name="Red Motorscooter", vehicleType="motorcycle", imageURL=
                           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.e7HjunmHrolBgnJ3bxBPNgHaFj%26pid%3DApi&f=1&ipt=8a013a4dd1b92d2d60b8363dc4e73e4237eb91735fe0061bf4a018743d5d19fd&ipo=images"
                           )


class Migration(migrations.Migration):

    dependencies = [
        ('autoshop', '0001_initial'),
    ]

    operations = [migrations.RunPython(populate_db),
    ]