#Reservation System - Group1234
## Project Description
Our project will be a reservation app for barbershops/salons. The application will have two user roles: 
an owner and a customer. An owner will be able to create a barbershop on the site and input capacity/time 
slots that customers can then reserve. Owners will then be able to holistically see their schedule for the 
day and other statistics (i.e. avg reservations, avg idle time, etc.). Sufficient logic will be in place 
to prevent double booking and overcrowding. An additional feature we may add if time permits is a review 
system where users can review barbershops/barbers.

### Project Task Requirements
##### 3-5 minimal requirements
- Create two user roles: owner and customer
- Allow users to create a reservation entry
- Allow owners to create a barbershop/salon entry

##### 3-7 "standard" requirement
- Show a list of customers to the barbershop owner
- Show statistics about reservations to barbershop owners
- Search a given barbershop
- Delete a reservation
- Prevent double bookings

##### 2-3 stretch requirements
- A rating system for the barbershops/barbers that users can participate in
- A map containing all of the barbershops available on the site

##### 2 requirements broken down into smaller tasks!
- **Allow owners to create a barbershop/salon entry**:
1. Owners can input basic details including location and hours
2. Owners can input the services offered, such as haircuts, shaving, eyebrows, etc.
3. Owners have the ability to dynamically edit information entered to meet capacity constraints
4. Persist information to backend database

- **Allow users to create a reservation entry**
1. Users can search for a particular barbershop/salon by name
2. Users can select a specific time slot of choice
3. Users can edit a timeslot after selection
4. Persist information to backend database

### Sketches of Prototype
TODO


##

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
