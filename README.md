# Tapahtumavaraus

[![Coverage Status](https://coveralls.io/repos/github/breeku/OTP1-tapahtumavaraus/badge.svg?branch=master)](https://coveralls.io/github/breeku/OTP1-tapahtumavaraus?branch=master)

Tapahtumavaraus on web-sovellus millä tapahtumajärjestäjät voivat tuoda yhteen heidän tapahtumansa yhden sovelluksen alle ja matkustajat voivat suodattaa tapahtumia varataakseen liput.

SOVELLUKSEN ARKITEHTUURI JA KÄYTETYT TEKNOLOGIAT

•Frontend: React, Material-UI, i18next
•Backend: Node.js, Express, PostgreSQL, Sequelize, Jsonwebtoken
•Version hallinta: Git and GitHub
•Testit: Cypress, Istanbul.js
•Deployment: frontend –Netlify, backend –VPS
•Rajapinta-haku:http://open-api.myhelsinki.fi/
•Jatkuva integrointi: GitHub Actions
•Dokumentaatio: JSDoc

## Devaus

Vs-code:ssa tai muussa kehitysympäristössä etsi "clone repository" -toiminto, ja kopioi alla oleva linkki sen URL-kenttään:

`git clone https://github.com/breeku/OTP1-tapahtumavaraus`

### Riippuvuuksien asennus

Siirry kehitysympäristön (esim. Vs-code) terminaliin, jonne syötetään seuraavat komennot:

`cd ("tapahtumavaraus"-projektin sijainti/polku)` -> `cd frontend && npm install` -> `cd ../backend && npm install`

### Tietokanta

Lataa ja asenna [postgres](https://www.postgresql.org/download/)

Asennuksen mukana tulee pgAdmin jolla pystyt katselemaan tietokantaa.

Backend kansioon luo ".env" jonka sisään tulee tietokantasi käyttäjä, salasana, host, tietokannan nimi ja jwtkey, malliin `DB_USER=käyttäjä`, `DB_PASSWORD=salasana` `DB_HOST=host`, `DB_DATABASE=tietokanta` ja `JWTKEY=avain`. Oletusarvoisesti käyttäjä on `postgres`, salasanan asetat postgressia asentaessa, host on `127.0.0.1`, tietokannan nimen saat itse valita ja jwtkeyn saat myös itse valita.

Sen jälkeen luodaan tietokanta, `npx sequelize-cli db:create`, ja sen jälkeen migrate `npm run migrate`.

#### Tietokannan sisältö

Tietokannan sisällön saat ajamalla `node backend/utils/populate_db.js`

Tietokannalle on myös mock dataa, jotka saat ajamalla `npm run seed` backend kansiosta.

### Koodaus

1. Node dev serverin saat käynnistettyä `backend` kansiosta ajamalla `npm run start`

2. Reactin dev serverin saat käynnistettyä `frontend` kansiosta ajamalla `npm run start`

### Testaus

Testit voi ajaa projektin rootista `npm run test` , ja testien kattavuuden saa `npm run coverage`.

### Dokumentaatio

Dokumentoinnin projektille voi generoida ajamalla rootista `npm run jsdoc`. Dokumentaatio generoituu /docs/ kansioon.

**Dokumentaatio löytyy osoitteesta [http://docs.tapahtumavaraus.tk/](http://docs.tapahtumavaraus.tk/)**

### Muuta

**[prettier](https://prettier.io/)**

**[eslint](https://www.jetbrains.com/help/webstorm/eslint.html)**
