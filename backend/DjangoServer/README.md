# Getting Started
Online Install Guide: https://docs.djangoproject.com/en/4.1/intro/install/

Online Install The Latest Version of Python: https://www.python.org/downloads/

You can verify that Python is installed by typing python from your shell; you should see something like:

`Python 3.9.7 (tags/v3.9.7:1016ef3, Aug 30 2021, 20:19:38) [MSC v.1929 64 bit (AMD64)] on win32
`


Move into the Django server directory (from the root directory, run the following):

`cd backend/DjangoServer`

Create a virtual environment to https://docs.djangoproject.com/en/4.1/intro/install/isolate your packages:

`$ python3 -m venv .venv`

Activate it:

`$ source .venv/bin/activate`

If that doesn't work, try the following command:

`$ source .venv/Scripts/activate`

Download dependencies

`$ pip install -r requirements.txt`

Create and populate the database

`$ python manage.py makemigrations`

`$ python manage.py migrate`

Run the following command to start the server:

`$ python manage.py runserver`

This will start the server at: http://localhost:8000/

The frontend instructions are found in the [frontend](../../frontend/README.md) of this repository. Be sure to start the server first, then do the frontend.

### Admin abilities

We configured the frontend to create an admin for you. Start the server by running `$ python manage.py runserver`  <Strong>before </Strong>starting the client.

- email: admin123
- password: admin123

### To Adjust Filler Data:

Delete the db.sqlite3 file

Make desired adjustments to the `populate` migration

To Create a new Migration Script:

- `$ python manage.py makemigrations --empty autoshop --name populateVehicles`

Create and populate the database:

- `$ python3 manage.py makemigrations `
- `$ python manage.py migrate`

should see something like: 

`$ python manage.py migrate
Operations to perform:
  Apply all migrations: example1, example2, Running migrations:
  Rendering model states... DONE
  Applying EXAMPLE.0001_initial... OK`
