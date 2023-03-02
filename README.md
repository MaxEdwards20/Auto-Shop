# Auto-Shop Team 2

## Organization and Name Scheme

- High-level design and planning can be found in the [docs](./docs/) directory. Inside this directory can be found:
  - [Project requirements](./docs/Requirements%20Definition.pdf) for the project
  - [Use case diagrams](./docs/use_cases/)) to illustrate product usage
- The actual code will be stored in this repo
- Each Git Branch will be named after the task on the Jira story board
- Commit messages directly describe the changes made
- Jira board is accessible here

## Version-control Procedures

- Use Auto-shop repo on Github
- Main branch will always be stable/deployable
- Dev branch is current working version of project
  - Once dev is stable and tested, it will be pulled into main
  - To merge dev into main, needs approval from every team member
- For any new feature, developer will branch from dev into temporary branch
  - Once developer is done, creates pull request to merge into main
  - Needs approval from at least one other team member to merge into dev

## Tool Stack and Setup

- Tool Stack

  - We will be using GitHub for version control, Django for backend, and a yet to be determined technology for the frontend (React, Vue, Angular, or Python templates are among options)
  - Project management

    - Use Jira Project Board to create, track, and complete tasks. Link [here](https://dastardlydansrentacar.atlassian.net/jira/software/projects/DDRAC/boards/1/backlog)
    - Utilize built-in Jira features to generate burndown chart and other useful analytics

- Setup
  - Utilize the following git commands and best practices
    - Create a new branch: git checkout -b [NAME]
    - Recommended to git pull every day before you start working, this updates any changes that have been merged
    - Merge back into main:
      - commit current branch
      - git checkout main (or dev)
      - git merge [branchName]
    - View Current Branches:
      - git branch -l
  - To get the most updated stable version, pull from main
  - To see the features currently in development, pull from dev
  - To add new features, branch from dev

## Build Instructions

- Running the server:
  - Navigate to backend/DjangoServer from the command line
  - To start the server, run the following command:
    - python manage.py runserver
  - To change the server's port (for example, to port 8800), use the following command:
    - python manage.py runserver 8800
  - To change the server's IP, follow the below example:
    - python manage.py runserver 0.0.0.0:8000
  - For more information on django configurations, please reference [https://docs.djangoproject.com/en/4.1/ref/django-admin/#django-admin-runserver](https://docs.djangoproject.com/en/4.1/ref/django-admin/#django-admin-runserver)
- Visiting the website:
  - Open your browser of choice
  - In the address bar, type the following address (assuming the server is hosting on port 8000)
    - http://localhost:8000/

- Running the client:
  - cd into frontend
  - `$ yarn` to install dependencies
  - `$ yarn dev` to run the client 
  - Open the corresponding link to view the page
## Unit Testing Instructions

cd into backend/DjangoServer

run `$ python3 manage.py test`

- After each function is created, create a unit test in tests.py to exercise that function and ensure stability across limits of scope
- Run all unit tests before merging back into dev or main. Ensure they all pass

## System Testing Instructions

- Go through workflow as a customer and ensure all views look the way they should (calendar, report car error, deposit money)
- Go through flow as manager and check that employees can be paid, vehicles purchased, and user privileges upgraded.
- Go through as lot attendant and make sure vehicles can be checked out and edited
- Go through as auto retrieval specialist and pick up the vehicle

##

## Group Member Contact Information

- cmiller14 chase.miller1428@gmail.com
- jvhansen08 jvhansen08@gmail.com
- satchelF satchcollege@gmail.com
- maxedwards20 maxedwards20@gmail.com
