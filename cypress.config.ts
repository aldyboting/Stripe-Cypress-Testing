import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report",
    timestamp: "longDate"
  },
  "video": false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://stripe-samples.github.io/github-pages-stripe-checkout',
  },
  env: {
    DECRYPT_SECRET_KEY: "mySecretKey",
    STRIPE_SECRET_KEY: "60efc18d13bafead446830c1ba283955db1c98a1524d0b3d8371531dbef2abf85ecb8613e9123ef69b3ab959fcdf53244654dbc7cf928e73e11ee563f252a3ae6ec1ff4234f9399d9f98207079e992e97b1585c8e212e99d61660ec3def542d603ffb3ab5da12a117777654ec56b016d9461fb4b3cbbb06ebcc78fca31e74ad240a534be7f0dd608671d95aaa0bcc781dc364bba49",
    STRIPE_PRICE_KEY: "f55ac723fb64a9ac32a352d234aa93268a19f8cee88e7f36c679b265e89286c0f9c0cbb908e181fbce91ace2b6bb96cfc5f449dd86af63bcb3612bc7575de72406124d174f95fedf"
  }
})
