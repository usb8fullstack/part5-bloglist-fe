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

  it('user can log in', function () {
    cy.get('#username').type('user1')
    cy.get('#password').type('passuser1')
    cy.get('#login-button').click()

    cy.contains('one logged in')
  })
})