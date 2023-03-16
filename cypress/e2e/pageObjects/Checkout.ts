class Checkout {
    getDonateButton(donationType: string, donationAmount: string) {
        const checkoutMode = donationType === "one-time" ? "payment" : "subscription"
        return cy.get(`[data-checkout-mode="${checkoutMode}"]`).contains(donationAmount)
    }
}

export default Checkout