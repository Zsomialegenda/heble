# Projekt Terv - HeBLE

**Projektmunka: János Bence Dakos, Gergő Fodor és Patrik András Sedlák.**

---

## Használt technológiák

- **Frontend**: Angular 19  
- **Backend**: Node.JS  
  - Csomagok: argon2, bcrypt, bcryptjs, cors, dotenv, express, express-validator, mysql2, nodemon, sequelize  
- **Adatbázis**: MySQL (MariaDB) [XAMPP]  

---

## Használt szerepek

[üres]  

---

## Alkalmazás funkciói

- **Felhasználók regisztrálása**  
- **Felhasználók edzésének nyomon követése**  
- **Javaslatok egy egészségesebb életmódhoz (étkezés, edzés tippek...)**  
- **Pontok gyűjtése az edzések alapján**  

---

## Frontend Terv  

- **Fejléc = navigációs sáv**  
  - **Nyitólap ikon**  
  - **Edző**  
  - **Bolt**  
  - **Ingyenes Tartalom (cikkek, útmutatók...)**  

- **Tartalom = fő rész:**  
  1. [üres]  

- **Lábléc = branding**  
  - **Szerzői jogok**  
  - **Közösségi média**  
  - **Rólunk**  
  - **Támogatás**  

---

## Backend Terv  

Minden végpont `/api/vx.x.x`-el kezdődik, ahol `x.x.x` az API verziószáma.  

**REST API URL konvenciók:** [https://restfulapi.net/resource-naming/](https://restfulapi.net/resource-naming/)  

---

### Végpontok áttekintése  

| Végpont URL            | HTTP Metódus | Művelet Leírása                                    | Állapotkód / Válasz Adat |  
|-------------------------|--------------|----------------------------------------------------|--------------------------|  
| **/server - Szülő Útvonal** |              |                                                    |                          |  
| `/testRun`              | GET          | **Teszt metódus:** Ellenőrzi, hogy a szerver fut-e. | [üres]                   |  
| `/testRunByID/id`       | GET          | **Teszt metódus:** Ellenőrzi, hogy a paraméterek átvitele működik-e. | [üres] |  
| **/user - Szülő Útvonal** |              |                                                    |                          |  
| `/testUserRoute`        | GET          | **Teszt metódus:** Ellenőrzi, hogy az útvonal elérhető-e. | [üres] |  
| `/testUserRouteID/{userID}` | GET       | **Teszt metódus:** Ellenőrzi, hogy a paraméterek működnek-e ezen az útvonalon. | [üres] |  
| `/getAllUsers`          | GET          | Visszaadja az összes felhasználó adatait jelszó nélkül. | [üres] |  
| `/getUserByID/{userID}` | GET          | Lekérdezi a megadott ID-hez (userID) tartozó felhasználó adatait. | [üres] |  
| `/getUserByEmail`       | GET          | Regisztrált felhasználó lekérdezése e-mail alapján. | [üres] |  
| `/signup`               | POST         | Felhasználó hozzáadása az adatbázishoz. | [üres] |  
| `/login`                | POST         | Felhasználói bejelentkezés kezelése. | [üres] |  
| `/logout`               | POST         | Felhasználói kijelentkezés kezelése. | [üres] (metódus még hiányzik) |  
| `/updateUserByID/{userID}` | PATCH     | A felhasználó adatainak módosítása a megadott ID alapján. | [üres] |  
| `/updateUserByEmail`    | PATCH        | A felhasználó adatainak módosítása a megadott e-mail alapján. | [üres] |  
| `/deleteUserByID/{userID}` | DELETE   | Felhasználó törlése a megadott ID alapján. | [üres] |  
| `/deleteUserByEmail`    | DELETE       | Felhasználó törlése a megadott e-mail alapján. | [üres] |  
| `/gain-xp/{userID}`     | POST         | Tapasztalati pontok hozzáadása a megadott ID-hez tartozó felhasználónak. | [üres] |  
