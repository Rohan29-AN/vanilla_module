const { generateToken, initPayment, getTransactionsStatus } = require("./vpi_module")

const ClientID = '177c223ae1c710ff74d20a6cd5920bfe728f001aa97250c5aeb5fb48d2d69765'
const ClientSECRET = '26b5ea33b3a2dd6485ca8843c7de8c68de12d89ca1f4214aef3acfc803b28562'
const keySecret = 'ae4980ea01c5f53bfcb313b935da9cf894c3a887d7f79118ae74a0a2d9330c0d'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJRCI6IjE3N2MyMjNhZTFjNzEwZmY3NGQyMGE2Y2Q1OTIwYmZlNzI4ZjAwMWFhOTcyNTBjNWFlYjVmYjQ4ZDJkNjk3NjUiLCJjbGllbnRTRUNSRVQiOiIyNmI1ZWEzM2IzYTJkZDY0ODVjYTg4NDNjN2RlOGM2OGRlMTJkODljYTFmNDIxNGFlZjNhY2ZjODAzYjI4NTYyIiwiZGF0ZUV4cGlyYXRpb24iOiIyMDI0LTAyLTE1VDEzOjM0OjQ4Ljc1NVoiLCJpYXQiOjE3MDgwMDI4ODh9.W-1_UvuxtkkAofUzsyo25JbnCfxM9At26XonawmlhtA'
const VpiVersion = '2023-01-12'

async function getToken() {
    try {
        const token = await generateToken(ClientID, ClientSECRET, VpiVersion)
        console.log("TOKEN: ", token)
    }
    catch (error) {
        console.error(error)
    }
}

async function paymentInitiation() {
    try {
        const linkPayment = await initPayment(token,VpiVersion,5000,'ABC-123','panier1','https://google.com','https://google.com')
        console.log("payment link: ", linkPayment)
    }
    catch (error) {
        console.error('Payment link: ', error)
    }
}

async function transactionStatus(){
    try {
        const transactionStatus = await getTransactionsStatus('https://preprod.vanilla-pay.net/webpayment?id=eyJhbGciOiJIUzI1NiJ9.VlBJMjQwMjE1MTMxOTI1OTM.yfX4EoIGHnP1tnkGA46-uvf5nAshqKtQgyaUQyMInvo',VpiVersion,token)
        console.log("Transactions status: ", transactionStatus)
    }
    catch (error) {
        console.error('Transactions status: ', error)
    }
}


//getToken()

transactionStatus()
