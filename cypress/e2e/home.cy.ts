/// <reference types="cypress" />
context('Viewport', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('cy.viewport() - set the viewport size and dimension', () => {
    cy.viewport(320, 480);
    cy.get('[data-testid="app-header"]').should('be.visible');

    cy.get('[data-testid="filters-toggle"]').should('be.visible').click();
    cy.get('[data-testid="product-filters"]').should('be.visible');

    cy.viewport(2999, 2999);
    cy.get('[data-testid="app-header"]').should('be.visible');

    cy.viewport('macbook-15');
    cy.wait(200);
    cy.viewport('macbook-13');
    cy.wait(200);
    cy.viewport('macbook-11');
    cy.wait(200);
    cy.viewport('ipad-2');
    cy.wait(200);
    cy.viewport('ipad-mini');
    cy.wait(200);
    cy.viewport('iphone-6+');
    cy.wait(200);
    cy.viewport('iphone-6');
    cy.wait(200);
    cy.viewport('iphone-5');
    cy.wait(200);
    cy.viewport('iphone-4');
    cy.wait(200);
    cy.viewport('iphone-3');
    cy.wait(200);

    cy.viewport('ipad-2', 'portrait');
    cy.wait(200);
    cy.viewport('iphone-4', 'landscape');
    cy.wait(200);
  });
});

context('Home Page Responsive Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  describe('Header visibility across resolutions', () => {
    const viewports = [
      { name: 'Mobile', size: [375, 667] },
      { name: 'Tablet', size: [768, 1024] },
      { name: 'Desktop', size: [1280, 720] },
      { name: 'Large Desktop', size: [1920, 1080] },
    ];

    viewports.forEach(({ name, size }) => {
      it(`should display header correctly on ${name} (${size[0]}x${size[1]})`, () => {
        cy.viewport(size[0], size[1]);
        cy.wait(200);

        cy.get('[data-testid="app-header"]').should('be.visible');

        cy.get('[data-testid="app-header"]').within(() => {
          cy.get('a[href="/"]').should('be.visible');
          cy.get('[data-testid="language-switcher"]').should('be.visible');
        });

        if (size[0] < 768) {
          cy.get('[data-testid="app-header"]').should('be.visible');
        }
      });
    });
  });

  describe('Sign In functionality', () => {
    it('should open sign in dialog when clicking sign in button on desktop', () => {
      cy.viewport(1280, 720);

      cy.get('[data-testid="app-header"]').within(() => {
        cy.get('[data-testid="login"]').should('be.visible').click();
      });

      cy.get('[data-testid="sign-in-form"]').should('be.visible');

      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should open sign in dialog when clicking sign in button on mobile', () => {
      cy.viewport(375, 667);

      cy.get('[data-testid="app-header"]').within(() => {
        cy.get('[data-testid="login"]').should('be.visible').click();
      });

      cy.get('[data-testid="sign-in-form"]').should('be.visible');
    });
  });

  describe('User Authentication Flow', () => {
    it('should allow user to login and display user avatar', () => {
      cy.viewport(1280, 720);

      cy.get('[data-testid="app-header"]').within(() => {
        cy.get('[data-testid="login"]').should('be.visible').click();
      });

      cy.get('[data-testid="sign-in-form"]').should('be.visible');

      cy.get('input[type="email"]').type('john@mail.com');
      cy.get('input[type="password"]').type('changeme');

      cy.get('[data-testid="sign-in-submit"]').click();

      cy.get('[data-testid="user-avatar"]').should('be.visible');

      cy.get('[data-testid="login"]').should('not.exist');
    });

    it('should open user menu when clicking on user avatar', () => {
      cy.viewport(1280, 720);

      cy.get('[data-testid="app-header"]').within(() => {
        cy.get('[data-testid="login"]').should('be.visible').click();
      });

      cy.get('[data-testid="sign-in-form"]').should('be.visible');
      cy.get('input[type="email"]').type('john@mail.com');
      cy.get('input[type="password"]').type('changeme');
      cy.get('[data-testid="sign-in-submit"]').click();

      cy.get('[data-testid="user-avatar"]').should('be.visible').click();

      cy.get('[data-testid="user-menu-sheet"]').should('be.visible');

      cy.contains('Profile').should('be.visible');
      cy.contains('Manage your account and preferences').should('be.visible');
    });
  });

  describe('Product filters responsive behavior', () => {
    it('should show filters expanded on desktop', () => {
      cy.viewport(1280, 720);

      cy.get('[data-testid="product-filters"]').should('be.visible');
      cy.get('[data-testid="category-filter"]').should('be.visible');
    });

    it('should allow collapsing and expanding filters on desktop', () => {
      cy.viewport(1280, 720);

      cy.get('[data-testid="filters-toggle"]').should('be.visible');

      cy.get('[data-testid="category-filter"]').should('be.visible');
      cy.get('input[type="number"]').should('be.visible');

      cy.get('[data-testid="filters-toggle"]').click();

      cy.get('[data-testid="category-filter"]').should('not.exist');
      cy.get('input[type="number"]').should('not.exist');

      cy.get('[data-testid="filters-toggle"]').click();

      cy.get('[data-testid="category-filter"]').should('be.visible');
      cy.get('input[type="number"]').should('be.visible');
    });
  });

  describe('Product list display', () => {
    it('should display products in grid layout on desktop', () => {
      cy.viewport(1280, 720);

      cy.get('[data-testid="product-list"]').should('be.visible');

      cy.get('[data-testid="product-card"]').should(
        'have.length.greaterThan',
        0
      );

      cy.get('[data-testid="product-list"]').should('have.class', 'grid');
    });

    it('should display products in responsive grid on tablet', () => {
      cy.viewport(768, 1024);

      cy.get('[data-testid="product-list"]').should('be.visible');
      cy.get('[data-testid="product-card"]').should(
        'have.length.greaterThan',
        0
      );

      cy.get('[data-testid="product-card"]').first().should('be.visible');
    });

    it('should display products in single column on mobile', () => {
      cy.viewport(375, 667);

      cy.get('[data-testid="product-list"]').should('be.visible');
      cy.get('[data-testid="product-card"]').should(
        'have.length.greaterThan',
        0
      );

      cy.get('[data-testid="product-card"]').first().should('be.visible');
    });

    it('should allow scrolling through products on all devices', () => {
      const viewports = [
        [375, 667],
        [768, 1024],
        [1280, 720],
      ];

      viewports.forEach(([width, height]) => {
        cy.viewport(width, height);
        cy.wait(200);

        cy.get('[data-testid="product-list"]').should('be.visible');
        cy.scrollTo('bottom');
        cy.wait(500);
        cy.scrollTo('top');
      });
    });
  });

  describe('Product Navigation', () => {
    it('should navigate to product details when clicking on product card', () => {
      cy.viewport(1280, 720);

      cy.get('[data-testid="product-list"]').should('be.visible');
      cy.get('[data-testid="product-card"]').should(
        'have.length.greaterThan',
        0
      );

      cy.get('[data-testid="product-card"]').first().click();

      cy.url().should('include', '/products/');

      cy.contains('Product Details').should('be.visible');
      cy.contains('Back to Home').should('be.visible');
    });

    it('should navigate to product details from different viewports', () => {
      const viewports = [
        [375, 667],
        [768, 1024],
        [1280, 720],
      ];

      viewports.forEach(([width, height]) => {
        cy.viewport(width, height);
        cy.wait(200);

        cy.get('[data-testid="product-list"]').should('be.visible');
        cy.get('[data-testid="product-card"]')
          .should('have.length.greaterThan', 0)
          .first()
          .click();

        cy.url().should('include', '/products/');
        cy.contains('Product Details').should('be.visible');

        cy.go('back');
        cy.url().should('not.include', '/products/');
      });
    });
  });

  describe('Full page responsive integration', () => {
    it('should maintain functionality across viewport changes', () => {
      cy.viewport(1280, 720);
      cy.get('[data-testid="product-list"]').should('be.visible');
      cy.get('[data-testid="product-card"]').should(
        'have.length.greaterThan',
        0
      );

      cy.viewport(768, 1024);
      cy.wait(200);
      cy.get('[data-testid="product-list"]').should('be.visible');

      cy.viewport(375, 667);
      cy.wait(200);
      cy.get('[data-testid="product-list"]').should('be.visible');

      cy.get('[data-testid="app-header"]').should('be.visible');
    });
  });
});
