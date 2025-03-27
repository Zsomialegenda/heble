<div align="center">
  <img src="https://katolikuskeri.hu/Files/keri/keri_logo2.jpg" alt="KERI logó" width="350">
</div>

<h1 align="center"> SZENT ISTVÁN KATOLIKUS TECHNIKUM ÉS GIMNÁZIUM </h1>

<h2 align="center"> DAKOS JÁNOS BENCE, FODOR GERGŐ, SEDLÁK PATRIK ANDRÁS </h2>

<h2 align="center"> HeBLE - Healthy Body Lifestyle Entertainment </h2>

<h3 align="center"> SZOFTVERFEJLESZTÉS ÉS -TESZTELÉS VIZSGAREMEK - Sátoraljaújhely, 2025 </h3>

<br>

<p> A mozgás életünk szerves része, így a projektünk erre épült, hogy egészséges életmódra ösztönözzük a felhasználóinkat. Azonban az emberek igényei átalakultak az elmúlt évek során, sokkal több időt töltünk az okoseszközeink előtt, így alkalmazkodtunk ehhez és megszületett a HeBLE, ami kombinálja a mozgást és a videójátékok egyes aspektusait. </p>

<p> Az oldalon különböző mozgásos gyakorlatok érhetőek el, amelyek elvégzésért a felhasználók tapasztalatpontot szerezhetnek és szintet is léphetnek egyaránt, mint egy videójátékban. Emellett különböző teljesítményeket érhetnek el, amelyeket maguk előtt tarthatnak, mint célkitűzés. Fontos kihangsúlyoznunk, hogy a HeBLE jelenleg becsület alapon működik, azaz a felhasználó saját kedve és becsülete szerint adhat hozzá elvégzettként különböző mozgásos feladatokat. Emellett az oldalon különböző témákban ingyenes tartalmak érhetőek el, amelyek lényegre törően és kezdőbarát módon összefoglalják az adott témát. </p>

<h2> Rendszerkövetelmények </h2>

<p> Az alábbiakban felsoroljuk a projektünk minimális és ajánlott rendszerkövetelményeit, ezeket érdemes ellenőrizni a webalkalmazás elindítása előtt a legjobb felhasználói élményért. Fontos megjegyeznünk, hogy a projektünk elindításához aktív és stabil internetkapcsolatra lesz szükség. Illetve minimális szabad merevlemez-területre, optimális esetben 2GB minimum. </p>

 <h2> Minimális: </h2>

- Processzor: Intel Core 3 vagy AMD Ryzen 3
- Memória: 4GB RAM
- Videókártya: Integrált megfelel
- Operációs rendszer: Windows 10/11, Linux, macOS
- Böngésző: Google Chrome, Opera, Microsoft Edge, Safari

 <h2> Ajánlott: </h2>

- Processzor: Intel Core 3 vagy AMD Ryzen 3
- Memória: 8GB RAM
- Videókártya: GeForce GTX 1050 vagy AMD RX550
- Operációs rendszer: Windows 10/11, Linux, macOS
- Böngésző: Google Chrome, Opera, Microsoft Edge, Safari

<h2> Fejlesztéshez használt szoftverek és eszközök </h2>

A projektünk elkészítéséhez a vizsgakövetelményben által megkövetelt modern technológiákat és egyéb eszközöket használtunk.

<h3> Kódíráshoz használt: </h3>

- **Fejleszői környezet**: Visual Studio Code (v1.98.2)
- **Szerverfutattási környezet**: Node.js (v22.11.0)
    - Csomagok: @faker-js/faker, bcrypt, bcryptjs, cors, dotenv, express, express,session, faker, jsonwebtoken, mariadb, nodemon, sequelize
- **Frontend keretrendszer**: Angular 19 (v19.0.4)
- **Frontend technológiák**: HTML5, CSS3, TypeScript (v5.6.3) és egyéb Bootstrap Icons és komponensek, mint a navbar, cards, toasts, accordion. Illetve VSC-ba hozzáadott Prettier extension.
- **Adatbázis**: MySQL (MariaDB (v10.4.32) [XAMPP]

<h3> Egyéb fejlesztői eszkökök:  </h3>

- **Csoportmunkát segítő szoftverek:** Trello és Github
- **Dokumentációkészítéshez használt eszközök**: Microsoft Word (v16)
- **Képtervezéshez és szerkesztéshez használt szoftverek:** Adobe Photoshop, Canva, Background Remover (remove.bg)

<h3> Telepítés és beindítás menete </h3>

<p> A projetktünket lokálisan, azaz a saját számítógépen tudja futtatni aktív és stabil internetkapcsolat mellett. </p>

<h3> Szükséges szoftverek </h3>

- Visual Studio Code 
- XAMPP
- Node.Js
- Git és Github
- Postman

<h3> Szükséges keretrendszer </h3>

- Angular ( letöltés, terminálba: @angular/cli@19.0.5 )

---

<h3> A projekt letöltése </h3>

<p> Első lépésként nyissa meg a következő https://github.com/Zsomialegenda/heble oldalt. Ott kattinson a <i>Code</i> gombra, majd válasszon a két opció közül: <i>Open with GitHub Desktop</i>, vagy választhatja a <i>Download ZIP</i> opciót. A letöltött fájlokat csomagolja ki egy választott mappába. </p>

<h3> XAMPP indítása </h3>

<p> Ezután nyissa meg XAMMP-ot (XAMPP Control Panel (v3.3.0)) és indítsa el az Apache-ot és a MySQL-t a mellettük lévő <i>Start</i> gomb segítségével, majd nyomjon rá a MySQL melletti <i>Admin</i> gombra, hogy megnyissa a phpMyAdmin felületét. Ezt megteheti úgy is, hogy a böngésző címmezőjébe beírja a következő URL-t: http://localhost/phpmyadmin/ . Majd hozzon létre egy új adatbázist. Az adatbázis neve legyen <i>heble</i> és a karakterkódolásnak állítsa be következőt: <i>utf8_hungarian_ci</i>. </p>

<h3> Szerveroldali alkalmazás indítása (Backend) </h3>

<p> Nyissa meg a Visual Studio Code-ot és nyissa meg a projektet. Majd válassza ki a heble mappán belül a <strong>backend</strong> könyvtárat. Kattintson rá jobb egérgombbal és válassza ki az <i>Open in Integrated Terminal</i>-t opciót, ezzel megnyitva a terminált. Telepítse a szükséges csomagoakt <i>npm i</i>, végül indítsa el a szervert <i>npm start</i> segítségével. </p>

<h3> Felhasználói felület indítása (Frontend) </h3>

<p> Most ugyanígy külön nyissa meg a <strong>frontend</strong> könyvtárat. Itt is telepítse a szükséges csomagokat <i>npm i</i> segítségével, majd végül <i>ng serve --open</i> segítségével indítsa el az Angular alkalmazást. </p>

---

<h3> Hiba felmerülése esetén </h3>

<p> Ha valami nem megfelelően tölt be, akkor ellenőrizze, hogy van-e aktív internetkapcsolata. Előfordulhat, hogy egyes csomagokat nem telepít elsőre, így ebben az esetben újra le kell futtatni az <i>npm i</i> parancsot. Előfordulhat az is, hogy a XAMPP nem indul, ekkor rendszergazdaként próbálja meg ismételten futtatni. Ha bármi egyéb hiba lép fel indításkor akkor kérjük azt jelezze és lépjen velünk kapcsolatba! </p>

---

<h3> Backend végpontok áttekintése </h3>

| Végpont URL                     | HTTP Módszer | Leírás                                              | Állapotkód / Válasz |
|---------------------------------|-------------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **/users - Szülő útvonal**      |             |                                                    | |
| `/`                             | GET         | Az összes felhasználó adatainak lekérése jelszó nélkül. | 200 OK - Összes felhasználó adat lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott felhasználó adatainak lekérése ID alapján. | 200 OK - Felhasználó megtalálva <br/> 404 Not Found - Felhasználó nem létezik <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/email`                        | POST         | Felhasználó keresése email alapján. | 200 OK - Felhasználó megtalálva <br/> 404 Not Found - Felhasználó nem létezik <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/count`                        | GET         | A felhasználók számának lekérése. | 200 OK - Felhasználók száma <br/> 404 Not Found - Nincsenek felhasználók <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/signup`                       | POST         | Új felhasználó regisztrációja. | 201 Created - Sikeres regisztráció <br/> 400 Bad Request - Érvénytelen adatok <br/> 403 Forbidden - Fiók tiltott/törölt <br/> 409 Conflict - Email már használatban <br/> 500 Internal Server Error - Sikertelen regisztráció |
| `/login`                        | POST        | Felhasználó bejelentkezése. | 200 OK - Sikeres bejelentkezés <br/> 400 Bad Request - Érvénytelen adatok <br/> 401 Unauthorized - Hibás email <br/> 401 Unauthorized - Hibás jelszó <br/> 500 Internal Server Error - Sikertelen bejelentkezés |
| `/logout`                       | POST        | Felhasználó kijelentkezése. | 200 OK - Sikeres kijelentkezés <br/> 400 Bad Request - Érvénytelen adatok <br/> 500 Internal Server Error - Sikertelen kijelentkezés |
| `/update` | PATCH        | Felhasználó adatainak frissítése. | 200 OK - Sikeres frissités <br/> 401 Unathorized - Nincs token <br/> 404 Not Found - Nem található felhasználó <br/> 400 Bad Request - Nem jó a biztonsági válasz <br/> 400 Bad Request - Nincs e-mail megadva <br/> 500 Internal Server Error - Sikertelen frissités |
| `/forgot` | PUT | Biztonsági jelszó ellenőrzése elfelejtett jelszó esetén. | 200 OK - Sikeres ellenőrzés  <br/> 400 Bad Request - Hiányzó email/biztonsági jelszó <br/> 401 Unathorized - Helytelen biztonsági jelszó <br/> 404 Not Found - A felhasználó nem található <br/> 500 Internal Server Error - Sikertelen ellenőrzés |
| `/forgot/reset` | PUT | Jelszó visszaállítás. | 200 OK - Sikeres visszaállítás <br/> 400 Bad Request - Hiányzik az email/új jelszó <br/> 404 Not Found - A felhasználó nem található <br/> 500 Internal Server Error - Sikertelen visszaállítás |
| `/delete/{id}`                  | DELETE      | Felhasználók törlése (admin felhasználók számára). | 200 OK - Sikeres törlés <br/> 401 Unauthorized - Token szükséges <br/> 400 Bad request - Hiányzó adatok <br/> 404 Not Found - Felhasználó nem található <br/> 401 Unathorized - Érvénytelen token <br/> 500 Internal Server Error - Sikertelen törlés |
| **/delorban - Szülő útvvonal** | | |
| `/`                             | GET         | Az összes kitiltott/törölt felhasználó lekérdezése |  200 OK - Sikeres lekérdezés <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott kitiltott/törölt felhasználó lekérdezése ID alapján | 200 OK - Sikeres lekérdezés <br/> 400 Bad request - Nem megfeflelő az ID <br/> 404 Not Found - A felhasználó nem található <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/email` | GET | Egy adott kitiltott/törölt felhasználó lekérdezése E-mail alapján | 200 OK - Sikeres lekérdezés <br/> 400 Bad request - Az e-mail nincs megadva <br/> 404 Not Found - A felhasználó nem található <br/> 500 Internal Server - Sikertelen lekérdezés |
| **/achievements - Szülő útvonal** | | | |
| `/`                             | GET         | Az összes elért eredmény lekérése. | 200 OK - Összes eredmény lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott eredmény lekérése ID alapján. | 200 OK - Eredmény megtalálva <br/> 400 Bad Request - Érvénytelen adatok <br/> 404 Not Found - Eredmény nem létezik |
| `/`                             | PUT         | Új eredmény hozzáadása. | 201 Created - Új eredmény hozzáadva <br/> 500 Internal Server Error - Sikertelen hozzáadás |
| `/{id}`                         | POST        | Létező eredmény frissítése ID alapján. | 200 OK - Eredmény frissítve <br/> 500 Internal Server Error - Sikertelen frissítés |
| **/exercises - Szülő útvonal**  | | | |
| `/`                             | GET         | Az összes edzés lekérése. | 200 OK - Összes edzés lekérve <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/{id}`                         | GET         | Egy adott felhasználó edzéseinek lekérése ID alapján. | 200 OK - Sikeres lekérdezés <br/> 400 Bad Request - Érvénytelen adatok <br/> 404 Not Found - Felhasználó nem található <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/stats/sum`                    | GET         | Összesített edzésstatisztika lekérése. | 200 OK - Sikeres lekérdezés <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/stats/{type}`                  | GET         | Egy adott edzéstípus statisztikájának lekérése. | 200 OK - Sikeres lekérdezés <br/> 400 Bad Request - Érvénytelen edzéstípus <br/> 500 Internal Server Error - Sikertelen lekérdezés |
| `/log`                          | POST        | Edzésnaplózás és XP szerzés. | 200 OK - Sikeres naplózás <br/> 401 Unauthorized - Érvénytelen token <br/> 400 Bad Request - Érvénytelen ID <br/> 403 Forbidden - Csak saját adatok módosíthatók <br/> 400 Bad Request - Érvénytelen formátum <br/> 500 Internal Server Error - Sikertelen naplózás |
| **/leaderboard - Szülő útvonal** | | | 
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
