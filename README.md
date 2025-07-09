
# 🎬 ScenaDialogo

**ScenaDialogo** è un'applicazione React sviluppata per l’esame finale del corso di *Front-End Programming*. Il progetto simula una piattaforma di streaming in stile Netflix/Disney+, includendo funzionalità di autenticazione, navigazione dinamica, interazioni sociali e gestione avanzata dello stato con Redux.

---

## 🎯 Obiettivi

* Creare un'interfaccia utente responsive e moderna
* Implementare un sistema di autenticazione con ruoli
* Visualizzare dinamicamente film e serie TV da API esterne
* Offrire interazione tra utenti tramite gruppi community
* Integrare Redux per gestione stato e fetch asincroni
* Utilizzare form controllati e validazioni lato client

---

## 🛠️ Tecnologie

* **React** con JSX e React Router DOM
* **Redux Toolkit** + Redux Thunk per la gestione dello stato
* **Bootstrap 5** + CSS personalizzato (stile moderno, responsive)
* **Tailwind CSS** (configurato per effetti visivi e sezioni modulari)
* **TMDB API** per ottenere dati reali su film e serie
* **LocalStorage** per la persistenza locale di utente, ruoli e commenti

---

## 🗂️ Struttura del progetto

```
src/
├── assets/             # Logo e immagini statiche
├── components/         # Navbar, Footer, Card, ProtectedRoute, ecc.
├── pages/              # Tutte le pagine (Login, Home, Serie, Profilo, ecc.)
├── store/              # Redux slices (authSlice, contentSlice)
├── api.js              # Funzioni per fetch da TMDB
├── index.css           # Stili personalizzati
├── App.jsx             # Routing principale
└── main.jsx            # Entrypoint dell’app
```

---

## 🔐 Sistema di Autenticazione

* Login simulato con `localStorage` e Redux Persist
* Due ruoli supportati: `admin` e `community`
* Accesso protetto tramite `ProtectedRoute` con restrizioni su routing
* Logout completo e redirect automatico

---

## 🧭 Routing Dinamico

| Percorso                                       | Descrizione                             |
| ---------------------------------------------- | --------------------------------------- |
| `/`                                            | Landing page iniziale                   |
| `/home`                                        | Homepage con contenuti                  |
| `/film`, `/series`                             | Elenchi con paginazione                 |
| `/film/:id`, `/series/:id`                     | Pagine di dettaglio dinamico            |
| `/community-register`, `/community/:groupName` | Community (ruolo `community` o `admin`) |
| `/profile`                                     | Profilo personale con gestione          |
| `/dashboard`                                   | Area admin con gestione contenuti       |
| `*`                                            | Pagina 404 NotFound                     |

---

## ✨ Pagine Principali

### ✅ Landing Page

* Layout centrato con logo e offerta
* Pulsanti traslucidi stile Apple

### ✅ Home

* Hero dinamico con contenuto in evidenza
* Sezioni per film e serie con paginazione
* Navigazione fluida tra elementi

### ✅ Film / Serie TV

* Contenuti da TMDB API (fetch con Redux Thunk)
* Pagine dettagliate: poster, trama, voti, trailer, cast, crew
* Likes/dislikes salvati localmente

### ✅ Commenti e Gruppi

* Commenti per ogni contenuto salvati su `localStorage`
* Accesso ai gruppi solo per ruoli autorizzati
* Pulsante dinamico per entrare nel gruppo relativo al contenuto

### ✅ Profilo Utente

* Sidebar con sezioni personali
* Modifica password con validazione completa
* Gestione abbonamento e gruppi

### ✅ Dashboard Admin

* Accessibile solo con ruolo `admin`
* Aggiunta/rimozione di contenuti dallo store Redux
* Estendibile per gestione utenti

---

## ✅ Form Controllati e Validazione

* Form login, registrazione, modifica password e commenti
* Validazioni JavaScript con feedback immediato
* Regex per email, password, carta e scadenza

---

## 🔧 API Utilizzate

* **The Movie Database API**
  [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)
* Fetch asincroni via Redux Thunk + funzioni centralizzate in `api.js`

---

## 🔑 Credenziali di test

**Utente standard:**

* Email: `user@streamnow.com`
* Password: `user123`

**Amministratore:**

* Email: `admin@streamnow.com`
* Password: `admin123`

---

## ▶️ Installazione e Avvio

1. **Clona il repository**

```bash
git clone https://github.com/Bruno-deche/Scenadialogo.git

```

2. **Installa le dipendenze**

```bash
npm install
```

3. **Avvia il progetto**

```bash
npm run dev
```

4. **Visita**

```
http://localhost:5173
```

---

## 📌 Considerazioni Finali

* Tutti i requisiti del final exam sono **pienamente rispettati**
* Architettura solida e scalabile
* Routing, ruoli, autenticazione e validazioni ben implementati
* **Codice interamente commentato** e formattato per la massima leggibilità
* UI coerente, responsive e user-friendly

---

## 👤 Autore

**Bruno Checchi**
Studente di Ingegneria Informatica
Epicode Institute of Technology

---



