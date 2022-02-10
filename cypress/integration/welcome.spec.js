describe("Welcome page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("enters a player name", () => {
    cy.get("input").type("Zoe");

    cy.get('button[type="submit"]').should("be.visible").click();
  });
});
