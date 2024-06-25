/* eslint-disable no-undef */
describe('End to End Test', () => {
  it('should like and unlike a restaurant', () => {
    cy.visit('http://localhost:9000/')

    // Menunggu sampai elemen #restaurant-list ada dan tidak kosong
    cy.get('#restaurant-list').should('not.be.empty')
    // Mencari elemen detail-link dalam daftar restoran
    cy.get('.restaurant .detail-link').first().click()
    // Memastikan URL berubah setelah klik
    cy.url().should('include', '/#/detail/')
    // Klik tombol favorit dan pastikan teks berubah
    cy.get('#favorite-button').click()
    cy.get('#favorite-button').should('contain', 'Remove from Favorite')
    // Klik tombol favorit lagi dan pastikan teks berubah kembali
    cy.get('#favorite-button').click()
    cy.get('#favorite-button').should('contain', 'Add to Favorite')
  })

  it('should add a customer review', () => {
    cy.visit('http://localhost:9000/')

    // Menunggu sampai elemen #restaurant-list ada dan tidak kosong
    cy.get('#restaurant-list').should('not.be.empty')
    // Mencari elemen detail-link dalam daftar restoran
    cy.get('.restaurant .detail-link').first().click()
    // Memastikan URL berubah setelah klik
    cy.url().should('include', '/#/detail/')
    // Isi form ulasan
    cy.get('#review-name').type('Test User')
    cy.get('#review-content').type('This is a test review.')
    // Submit ulasan
    cy.get('#add-review-form').submit()
    // Menunggu sampai ulasan muncul di daftar ulasan
    cy.get('#customer-reviews-list').should('contain', 'Test User')
    cy.get('#customer-reviews-list').should('contain', 'This is a test review.')
  })
})
