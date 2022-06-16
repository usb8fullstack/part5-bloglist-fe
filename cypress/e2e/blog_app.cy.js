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

    it('fails with wrong credentials', function() {
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


  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('passuser1')
      cy.get('#login-button').click()
    })

    it.only('a new blog can be created', function() {
      cy.contains('new blog').click()
      
      cy.get('#title').type('test-title3')
      cy.get('#author').type('test-author3')
      cy.get('#url').type('test-url3')
      // cy.contains('create').click()  // NOTE: make err !!!
      cy.get('#add-blog-button').click()

      cy.contains('test-title3')
      cy.contains('test-author3')
    })
  })


})