import {
  valid_confirmPassword,
  valid_email,
  valid_isEmpty,
  valid_password,
  valid_phoneNumber,
} from './validationPackage';

export const validate = async (obj, formErrors) => {
  let errors = {};

  const keys = Object.keys(obj);

  for (const key of keys) {
    const val = obj[key];

    switch (key) {
      case 'name':
        errors[key] = valid_isEmpty(val);
        break;
      case 'email':
        errors[key] = valid_isEmpty(val) || valid_email(val);
        break;
      case 'password':
        errors[key] = valid_password(val).error;
        break;
      case 'confirmPassword':
        const pw1 = obj['password'];
        const pw2 = val;
        errors[key] = valid_confirmPassword(pw1, pw2).error;
        break;
      case 'phoneNumber':
        errors[key] = valid_isEmpty(val) || valid_phoneNumber(val);
        break;
      case 'address':
        const addrObj = val;
        const targetKey = Object.keys(addrObj)[0];
        const thisVal = addrObj[targetKey];
        errors[key] = valid_isEmpty(thisVal);
        break;
      case 'detailAddress':
        errors[key] = valid_isEmpty(val);
        break;
      case 'birthday':
        errors[key] = valid_isEmpty(val);
        break;
      default:
        break;
    }
  }

  errors.isEmailDuplicated = formErrors.isEmailDuplicated;
  errors.isValidPhoneNumber = formErrors.isValidPhoneNumber;

  console.log('Valid Result (formValues) : ', errors);
  return errors;
};