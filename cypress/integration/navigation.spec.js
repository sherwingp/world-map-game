describe("Game", () => {
  it("should have a header", () => {
    cy.visit("http://localhost:3000/game");

    cy.url().should("include", "/game");
    cy.get("h1").contains("World map game");
  });

  it("should have a map", () => {
    cy.visit("http://localhost:3000/game");

    cy.get("[id=my-map]");
  });
});
