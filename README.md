# Project Plan - HeBLE

**Project work by János Bence Dakos, Gergő Fodor, and Patrik András Sedlák.**

---

## Technologies Used

- **Frontend**: Angular 19  
- **Backend**: Node.JS  
  - Packages: argon2, bcrypt, bcryptjs, cors, dotenv, express, express-validator, mysql2, nodemon, sequelize  
- **Database**: MySQL (MariaDB) [XAMPP]  

---

## Roles in Use  

[blank]

---

## Application Features  

- **Registering users**  
- **Tracking the users' workout**  
- **Suggestions for a better lifestyle (meals, workout advice...)**  
- **Claiming points based on the workout**  

---

## Frontend Plan  

- **Header = navigation bar**  
  - **Landing page icon**  
  - **Coach**  
  - **Store**  
  - **Free Content (articles, guides...)**  

- **Body = main content**  
  1. [blank]  

- **Footer = branding**  
  - **Copyright**  
  - **Social media**  
  - **About**  
  - **Support**  

---

## Backend Plan  

Each endpoint begins with `/api/vx.x.x`, where `x.x.x` is the version number of the API.  

**REST API URL conventions:** [https://restfulapi.net/resource-naming/](https://restfulapi.net/resource-naming/)  

---

### Endpoints Overview  

| Endpoint URL            | HTTP Method | Operation Description                                   | Status Code / Response Data |  
|--------------------------|-------------|---------------------------------------------------------|-----------------------------|  
| **/server - Parent Route** |             |                                                         |                             |  
| `/testRun`               | GET         | **Test method**: checks whether the server is running. | [blank]                    | 
| `/testRunByID/id`        | GET         | **Test method**: checks if receiving parameters works.  | [blank]                    | 
| **/user - Parent Route** |             |                                                         |                             |
| `/testUserRoute`         | GET         | **Test method**: tests if the route is reachable.       | [blank]                    | 
| `/testUserRouteID/{userID}` | GET       | **Test method**: tests if the parameters work in this route. | [blank] |  
| `/getAllUsers`           | GET         | Returns all users' information without passwords.       | [blank] |  
| `/getUserByID/{userID}`  | GET         | Queries the data of a user with the given ID (userID).  | [blank] |  
| `/getUserByEmail`        | GET         | Queries a registered user based on email.               | [blank] |  
| `/signup`                | POST        | Inserts a user into the database.                       | [blank] |  
| `/login`                 | POST        | Manages user logins.                                    | [blank] |  
| `/logout`                | POST        | Manages user logouts.                                   | [blank] (method still missing) |  
| `/updateUserByID/{userID}` | PATCH     | Updates user data with the given ID.                    | [blank] |  
| `/updateUserByEmail`     | PATCH       | Updates user data with the given email.                 | [blank] |  
| `/deleteUserByID/{userID}` | DELETE   | Deletes a user with the given ID.                       | [blank] |  
| `/deleteUserByEmail`     | DELETE      | Deletes a user with the given email.                    | [blank] |  
| `/gain-xp/{userID}`      | POST        | Adds experience points to a user with the given ID.     | [blank] |  
