import CryptoJS from 'crypto-js';
import {
  AMOUNT_CURRENCY,
  AMOUNT_CURRENCY_FIELD,
  CHECKSUM_FIELD,
  CHECKSUM_HEADER_FIELD,
  CPAY_FORM_ENCTYPE,
  CPAY_FORM_METHOD,
  CPAY_FORM_NAME,
  CPAY_PROD_URL,
  CPAY_TEST_URL,
  FORM_ELEMENT,
  HIDDEN_INPUT_TYPE,
  INPUT_ELEMENT,
  MANDATORY_FIELDS,
  MERCHANT_NAME_FIELD,
  PAY_TO_MERCHANT_FIELD,
  PAYMENT_FAIL_URL_FIELD,
  PAYMENT_OK_URL_FIELD,
  TYPE_OF_STRING, VALID_FIELDS,
  ZERO
} from "./constants.js";

/**
 * CPay class facilitates creating payments for merchants using CPay service.
 */
export class CPay {

  /**
   * Constructs a new CPay instance with the provided authentication key and merchant details.
   *
   * @param {string} authKey The authentication key required for CPay API authentication.
   * @param {string} payToMerchant The merchant ID or identifier to specify the recipient of the payment.
   * @param {string} merchantName The name of the merchant that is initiating the payment.
   * @param {string} paymentOkUrl The URL to redirect to after successful payment.
   * @param {string} paymentFailUrl The URL to redirect to after failed payment or cancellation.
   * @param {boolean} isProduction Indicates if the request is sent to test or prod env, default value is false.
   */
  constructor(authKey, payToMerchant, merchantName, paymentOkUrl, paymentFailUrl, isProduction = false) {
    this.authKey = authKey;
    this.payToMerchant = payToMerchant;
    this.merchantName = merchantName;
    this.paymentOkUrl = paymentOkUrl;
    this.paymentFailUrl = paymentFailUrl;
    this.isProduction = isProduction;
  }

  /**
   * Creates a payment request form with the provided request body, language, and adds the necessary fields for CPay integration.
   *
   * @param {Object} paymentRequest The request body containing payment information.
   */
  createFormAndPopulateWithRequestData = (paymentRequest) => {
    const form = document.createElement(FORM_ELEMENT);
    form.name = CPAY_FORM_NAME;
    form.method = CPAY_FORM_METHOD;
    form.action = this.isProduction ? CPAY_PROD_URL : CPAY_TEST_URL
    form.enctype = CPAY_FORM_ENCTYPE;

    // Adding more required configuration fields
    const wholePaymentRequest = {
      ...paymentRequest,
      [PAY_TO_MERCHANT_FIELD]: this.payToMerchant,
      [MERCHANT_NAME_FIELD]: this.merchantName,
      [AMOUNT_CURRENCY_FIELD]: AMOUNT_CURRENCY,
      [PAYMENT_OK_URL_FIELD]: this.paymentOkUrl,
      [PAYMENT_FAIL_URL_FIELD]: this.paymentFailUrl
    };

    // Trimming all the values from the payment request
    const trimmedPaymentRequest = this.#trimAllFields(wholePaymentRequest);

    // Appending all the fields to the form as a hidden input
    for (const [key, value] of Object.entries(trimmedPaymentRequest)) {
      form.appendChild(this.#createHiddenInput(key, value));
    }

    const {CheckSum, CheckSumHeader} = this.generateChecksum(trimmedPaymentRequest);
    form.appendChild(this.#createHiddenInput(CHECKSUM_FIELD, CheckSum));
    form.appendChild(this.#createHiddenInput(CHECKSUM_HEADER_FIELD, CheckSumHeader));

    return form;
  };

  /**
   * Generates a checksum for the given request body to ensure data integrity.
   *
   * @param {Object} requestBody The request body for which the checksum is to be generated.
   * @returns {Object} An object containing the generated checksum, checksum header and checksum string.
   */
  generateChecksum = (requestBody) => {
    // Get all the keys
    const keys = Object.keys(requestBody);

    // Check for the mandatory fields
    const missingFields = MANDATORY_FIELDS.filter(field => !keys.includes(field));
    if (missingFields.length > 0) {
      console.error(`The following mandatory fields are missing in the payment request: [${missingFields.join(', ')}]`);
      return {};
    }

    // Check for fields validity
    const invalidFields = keys.filter(field => !VALID_FIELDS.includes(field));
    if (invalidFields.length > 0) {
      console.error(`The following fields are invalid in the payment request: [${invalidFields.join(', ')}]`)
      return {};
    }

    // Count the nr of keys
    let CheckSumHeader = `${String(keys.length).padStart(2, ZERO)}`;

    // Add all the keys to header
    keys.forEach((key) => (CheckSumHeader += `${key},`));

    // Calculate the length of all the values
    keys.forEach((key) => (CheckSumHeader += this.#calculateLength(requestBody[key])));

    // Create CheckSumString
    let CheckSumString = CheckSumHeader;

    // Add all key values
    keys.forEach((key) => (CheckSumString += requestBody[key]));

    // Add auth key
    CheckSumString += this.authKey;

    // Generate checksum
    const CheckSum = CryptoJS.MD5(CheckSumString).toString();

    return {CheckSum, CheckSumHeader, CheckSumString};
  };

  #trimAllFields = (obj) =>
    Object.fromEntries(
      Object.keys(obj).map((key) => [key, typeof obj[key] === TYPE_OF_STRING ? obj[key].trim() : obj[key]])
    );

  #createHiddenInput = (name, value) => {
    const input = document.createElement(INPUT_ELEMENT);
    input.type = HIDDEN_INPUT_TYPE;
    input.name = name;
    input.value = value;
    return input;
  };

  #calculateLength = (input) =>
    String(input.toString().trim().length).padStart(3, '0');
}