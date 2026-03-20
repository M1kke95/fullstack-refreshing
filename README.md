# Fullstack CRUD App

Dette fullstack prosjektet er laget med **React (vite)** i frontend og **node.js, express og prisma** backend.  
Formålet med dette prosjektet var oppfriskning og demonstrere **CRUD funksjonalitet**.  
CRUD funksjonaliteten inneholder **opprette, lese, endre og slette brukere**.

---

## Funksjoner

- Viser alle brukere i en liste med bruk av **User cards**  
- Opprette nye brukere med et enkelt skjema  
- Oppdatere eksisterende brukere  
- Slette brukere

---

## Teknologier

| Frontend | Backend |
|----------|---------|
| React, Vite, typescript | nodeJs, express, prisma, sqlite |

---

## For å kjøre prosjektet

### Klon repo
```bash
git clone <repo-url>
cd my_Brochure/my-app
```

installer avhengigheter:
npm install
cd server
npm install

start prosjektet fra my-app mappen:
npm start

Prosjektstruktur
my-app/
├─ src/           # React/Vite frontend
├─ server/        # Express + Prisma backend
├─ package.json   # scripts for dev og start

API Endpoints

GET /users – hent alle brukere
GET /users/:id – hent en bruker
POST /users – opprett ny bruker
PUT /users/:id – oppdater bruker
DELETE /users/:id – slett bruker


