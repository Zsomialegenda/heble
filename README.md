# Project Plan - HeBLE

- **The title of the project work: Healthy Body Lifestyle Entertainment.**
- **Project work by János Bence Dakos, Gergő Fodor, and Patrik András Sedlák.**

---

## Technologies Used

Used for coding:

- **Frontend**: Angular 19
- **Backend**: Node.JS
  - Packages: argon2, bcrypt, bcryptjs, cors, dotenv, express, express-validator, mysql2, nodemon, sequelize
- **Database**: MySQL (MariaDB) [XAMPP]

Other development tools:

- **Teamwork software**: Trello, GitHub
- **Image design and editing software**: Adobe Photoshop, Canva

---

## Roles in Use

- **János Bence Dakos: Frontend**
- **Gergő Fodor: Frontend**
- **Patrik András Sedlák: Backend**

---

## Application Features

- **User registration and login**
- **Tracking user workouts**
- **Suggestions for a healthier lifestyle (diet, workout tips, etc.)**
- **Earning points based on workouts**
- **This way you can make progress, which allows you to get various rewards and achieve different achievements.**

---

## Frontend Plan

- **Header = navigation bar**

  - **Home icon**
  - **Training**
  - **Free Contents (articles, guides, etc.)**
  - **Login**

- **Content = main section:**

  - **Image**
  - **Feedbacks cards**

- **Footer = branding**
  - **About us**
  - **Banner**
  - **Contact**

---

## Backend Plan

Each endpoint begins with `/api/vx.x.x`, where `x.x.x` is the version number of the API.

**REST API URL conventions:** [https://restfulapi.net/resource-naming/](https://restfulapi.net/resource-naming/)

---

### Endpoints Overview

| Endpoint URL                     | HTTP Method | Description                                            | Status Code / Response                                                                                                                                                                                                                                                                                |
| -------------------------------- | ----------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **/users - Parent Route**        |             |                                                        |                                                                                                                                                                                                                                                                                                       |
| `/`                              | GET         | Returns all user data without passwords.               | 200 OK - All user data retrieved <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                                                            |
| `/{id}`                          | GET         | Retrieves data for a specific user by ID.              | 200 OK - User found <br/> 404 Not Found - User does not exist <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                               |
| `/email`                         | GET         | Retrieves user by email.                               | 200 OK - User found <br/> 404 Not Found - User does not exist <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                               |
| `/count`                         | GET         | Returns the count of users.                            | 200 OK - User count <br/> 404 Not Found - No users found <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                                    |
| `/signup`                        | PUT         | Registers a new user.                                  | 201 Created - User registered <br/> 400 Bad Request - Invalid input data data <br/> 403 Forbidden - Account banned/deleted <br/> 409 Conflict - Email already in use <br/> 500 Internal Server Error - Failed to register                                                                             |
| `/generate`                      | PUT         | Generates random users.                                | No response details provided                                                                                                                                                                                                                                                                          |
| `/login`                         | POST        | Handles user login.                                    | 200 OK - Successful login <br/> 400 Bad Request - Invalid input data data <br/> 401 Unauthorized - Invalid email <br/> 401 Unauthorized - Invalid password <br/> 500 Internal Server Error - Failed to log in                                                                                         |
| `/logout`                        | POST        | Handles user logout.                                   | 200 OK - Successful logout <br/> 400 Bad Request - Invalid input data data <br/> 500 Internal Server Error - Failed to log out                                                                                                                                                                        |
| `/update`                        | PATCH       | Updates user data using a token.                       | 200 OK - Successful update <br/> 401 Unauthorized - Token required <br/> 401 Unauthorized - Invalid token <br/> 403 Forbidden - Only own data can be modified <br/> 403 Forbidden - Invalid security response <br/> 404 Not Found - User not found <br/> 500 Internal Server Error - Failed to update |
| `/delete/:id?`                   | DELETE      | Deletes users (regular and admin users).               | 200 OK - Successful deletion <br/> 401 Unauthorized - Token required <br/> 403 Forbidden - Only admin can delete others <br/> 404 Not Found - User not found <br/> 500 Internal Server Error - Failed to delete                                                                                       |
| **/achievements - Parent Route** |             |                                                        |                                                                                                                                                                                                                                                                                                       |
| `/`                              | GET         | Retrieves all achievements.                            | 200 OK - All achievements retrieved <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                                                         |
| `/{id}`                          | GET         | Retrieves an achievement by ID.                        | 200 OK - Achievement found <br/> 400 Bad Request - Invalid input data input <br/> 404 Not Found - Achievement does not exist                                                                                                                                                                          |
| `/`                              | PUT         | Adds a new achievement.                                | 201 Created - New achievement added <br/> 500 Internal Server Error - Failed to add achievement                                                                                                                                                                                                       |
| `/{id}`                          | POST        | Updates an existing achievement by ID.                 | 200 OK - Achievement updated <br/> 500 Internal Server Error - Failed to update achievement                                                                                                                                                                                                           |
| **/exercises - Parent Route**    |             |                                                        |                                                                                                                                                                                                                                                                                                       |
| `/`                              | GET         | Retrieves all exercises.                               | 200 OK - All exercises retrieved <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                                                            |
| `/{id}`                          | GET         | Retrieves exercises for a specific user by ID.         | 200 OK - Successful retrieval <br/> 400 Bad Request - Invalid input data input <br/> 404 Not Found - User not found <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                         |
| `/stats/sum`                     | GET         | Retrieves total exercise statistics.                   | 200 OK - Successful retrieval <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                                                               |
| `/stats/:type`                   | GET         | Retrieves statistics for a specific exercise type.     | 200 OK - Successful retrieval <br/> 400 Bad Request - Invalid input data exercise type <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                      |
| `/log`                           | POST        | Logs exercise and earns experience points.             | 200 OK - Successful log <br/> 401 Unauthorized - Invalid token <br/> 400 Bad Request - Invalid input data ID <br/> 403 Forbidden - Only own data can be modified <br/> 400 Bad Request - Invalid input data data format <br/> 500 Internal Server Error - Failed to log exercise                      |
| **/leaderboard - Parent Route**  |             |                                                        | These endpoints work similarly, but rank by different attributes.                                                                                                                                                                                                                                     |
| `/xp`                            | GET         | Retrieves the leaderboard based on experience points.  | 200 OK - XP-based leaderboard <br/> 500 Internal Server Error - Failed to retrieve leaderboard                                                                                                                                                                                                        |
| `/achievements`                  | GET         | Retrieves the leaderboard based on achievements.       | 200 OK - Achievement-based leaderboard <br/> 500 Internal Server Error - Failed to retrieve leaderboard                                                                                                                                                                                               |
| `/exercise/{type}`               | GET         | Retrieves the leaderboard based on exercise type.      | 200 OK - Exercise-type based leaderboard <br/> 500 Internal Server Error - Failed to retrieve leaderboard                                                                                                                                                                                             |
| **/tokens - Parent Route**       |             |                                                        |                                                                                                                                                                                                                                                                                                       |
| `/`                              | GET         | Retrieves all tokens.                                  | 200 OK - All user tokens retrieved <br/> 500 Internal Server Error - Failed to retrieve tokens                                                                                                                                                                                                        |
| `/count`                         | GET         | Retrieves the count of tokens.                         | 200 OK - Successful retrieval <br/> 500 Internal Server Error - Failed to retrieve token count                                                                                                                                                                                                        |
| `/{id}`                          | GET         | Retrieves a token by ID.                               | 200 OK - Successful retrieval <br/> 500 Internal Server Error - Failed to retrieve token                                                                                                                                                                                                              |
| `/user/{id}`                     | GET         | Retrieves tokens for a specific user.                  | 200 OK - Successful retrieval <br/> 400 Bad Request - Invalid input data user ID <br/> 404 Not Found - Token not found <br/> 500 Internal Server Error - Failed to retrieve token                                                                                                                     |
| **/xperiences - Parent Route**   |             |                                                        |                                                                                                                                                                                                                                                                                                       |
| `/`                              | GET         | Retrieves all experience points.                       | 200 OK - All experience points retrieved <br/> 500 Internal Server Error - Failed to retrieve data                                                                                                                                                                                                    |
| `/{id}`                          | GET         | Retrieves experience points for a specific user by ID. | 200 OK - Successful retrieval <br/> 400 Bad Request - Invalid input data input data <br/> 404 Not Found - User not found <br/> 500 Internal Server Error - Failed to retrieve the user's experience points                                                                                            |
