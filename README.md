# Advanced React E-Commerce Web Application

💲 Welcome to the React E-Commerce Web Application! 💲
A TypeScript React E-Commerce Web Application with TypeScript, React, React Query, React Bootstrap, CSS, React Router DOM,  Redux Toolkit, Jest, Babel, CRUD Operations for products and users to Firestore, Firebase Authentication for users. Implementation of CI/CD Pipeline and Test-Driven Development (TDD).

Featuring:

* Home Page with Product Catalog:
    * Using React Query to retrieve all products from Firestore product data and displaying them on the Home Page. Users can add, edit, and remove products.
    * Button to add product to cart.
    * Form to add product to Firestore.
    * Form to edit product in Firestore.
    * Button to remove product from Firestore.
* Shopping Cart Page:
    * Using Redux Toolkit for managing the shopping cart state, including adding, updating, and removing products from the cart.
    * Ability for users to update, and delete items in their cart.
    * Checkout button allowing users to complete their purchases and 🎉 confetti 🎉 UI pops up when clicking the checkout button after the alert is displayed.
    * Session Storage, total amount, quantity, and price calculation.
    * Button to clear cart.
* Orders Page and Display Order Page:
    * Orders are stored in Firebase at checkout and include Order ID, Order Total, Date and Time it was created, Number of items in Order, "View Details" button, and a "Delete Order" button.
    * All order history of the user are displayed in beautiful bootstrap styled cards in Orders Page.
    * Users are able to view individual order details when clicking the view details button.
* Profile Page and User Management:
    * All new users register with email and password using Firebase Authentication.
    * Upon registration, users are able to create, view, update, and delete their profile in the Profile Form and DisplayUserData page.
    * User Login and Logout are handled with Firebase Authentication.  
* Error Page:
    * An error page to gently handle it when the user tries to go to a nonexistent page.
* Beautiful CSS and Bootstrap CSS:
    * Beautiful appearance of all pages, nav elements, and buttons holding pages similar to keep a particular theme to be visually pleasing to the user.
* Test Driven Development (TDD) in React with Unit Testing and Integration Testing:
    * Multiple unit tests with seperate components.
    * Tests of component rendering, state changes, and user interactions.
    * Tests are focused, independent, and deterministic.
    * Integration tests to ensure the cart is updated when adding a product to cart.
    * Simulated user interactions, asserting result changes using React Testing Library.  
* Continuous Integration (CI) flow of build and test in GitHub Actions:
    * A main.yml file within the .github/workflows directory to define the CI workflow.
    * The workflow is configured to automatically trigger code pushes to the main branch.
    * GitHub Actions used to build the project and run tests using Jest.
    * Ensured that the workflow fails if any tests fail, preventing the deployment of faulty code.
* Continuous Deployment (CD) flow in GitHub Actions with deployment to Vercel:
    * The existing GitHub Actions workflow to include a deployment stage.
    * Deployment jobs are defined to deploy the application to Vercel.
    * Ensured that the deployment only occurs after the CI tests have passed successfully.


Installation and Setup ⚙️

Follow these steps to set up the project locally:

git clone https://github.com/spikenardJ/React_E-Commerce_Web_App.git 
cd e-commerce-app
npm install
npm run dev
Open http://localhost:5173/ (Or link provided) in your browser to view the app.
Sometimes the port may be different depending on your setup so be sure to use the right port

At that point you can enjoy the React E-Commerce Web Application and all of it’s unique features as well as edit the code if you like. You may then show your suggestions as comments on here! 

You can also view and interact with the final product here: https://e-commerce-app-navy-eta.vercel.app

  Thank you for checking out The React E-Commerce Web Application!💲
