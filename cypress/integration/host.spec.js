describe("Host", () => {
  it("ask the host for the secret location", () => {
    cy.visit("http://localhost:3000/game");

    cy.get("[class=messageBox]").contains("Select your secret location");
    cy.get("[id=my-map]").click("center");
    cy.get("[class=message]").should("be.empty");
  });
});
