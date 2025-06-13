/// <reference types="cypress" />
context('Product Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  describe('Product Details Page', () => {
    it('should navigate to product details from product card and display all elements', () => {
      cy.get('[data-testid="product-list"]').should('be.visible');
      cy.get('[data-testid="product-card"]').should(
        'have.length.greaterThan',
        0
      );

      cy.get('[data-testid="product-card"]').first().click();

      cy.url().should('include', '/products/');

      cy.get('[data-testid="app-header"]').should('be.visible');
      cy.contains('Product Details').should('be.visible');
      cy.contains('Back to Home').should('be.visible');

      cy.get('main.container').should('be.visible');
    });

    it('should display product information correctly', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('h1').should('be.visible');
      cy.contains('$').should('be.visible');
      cy.get('p').should('be.visible');

      cy.get('[data-testid="add-to-cart-button"]').should('be.visible');
      cy.get('[data-testid="go-to-cart-button"]').should('be.visible');
    });

    it('should display image gallery', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('img').should('be.visible');
      cy.get('figure').should('be.visible');
    });

    it('should allow adding product to cart', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('[data-testid="add-to-cart-button"]').should('be.visible').click();

      cy.contains('In Cart').should('be.visible');
      cy.get('button[aria-label*="Decrease quantity"]').should('be.visible');
      cy.get('button[aria-label*="Increase quantity"]').should('be.visible');
    });

    it('should navigate to cart page', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('[data-testid="go-to-cart-button"]').should('be.visible').click();

      cy.url().should('include', '/cart');
      cy.contains('Shopping Cart').should('be.visible');
    });

    it('should navigate back to home', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.contains('Back to Home').click();

      cy.url().should('not.include', '/products/');
      cy.get('[data-testid="product-list"]').should('be.visible');
    });
  });

  describe('Product Details Responsive Tests', () => {
    const viewports = [
      { name: 'Mobile', size: [375, 667] },
      { name: 'Tablet', size: [768, 1024] },
      { name: 'Desktop', size: [1280, 720] },
    ];

    viewports.forEach(({ name, size }) => {
      it(`should display product details correctly on ${name} (${size[0]}x${size[1]})`, () => {
        cy.viewport(size[0], size[1]);
        cy.wait(200);

        cy.get('[data-testid="product-card"]').first().click();
        cy.url().should('include', '/products/');

        cy.get('[data-testid="app-header"]').should('be.visible');
        cy.contains('Product Details').should('be.visible');

        cy.get('h1').should('be.visible');
        cy.get('[data-testid="add-to-cart-button"]').should('be.visible');
        cy.get('[data-testid="go-to-cart-button"]').should('be.visible');

        if (size[0] >= 768) {
          cy.get('main').should('have.class', 'container');
        }
      });
    });
  });

  describe('Authenticated User Actions', () => {
    beforeEach(() => {
      cy.get('[data-testid="app-header"]').within(() => {
        cy.get('[data-testid="login"]').should('be.visible').click();
      });

      cy.get('[data-testid="sign-in-form"]').should('be.visible');
      cy.get('input[type="email"]').type('john@mail.com');
      cy.get('input[type="password"]').type('changeme');
      cy.get('[data-testid="sign-in-submit"]').click();

      cy.get('[data-testid="user-avatar"]').should('be.visible');
    });

    it('should show edit and delete buttons for authenticated users', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('[data-testid="edit-product-button"]').should('be.visible');
      cy.get('[data-testid="delete-product-button"]').should('be.visible');
    });

    it('should open edit sheet when clicking edit button', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('[data-testid="edit-product-button"]')
        .should('be.visible')
        .click();

      cy.get('[data-testid="edit-sheet-title"]').should('be.visible');
      cy.contains('Update product information').should('be.visible');
    });

    it('should open confirm dialog when clicking delete button', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('[data-testid="delete-product-button"]')
        .should('be.visible')
        .click();

      cy.get('[data-testid="confirm-dialog-title"]').should('be.visible');
      cy.contains('Are you sure you want to delete this product').should(
        'be.visible'
      );
      cy.contains('Confirm').should('be.visible');
      cy.contains('Cancel').should('be.visible');
    });
  });

  describe('Product Not Found - Empty Page Tests', () => {
    it('should display product not found page for invalid product ID', () => {
      cy.visit('http://localhost:5173/products/99999');

      cy.get('[data-testid="product-not-found"]').should('be.visible');
      cy.contains('Product not found').should('be.visible');
      cy.get('[data-testid="back-to-home-link"]').should('be.visible');
    });

    it('should display product not found page for text in URL', () => {
      cy.visit('http://localhost:5173/products/invalid-text-id');

      cy.get('[data-testid="product-not-found"]').should('be.visible');
      cy.contains('Product not found').should('be.visible');
      cy.get('[data-testid="back-to-home-link"]').should('be.visible');
    });

    it('should navigate back to home from product not found page', () => {
      cy.visit('http://localhost:5173/products/invalid-text-id');

      cy.get('[data-testid="product-not-found"]').should('be.visible');
      cy.get('[data-testid="back-to-home-link"]').click();

      cy.url().should('eq', 'http://localhost:5173/');
      cy.get('[data-testid="product-list"]').should('be.visible');
    });

    it('should display error icon and styling correctly', () => {
      cy.visit('http://localhost:5173/products/non-existent');

      cy.get('[data-testid="product-not-found"]').should('be.visible');
      cy.get('svg').should('be.visible');
      cy.get('h2').should('have.class', 'text-white');
      cy.get('p').should('have.class', 'text-gray-400');
    });
  });

  describe('Product Page Cart Integration', () => {
    it('should update cart counter when adding products from details page', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('[data-testid="add-to-cart-button"]').click();
      cy.contains('In Cart').should('be.visible');

      cy.get('button[aria-label*="Increase quantity"]').click();
      cy.get('span').contains('2').should('be.visible');

      cy.get('button[aria-label*="Decrease quantity"]').click();
      cy.get('span').contains('1').should('be.visible');
    });

    it('should remove product from cart when quantity reaches zero', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.get('[data-testid="add-to-cart-button"]').click();
      cy.contains('In Cart').should('be.visible');

      cy.get('button[aria-label*="Decrease quantity"]').click();
      cy.get('[data-testid="add-to-cart-button"]').should('be.visible');
      cy.contains('In Cart').should('not.exist');
    });
  });

  describe('Product Page Loading States', () => {
    it('should show loading state initially', () => {
      cy.intercept('GET', '**/api/v1/products/*', { delay: 1000 }).as(
        'getProduct'
      );

      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');

      cy.contains('Loading').should('be.visible');
    });

    it('should handle error state gracefully', () => {
      cy.intercept('GET', '**/api/v1/products/*', { statusCode: 500 }).as(
        'getProductError'
      );

      cy.visit('http://localhost:5173/products/1');

      cy.get('[data-testid="product-not-found"]').should('be.visible');
    });
  });

  describe('Product Page Multi-viewport Navigation', () => {
    it('should work correctly across different viewport sizes', () => {
      const viewports = [
        [375, 667],
        [768, 1024],
        [1280, 720],
      ];

      viewports.forEach(([width, height]) => {
        cy.viewport(width, height);
        cy.wait(200);

        cy.visit('http://localhost:5173/');
        cy.get('[data-testid="product-card"]').first().click();
        cy.url().should('include', '/products/');

        cy.get('[data-testid="app-header"]').should('be.visible');
        cy.contains('Product Details').should('be.visible');
        cy.get('[data-testid="add-to-cart-button"]').should('be.visible');

        cy.contains('Back to Home').click();
        cy.url().should('not.include', '/products/');
      });
    });
  });
});
