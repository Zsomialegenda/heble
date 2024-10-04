# Project Plan
__Project work of János Bence Dakos+Gergő Fodor+Patrik András Sedlák.__

__Technologies used:__
- Frontend: Angular
- Backend: Node.JS
- Database: MySQL (MariaDB) [XAMPP]

__Roles in use:__  
[blank]

__Application features:__  
 - Registering users
 - Tracking the users' workout
 - Suggestions for a better lifestyle (meals, workout advice...)
 - Claiming points based on the workout

__Frontend Plan___:  
 - Header = navigation bar
   1. Landing page icon
   2. Coach
   3. Store
   4. Free Content (articles, guides...)
 - Body = main content
   1. [blank]
 - Footer = branding
   1. Copyright
   2. (Social media)
   3. About
   4. Support 

__Backend Plan__:  
Each endpoint begins with the introduction /api/vx.x.x, where x.x.x is the version number of the API.  
REST API URL conventions: https://restfulapi.net/resource-naming/
 Endpoint URL | HTTP method | Operation | Status code and data sent in response 
 --- | --- | --- | --- 
 /users | PUT | Create a new user... (both for registration and admin interface) | [blank]
 $\quad$ | GET | Query registered users... (primarily for admin interface | [blank]
 /users/login | POST | Managing user logins… | [blank]
 /users/logout | POST | Manage user logout… | [blank]
 /users/{userID} | GET | Querying the data of a user with the given ID (userID)... | [blank]
 $\quad$ | PATCH | Changing the data of a user with the given ID (userID)... | [blank]
 $\quad$ | DELETE | Deleting a user with the given ID (userID)... | [blank]
