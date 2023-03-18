# Test Plan

### Test Plan Identifier:
OddleTP - Stripe Checkout End to End

### Introduction:
This test plan outlines the testing approach and activities for end-to-end (E2E) testing of Stripe Checkout. The purpose of the testing is to ensure that the checkout process works as expected, payment processing is accurate, and orders are successfully confirmed.

### Test Items:

The test items for this plan is the UI flow as well as [paymentIntents Stripe API](https://stripe.com/docs/api/payment_intents/confirm) to ensure that checkout payment is work as expected.

### Features to be Tested:
The following features will be tested:
1. [ ] User can select product to check out
2. [ ] User can select card type for payment
3. [ ] User can enter billing information
4. [ ] Payment system is working correctly, whether with 3D Secure or not
5. [ ] User can see payment confirmation is existed

The following features will not be tested:
1. [ ] Integration with third-party applications
2. [ ] Network or server performance under heavy load
3. [ ] Integration with hardware or peripherals

### Test Approach:

The testing approach will use an analytical approaches which is risk-based testing strategy, with an emphasis on testing the most critical functionality first. This testing will mainly focus on acceptance and functional testing with the tools of Cypress automating the test.

### Test Environment:
The testing will done in the most popular web browser which is Google Chrome with a normal network speed connection.

### Test Deliverables:
The following test deliverables will be produced:
1. [ ] Test plan
2. [ ] Test cases
3. [ ] Test scripts
4. [ ] Test reports

### Testing Tasks:
1. [ ] The following testing tasks will be performed:
2. [ ] Identify and prioritize test cases based on risk
3. [ ] Develop test cases and test scripts
4. [ ] Execute test cases and record results
5. [ ] Log defects and verify fixes
6. [ ] Analyze and report test results

### Test Schedule:
The test schedule will be as follows:
1. [ ] Test planning and preparation: 2 days
2. [ ] Test case development: 3 days
3. [ ] Test execution: 3 days
4. [ ] Test analysis and reporting: 2 days

### Test Risks and Mitigation:
The following potential risks have been identified:
* **Risk:** 3D Secure feature may not work | **Mitigation:** Covers all possible scenario for 3D Secure to make sure that every 3D Secure scenario are work properly
* **Risk:** Payment system may not work | **Mitigation:** Assert the payment process both from the UI perspective and also the backend/API perspective

### Test Resources:
The following resources will be required for testing:
1. [ ] Testing team: 2 person
2. [ ] Test environment: PC setup with good network connection and Google Chrome installed
3. [ ] Test data: Dummy billing and card information
4. [ ] Test tools: Cypress for automate the test, JIRA Xray for test management tool and issue tracking

### Test Execution:
The following procedures will be followed for test execution:
1. Testing team will execute test cases and record results
2. Defects will be logged in a defect tracking system
3. Fixes will be verified before closing defects
4. Test progress and status will be tracked in a test management tool

### Test Completion Criteria:
The following completion criteria must be met before testing can be considered complete:
1. [ ] All critical and high-risk test cases have been executed
2. [ ] All defects have been fixed and verified
3. [ ] Test coverage is 100%

### Approvals:
This test plan will be reviewed and approved by the testing team lead, development team lead, and product team lead


