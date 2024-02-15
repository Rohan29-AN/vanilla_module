
# Vanilla Pay API 

The Vanilla Pay API is wrapped by this JavaScript library. Developers can easily access the Vanilla Pay payment system from their applications using this tool.
## Installation

To use this library in your project, you can install it via npm:

```bash
npm install vanilla-pay-api-wrapper
```

## Usage

Here's how you can use the library in your Node.js application:

```javascript
const vanillaPay = require('vanilla-pay-api-wrapper');

// Generate a token
const token = await vanillaPay.generateToken(ClientID, ClientSECRET, VpiVersion);

// Initialize a payment
const paymentLink = await vanillaPay.initPayment(token, VpiVersion, montant, reference, panier, notif_url, redirect_url);

// Check the status of a transaction
const transactionStatus = await vanillaPay.getTransactionsStatus(paymentLink, VpiVersion, token);

// Validate the authenticity of data
const isAuthentic = vanillaPay.validateDataAuthenticity(vpi_signature, body, KeySecret);
```

## Functions

### generateToken(ClientID, ClientSECRET, VpiVersion)

Generates a token used during transactions.

- `ClientID`: The ClientID retrieved from the back office.
- `ClientSECRET`: The ClientSECRET retrieved from the back office.
- `VpiVersion`: The module version.

### initPayment(token, VpiVersion, montant, reference, panier, notif_url, redirect_url)

Generates a payment link for the customer to access and complete the payment.

- `token`: The generated token.
- `VpiVersion`: The version of the VPI module.
- `montant`: The amount of the transaction.
- `reference`: The pro external reference.
- `panier`: The identifier for the transaction.
- `notif_url`: URL called when the payment is finished.
- `redirect_url`: URL to redirect the customer after completing the payment.

### getTransactionsStatus(paymentLink, VpiVersion, token)

Checks the status of a transaction.

- `paymentLink`: The payment link.
- `VpiVersion`: The module version.
- `token`: The generated token.

### validateDataAuthenticity(vpi_signature, body, KeySecret)

Validates the authenticity of provided data by verifying the signature against the hashed body using the KeySecret.

- `vpi_signature`: The signature extracted from the headers.
- `body`: The data to be hashed and compared against the signature.
- `KeySecret`: The KeySecret retrieved from the back office.

## Copyright
© 2024 Rohan29. All rights reserved.