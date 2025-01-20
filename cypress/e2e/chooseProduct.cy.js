import chooseProductCy from "../../support/pageObjectModel/chooseProduct.cy" //pageObject
describe('template spec', () => {
    beforeEach(() => {
      cy.visit('') // config
    })
    it('positif case - add sucess - no edit qty', () => {
      cy.klikProdukPertama() // custom command
      cy.get('#option-label-size-143-item-169').click()
      cy.get('#option-label-color-93-item-56').click()
      chooseProductCy.addToCart()
      //verify
      cy.get('.message-success').should('contain',' shopping cart.')
      cy.get('.showcart').click()
    })
    it('positif case - add sucess - edit qty', () => { 
      cy.klikProdukPertama()
      cy.get('#option-label-size-143-item-169').click()
      cy.get('#option-label-color-93-item-56').click()
      cy.isiQty('10')
      chooseProductCy.addToCart()
      //verify
      cy.get('.message-success', { timeout: 5000 }).should('contain',' shopping cart.')
      cy.get('.showcart').click()
    })
    it('negative case - add failed - empty size', () => {
      cy.klikProdukPertama()
      cy.get('#option-label-color-93-item-56').click()
      cy.isiQty('10')
      chooseProductCy.addToCart()
      //verify
      cy.get('#super_attribute\[143\]-error').should('not.exist');
    })
    it('negative case - add failed - empty color', () => {
      cy.klikProdukPertama()
      cy.get('#option-label-size-143-item-169').click()
      cy.isiQty('10')
      chooseProductCy.addToCart()
      //verify
      cy.get('#super_attribute\[93\]-error').should('not.exist');
    })
    it('negative case - add failed - empty size and color', () => {
      cy.klikProdukPertama()
      cy.isiQty('10')
      chooseProductCy.addToCart()
      //verify
      cy.get('#super_attribute\[143\]-error').should('not.exist');
      cy.get('#super_attribute\[93\]-error').should('not.exist');
    })
    it('negative case - add failed - input qty -1', () => {
      cy.klikProdukPertama()
      cy.get('#option-label-size-143-item-169').click()
      cy.get('#option-label-color-93-item-56').click()
      cy.isiQty('-1')
      chooseProductCy.addToCart()
      //verify
      cy.get('#qty-error') 
      .should('be.visible')
      .and('contain', 'Please enter a quantity greater than 0.');
    })
    it('negative case - add failed - input qty 0', () => {
      cy.klikProdukPertama()
      cy.get('#option-label-size-143-item-169').click()
      cy.get('#option-label-color-93-item-56').click()
      cy.isiQty('0')
      chooseProductCy.addToCart()
      //verify
      cy.get('#qty-error') 
      .should('be.visible')
      .and('contain', 'Please enter a quantity greater than 0.');
    })
    it('negative case - add failed - input qty long', () => {
      cy.klikProdukPertama(); //custom command
      cy.get('#option-label-size-143-item-169').click()
      cy.get('#option-label-color-93-item-56').click()
      cy.isiQty('37439875983479875438959438758948957843759');
      chooseProductCy.addToCart()
      cy.get('#qty-error') // Gantilah dengan selector yang sesuai
      .should('be.visible')
      .and('contain', 'The maximum you may purchase is 10000.')
    })
  })