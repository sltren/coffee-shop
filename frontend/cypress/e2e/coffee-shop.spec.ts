describe('e2e test: Coffee shop', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should save orders, show a toast message, and clear the order summary list', () => {
    // Click espresso, choose medium, quantity 2, check sugar, check milk, milk quantity 2, add order
    cy.get('button[data-cy="button-espresso"]').click();
    cy.get('[data-cy="medium"]').parent().find('input[type="radio"]').scrollIntoView().check({ force: true });
    cy.get('input[data-cy="quantity"]').clear().type('2');
    cy.get('[data-cy="checkbox-sugar"]').parent().find('input[type="checkbox"]').scrollIntoView().check({ force: true }); 
    cy.get('[data-cy="checkbox-milk"]').parent().find('input[type="checkbox"]').scrollIntoView().check({ force: true }); 
    cy.get('input[data-cy="quantity-milk"]').clear().type('2');
    cy.get('button[data-cy="add-order"]').click();

    // Click macchiato, add order, remove order
    cy.get('button[data-cy="button-macchiato"]').click();
    cy.get('button[data-cy="add-order"]').click();
    cy.get('button[data-cy="remove-order-2"]').click();

    // Click americano, add order, remove order
    cy.get('button[data-cy="button-americano"]').click();
    cy.get('button[data-cy="add-order"]').click();
    cy.get('button[data-cy="remove-order-2"]').click();

    // Click macchiato, add order
    cy.get('button[data-cy="button-macchiato"]').click();
    cy.get('button[data-cy="add-order"]').click();

    // Click latte, choose large, qunatity 1, check milk, milk quantity 2, check cream, check caramel, add order
    cy.get('button[data-cy="button-latte"]').click();
    cy.get('[data-cy="large"]').parent().find('input[type="radio"]').scrollIntoView().check({ force: true });
    cy.get('input[data-cy="quantity"]').clear().type('1');
    cy.get('[data-cy="checkbox-milk"]').parent().find('input[type="checkbox"]').scrollIntoView().check({ force: true }); 
    cy.get('input[data-cy="quantity-milk"]').clear().type('2');
    cy.get('[data-cy="checkbox-cream"]').parent().find('input[type="checkbox"]').scrollIntoView().check({ force: true }); 
    cy.get('[data-cy="checkbox-caramel"]').parent().find('input[type="checkbox"]').scrollIntoView().check({ force: true }); 
    cy.get('button[data-cy="add-order"]').click();

    // Check that there are initially 3 placed orders
    cy.get('[data-cy^="remove-order"]').should('have.length', 3);
    
    // Click the Place order button
    cy.get('button[data-cy="place-order"]').click();

    // Assert the toast message appears
    cy.contains('Your orders have been placed successfully. Total Price:').should('be.visible');

    // Verify that the order summary list is cleared after saving
    cy.get('[data-cy^="remove-order"]').should('have.length', 0);
  });
});