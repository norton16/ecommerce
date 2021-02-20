import Commerce from '@chec/commerce.js';

//Creating new instance of Commerce to create the store
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);