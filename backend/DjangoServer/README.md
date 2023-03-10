# Getting Started

Create a virtual environment to isolate your packages:

`$ python3 -m venv .venv`

Activate it:

`$ source .venv/bin/activate`

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

We configured the frontend to create an admin for you. Start the server <Strong>before </Strong>starting the client.

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
