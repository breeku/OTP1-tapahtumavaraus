describe('Toiminnalisuuksien testailua', () => {
    it('Pääsee onnistuneesti etusivulle', function () {
      cy.visit('/')

      cy.contains('Koti')
    })
    it('Navigoinnin testus', () => {
      cy.visit('/')

      cy.get('[data-cy=tapahtumaNav]').click()

    })

    it('Hakee tapahtumia, painaa niistä ensimmäistä, arvostelee tapahtuman ja varaa lipun', () => {
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

      cy.get('[data-cy=arvosteluNappi]').click()
      cy.get('[data-cy=arvosteluTekstikentta]').type("Arvostelu tekstiä")

      cy.get('[data-cy=arvosteluTahdet]').click()

      cy.get('[data-cy=varaaNappi]').click()
      cy.get('[data-cy=vahennaNappivaraus]').click()
      cy.get('[data-cy=omavarausMaara]').contains('0')
      cy.get('[data-cy=lisaaNappivaraus]').click()
      cy.get('[data-cy=omavarausMaara]').contains('1')
      
      })

     //Voidaan ajaa vain jos, jostain tietystä tapahtumasta löytyy arvosteluja.
     
      it('Tapahtumasta löytyy arvosteluja', () => {
        cy.visit('/events/helsinki:afyho6epwy')
        cy.get('[data-cy=arvosteluLista]').eq(1).contains('Hederi')
      })

//testi toimii jos tietokanta on tyhjä    
    it('Luo käyttäjä toiminnon testaus', () => {

      cy.visit('/')
      cy.get('[data-cy=kirjauduNav]').click()
      cy.get('[data-cy=luokayttajaNappi]').click()
      cy.get('[data-cy=luoEtunimi]').type('Tepi')
      cy.get('[data-cy=luoSukunimi]').type('Testaaja')
      cy.get('[data-cy=luoKayttajaTunnus]').type('TeTe')
      cy.get('[data-cy=luoSalasana]').type('1234')
      cy.get('[data-cy=luoSahkoposti]').type('aaa@email.com')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
      cy.contains('Käyttäjätunnuksen luominen epäonnistui')

      cy.reload()

      cy.get('[data-cy=kirjauduNav]').click()
      cy.get('[data-cy=luokayttajaNappi]').click()
      cy.get('[data-cy=luoEtunimi]').type('Tepi')
      cy.get('[data-cy=luoSukunimi]').type('Testaaja')
      cy.get('[data-cy=luoKayttajaTunnus]').type('TeTe')
      cy.get('[data-cy=luoSalasana]').type('1234')
      cy.get('[data-cy=luoSahkoposti]').type('tepi.testaaja@email.com')
      cy.get('[data-cy=luoTunnuksetNappi]').click()
    })
  
    it('Epäonnistunut kirjautuminen sekä kirjautuminen testikäyttäjälle ja uloskirjautuminen', () => {
      cy.visit('/')

      cy.get('[data-cy=kirjauduNav]').click()
      cy.get('[data-cy=kirjauduNappi]').click()
      cy.contains('Kirjautuminen epäonnistui')
      cy.get('[data-cy=kirjSahkoposti]').type("tepi.testaaja@email.com")
      cy.get('[data-cy=kirjSalasana]').type("1234")
      cy.get('[data-cy=kirjauduNappi]').click()
      cy.get('[data-cy=profiiliNav]').click() 
      cy.get('[data-cy=ulosKirjNappi]').click()
      cy.get('[data-cy=kirjauduNav]')
    })

    Cypress.Commands.add('login', () => { 
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/auth/login',
        body: {
            email: 'aaa@email.com',
            password: '1234',
        }
      })
      .then((resp) => {
        window.localStorage.setItem('token', resp.body.token)
      })
    })

    it('Kirjaudutaan testikäyttäjälle ja katsotaan sieltä käyttäjän varattuja tapahtumia', () => {
      cy.login()
      cy.visit('/profile')
      cy.contains('Varaukset')
    })
  })