# Tapahtumavaraus

## Devaus

### Projektin kloonaus

Vs-code:ssa tai muussa kehitysympäristössä etsi "clone repository" -toiminto, ja kopioi alla oleva linkki sen URL-kenttään:

`git clone https://gitlab.com/breeku/tapahtumavaraus.git`

### Riippuvuuksien asennus

Siirry kehitysympäristön (esim. Vs-code) terminaliin, jonne syötetään seuraavat komennot:

`cd ("tapahtumavaraus"-projektin sijainti/polku)` -> `npm install` -> `cd client && npm install`

### Tietokanta

Lataa ja asenna [postgres](https://www.postgresql.org/download/)

Asennuksen mukana tulee pgAdmin jolla pystyt katselemaan tietokantaa.

Projektin root kansioon luo ".env" jonka sisään tulee tietokantasi käyttäjä ja salasana, malliin `DB_USER=käyttäjä` ja `DB_PASSWORD=salasana`. Oletusarvoisesti käyttäjä on `postgres` ja salasanan asetat postgressia asentaessa.

Sen jälkeen luodaan tietokanta, `npx sequelize-cli db:create`, ja sen jälkeen migrate `npm run migrate`.

#### Tietokannan sisältö

Tapahtumien tagit saa ajamalla projektin rootista `node server/utils/get_tags.js`

### Koodaus

1. Luo kehitysympäristössä (esim. Vs-codessa) projektin "client"-kansioon ".env"-niminen tiedosto, jonne lisäät tekstin "SKIP_PREFLIGHT_CHECK=true"

2. Terminal:ia käyttäen projektin rootissa (`cd ("tapahtumavaraus"-projektin sijainti/polku)`) komento `npm run dev` käynnistää noden dev serverin ja reactin dev serverin.

### Muuta

**[prettier](https://prettier.io/)**

**[eslint](https://www.jetbrains.com/help/webstorm/eslint.html)**
