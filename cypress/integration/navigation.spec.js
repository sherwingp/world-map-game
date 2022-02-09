describe('Game', () => {
  it('should have a header', () => {
    cy.visit('http://localhost:3000/game')

    cy.url().should('include', '/game')
    cy.get('h1').contains('World map game')
  })

  it('should have a map', () => {
    cy.visit('http://localhost:3000/game')
    
    cy.get('img')
  })

  it('should have a list of clues', () => {
    cy.visit('http://localhost:3000/game')
    
    cy.get('li').contains('This country has many states')
    cy.get('li').contains("Where is Disneyland's home")
    cy.get('li').contains("It has the nickname 'Magic City'")
  })
})