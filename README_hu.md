# Projektterv
__Dakos János Bence+Fodor Gergő+Sedlák Patrik András projektmunkája.__

__Használt technológiák:__
- Frontend: Szögletes
- Háttér: Node.JS
- Adatbázis: MySQL (MariaDB) [XAMPP]

__Használt szerepkörök:__  
[üres]

__Alkalmazás jellemzői:__  
 - Felhasználók regisztrációja
 - A felhasználók edzésének nyomon követése
 - Javaslatok a jobb életmódhoz (étkezés, edzési tanácsok...)
 - Pontszerzés az edzés alapján

__Frontend terv___:  
 - Fejléc = navigációs sáv
   1. Céloldal ikonja
   2. Edző
   3. Tárolás
   4. Ingyenes tartalom (cikkek, útmutatók...)
 - Test = fő tartalom
   1. [üres]
 - Lábléc = márkajelzés
   1. Szerzői jog
   2. (Közösségi média)
   3. Körülbelül
   4. Támogatás 

__Háttérterv__:  
Minden végpont a /api/vx.x.x bevezetéssel kezdődik, ahol az x.x.x az API verziószáma.  
REST API URL-konvenciók: https://restfulapi.net/resource-naming/
 Url Végpont | HTTP metódus | Művelet | Az állapotkód és az adatok válaszként elküldve 
 --- | --- | --- | --- 
 /users | PUT | Új felhasználó létrehozása... (mind a regisztrációhoz, mind az adminisztrációs felülethez) | [üres]
 $\quad$ | GET | Regisztrált felhasználók lekérdezése... (elsősorban adminisztrátori felülethez | [üres]
 /users/login | POST | Felhasználói bejelentkezések kezelése… | [üres]
 /users/logout | POST | Felhasználói kijelentkezés kezelése… | [üres]
 /users/{userID} | GET | Adott azonosítóval (userID) rendelkező felhasználó adatainak lekérdezése... | [üres]
 $\quad$ | PATCH | Adott azonosítóval (userID) rendelkező felhasználó adatainak módosítása... | [üres]
 $\quad$ | TÖRLÉS | A megadott azonosítóval (felhasználói azonosítóval) rendelkező felhasználó törlése... | [üres]
