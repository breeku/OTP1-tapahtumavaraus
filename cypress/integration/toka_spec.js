describe('Ensimmäiset testit', () => {
    it('Pääsee onnistuneesti etusivulle', function () {
      cy.visit('/')

      cy.contains('Koti')
    })
    it('Menee etusivulle ja painaa tapahtumat välilehteä', () => {
      cy.visit('/')

      cy.get('#root > div.makeStyles-root-1 > header > div > a:nth-child(2) > button > span.MuiButton-label').click()
    })
    it('Vaihtaa rajauksia tapahtumat sivulla', () => {
      cy.visit('/events')

      cy.get('#root > div.makeStyles-rootElement-11 > div > div:nth-child(1) > button').click()
       .get('#menu- > div.MuiPaper-root-326.MuiMenu-paper-322.MuiPopover-paper-325.MuiPaper-elevation8-337.MuiPaper-rounded-327 > ul > li:nth-child(1)').click()
      
       
       .get('#resultLimit').click()
       .get('#menu- > div.MuiPaper-root-618.MuiMenu-paper-614.MuiPopover-paper-617.MuiPaper-elevation8-629.MuiPaper-rounded-619 > ul > li:nth-child(2)').click()
    
       .get('#resultLimit').click()
       .get('#menu- > div.MuiPaper-root-910.MuiMenu-paper-906.MuiPopover-paper-909.MuiPaper-elevation8-921.MuiPaper-rounded-911 > ul > li:nth-child(1)').click()
      })
    it('Hakusivulle saadaan tapahtuma ja löydetään se', () => {
      cy.visit('/events')

      cy.get('#root > div.makeStyles-rootElement-11 > div > div:nth-child(1) > button').click()
        .get('#menu- > div.MuiPaper-root-326.MuiMenu-paper-322.MuiPopover-paper-325.MuiPaper-elevation8-337.MuiPaper-rounded-327 > ul > li:nth-child(1)').click()
      
        .get('#root > div.makeStyles-rootElement-11 > div > div:nth-child(3) > button > span.MuiButton-label-370').click()
        .get('#menu- > div.MuiPaper-root-618.MuiMenu-paper-614.MuiPopover-paper-617.MuiPaper-elevation8-629.MuiPaper-rounded-619 > ul > li:nth-child(2)').click()

        .get('#root > div.makeStyles-rootElement-11 > a:nth-child(3) > div > div > p')
      })
  })