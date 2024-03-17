export const CPAY_TEST_URL = 'https://www.cpay.com.mk/Client/page/default.aspx?xml_id=/mk-MK/.TestLoginToPay/';
export const CPAY_PROD_URL = 'https://www.cpay.com.mk/Client/page/default.aspx?xml_id=/mk-MK/.loginToPay/.simple/';
export const CPAY_FORM_NAME = 'C-Pay Form';
export const CPAY_FORM_ENCTYPE = 'application/x-www-form-urlencoded';
export const CPAY_FORM_METHOD = 'POST';
export const AMOUNT_CURRENCY = 'MKD';

export const PAY_TO_MERCHANT_FIELD = 'PayToMerchant';
export const MERCHANT_NAME_FIELD = 'MerchantName';
export const AMOUNT_CURRENCY_FIELD = 'AmountCurrency';
export const PAYMENT_OK_URL_FIELD = 'PaymentOKURL';
export const PAYMENT_FAIL_URL_FIELD = 'PaymentFailURL';
export const CHECKSUM_FIELD = 'CheckSum';
export const CHECKSUM_HEADER_FIELD = 'CheckSumHeader';


const ORIGINAL_AMOUNT_FIELD = 'OriginalAmount';
const ORIGINAL_CURRENCY_FIELD = 'OriginalCurrency';
const AMOUNT_TO_PAY_FIELD = 'AmountToPay';
const DETAILS_1_FIELD = 'Details1';
const DETAILS_2_FIELD = 'Details2';

export const MANDATORY_FIELDS = [
  AMOUNT_TO_PAY_FIELD,
  DETAILS_1_FIELD,
  DETAILS_2_FIELD,
  ORIGINAL_AMOUNT_FIELD,
  ORIGINAL_CURRENCY_FIELD
];

const FIRST_NAME_FIELD = 'FirstName';
const LAST_NAME_FIELD = 'LastName';
const ADDRESS_FIELD = 'Address';
const CITY_FIELD = 'City';
const ZIP_FIELD = 'Zip';
const COUNTRY_FIELD = 'Country';
const TELEPHONE_FIELD = 'Telephone';
const EMAIL_FIELD = 'Email';

export const VALID_FIELDS = [
  ...MANDATORY_FIELDS,
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  ADDRESS_FIELD,
  CITY_FIELD,
  ZIP_FIELD,
  COUNTRY_FIELD,
  TELEPHONE_FIELD,
  EMAIL_FIELD
];

export const FORM_ELEMENT = 'form'
export const INPUT_ELEMENT = 'input'
export const HIDDEN_INPUT_TYPE = 'hidden'
export const TYPE_OF_STRING = 'string'
export const ZERO = '0'