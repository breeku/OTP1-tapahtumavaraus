describe('Toiminnalisuuksien testailua', () => {
    it('Pääsee onnistuneesti etusivulle', function () {
      cy.visit('/')

      cy.contains('Koti')
    })
    it('Navigoinnin testus', () => {
      cy.visit('/')

      cy.get('[data-cy=tapahtumaNav]').click()

      cy.get('[data-cy=kirjauduNav]').click()


    })
    it('Hakee tapahtumia ja painaa niistä ensimmäistä', () => {
      cy.visit('/events')

      cy.contains('Valitse kieli').click()
      cy.contains('FI').click()

      cy.get('[data-cy=hakuMaara]').click()
      cy.get('[data-cy=hakuKaksi]').click()

      cy.get('[data-cy=tagSearchButton]').click()
      cy.get('[data-cy=tagiLista]').eq(2).click()

      cy.get('[data-cy=tapahtumaLista]').eq(0).click()

      cy.get('[data-cy=arvosteluNappi]').click()
      cy.get('[data-cy=arvosteluTekstikentta]').type("Arvostelu tekstiä")

      cy.get('[data-cy=arvosteluTahdet]').click()

      cy.get('[data-cy=varaaNappi]').click()
      })

    
  })