const ENV_PROD = 'https://api.vanilla-pay.net/'
const ENV_PREPROD = 'https://preprod.vanilla-pay.net/'

const GET_TOKEN_ENDPOINT = 'webpayment/token'
const INIT_PAYMENT_ENDPOINT = 'webpayment/initiate'
const TRANSACTION_STATUS_ENDPOINT = 'webpayment/status'

module.exports={
    GET_TOKEN_ENDPOINT,
    INIT_PAYMENT_ENDPOINT,
    TRANSACTION_STATUS_ENDPOINT,
    getBaseUrl(environment){
        return environment === 'PROD' ? ENV_PROD : ENV_PREPROD
    }
}