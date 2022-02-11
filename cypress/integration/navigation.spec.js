describe("Game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/game");
  });

  it("should have a navbar", () => {
    cy.get("#navbar").should("be.visible");
    cy.get("a").contains("Home");
  });

  it("should have a header", () => {
    cy.url().should("include", "/game");
    cy.get("h1").contains("MAP-PIN");
  });

  it("should add player name to players list", () => {
    cy.get("[id=my-map]");
  });

  it("should have a map", () => {
    cy.get("[id=my-map]");
  });
});
