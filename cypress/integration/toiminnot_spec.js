describe('Toiminnalisuuksien testailua', () => {
    it('Pääsee onnistuneesti etusivulle', function () {
      cy.visit('/')     
      cy.contains('Koti')
      cy.get('[data-cy=kielenVaihto]').dblclick();
    })
    it('Navigoinnin testus', () => {
      cy.visit('/')

      cy.get('[data-cy=tapahtumaNav]').click()

    })

//Testien otsikot kertovat mitä toimintoja niillä testataan.

    it('Hakee tapahtumia, painaa niistä ensimmäistä, arvostelee tapahtuman ja varaa lipun', () => {
      cy.login()
      cy.visit('/events')
    
      cy.contains('Valitse kieli').click()
      cy.contains('FI').click()

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
     
      it('Tapahtumasta löytyy arvosteluja', () => {
        cy.visit('/events/helsinki:afyho6epwy')
        cy.get('[data-cy=arvosteluLista]').eq(1).contains('Hederi')
      })
  
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

    it('Epäonnistunut kirjautuminen sekä kirjautuminen testikäyttäjälle', () => {
      
      cy.get('[data-cy=kirjauduNav]').click()
      cy.get('[data-cy=kirjauduNappi]').click()

      cy.contains('Kirjautuminen epäonnistui')
      cy.get('[data-cy=luokayttajaNappi]').click()
      cy.get('[data-cy=luoKirjasisaan]').click()

      cy.get('[data-cy=kirjSahkoposti]').type("bbb@email.com")
      cy.get('[data-cy=kirjSalasana]').type("54321")
      cy.get('[data-cy=kirjauduNappi]').click()
      cy.get('[data-cy=kirjauduForm]').submit()
     /* cy.wait(1000)
      cy.get('[data-cy=profiiliNav]').click()
 
      cy.get('[data-cy=ulosKirjNappi]').click()
      cy.get('[data-cy=kirjauduNav]').click()

      cy.get('[data-cy=kirjSahkoposti]').type("bb@email.com")
      cy.get('[data-cy=kirjSalasana]').type("54321")
      cy.get('[data-cy=kirjauduForm]').submit() */
    })

    //valmis kirjautuminen
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
  })