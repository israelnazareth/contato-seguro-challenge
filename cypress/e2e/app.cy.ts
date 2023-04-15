describe('Home', () => {
  beforeEach(() => {
    cy.intercept('/api/users', { fixture: 'users' }).as('getUsers')
    cy.intercept('/api/companies', { fixture: 'companies' }).as('getCompanies')
  });

  describe('Header', () => {
    it('should have a logo', () => {
      cy.visit('/');
      cy.get('header img').should('be.visible').and('have.attr', 'data-test-id', 'logo');
    });

    it('should have a strong tag', () => {
      cy.visit('/');
      cy.get('header div strong').should('be.visible').and('contain', 'Visualizar:');
    });

    it('should have a button', () => {
      cy.visit('/');
      cy.get('header div button').should('be.visible').and('contain', 'Empresas' || 'Usuários');
    });
  });

  describe('Fields', () => {
    it('should have a insert button', () => {
      cy.visit('/');
      cy.get(`div button svg`).should('be.visible').and('have.attr', 'data-test-id', 'insert-icon');
    });

    it('should have a input search', () => {
      cy.visit('/');
      cy.get(`div input`).should('be.visible').and('have.attr', 'placeholder', 'Buscar...');
    });

    it('should have a select tag', () => {
      cy.visit('/');
      cy.get(`div select`).should('be.visible');
    });

    it('should have some options', () => {
      cy.visit('/');
      cy.get(`div select option`).should('be.visible').and('contain', 'Nome' && 'Email' && 'Telefone' && 'Nascimento' && 'Cidade');
    });
  });

  describe('Table', () => {
    it('should have a table', () => {
      cy.visit('/');
      cy.get('table').should('be.visible');
    });

    it('should have a caption', () => {
      cy.visit('/');
      cy.get('table caption').should('be.visible').and('contain', 'Usuários' || 'Empresas');
    });

    it('should have a thead', () => {
      cy.visit('/');
      cy.get('table thead').should('be.visible').and('contain', 'Nome' && 'Email' && 'Telefone' && 'Nascimento' && 'Cidade' && 'Editar' && 'Excluir');
    });

    it('should have a tbody', () => {
      cy.visit('/');
      cy.get('table tbody').should('be.visible');
    });

    it('should have a tr', () => {
      cy.visit('/');
      cy.get('table tbody tr').should('be.visible')
    });

    it('should have some td', () => {
      cy.visit('/');
      cy.get('table tbody tr td').should('be.visible')
    });

    it('should have a button on a td "Editar"', () => {
      cy.visit('/');
      cy.get('table tbody tr td button svg').should('be.visible').and('have.attr', 'data-test-id', 'edit-icon');
    });
  })
});