describe("Clue form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/game");
  });

  it("lets player enter clues", () => {
    cy.get("[id=clue-input]").type("It has the nickname 'Magic City'");

    cy.get('input[name="submit-clue"]').should("be.visible").click();

    cy.get("li").contains("It has the nickname 'Magic City'");
  });
});
