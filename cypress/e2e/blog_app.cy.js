describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('log in to application')
  })

  it('user can log in', function () {
    // cy.get('input:first').type('user1')
    // cy.get('input:last').type('passuser1')
    cy.get('#username').type('user1')
    cy.get('#password').type('passuser1')
    // cy.contains('login').click()
    cy.get('#login-button').click()

    cy.contains('one logged in')
  })


})