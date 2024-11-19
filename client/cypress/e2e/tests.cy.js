describe('Pet App Tests', () => {
  it('Should show the landing page', () => {
    cy.visit('/');

    cy.get('nav a[href="/login"]').click();
  })
})