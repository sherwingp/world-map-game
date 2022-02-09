describe("Game", () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it("should have a header", () => {
    cy.url().should("include", "/game");
    cy.get("h1").contains("World map game");
  });

  it("should have a map", () => {
    cy.get("[id=my-map]");
  });

  it("should have a list of clues", () => {
    cy.get("li").contains("This country has many states");
    cy.get("li").contains("Where is Disneyland's home");
    cy.get("li").contains("It has the nickname 'Magic City'");
  });

  it("should have a list of players", () => {
    cy.get("li").contains("Kenny");
  });
});
