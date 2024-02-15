const axios = require('axios');
const { GET_TOKEN_ENDPOINT, INIT_PAYMENT_ENDPOINT, TRANSACTION_STATUS_ENDPOINT } = require('./config/const');
const { hashData } = require('./config/utilities');
module.exports = {

    /**
     * This function is used to generate the token used during transactions, which remains valid for 20 minutes.
     * @param {string} ClientID : The ClientID  retrieved from the back office (https://bo.vanilla-pay.net/pro/generatekey)
     * @param {string} ClientSECRET: The ClientSECRET retrieved from the back office (https://bo.vanilla-pay.net/pro/generatekey)
     * @param {string} VpiVersion: module version
     * @returns {} - the generated token
     * @throws {error} - If there is an error during the token retrieval process
     */
    async generateToken(ClientID, ClientSECRET, VpiVersion) {

        const headers = {
            "Accept": "*/*",
            "Client-Id": ClientID,
            "Client-Secret": ClientSECRET,
            "VPI-Version": VpiVersion
        }
        try {
            const result = await axios.get(GET_TOKEN_ENDPOINT, { headers })
            return result.data.Data.token
        }
        catch (error) {
            throw error
        }
    },


    /**
     *  Generates a payment link for the customer to access and complete the payment
     * @param {string} token: the generated token 
     * @param {string} VpiVersion: the version of the vpi (module)
     * @param {number} montant: the amount of the transaction
     * @param {} reference: the pro external reference
     * @param {*} panier:  the identifier for the transaction
     * @param {*} notif_url: url called when the payment is finished
     * @param {*} redirect_url: url to redirect the customer after completing the payment
     * @returns {Promise<object>} - Response from API
     * @throws {Error} - If there is an error during the payment link generation process
     */
    async initPayment(token, VpiVersion, montant, reference, panier, notif_url, redirect_url) {
        const headers = {
            "Accept": "*/*",
            "Authorization": `${token}`,
            "VPI-Version": VpiVersion
        }

        const body = {
            "montant": montant,
            "reference": reference,
            "panier": panier,
            "notif_url": notif_url,
            "redirect_url": redirect_url
        }

        try {
            const result = await axios.post(INIT_PAYMENT_ENDPOINT, body, { headers })
            return result.data
        }
        catch (error) {
            throw error
        }

    },


    /**
     * This function allows to see the status of the transaction
     * @param {string} paymentLink : The payment link
     * @param {string} VpiVersion: module version
     * @param {string} token: the generated token 
     * @returns {Promise<object>} - Response from API
     * @throws {Error} - If there is an error during the payment link generation process
     */
    async getTransactionsStatus(paymentLink, VpiVersion, token) {
        const regex = /id=([^&]+)/;

        try {
            //check if the link provided has an id
            if (paymentLink.match(regex)) {
                const id = paymentLink.match(regex)[1]
                const headers =
                {
                    "Accept": "*/*",
                    "Authorization": `${token}`,
                    "VPI-Version": `${VpiVersion}`
                }

                const result = await axios.get(`${TRANSACTION_STATUS_ENDPOINT}/${id}`, { headers })
                return result

            }
            else {
                throw new Error("Invalid payment link")
            }
        }
        catch (error) {
            throw new Error('Failed to retrieve payment link: ' + error.message)
        }


    },

    /**
     * Validates the authenticity of the provided data by verifying the signature against the hashed body using the ClientSECRET
     * @param {string} vpi_signature : The signature extracted from the headers
     * @param {string} body : The data to be hashed and compared against the signature
     * @param {string} ClientSECRET: The ClientSECRET retrieved from the back office (https://bo.vanilla-pay.net/pro/generatekey)
     * @returns {boolean} Returns true if the data is authentic, otherwise returns false
     */
    validateDataAuthenticity(vpi_signature, body, ClientSECRET) {
        const hashedData=hashData(ClientSECRET,body)
        return hashedData===vpi_signature
    }
}

