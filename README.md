# Tapahtumavaraus

## Devaus

### Projektin kloonaus

Vs-code:ssa tai muussa kehitysympäristössä etsi "clone repository" -toiminto, ja kopioi alla oleva linkki sen URL-kenttään:

`git clone https://gitlab.com/breeku/tapahtumavaraus.git`

### Riippuvuuksien asennus

Siirry kehitysympäristön (esim. Vs-code) terminaliin, jonne syötetään seuraavat komennot:

`cd ("tapahtumavaraus"-projektin sijainti/polku)` -> `npm install` -> `cd client && npm install`

### Koodaus

1. Luo kehitysympäristössä (esim. Vs-codessa) projektin "client"-kansioon ".env"-niminen tiedosto, jonne lisäät tekstin "SKIP_PREFLIGHT_CHECK=true"

2. Terminal:ia käyttäen projektin rootissa (`cd ("tapahtumavaraus"-projektin sijainti/polku)`) komento `npm run dev` käynnistää noden dev serverin ja reactin dev serverin.

### Muuta

**[prettier](https://prettier.io/)**

**[eslint](https://www.jetbrains.com/help/webstorm/eslint.html)**
