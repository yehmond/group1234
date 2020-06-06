# Dibs - Frontend

## Project Description

Our project will be a reservation app for barbershops/salons. The application will have two user roles:
an owner and a customer. An owner will be able to create a barbershop on the site and input capacity/time
slots that customers can then reserve. Owners will then be able to holistically see their schedule for the
day and other statistics (i.e. avg reservations, avg idle time, etc.). Sufficient logic will be in place
to prevent double booking and overcrowding. An additional feature we may add if time permits is a review
system where users can review barbershops/barbers.

## Project Task Requirements

##### 3-5 minimal requirements

-   Create two user roles: owner and customer
-   Allow users to create a reservation entry
-   Allow owners to create a barbershop/salon entry

##### 3-7 "standard" requirement

-   Show a list of customers to the barbershop owner
-   Show statistics about reservations to barbershop owners
-   Search a given barbershop
-   Delete a reservation
-   Prevent double bookings

##### 2-3 stretch requirements

-   A rating system for the barbershops/barbers that users can participate in
-   A map containing all of the barbershops available on the site
-   A schedule that displays the barbershop's availability with filters for individual barbers.

##### 2 requirements broken down into smaller tasks!

-   **Allow owners to create a barbershop/salon entry**:

1. Owners can input basic details including location and hours
2. Owners can input the services offered, such as haircuts, shaving, eyebrows, etc.
3. Owners have the ability to dynamically edit information entered to meet capacity constraints
4. Persist information to backend database

-   **Allow users to create a reservation entry**

1. Users can search for a particular barbershop/salon by name
2. Users can select a specific time slot of choice
3. Users can edit a timeslot after selection
4. Persist information to backend database
