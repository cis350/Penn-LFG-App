/* eslint-disable no-undef */
describe('Penn LFG End-to-End Tests', () => {
  const appUrl = 'http://localhost:3000';
  const username = 'seme2e'; 
  const password = 'sem';

  beforeEach(() => {
    cy.visit(appUrl);
    cy.get('button').contains('Login').click();
    cy.get('input[placeholder="username"]').type(username);
    cy.get('input[placeholder="password"]').type(password);
    cy.get('.custom-button.large').contains('Login').click();
    cy.contains('My Feed').should('be.visible');
  });

  it('Testing create a post flow', () => {
    cy.contains('Create Posts +').click();

    // Fill out the form for creating a post
    cy.get('input[name="title"]').type('For End2End');
    cy.get('textarea[name="description"]').type('This is a test for e2e testing.');
    cy.get('input[name="courseName"]').type('CIS 3500');
    cy.get('input[name="lookingFor"]').type('3');
    cy.get('input[value="Online"]').check(); // Assuming radio buttons for communication mode
    cy.get('input[id="tags"]').type('tag1').type('{enter}').type('tag2').type('{enter}');

    // Submit the post
    cy.get('button').contains('Create post').click();

    // Verify post appears in feed
    cy.contains('My Feed').click(); // Assuming clicking this navigates back to the feed
    cy.contains('Test Title').should('be.visible');
    cy.contains('This is a test for e2e testing.').should('be.visible');
    cy.contains('CIS 3500').should('be.visible');
    cy.contains('3').should('be.visible');
    cy.contains('Online').should('be.visible');
    cy.contains('tag1').should('be.visible');
    cy.contains('tag2').should('be.visible');
  });

  it('Testing logout flow', () => {
    cy.get('button').contains('Logout').click(); 
    cy.contains('Login').should('be.visible'); // Ensure login button or screen is visible after logout
  });

  it('Edit a post flow', () => {
    // Navigate to My Account to view own posts
    cy.contains('My Account').click();

    // Click on the Edit button of the first post
    cy.get('.post-card').first().find('.custom-button').contains('Edit').click();

    // Make changes to the post
    cy.get('input[name="title"]').clear().type('Updated Title');
    cy.get('textarea[name="description"]').clear().type('Updated Description');
    cy.get('input[name="courseName"]').clear().type('Updated Course');
    cy.get('input[name="lookingFor"]').clear().type('4');
    cy.get('input[name="modeOfCommunication"][value="Online"]').check();
    cy.get('input[id="tags"]').type('tag3').type('{enter}')

    // Submit the changes
    cy.get('button').contains('Confirm changes').click();

    // Verify that user is redirected to the Feed page
    cy.url().should('eq', `${appUrl}/feed`);

    // Verify changes are reflected on the Feed page
    cy.contains('Updated Title').should('be.visible');
    cy.contains('Updated Description').should('be.visible');
    cy.contains('Updated Course').should('be.visible');
    cy.contains('Group Size: 4').should('be.visible');
    cy.contains('tag3').should('be.visible');
  });

  it('Delete a post flow', () => {
    // Navigate to My Account to view own posts
    cy.contains('My Account').click();

    // Click on the Edit button of the first post
    cy.get('.post-card').first().find('.custom-button').contains('Edit').click();

    // Capture the title of the post to delete for verification later
    cy.get('input[name="title"]').invoke('val').then((postTitle) => {
      // Click on the Delete Post button
      cy.get('.custom-button').contains('Delete Post').click();

      // Confirm the deletion if there's a prompt or modal (this step depends on your application's behavior)
      // Example: cy.get('.confirmation-dialog').contains('Confirm').click();

      // Verify that user is redirected back to the My Account page or Feed page
      cy.url().should('include', '/account'); // or check for '/feed' if it redirects there

      // Verify the post is no longer visible
      cy.contains(postTitle).should('not.exist');
    });
  });
});
