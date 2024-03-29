# CPay

CPay is a JavaScript class that facilitates creating payments for merchants using the CPay service.

## Features

- Easily create payment request forms.
- Generate checksums for data integrity.
- Configure for test or production environment.

## Installation

To use CPay in your project, you can install it via npm:

```bash
npm install @knuseski/c-pay
````
## Usage

```javascript
import { CPay } from '@knuseski/c-pay';

// Create a new CPay instance
const cPay = new CPay(authKey, payToMerchant, merchantName, paymentOkUrl, paymentFailUrl);

// Create a payment request form
const paymentRequestForm = cPay.createFormAndPopulateWithRequestData(paymentRequest);

// Generate a checksum
const checksumData = cPay.generateChecksum(requestBody);
```

## Constructor

```javascript
new CPay(authKey, payToMerchant, merchantName, paymentOkUrl, paymentFailUrl, isProduction)
```
- `authKey`: The authentication key required for CPay API authentication.
- `payToMerchant`: The merchant ID or identifier to specify the recipient of the payment.
- `merchantName`: The name of the merchant that is initiating the payment.
- `paymentOkUrl`: The URL to redirect to after successful payment.
- `paymentFailUrl`: The URL to redirect to after failed payment or cancellation.
- `isProduction`: Indicates if the request is sent to the test or production environment. Default value is false.

## Public Methods

### createFormAndPopulateWithRequestData(paymentRequest)

Create a payment request form with the provided request body.
- `paymentRequest`: The request body containing payment information.

### generateChecksum(requestBody)

Generates a checksum for the given request body to ensure data integrity.
- `requestBody`: The request body for which the checksum is to be generated.

## License

This project is licensed under the MIT License — see the [LICENSE](https://opensource.org/license/mit) file for details.