import checkoutArray from "../fixtures/checkoutDatas.json"
import {CheckoutData} from "./model";
import {decryptText} from "../utils/CryptUtils";
import PaymentJourney from "./journey/PaymentJourney";

describe ("E2E Checkout Flow", () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err) => {
            // Related to the following issue: https://github.com/cypress-io/cypress/issues/9447
            // Allow stripe error: "paymentRequest Element didn't mount normally"
            if (err.message.includes('paymentRequest')) {
                return false;
            }
            // Allow stripe error: "threeDS2 Element didn't mount normally"
            if (err.message.includes('threeDS2')) {
                return false;
            }
        });
        cy.visit("/")
    })

    it ("checkouts product without 3D secure verification", () => {
        // collect data for testing
        const checkoutData: CheckoutData = checkoutArray.data[0]
        const paymentJourney = new PaymentJourney(
            Cypress.env('STRIPE_SECRET_KEY') as string,
            Cypress.env('STRIPE_PRICE_KEY') as string)

        // choose the donation amount
        paymentJourney.checkoutDonation("one-time", "$5.00")
        cy.get<string>('@checkoutSessionID').then((checkoutID) => {
            // fill the payment data
            paymentJourney.fillPaymentData(checkoutData.email, decryptText(checkoutData.cardNumber),
                checkoutData.monthAndYear, decryptText(checkoutData.cvc), checkoutData.nameOnCard, checkoutData.country)

            // pay without 3D verification
            paymentJourney.submitToPay(false)

            // assert payment is succeeded
            paymentJourney.assertPayment(true)
            paymentJourney.assertPaymentByAPI(checkoutID, true)
        })
    })

    it ("checkouts product with 3D secure verification", () => {
        // collect data for testing
        const checkoutData: CheckoutData = checkoutArray.data[1]
        const paymentJourney = new PaymentJourney(
            Cypress.env('STRIPE_SECRET_KEY') as string,
            Cypress.env('STRIPE_PRICE_KEY') as string)

        // choose the donation amount
        paymentJourney.checkoutDonation("one-time", "$5.00")
        cy.get<string>('@checkoutSessionID').then((checkoutID) => {
            // fill the payment data
            paymentJourney.fillPaymentData(checkoutData.email, decryptText(checkoutData.cardNumber),
                checkoutData.monthAndYear, decryptText(checkoutData.cvc), checkoutData.nameOnCard, checkoutData.country)

            // pay with 3D verification
            paymentJourney.submitToPay(true)

            // assert payment is succeeded.
            // If you see in here, there is not assertion by UI,
            // because the UI got stuck because of 3ds didn't mount normally.
            // But we still assert it by the status that collected by the Stripe API
            paymentJourney.assertPaymentByAPI(checkoutID, true)
            cy.visit(`${Cypress.config().baseUrl}/success.html`)
        })
    })
})