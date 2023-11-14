describe("Test application", () => {
  it("successfully login in to dashboard", () => {
    cy.visit("/");
    cy.get("input[name=email]").type("admn.cwrubio@gmail.com");
    cy.get("input[name=password]").type("BIOClubAdmin!");
    // wait
    cy.wait(1000);

    cy.get("button[type=submit]").click();

    // check if the url is correct
    cy.url().should("include", "/dashboard");

    // wait
    cy.wait(1000);

    cy.get("div[id=classes]").click();

    // wait
    cy.wait(1000);

    cy.get("button[id=add-class-button]").click();

    // wait
    cy.wait(1000);

    cy.get("input[name=name]").type("My Test Class");
    cy.get("button[type=submit]").click();

    // check for the new class, it should be in a div somewhere
    cy.contains("My Test Class");

    // wait
    cy.wait(1000);

    cy.get("button[id=action-button]").first().click();

    // wait
    cy.wait(1000);

    cy.get("input[name=firstName]").type("Tester");
    cy.get("input[name=lastInitial]").type("T");
    cy.get("input[name=readingLevel]").type("1000");

    // wait
    cy.wait(1000);

    cy.get("button[type=submit]").click();

    // wait
    cy.wait(1000);

    cy.get("button[id=show-button]").first().click();

    // wait
    cy.wait(1000);

    cy.get("button[id=line-item-remove-button-Tester-T]")
      .first()
      .scrollIntoView();

    // wait
    cy.wait(1000);

    cy.get("button[id=line-item-remove-button-Tester-T]").first().click();
  });
});
