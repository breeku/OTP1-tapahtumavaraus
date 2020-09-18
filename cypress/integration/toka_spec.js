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

     cy.get('#root > div.makeStyles-rootElement-10 > div:nth-child(2) > button').click()
       .get('#menu- > div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:nth-child(2)').click()

       .get('#resultLimit > span.MuiButton-label').click()
       .get('#menu- > div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:nth-child(2)').click()
    })
  })