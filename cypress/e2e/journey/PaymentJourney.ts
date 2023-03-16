import Checkout from "../pageObjects/Checkout";
import {decryptText} from "../../utils/CryptUtils";
import Payment from "../pageObjects/Payment";
import AfterPayment from "../pageObjects/AfterPayment";

class PaymentJourney {
    private stripeSecretKey: string
    private stripePriceKey: string
    private _checkoutSessionID: string
    private _paymentIntentID: string

    constructor(stripeSecretKey: string, stripePriceKey: string) {
        this.stripeSecretKey = decryptText(stripeSecretKey)
        this.stripePriceKey = decryptText(stripePriceKey)
    }

    get checkoutSessionID(): string {
        return this._checkoutSessionID;
    }

    get paymentIntentID(): string {
        return this._paymentIntentID;
    }

    checkoutDonation(donationType: string, donationAmount: string) {
        const checkout = new Checkout()
        checkout.getDonateButton(donationType, donationAmount).should('be.enabled').then(() => {
            cy.log(`Donation with the amount of ${donationAmount} is enabled. Send StripeAPI to proceed to the checkout page.`)

            // visit checkout page

            cy.request({
                method: 'POST',
                url: 'https://api.stripe.com/v1/checkout/sessions',
                headers: {
                    'Authorization': `Bearer ${this.stripeSecretKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: {
                    'success_url': `${Cypress.config().baseUrl}/success.html`,
                    'cancel_url': `${Cypress.config().baseUrl}/canceled.html`,
                    'payment_method_types': ['card'],
                    'line_items[0][price]': this.stripePriceKey,
                    'line_items[0][quantity]': 1,
                    'mode': 'payment',
                }
            }).then((response) => {
                cy.wrap((response.body as { id: string }).id).as('checkoutSessionID')
                cy.visit((response.body as { url: string }).url )
            })
        })
    }

    fillPaymentData (email: string, cardNumber: string, cardExpiry: string, cardCVC: string, billingName: string, billingCountry: string) {
        const payment = new Payment()
        payment.getEmailInput().type(email)
        payment.getCardNumberInput().type(cardNumber)
        payment.getCardExpiryInput().type(cardExpiry)
        payment.getCardCVCInput().type(cardCVC)
        payment.getBillingNameInput().type(billingName)
        payment.getBillingCountrySelect().select(billingCountry)
    }

    submitToPay(isWith3DVerification: boolean) {
        const payment = new Payment()
        payment.getSubmitPaymentButton().click()
        if (isWith3DVerification) {
            cy.wait(5000)
            cy.get('iframe[name^=__privateStripeFrame]')
                .then(($firstIFrame) => {
                    cy.wrap($firstIFrame.contents().find('iframe#challengeFrame'))
                        .then(($secondIFrame) => {
                            // authorize
                            const target = confirm ? '#test-source-authorize-3ds' : '#test-source-fail-3ds'
                            cy.wrap($secondIFrame.contents().find(target)).click()
                        })
                })
        }

        cy.request({
            method: 'GET',
            url: 'https://api.stripe.com/v1/payment_intents',
            headers: {
                'Authorization': `Bearer ${this.stripeSecretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            expect(response).to.have.property('status')
        });
    }

    assertPayment(isSuccess: boolean) {
        const afterPayment = new AfterPayment()
        cy.wait(5000)

        if (isSuccess)
            afterPayment.getSummaryText().should(
                "contain.text",
                "Your test payment succeeded"
            );
        else
            afterPayment.getSummaryText().should(
                "contain.text",
                "Your test payment was canceled"
            );
    }

    assertPaymentByAPI(checkoutSessionID: string, isSuccess: boolean) {
        cy.wait(5000)
        cy.request({
            method: 'GET',
            url: `https://api.stripe.com/v1/checkout/sessions/${checkoutSessionID}`,
            headers: {
                'Authorization': `Bearer ${this.stripeSecretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            cy.request({
                method: 'GET',
                url: `https://api.stripe.com/v1/payment_intents/${(response.body as { payment_intent: string }).payment_intent}`,
                headers: {
                    'Authorization': `Bearer ${this.stripeSecretKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                if (isSuccess)
                    expect((response.body as { status: string }).status).to.equal('succeeded')
                else
                    expect((response.body as { status: string }).status).to.not.equal('succeeded')
            })
        })
    }
}

export default PaymentJourney