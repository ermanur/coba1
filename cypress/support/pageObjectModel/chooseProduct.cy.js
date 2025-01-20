class chooseProduct {
  size = '#option-label-size-143-item-169'
  color = '#option-label-color-93-item-56'
  add_tocart = '#product-addtocart-button'

  addToCart(){
    cy.get(this.add_tocart).click()
  }

}
module.exports = new chooseProduct()