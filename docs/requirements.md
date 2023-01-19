## Requirements

* ### Introduction and Context
    * Reservation system (reserve cars by the day)
    * 1970's cars (with pictures)
    * User selects the days they want to rent a car, then the list of available cars shows up
        * Once a car is selected it is no longer available
    * Only rent a car if you are a member (own account)
        * Account has money, email, phone, etc.
        * Option to add money in with a text input

* ### Users and Their Goals
    * User Types:
        * Customer
            * Can book a car for several days
            * Chooses cars based on price and availability
            * Can add money to account
            * Gets a QR code/other identification to verify reservation
        * Auto retrieval specialist (1+)
            * Knows when to go get the car
            * Sees where the car is (person types in their address)
        * Only 1 manager 
            * Is able to assign attributes to different people
            * Can upgrade people's access from customer (default) to other jobs
            * Pays all employees
                * Has option to opt out for each employee
            * Can purchase new vehicle (use a library of images to pick from)
        * Person at the till
            * Checks car out, check car back in
            * Checks gas tank
            * Asks customers if they want the insurance (able to add)
            * LoJack button is pushed for every car that does not have insurance
        * Employees register the amount of hours they work
        * Manager pays the employees from the business wallet
            * Employees get 15$ per hour 

* ### Functional Requirements


* ### Non-functional Requirements
    * Only rent a car if it is available
    * People can buy insurance (50$)
        * If car breaks down, you don't have to pay anything
        * Cost 300$ for car retrieval specialist
        * Option to submit an ethics violation (says to better businesss bureau, but actually goes to company)
    * Car always breaks down for everyone that does not pay insurance
        * Load jack button available for person at the till, turn it on if they don't pay insurance
    * Late fee is double 

* ### Future Features
    * Generate a map to broken-down cars for auto retrieval specialist

* ### Glossary
    * LoJack: remotely disable a car (ONLY used on stolen cars, of course)
    