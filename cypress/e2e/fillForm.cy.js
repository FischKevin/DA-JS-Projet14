describe('Fill form', () => {
    it('Fills out the form', () => {
        cy.visit('http://localhost:5173/');

        // Remplir les champs du formulaire
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');

        // Sélectionner une date de naissance
        cy.get('.date-of-birth-picker input').click().type('12-01-2000');

        // Sélectionner une date de début
        cy.get('.start-date-picker input').click().type('12-01-2023');

        // Remplir les autres champs
        cy.get('input[name="street"]').type('123 Main St');
        cy.get('input[name="city"]').type('Anytown');

        cy.get('#state-select').click();
        cy.get('li[data-value="AK"]').click();

        // Assurez-vous que les valeurs correspondent à celles de votre application
        cy.get('input[name="zipCode"]').type('12345');

        // Sélectionner le département depuis un dropdown
        cy.get('#department-select').click(); // Utilisez la valeur exacte ou l'index
        cy.get('li[data-value="Engineering"]').click();

        // Soumettre le formulaire
        cy.get('button').contains('Save').click();
    });
});
