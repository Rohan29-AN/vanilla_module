
# Vanilla Pay International 

The Vanilla Pay API is wrapped by this JavaScript library. Developers can easily access the Vanilla Pay payment system from their applications using this tool.
## Installation

To use this library in your project, you can install it via npm:

```bash
npm i vanilla_pay_international
```

## Usage

Here's how you can use the library in your Node.js application:

```javascript
const vanillaPay = require('vanilla_pay_international');

const ClientID= 'your_client_id'
const ClientSECRET = 'your_client_secret'
const VpiVersion = '2023-12-01' // Example API Version (date format)
const environment = 'PROD' // Use 'PROD' for live transactions, 'PREPROD' for testing
const KeySecret = 'your_key_secret'

// Generate a token
const token = await vanillaPay.generateToken(ClientID, ClientSECRET, VpiVersion,environment);

// Initialize a payment
const paymentLink = await vanillaPay.initPayment(token, VpiVersion, montant,devise, reference, panier, notif_url, redirect_url,environment);

// Check the status of a transaction
const transactionStatus = await vanillaPay.getTransactionsStatus(paymentLink, VpiVersion, token,environment);

// Validate the authenticity of data
const isAuthentic = vanillaPay.validateDataAuthenticity(vpi_signature, body, KeySecret);
```

## Functions

### generateToken(ClientID, ClientSECRET, VpiVersion,environment)

Generates a token used during transactions.

- `ClientID`: The ClientID retrieved from the back office.
- `ClientSECRET`: The ClientSECRET retrieved from the back office.
- `VpiVersion`: The module version.
- `environment`: The environment (PROD or PREPROD) indicating whether the API should operate in the production or pre-production/testing environment.

### initPayment(token, VpiVersion, montant, reference, panier, notif_url, redirect_url,environment)

Generates a payment link for the customer to access and complete the payment.

- `token`: The generated token.
- `VpiVersion`: The version of the VPI module.
- `montant`: The amount of the transaction.
- `devise`: The currency of the transaction.
- `reference`: The pro external reference.
- `panier`: The identifier for the transaction.
- `notif_url`: URL called when the payment is finished.
- `redirect_url`: URL to redirect the customer after completing the payment.
- `environment`: The environment (PROD or PREPROD) indicating whether the API should operate in the production or pre-production/testing environment.

### getTransactionsStatus(paymentLink, VpiVersion, token,environment)

Checks the status of a transaction.

- `paymentLink`: The payment link.
- `VpiVersion`: The module version.
- `token`: The generated token.
- `environment`: The environment (PROD or PREPROD) indicating whether the API should operate in the production or pre-production/testing environment.

### validateDataAuthenticity(vpi_signature, body, KeySecret)

Validates the authenticity of provided data by verifying the signature against the hashed body using the KeySecret.

- `vpi_signature`: The signature extracted from the headers.
- `body`: The data to be hashed and compared against the signature.
- `KeySecret`: The KeySecret retrieved from the back office.

## Copyright
© 2024 Vanilla Pay. All rights reserved.


Feel free to adjust the content and structure as needed based on your preferences and specific requirements.
