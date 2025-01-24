# Project Plan - HeBLE

- **The title of the project work: Healthy Body Lifestyle Entertainment.**
- **Project work by János Bence Dakos, Gergő Fodor, and Patrik András Sedlák.**

---

## Technologies Used

- **Frontend**: Angular 19  
- **Backend**: Node.JS  
  - Packages: argon2, bcrypt, bcryptjs, cors, dotenv, express, express-validator, mysql2, nodemon, sequelize  
- **Database**: MySQL (MariaDB) [XAMPP]  

---

## Roles in Use  

- **János Bence Dakos: Frontend, database**
- **Gergő Fodor: Frontend, database**
- **Patrik András Sedlák: Backend, database**  

---

## Application Features  

- **User registration and login**  
- **Tracking user workouts**  
- **Suggestions for a healthier lifestyle (diet, workout tips, etc.)**  
- **Earning points based on workouts**  

---

## Frontend Plan  

- **Header = navigation bar**  
  - **Home icon**  
  - **Coaching**  
  - **News - Free Content (articles, guides, etc.)**  
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

| Endpoint URL                 | HTTP Method | Operation Description                                               | Status Code / Response Data |  
|------------------------------|-------------|-----------------------------------------------------------------------|-----------------------------|  
| **/users - Parent Route**     |             |                                                                       |                             |  
| `/`               | GET         | Returns all users' information without passwords.                    | [blank]                    |  
| `/{userID}`      | GET         | Queries the data of a user with the given ID (userID).               | [blank]                    |  
| `/getUserByEmail`            | GET         | Queries a registered user based on email.                           | [blank]                    |  
| `/signup`                    | POST        | Inserts a user into the database.                                    | [blank]                    |  
| `/login`                     | POST        | Manages user logins.                                                 | [blank]                    |  
| `/logout`                    | POST        | Manages user logouts.                                                | [blank]                    |  
| `/updateUserByID/{userID}`   | PATCH       | Updates user data with the given ID.                                 | [blank]                    |  
| `/updateUserByEmail`         | PATCH       | Updates user data with the given email.                              | [blank]                    |  
| `/deleteUserByID/{userID}`   | DELETE      | Deletes a user with the given ID.                                    | [blank]                    |  
| `/deleteUserByEmail`         | DELETE      | Deletes a user with the given email.                                 | [blank]                    |  
| **/achievements - Parent Route** |         |                                                                       |                             |  
| `/`                          | GET         | Retrieves all achievements.                                          | [blank]                    |  
| `/`                          | PUT         | Adds a new achievement.                                              | [blank]                    |  
| `/user/{userId}`             | GET         | Lists achievements for a specific user by userId.                   | [blank]                    |  
| `/{id}`                      | POST        | Updates an achievement by ID.                                        | [blank]                    |  
| **/exercises - Parent Route** |            |                                                                       |                             |  
| `/`                          | GET         | Retrieves all exercises.                                             | [blank]                    |  
| `/{id}`                      | GET         | Retrieves exercises for a specific user by user ID.                 | [blank]                    |  
| `/stats/sum`                 | GET         | Retrieves summarized exercise statistics.                            | [blank]                    |  
| `/log`                       | POST        | Logs exercise data and gains experience points.                      | [blank]                    |  
| **/leaderboard - Parent Route** |          |                                                                       |                             |  
| `/xp`                        | GET         | Retrieves leaderboard based on experience points.                    | [blank]                    |  
| `/achievements`              | GET         | Retrieves leaderboard based on achievements.                         | [blank]                    |  
| `/exercise/{type}`           | GET         | Retrieves leaderboard based on exercise type.                        | [blank]                    |  
| **/tokens - Parent Route**   |             |                                                                       |                             |  
| `/`                          | GET         | Retrieves all tokens.                                                | [blank]                    |  
| `/count`                     | GET         | Retrieves the count of all tokens.                                   | [blank]                    |  
| `/{id}`                      | GET         | Retrieves a token by its ID.                                         | [blank]                    |  
| `/user/{id}`                 | GET         | Retrieves tokens associated with a specific user by user ID.         | [blank]                    |  
| **/xp - Parent Route**       |             |                                                                       |                             |  
<<<<<<< HEAD
| `/xp`                        | GET         | Retrieves all experience points.                                     | [blank]                    |  
=======
| `/xp`                        | GET         | Retrieves all experience points.                                     | [blank]                    |  
>>>>>>> b103b2437b5ae66b3e14ca193af1f36e00a98c9d
