var crypto = require('crypto');
module.exports = {
    /**
     * Hashes the payload using SHA256 algorithm and a secret key.
     * @param {string} secret - The secret key used for hashing.
     * @param {string} payload - The value to be hashed.
     * @returns {string} - The hashed value.
     */
    hashData(secret, payload) {
        const hashedData = crypto.createHmac('SHA256', secret).update(payload).digest('hex')
        return hashedData.toUpperCase()
    }
}