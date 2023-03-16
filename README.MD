
# Oddle QA Challenge

**Table of Contents**

* [General info](#general-info)
* [Instructions](#instructions)
* [Prerequisite](#prerequisite)
* [Notes](#notes)

## General info

* **Name :** Aldy Syah Daviq Ramadhan
* **Email Address :** aldyboting@gmail.com
* **Apply From :** LinkedIn

## Prerequisite

##### I strongly suggest you to use node **v16.16.0**.

## Instructions

1. Clone `oddle-qa-challenge` by running this command:

   ```bash
   # using SSH
   $ git clone git@github.com:aldyboting/oddle-qa-challenge.git

   # or using HTTPS
   $ git clone https://github.com/aldyboting/oddle-qa-challenge.git
   ```
2. Install dependencies

   ```bash
   npm install
   ```

3. Run the test suite

   ```bash
    cypress run --browser=chrome --headed
   ```

4. Check the test result report

   You will see the report under `mochawesome-report` folder. Open the `html` file and _voila!_ 

## Notes

We understand that there are some data that is not supposed to be exposed publicly. That's why in this project, I use `CryptUtils` so that everything sensitive can be encrypted first. That is as follows:
1. Stripe API key
2. Card number (even though it is a test card)
3. Card CVC