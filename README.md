# Auto-Shop Team 2

## Organization and Name Scheme

- High-level design and planning can be found in the [docs](./docs/) directory. Inside this directory can be found:
  - [Project requirements](./docs/Requirements%20Definition.pdf) for the project
  - [Use case diagrams](./docs/use_cases/) to illustrate product usage
- The actual code will be stored in this repo
- Each Git Branch will be named after the task on the Jira story board
- Jira board is accessible [here](https://dastardlydansrentacar.atlassian.net/jira/software/projects/DDRAC/boards/1)

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

    - Use Jira Project Board to create, track, and complete tasks. See [here](https://dastardlydansrentacar.atlassian.net/jira/software/projects/DDRAC/boards/1/backlog)
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
  - See instructions [here](./backend/DjangoServer/README.md)
- Running the Client
  - See instructions [here](./frontend/README.md)
- Visiting the website:
  - Open your browser of choice
  - Running the client will find an open port, navigate to localhost:PORT

### Dummy Users
Use these to test different views on the client side
- Manager Account:
  - email: admin123, password: admin123
- Employee Account:
  - email: employme, password: employme
- User Account:
  - email: abc, password: 123

## Unit Testing Instructions

From repository root:

`$ cd backend/DjangoServer`

`$ python3 manage.py test`

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
