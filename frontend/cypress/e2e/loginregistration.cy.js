describe('Penn LFG End-to-End Tests', () => {
    const appUrl = 'http://localhost:3000'; 
    const username = 'sem2';
    const password = 'password243';
  
    beforeEach(() => {
      cy.visit(appUrl);
    });

  
  
    it('Testing registration flow', () => {
      cy.contains('button', 'Register').click(); 
    
      cy.get('input[placeholder="username"]').type(username);
      cy.get('input[placeholder="password"]').type(password);
      cy.get('input[placeholder="first name"]').type('John');
      cy.get('input[placeholder="last name"]').type('Doe');
    
      cy.get('.custom-button.large').contains('Register').click(); 
    
      cy.contains('My Feed').should('be.visible');
    });
    
  
    it('Testing login flow', () => {
      cy.get('button').contains('Login').click(); 
  
      cy.get('input[placeholder="username"]').type('seme2e');
      cy.get('input[placeholder="password"]').type('sem');
  
      cy.get('.custom-button.large').contains('Login').click(); 
  
      cy.contains('My Feed').should('be.visible');
    });
  
  });
  