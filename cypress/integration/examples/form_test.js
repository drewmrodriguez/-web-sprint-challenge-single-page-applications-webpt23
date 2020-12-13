describe("Lambda Eats", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/pizza");
    });
  
    const nameInput = () => cy.get('[name="name"]');
    const sizeDrowdown = () => cy.get("select");
    const olivesCheckbox = () => cy.get(":nth-child(8) > input");
    const mushroomsCheckbox = () => cy.get(":nth-child(10) > input");
    const jalapenosCheckbox = () => cy.get(":nth-child(12) > input");
    const extraCheeseCheckbox = () => cy.get(":nth-child(14) > input");
    const instructionsInput = () => cy.get('[name="instructions"]');
    const submitButton = () => cy.get("button");
  
    it("Text can be added to box", () => {
      nameInput().type("Drew").should("have.value", "Drew");
      instructionsInput()
        .type("Leave at door")
        .should("have.value", "Leave at door");
    });
  
    it("Multiple toppings can be selected", () => {
      olivesCheckbox().click().click();
      mushroomsCheckbox().click().click();
      jalapenosCheckbox().click().click();
      extraCheeseCheckbox().click().click();
    });
  
    it("Form can be submitted", () => {
      nameInput().type("Drew");
      sizeDrowdown().select("Large");
      olivesCheckbox().click();
      mushroomsCheckbox().click();
      jalapenosCheckbox().click();
      extraCheeseCheckbox().click();
      instructionsInput().type("Leave at door");
      submitButton().click();
    });
  });