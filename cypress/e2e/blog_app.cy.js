describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'one',
      username: 'user1',
      password: 'passuser1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  xit('front page can be opened', function() {
    cy.contains('log in to application')
  })

  it('login form is shown', function () {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('passuser1')
      cy.get('#login-button').click()
  
      cy.contains('one logged in')
    })

    it.only('fails with wrong credentials', function() {
      cy.get('#username').type('user11')
      cy.get('#password').type('passuser1')
      cy.get('#login-button').click()

      // cy.get('#login-button').should('be.visible')
      // cy.contains('wrong username or password')
      // cy.get('.error').contains('wrong username or password')
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'one logged in')
    })
  })


})