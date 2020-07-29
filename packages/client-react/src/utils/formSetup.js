export const loginFormSetup = {
  email: {
    type: 'email',
    value: '',
    rules: {
      required: true,
      isEmail: true,
    },
    validationError: 'Please enter a valid email',
    touched: false,
    placeholder: 'your@email.com',
  },
  password: {
    type: 'password',
    value: '',
    rules: {
      required: true,
    },
    validationError: 'Please enter your password',
    touched: false,
    placeholder: 'Password',
  },
};

export const registerFormSetup = {
  fullname: {
    type: 'text',
    value: '',
    rules: {
      required: true,
    },
    validationError: 'Please enter your name',
    touched: false,
    placeholder: 'John Doe',
    label: 'Full Name',
  },
  email: {
    type: 'email',
    value: '',
    rules: {
      required: true,
      isEmail: true,
    },
    validationError: 'Please enter a valid email',
    touched: false,
    placeholder: 'your@email.com',
    label: 'Email',
  },
  password: {
    type: 'password',
    value: '',
    rules: {
      required: true,
    },
    validationError: 'Please enter your password',
    touched: false,
    placeholder: 'Password',
    label: 'Password',
  },
  phone: {
    type: 'phone',
    value: '',
    rules: {
      required: true,
      minLength: 10,
      maxLength: 10,
      isNumeric: true,
    },
    validationError: 'Please enter a valid phone number',
    touched: false,
    placeholder: '10 digits',
    label: 'Phone Number',
    mapToData: 'phone_number',
  },
  dob: {
    type: 'date',
    value: '',
    rules: {
      required: true,
      dob: true,
    },
    validationError: 'Please enter your date of birth',
    touched: false,
    placeholder: 'DD/MM/YYYY',
    label: 'Date of Birth',
    mapToData: 'birthday',
  },
  address: {
    type: 'text',
    value: '',
    rules: {
      required: true,
    },
    validationError: 'Please enter your address',
    touched: false,
    placeholder: 'Address',
    label: 'Address',
  },
};
