class Payment {
    getEmailInput() {
        return cy.get('input[name=email]')
    }

    getCardNumberInput() {
        return cy.get('input[name=cardNumber]')
    }

    getCardExpiryInput() {
        return cy.get('input[name=cardExpiry]')
    }

    getCardCVCInput() {
        return cy.get('input[name=cardCvc]')
    }

    getBillingNameInput() {
        return cy.get('input[name=billingName]')
    }

    getBillingCountrySelect() {
        return cy.get('select[name=billingCountry]')
    }

    getSubmitPaymentButton() {
        return cy.get('button[class^="SubmitButton"]')
    }

    getSubmit3DSPageButton() {
        return cy.get('button[id="test-source-authorize-3ds"]')
    }
}

export default Payment