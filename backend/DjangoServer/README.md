Create a virtual environment to isolate your packages.
`python3 -m venv .venv`
`source .venv/bin/activate`

Run the following command to start the server:
To install dependencies:

`$ pip install -r requirements.txt`

`$ python manage.py runserver`

Once you have confirmed that the server is running, use the url in a browser to serve the
site locally. Use the url http://localhost:8000/

To create an Admin account and add dummy data:

`$ python manage.py createsuperuser`

Enter a username, email, and password

Start the server and add in data

admin
admin@email.com
admin123
