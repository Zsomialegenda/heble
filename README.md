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
/server | | | |
| | /testRun | GET | __Test method__: checks whether the server is running or not. | [blank] |
| | /testRunByID/id | GET | __Test method__: checks whether reciving parameters is working correctly or not. | [blank] |
 /user | Parent Route |
| /testUserRoute | GET | __Test method__: tests if the route is whether reachable or not. | [blank] |
| /testUserRouteID/{userID} | GET | __Test method__: tests if the parameters are working correctly in this route. | [blank] |
| /getAllUsers | GET | Returns all users informations without passwords. | [blank] |
| /getUserByID/{userID} | GET | Querying the data of a user with the given ID (userID)... | [blank] |
| /getUserByEmail | GET | Query registered user based on E-mail... | [blank] |
| /signup | POST | Inserts a user into the database. | [blank] |
| /login | POST | Managing user logins… | [blank] |
| /logout | POST | Manage user logout… | [blank] //still missing method |
| /updateUserByID/{userID} | PATCH | Changing the data of a user with the given E-mail... | [blank] |
| /updateUserByEmail | PATCH | Changing the data of a user with the given E-mail... | [blank] |
| /deleteUserByID/{userID} | DELETE | Deleting a user with the given ID (userID)... | [blank] |
| /deleteUserByEmail | DELETE | Deleting a user with the given E-mail... | [blank] |
| /gain-xp/{userID} | POST | Adding experience points to a user by given ID | [blank] |
 
