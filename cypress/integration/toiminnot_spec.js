describe('Toiminnalisuuksien testailua', () => {

   //Testien otsikot kertovat mitä toimintoja niillä testataan. Testeillä kokeillaan sivuston toimivuutta pääosin käyttöliittymän kautta. Jokaiselle testattavalle elementille on asetettu "data-cy", jonka avulla testit löytävät oikeat elementit käyttöliittymästä
   //Testien eteen on kerrottu lisätietoja mikäli niitä tarvitaan.

    it('Pääsee onnistuneesti etusivulle', function () {
      cy.visit('/')     
      cy.contains('Koti')
      cy.get('[data-cy=kielenVaihto]').dblclick();
    })
    it('Navigoinnin testaus', () => {
      cy.visit('/')

      cy.get('[data-cy=tapahtumaNav]').click()

    })

    
    it('Hakee tapahtumia, painaa niistä ensimmäistä, arvostelee tapahtuman ja varaa lipun', () => {
      cy.login()
      cy.visit('/events')
    
      cy.contains('Valitse kieli').click()
      cy.get('[data-cy=hakuFI]').click()

      cy.get('[data-cy=hakuMaara]').click()
      cy.get('[data-cy=hakuKaksi]').click()

      cy.get('[data-cy=tagSearchButton]').click()
      cy.get('[data-cy=tagiLista]').eq(2).click()
      cy.get('[data-cy=tagSearchButton]').click()
      cy.get('[data-cy=tagiLista]').eq(1).click()
      cy.get('[data-cy=taginPoisto]').eq(1).click()
      cy.get('[data-cy=tagSearchButton]').click()
      cy.get('[data-cy=tagiLista]').eq(2).click()

      cy.get('[data-cy=tapahtumaLista]').eq(0).click()

      cy.get('[data-cy=varaaNappi]').click()
      cy.get('[data-cy=vahennaNappivaraus]').click()
      cy.get('[data-cy=omavarausMaara]').contains('0')
      cy.get('[data-cy=lisaaNappivaraus]').click()
      cy.get('[data-cy=omavarausMaara]').contains('1')
      cy.get('[data-cy=teeVaraus]').click()

      cy.get('[data-cy=arvosteluNappi]').click()
      cy.get('[data-cy=arvosteluTekstikentta]').type("Arvostelu tekstiä")
      cy.get('[data-cy=arvosteluOtsikko]').type('Otsikko')
      cy.get('[data-cy=arvosteluTahdet]').click()
      cy.get('[data-cy=arvosteluSubmit]').click()
      cy.get('[data-cy=arvosteluForm]').submit()
      
      
      cy.get('[data-cy=profiiliNav]').click()
      cy.wait(2000)
    
      })

     //Voidaan ajaa vain jos, jostain tietystä tapahtumasta löytyy arvosteluja.
      /*
      it('Tapahtumasta löytyy arvosteluja', () => {
        cy.visit('/events/helsinki:afyho6epwy')
        cy.get('[data-cy=arvosteluLista]').eq(1).contains('Hederi')
      }) */
  
    it('Luo käyttäjä toiminnon testaus', () => {

      cy.visit('/')
      cy.get('[data-cy=kirjauduNav]').click()
      cy.get('[data-cy=luokayttajaNappi]').click()
      cy.get('[data-cy=luoEtunimi]').type('T')
      cy.get('[data-cy=luoSukunimi]').type('T')
      cy.get('[data-cy=luoKayttajaTunnus]').type('T')
      cy.get('[data-cy=luoSalasana]').type('1')
      cy.get('[data-cy=luoSahkoposti]').type('m')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
      cy.contains('Etunimen pitää')
      cy.get('[data-cy=luoEtunimi]').type('epi')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
      cy.contains('Sähköposti on virheellinen')
      cy.get('[data-cy=luoSahkoposti]').type('{backspace}tepi.testaaja@email.com')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
      cy.contains('Käyttäjätunnuksen pitää')
      cy.get('[data-cy=luoKayttajaTunnus]').type('{backspace}TeTe')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
      cy.contains('Sukunimen pitää')
      cy.get('[data-cy=luoSukunimi]').type('estaaja')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
      cy.contains('Salasanan pitää')
      cy.get('[data-cy=luoSalasana]').type('2345')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
      cy.get('[data-cy=luoTunnuksetForm]').submit()

      cy.get('[data-cy=kirjauduNav]').click()
      cy.get('[data-cy=luokayttajaNappi]').click()
      cy.get('[data-cy=luoEtunimi]').type('Tepi')
      cy.get('[data-cy=luoSukunimi]').type('Testaaja')
      cy.get('[data-cy=luoKayttajaTunnus]').type('TeTe')
      cy.get('[data-cy=luoSalasana]').type('12345')
      cy.get('[data-cy=luoSahkoposti]').type('tepi.testaaja@email.com')
      cy.get('[data-cy=luoTunnuksetForm]').submit()
    })

    it('Kirjautuminen testikäyttäjälle', () => {
      
      cy.get('[data-cy=kirjauduNav]').click()
      cy.get('[data-cy=kirjauduNappi]').click()

      cy.contains('Kirjautuminen epäonnistui')
      cy.get('[data-cy=luokayttajaNappi]').click()
      cy.get('[data-cy=luoKirjasisaan]').click()

      cy.get('[data-cy=kirjSahkoposti]').type("bbb@email.com")
      cy.get('[data-cy=kirjSalasana]').type("54321")
      cy.get('[data-cy=kirjauduNappi]').click()
      cy.get('[data-cy=kirjauduForm]').submit()
    })

    it('Epäonnistunut kirjautuminen', () => {
      cy.get('[data-cy=kirjSahkoposti]').type("bb@email.com")
      cy.get('[data-cy=kirjSalasana]').type("54321")
      cy.get('[data-cy=kirjauduNappi]').click()
      cy.get('[data-cy=kirjauduForm]').submit()
    })

    it('Arvostelun muokkaus', () => {
      cy.login()
      cy.visit('/profile')
      cy.get('[data-cy=muokkaaArvostelu]').eq(0).click()
      cy.get('[data-cy=arvosteluTekstikentta]').type("A")
      cy.get('[data-cy=arvosteluOtsikko]').type('O')
      cy.get('[data-cy=arvosteluTahdet]').click()
      cy.get('[data-cy=arvosteluSubmit]').click()
      cy.get('[data-cy=arvosteluForm]').submit()
      cy.wait(1000)
    })
 
    it('Arvostelun poisto', () => {
      cy.login()
      cy.visit('/profile')
      cy.get('[data-cy=poistaArvostelu]').eq(0).click()
    })

    //valmis kirjautuminen testikäyttäjälle
    Cypress.Commands.add('login', () => { 
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/auth/login',
        body: {
            email: 'aaa@email.com',
            password: '12345',
        }
      })
      .then((resp) => {
        window.localStorage.setItem('token', resp.body.token)
      })
    })

    /* tietokannan seedaus -- tarvitsee muokkausta
    Cypress.Commands.add('seed', () => { 
      cy.exec('cd backend && npm run seed:undo').then((result) => {
        
      })
      cy.exec('cd backend && npm run seed').then((result) => {
        
      })
    }) */

  })