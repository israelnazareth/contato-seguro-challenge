import moment from 'moment';
import users from '../fixtures/users.json';
import companies from '../fixtures/companies.json';

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('/api/users', { fixture: 'users' }).as('getUsers')
    cy.intercept('/api/companies', { fixture: 'companies' }).as('getCompanies')
    cy.intercept('/api/users-companies', { fixture: 'users-companies' }).as('getUsersCompanies')
  });

  describe('Header', () => {
    it('should have a logo', () => {
      cy.get('header img').should('be.visible')
        .and('have.attr', 'data-testid', 'logo');
    });

    it('should have a strong tag', () => {
      cy.get('header div strong').should('be.visible')
        .and('contain', 'Visualizar:');
    });

    it('should have a button', () => {
      cy.get('[data-testid="buttonTableChange"]')
        .should('be.visible').and('contain', 'Empresas')
        .and('prop', 'onclick').and('be.a', 'function', 'handleTableChange');
    });
  });

  describe('Fields', () => {
    it('should have a insert button', () => {
      cy.get(`div button svg`).should('be.visible')
        .and('have.attr', 'data-testid', 'insert-icon');
    });

    it('should have a input search', () => {
      cy.get(`div input`).should('be.visible')
        .and('have.attr', 'placeholder', 'Buscar...');
    });

    it('should have a select tag', () => {
      cy.get(`div select`).should('be.visible');
    });

    it('should have some options', () => {
      cy.get(`div select option`).should('be.visible')
        .and('contain', 'Nome' && 'Email' &&
          'Telefone' && 'Nascimento' && 'Cidade');
    });
  });

  describe('Users Table', () => {
    it('should have a table', () => {
      cy.get('table').should('be.visible');
    });

    it('should have a caption', () => {
      cy.get('table caption').should('be.visible')
        .and('contain', 'Usuários');
    });

    it('should have a thead', () => {
      cy.get('table thead').should('be.visible')
        .and('contain', 'Nome' && 'Email' && 'Telefone' &&
          'Nascimento' && 'Cidade' && 'Editar' && 'Excluir');
    });

    it('should have a tbody', () => {
      cy.get('table tbody').should('be.visible');
    });

    it('should have some tr', () => {
      cy.get('tbody > tr').should('be.visible')
        .should('have.length', users.length);
    });

    it('should have some td with correct values', () => {
      cy.get('tr > td').should('be.visible').and('have.length', 14);

      const columns = [
        'Nome', 'Email', 'Telefone', 'Nascimento',
        'Cidade', 'Editar', 'Excluir'
      ];
      const data = [
        'name', 'email', 'phone',
        'birth_date', 'city'
      ];

      columns.forEach((column, index) => {
        const dataIndex = data[index];

        cy.get(`td[data-label="${column}"]`)
          .should('have.length', users.length).and('be.visible')

        users.forEach((user) => {
          if (column === 'Nascimento') {
            cy.get(`td[data-label="${column}"]`)
              .should('contain', moment(user[dataIndex as keyof typeof user])
                .format('DD/MM/YYYY'))
          } else if (column === 'Editar' || column === 'Excluir') {
            cy.get(`td[data-label="${column}"] button`)
              .should('be.visible').and('prop', 'onclick')
              .and('be.a', 'function', 'handleEditButton' || 'handleRemoveContact');
          } else {
            cy.get(`td[data-label="${column}"]`)
              .should('contain', user[dataIndex as keyof typeof user])
          }
        });
      });
    });
  })

  describe('Companies Table', () => {
    beforeEach(() => {
      cy.get('[data-testid="buttonTableChange"]').click();
    });

    it('should have a table', () => {
      cy.get('table').should('be.visible');
    });

    it('should have a caption', () => {
      cy.get('table caption').should('be.visible')
        .and('contain', 'Empresas');
    });

    it('should have a thead', () => {
      cy.get('table thead').should('be.visible')
        .and('contain', 'Nome' && 'CNPJ' && 'Endereço'
          && 'Usuários' && 'Editar' && 'Excluir');
    });

    it('should have a tbody', () => {
      cy.get('table tbody').should('be.visible');
    });

    it('should have some tr', () => {
      cy.get('tbody > tr').should('be.visible')
        .should('have.length', users.length);
    });

    it('should have some td with correct values', () => {
      cy.get('tr > td').should('be.visible').and('have.length', 12);

      const columns = [
        'Nome', 'CNPJ', 'Endereço', 'Usuários',
        'Editar', 'Excluir'
      ];
      const keys = ['name', 'cnpj', 'address', 'users'];

      columns.forEach((column, index) => {
        const key = keys[index];

        cy.get(`td[data-label="${column}"]`)
          .should('have.length', companies.length).and('be.visible')

        companies.forEach((company) => {
          if (column === 'Editar' || column === 'Excluir') {
            cy.get(`td[data-label="${column}"] button`)
              .should('be.visible').and('prop', 'onclick')
              .and('be.a', 'function', 'handleEditButton' || 'handleRemoveContact');
          } else if (column === 'Usuários') {
            cy.get(`td[data-label="${column}"]`)
              .should('contain', company['users']
                .map((userID: any) => users
                  .map((user: any) => user.id === userID ? user.name : null)
                  .filter((name: any) => name !== null)).join(', '));
          } else {
            cy.get(`td[data-label="${column}"]`)
              .should('contain', company[key as keyof typeof company])
          }
        });
      });
    });
  });
});
