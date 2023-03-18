class AfterPayment {
    getSummaryText() {
        return cy.get(`*[class^="sr-payment-summary"]`)

    }
}

export default AfterPayment