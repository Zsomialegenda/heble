# Projekt Terv - HeBLE

- **Cím: HeBLE - Healthy Body Lifestyle Entertainment.**
- **Projektmunka: Dakos János Bence, Fodor Gergő és Sedlák Patrik András.**

---

## Használt technológiák

Kódíráshoz használt:

- **Frontend**: Angular 19  
- **Backend**: Node.JS  
  - Csomagok: argon2, bcrypt, bcryptjs, cors, dotenv, express, express-validator, mysql2, nodemon, sequelize  
- **Adatbázis**: MySQL (MariaDB) [XAMPP]  

Egyéb fejlesztői eszközök:

- **Csoportmunkát segítő szoftverek**: Trello, GitHub
- **Képtervezéshez és szerkesztéshez használt szoftverek**: Adobe Photoshop, Canva

---

## Használt szerepek

- **Dakos János Bence: Frontend, adatbázis**
- **Fodor Gergő: Frontned, adatbázis**
- **Sedlák Patrik András: Banckend, adatbázis**

---

## Alkalmazás funkciói

- **Felhasználók regisztrálása és bejelentkezése.**  
- **Felhasználók edzésének nyomon követése.**  
- **Javaslatok és tanácsok egy egészségesebb életmódhoz (étkezés, edzés tippek...).**  
- **Pontok gyűjtése az edzések alapján.**
- **Ezzel fejlődést elérni, amelyekkel különböző jutalmakhoz juthatunk és teljesítményeket elérni.**    

---

## Frontend Terv  

- **Fejléc = navigációs sáv**  
  - **Nyitólap ikon**  
  - **Edzés**  
  - **Ingyenes tartalmak (cikkek, útmutatók...)**  
  - **Bejelentkezés**  

- **Tartalom = fő rész:**  
  - **Kép**  
  - **Vélemények kártyák** 

- **Lábléc = branding**  
  - **Rólunk**  
  - **Banner**  
  - **Kapcsolat**  

---

## Backend Terv  

Minden végpont `/api/vx.x.x`-el kezdődik, ahol `x.x.x` az API verziószáma.  

**REST API URL konvenciók:** [https://restfulapi.net/resource-naming/](https://restfulapi.net/resource-naming/)  

---

### Végpontok áttekintése  

| Végpont URL                 | HTTP Módszer | Művelet Leírása                                               | Státusz kód / Válasz Adat |  
|------------------------------|-------------|-----------------------------------------------------------------------|-----------------------------|  
| **/users - Szülő Útvonal**    |             |                                                                       |                             |  
| `/`                          | GET         | Minden felhasználó adatainak lekérése jelszó nélkül.                    | [üres]                    |  
| `/{userID}`                  | GET         | A megadott felhasználó (userID) adatainak lekérése.              | [üres]                    |  
| `/getUserByEmail`            | GET         | Regisztrált felhasználó lekérése email alapján.                         | [üres]                    |  
| `/signup`                    | POST        | Felhasználó hozzáadása az adatbázishoz.                                    | [üres]                    |  
| `/login`                     | POST        | Felhasználó bejelentkezésének kezelése.                                                | [üres]                    |  
| `/logout`                    | POST        | Felhasználó kijelentkezésének kezelése.                                            | [üres]                    |  
| `/updateUserByID/{userID}`   | PATCH       | Felhasználói adatok frissítése a megadott ID alapján.                                | [üres]                    |  
| `/updateUserByEmail`         | PATCH       | Felhasználói adatok frissítése a megadott email alapján.                             | [üres]                    |  
| `/deleteUserByID/{userID}`   | DELETE      | Felhasználó törlése a megadott ID alapján.                                  | [üres]                    |  
| `/deleteUserByEmail`         | DELETE      | Felhasználó törlése a megadott email alapján.                               | [üres]                    |  
| **/achievements - Szülő Útvonal** |         |                                                                       |                             |  
| `/`                          | GET         | Minden eredmény lekérése.                                          | [üres]                    |  
| `/`                          | PUT         | Új eredmény hozzáadása.                                              | [üres]                    |  
| `/user/{userId}`             | GET         | Egy adott felhasználó eredményeinek listázása a userId alapján.                   | [üres]                    |  
| `/{id}`                      | POST        | Eredmény frissítése ID alapján.                                       | [üres]                    |  
| **/exercises - Szülő Útvonal** |            |                                                                       |                             |  
| `/`                          | GET         | Minden gyakorlat lekérése.	                                             | [üres]                    |  
| `/{id}`                      | GET         | Gyakorlatok lekérése egy adott felhasználó számára userID alapján.                 | [üres]                    |  
| `/stats/sum`                 | GET         | Gyakorlatok összesített statisztikáinak lekérése.	                            | [üres]                    |  
| `/log`                       | POST        | Gyakorlat adatainak naplózása és tapasztalati pontok szerzése.                      | [üres]                    |  
| **/leaderboard - Szülő Útvonal** |          |                                                                       |                             |  
| `/xp`                        | GET         | Ranglista tapasztalati pontok alapján.	                    | [üres]                    |  
| `/achievements`              | GET         | Ranglista eredmények alapján.	                         | [üres]                    |  
| `/exercise/{type}`           | GET         | Ranglista gyakorlat típus alapján.	                        | [üres]                    |  
| **/tokens - Szülő Útvonal**   |             |                                                                       |                             |  
| `/`                          | GET         | Minden token lekérése.	                                               | [üres]                    |  
| `/count`                     | GET         | Az összes token számlálása.	                                   | [üres]                    |  
| `/{id}`                      | GET         | Token lekérése az ID alapján.                                        | [üres]                    |  
| `/user/{id}`                 | GET         | Tokenek lekérése egy adott felhasználó számára userID alapján.         | [üres]                    |  
| **/xp - Szülő Útvonal**       |             |                                                                       |                             |  
| `/xp`                        | GET         | Az összes tapasztalati pont lekérése.                                     | [üres]                    |   
