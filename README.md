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

| Endpoint URL                     | HTTP Method           | Operation Description                                        | Status Code / Response                                                                                                                                                                                                                                                                   |
| -------------------------------- | --------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **/users - Parent Route**        |                       |                                                              |                                                                                                                                                                                                                                                                                          |
| `/`                              | GET                   | Returns all users' information without passwords.            | 200 OK - Fetch all users' data <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                               |
| `/{id}`                          | GET                   | Queries the data of a user with the given ID (userID).       | 200 OK - User found <br/> 404 Not Found - User does not exist <br/> 500 Internal Server Error - Failure                                                                                                                                                                                  |
| `/email`                         | GET                   | Queries a registered user based on email.                    | 200 OK - User found <br/> 404 Not Found - User does not exist <br/> 500 Internal Server Error - Failure                                                                                                                                                                                  |
| `/count`                         | GET                   | Returns the number of users.                                 | 200 OK - User's number <br/> 404 Not Found - User does not exist <br/> 500 Internal Server Error - Failure                                                                                                                                                                               |
| `/signup`                        | PUT                   | Inserts a user into the database.                            | 201 Created - User registered <br/> 400 Bad Request - Invalid input                                                                                                                                                                                                                      |
| `/generate`                      | PUT                   | Generates users with random infos.                           | None                                                                                                                                                                                                                                                                                     |
| `/login`                         | POST                  | Manages user logins.                                         | 200 OK - Successful login <br/> 400 Bad Request - Invalid input <br/> 401 Unauthorized - Invalid email <br/> 401 Unauthorized - Invalid password <br/> 500 Internal Server Error - Failure                                                                                               |
| `/logout`                        | POST                  | Manages user logouts.                                        | 200 OK - Logout successful <br/> 400 Bad Request - Invalid input <br/> 500 Internal Server Error - Failure                                                                                                                                                                               |
| `/update`                        | PATCH                 | Updates user data using token.                               | 200 OK - Update successful <br/> 401 Unauthorized - Token required <br/> 401 Unauthorized - Invalid token <br/> 403 Forbidden - Only your own is updateable <br/> 403 Forbidden - Invalid secure answer <br/> 401 Unauthorized - Invalid token <br/> 500 Internal Server Error - Failure |
| `/delete/:id?`                   | DELETE                | Delete users (both regular and admin user.                   | 200 OK - User deleted succesfully <br/> 401 Unauthorized - Token required <br/> 403 Forbidden - Only admins can delete others <br/> 404 Not Found - User not found <br/> 401 Unauthorized - Invalid token <br/> 500 Internal Server Error - Failure                                      |
| **/achievements - Parent Route** |                       |                                                              |                                                                                                                                                                                                                                                                                          |
| `/`                              | GET                   | Retrieves all achievements.                                  | 200 OK - Fetch all achievements <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                              |
| `/{id]`                          | GET                   | Retrives achievement by there ID.                            | 200 OK - Achievement fetched successfully <br/> 400 Bad Request - Invalid input <br/>404 Not Found - Achievement does not exist                                                                                                                                                          |
| `/`                              | PUT                   | Adds a new achievement.                                      | 201 Created - A new ahievement is added <br/> 500 Internal Server Error - Failure                                                                                                                                                                                                        |
| `/{id}`                          | POST                  | Updates an achievement by ID.                                | 200 OK - Achivement is uodated <br/> 500 Internal Server Error - Failure                                                                                                                                                                                                                 |
| **/exercises - Parent Route**    |                       |                                                              |                                                                                                                                                                                                                                                                                          |
| `/`                              | GET                   | Retrieves all exercises.                                     | 200 OK - Fetch all users' exercise data <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                      |
| `/{id}`                          | GET                   | Retrieves exercises for a specific user by user ID.          | 200 OK - Update successful <br/> 400 Bad Request - Invalid input <br/> 404 Not Found - User does not exist <br/> 500 Internal Server Error - Failure                                                                                                                                     |
| `/stats/sum`                     | GET                   | Retrieves summarized exercise statistics.                    | [blank]                                                                                                                                                                                                                                                                                  |
| `/stats/:type`                   | GET                   | Retrieves summarized exercise statistics for one.            | [blank]                                                                                                                                                                                                                                                                                  |
| `/log`                           | POST                  | Logs exercise data and gains experience points.              | [blank]                                                                                                                                                                                                                                                                                  |
| **/leaderboard - Parent Route**  | - Create leaderboards |                                                              | These do the same thin gjust with different attributes                                                                                                                                                                                                                                   |
| `/xp`                            | GET                   | Retrieves leaderboard based on experience points.            | 200 OK - XP based <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                                            |
| `/achievements`                  | GET                   | Retrieves leaderboard based on achievements.                 | 200 OK - Achievement based <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                                   |
| `/exercise/{type}`               | GET                   | Retrieves leaderboard based on exercise type.                | 200 OK - Exercise (type) based <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                               |
| **/tokens - Parent Route**       |                       |                                                              |                                                                                                                                                                                                                                                                                          |
| `/`                              | GET                   | Retrieves all tokens.                                        | 200 OK - Fetch all logged in users' token <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                    |
| `/count`                         | GET                   | Retrieves the count of all tokens.                           | [blank]                                                                                                                                                                                                                                                                                  |
| `/{id}`                          | GET                   | Retrieves a token by its ID.                                 | [blank]                                                                                                                                                                                                                                                                                  |
| `/user/{id}`                     | GET                   | Retrieves tokens associated with a specific user by user ID. | [blank]                                                                                                                                                                                                                                                                                  |
| **/xp - Parent Route**           |                       |                                                              |                                                                                                                                                                                                                                                                                          |
| `/xp`                            | GET                   | Retrieves all experience points.                             | 200 OK - Fetch all experience <br/> 500 - Internal Server Error - Failure                                                                                                                                                                                                                |
