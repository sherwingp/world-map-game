describe("Welcome page", () => {
        beforeEach(() => {
          cy.visit("http://localhost:3000/");
      });
        it("should have a title", () => {
        cy.get("h1").contains("Welcome to MAP-PIN!");
      });

      it("enters a player name", () => {
      cy.get("input").type("Zoe");
      cy.get('button[type="submit"]').should("be.visible").click();
      cy.url().should("include", "/game");
    });

    it("directs to game route", () => {
      cy.get("input").type("Zoe");
      cy.get('button[type="submit"]').should("be.visible").click();
      cy.url().should("include", "/game");
      cy.get('h2').contains('Zoe')
    });
  });
