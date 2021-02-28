// TODO: test against invalid input
// TODO: test against click
// TODO: test against click result
describe("The Home Page", function () {
  it("successfully loads", function () {
    cy.visit("/");

    cy.contains("USD");
    cy.get("#USD-currency-value").type(1).should("have.value", 1);
    cy.get("#CAD-currency-value").type(2).should("have.value", 2);
    cy.get("#CAD-select").click();

    cy.contains("HK$").click();
    cy.get("#HKD-currency-value").type(3.5).should("have.value", 3.5);
    cy.get("#USD-select").click();

    cy.get("#HKD-select-as-new-USD").click();
  });
});
