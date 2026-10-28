import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_APP_CRYPTO_KEY || 'dev_key';

/**
 * Encrypt data using AES encryption
 * @param {any} data - Data to encrypt (will be stringified)
 * @returns {string} - Encrypted cipher text
 */
export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

/**
 * Decrypt data using AES encryption
 * @param {string} ciphertext - Encrypted string to decrypt
 * @returns {any|null} - Decrypted data or null if failure
 */
export const decrypt = (ciphertext) => {
    try {
        if (!ciphertext) return null;
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (e) {
        console.error('Decryption failed', e);
        return null;
    }
};
