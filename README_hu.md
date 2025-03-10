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

- **Dakos János Bence: Frontend**
- **Fodor Gergő: Frontend**
- **Sedlák Patrik András: Backend**

---

## Alkalmazás funkciói

- **Felhasználók regisztrálása és bejelentkezése.**  
- **Felhasználók edzésének nyomon követése.**  
- **Javaslatok és tanácsok egy egészségesebb életmódhoz (étkezés, edzés tippek...).**  
- **Pontok gyűjtése az edzések alapján.**
- **Ezzel fejlődhetnek a felhasználók, amelyek után különböző jutalmakhoz juthatnak és teljesítményeket érhetnek el.**    

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

| Végpont URL                     | HTTP Módszer | Leírás                                              | Állapotkód / Válasz |
|---------------------------------|-------------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **/users - Szülő útvonal**      |             |                                                    | |
| `/`                             | GET         | Az összes felhasználó adatainak lekérése jelszó nélkül. | 200 OK - Összes felhasználó adat lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott felhasználó adatainak lekérése ID alapján. | 200 OK - Felhasználó megtalálva <br/> 404 Not Found - Felhasználó nem létezik <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/email`                        | GET         | Felhasználó keresése email alapján. | 200 OK - Felhasználó megtalálva <br/> 404 Not Found - Felhasználó nem létezik <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/count`                        | GET         | A felhasználók számának lekérése. | 200 OK - Felhasználók száma <br/> 404 Not Found - Nincsenek felhasználók <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/signup`                       | PUT         | Új felhasználó regisztrációja. | 201 Created - Sikeres regisztráció <br/> 400 Bad Request - Érvénytelen adatok <br/> 403 Forbidden - Fiók tiltott/törölt <br/> 409 Conflict - Email már használatban <br/> 500 Internal Server Error - Sikertelen regisztráció |
| `/generate`                     | PUT         | Véletlenszerű felhasználók generálása. | Nincs megadott válaszrészlet |
| `/login`                        | POST        | Felhasználó bejelentkezése. | 200 OK - Sikeres bejelentkezés <br/> 400 Bad Request - Érvénytelen adatok <br/> 401 Unauthorized - Hibás email <br/> 401 Unauthorized - Hibás jelszó <br/> 500 Internal Server Error - Sikertelen bejelentkezés |
| `/logout`                       | POST        | Felhasználó kijelentkezése. | 200 OK - Sikeres kijelentkezés <br/> 400 Bad Request - Érvénytelen adatok <br/> 500 Internal Server Error - Sikertelen kijelentkezés |
| `/update`                       | PATCH       | Felhasználói adatok frissítése token segítségével. | 200 OK - Sikeres frissítés <br/> 401 Unauthorized - Token szükséges <br/> 401 Unauthorized - Érvénytelen token <br/> 403 Forbidden - Csak saját adatok módosíthatók <br/> 403 Forbidden - Érvénytelen biztonsági válasz <br/> 404 Not Found - Felhasználó nem található <br/> 500 Internal Server Error - Sikertelen frissítés |
| `/delete/:id?`                  | DELETE      | Felhasználók törlése (rendes és admin felhasználók). | 200 OK - Sikeres törlés <br/> 401 Unauthorized - Token szükséges <br/> 403 Forbidden - Csak admin törölhet másokat <br/> 404 Not Found - Felhasználó nem található <br/> 500 Internal Server Error - Sikertelen törlés |
| **/achievements - Szülő útvonal** | | | |
| `/`                             | GET         | Az összes elért eredmény lekérése. | 200 OK - Összes eredmény lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott eredmény lekérése ID alapján. | 200 OK - Eredmény megtalálva <br/> 400 Bad Request - Érvénytelen adatok <br/> 404 Not Found - Eredmény nem létezik |
| `/`                             | PUT         | Új eredmény hozzáadása. | 201 Created - Új eredmény hozzáadva <br/> 500 Internal Server Error - Sikertelen hozzáadás |
| `/{id}`                         | POST        | Létező eredmény frissítése ID alapján. | 200 OK - Eredmény frissítve <br/> 500 Internal Server Error - Sikertelen frissítés |
| **/exercises - Szülő útvonal**  | | | |
| `/`                             | GET         | Az összes edzés lekérése. | 200 OK - Összes edzés lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott felhasználó edzéseinek lekérése ID alapján. | 200 OK - Sikeres lekérdezés <br/> 400 Bad Request - Érvénytelen adatok <br/> 404 Not Found - Felhasználó nem található <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/stats/sum`                    | GET         | Összesített edzésstatisztika lekérése. | 200 OK - Sikeres lekérdezés <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/stats/:type`                  | GET         | Egy adott edzéstípus statisztikájának lekérése. | 200 OK - Sikeres lekérdezés <br/> 400 Bad Request - Érvénytelen edzéstípus <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/log`                          | POST        | Edzésnaplózás és XP szerzés. | 200 OK - Sikeres naplózás <br/> 401 Unauthorized - Érvénytelen token <br/> 400 Bad Request - Érvénytelen ID <br/> 403 Forbidden - Csak saját adatok módosíthatók <br/> 400 Bad Request - Érvénytelen formátum <br/> 500 Internal Server Error - Sikertelen naplózás |
| **/leaderboard - Szülő útvonal** | | | |
| `/xp`                           | GET         | Ranglista XP alapján. | 200 OK - XP alapú ranglista <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/achievements`                 | GET         | Ranglista elért eredmények alapján. | 200 OK - Eredmény alapú ranglista <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/exercise/{type}`              | GET         | Ranglista edzéstípus alapján. | 200 OK - Edzéstípus alapú ranglista <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| **/tokens - Szülő útvonal**     | | | |
| `/`                             | GET         | Az összes token lekérése. | 200 OK - Összes token lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/count`                        | GET         | Tokenek számának lekérése. | 200 OK - Sikeres lekérdezés <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott token lekérése ID alapján. | 200 OK - Sikeres lekérdezés <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/user/{id}`                    | GET         | Egy adott felhasználó tokenjeinek lekérése. | 200 OK - Sikeres lekérdezés <br/> 400 Bad Request - Érvénytelen felhasználó ID <br/> 404 Not Found - Token nem található <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| **/xperiences - Szülő útvonal** | | | |
| `/`                             | GET         | Az összes XP pont lekérése. | 200 OK - Összes XP lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott felhasználó XP pontjainak lekérése ID alapján. | 200 OK - Sikeres lekérdezés <br/> 400 Bad Request - Érvénytelen adatok <br/> 404 Not Found - Felhasználó nem található <br/> 500 Internal Server Error - Sikertelen lekérdezés |
