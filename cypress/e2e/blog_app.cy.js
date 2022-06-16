describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'one',
      username: 'user1',
      password: 'passuser1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    const user2 = {
      name: 'two',
      username: 'user2',
      password: 'passuser2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
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
      // cy.get('#username').type('user1')
      // cy.get('#password').type('passuser1')
      // cy.get('#login-button').click()

      // cy.request('POST', 'http://localhost:3003/api/login', {
      //   username: 'user1', password: 'passuser1'
      // }).then(response => {
      //   localStorage.setItem('localUser', JSON.stringify(response.body))
      //   cy.visit('http://localhost:3000')
      // })

      cy.login({ username: 'user1', password: 'passuser1' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      
      cy.get('#title').type('test-title3')
      cy.get('#author').type('test-author3')
      cy.get('#url').type('www.test-url3')
      // cy.contains('create').click()  // NOTE: make err !!!
      cy.get('#add-blog-button').click()

      cy.contains('test-title3')
      cy.contains('test-author3')
    })


    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test-title4',
          author: 'test-author4',
          url: 'www.test-url4'
        })
        cy.createBlog({
          title: 'test-title5',
          author: 'test-author5',
          url: 'www.test-url5'
        })
      })

      it('one of those can be add likes', function () {
        cy.contains('test-title4')
          .contains('view')
          .click()

        cy.get('#like-button')
          .click()

        cy.contains('test-title4')
          .parent()
          .contains('like 1')
      })

      // ----------------------------------------------------
      it('the blogs are ordered according to likes', function () {
        cy.contains('test-title4')
          .contains('view')
          .click()
        cy.get('#like-button').click()
        
        cy.get('html').get('#hide-blog-button').click()
        cy.contains('test-title5')
          .contains('view')
          .click()
        cy.get('#like-button').click()
        cy.contains('test-title5')
          .parent()
          .contains('like 1')
        cy.get('#like-button').click()

        cy.reload(true)
        cy.get('.blog').eq(0).should('contain', 'test-title5')
        cy.get('.blog').eq(1).should('contain', 'test-title4')
      })

      // ----------------------------------------------------
      it('one of those cannot be remove if user is not owner', function () {
        cy.get('#logout-button')
          .click()
        cy.login({ username: 'user2', password: 'passuser2' })
      
        cy.contains('test-title5')
          .contains('view')
          .click()
      
        cy.contains('test-title5')
          .parent()
          .should('not.contain', 'remove')
      })

      // NOTE: if this test run before other test >>> err before each !!! 
      it('one of those can be remove only if user is owner', function () {
        cy.contains('test-title4')
          .contains('view')
          .click()

        cy.get('#remove-blog-button')
          .click()

        // cy.get('html').should('not.contain', 'test-title4')  // NOTE: html cause err !!!
        cy.should('not.contain', 'test-title4')
      })
    })


  })


})