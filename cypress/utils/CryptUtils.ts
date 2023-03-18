import Cryptr from "cryptr";

const cryptr = new Cryptr(Cypress.env('DECRYPT_SECRET_KEY') as string, { pbkdf2Iterations: 10000, saltLength: 10 });

export function decryptText(encryptedText: string) {
    return cryptr.decrypt(encryptedText)
}

export function encryptText(textToBeEncrypted: string) {
    return cryptr.encrypt(textToBeEncrypted)
}