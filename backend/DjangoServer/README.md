# Getting Started

Create a virtual environment to isolate your packages:

`$ python3 -m venv .venv`

Activate it:

`$ source .venv/bin/activate`

Download dependencies

`$ pip install -r requirements.txt`

Create and populate the database

`$ python3 manage.py makemigrations $ python manage.py migrate`

Run the following command to start the server:

`$ python manage.py runserver`

This will start the server at: http://localhost:8000/

The frontend instructions are found in the frontend folder of this repository. Just be sure to run this in a separate terminal than the frontend.

### Admin abilities

To create an Admin account and add dummy data:

`$ python manage.py createsuperuser`

Enter a username, email, and password

Start the server and add in data

admin
admin@email.com
admin123

### To Adjust Filler Data:
Delete the db.sqlite3 file

Make desired adjustments to the `populate` migration

Create and populate the database

`$ python3 manage.py makemigrations $ python manage.py migrate`


