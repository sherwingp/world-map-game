describe("Pins", () => {
  it("pins should show on click", () => {
    cy.visit("http://localhost:3000/game");

    cy.get("[id=my-map]").click("center");
    cy.get(`[aria-label="Map marker"]`);
  });
});
