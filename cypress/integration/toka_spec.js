const { cyan } = require("color-name")

describe('My First Test', () => {
    it('menee sivulle', function () {
      cy.visit('http://localhost:3000/')
    })
  })