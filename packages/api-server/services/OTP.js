// import firebase from 'firebase';

// const firebase = require('firebase');
// firebase.initializeApp({
//   apiKey: 'AIzaSyBJAcdBuJA6DDPeGKxXOC_D6H3Psqsmff0',
//   authDomain: 'piggy-bank-2904a.firebaseapp.com',
//   databaseURL: 'https://piggy-bank-2904a.firebaseio.com',
//   projectId: 'piggy-bank-2904a',
//   storageBucket: 'piggy-bank-2904a.appspot.com',
//   messagingSenderId: '672996173755',
//   appId: '1:672996173755:web:973918891115ceec9a069e',
// });

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '7d806fd8',
  applicationId: '78e78b9b-ac41-406b-a43c-95e49b72edfd',
  privateKey: '/media/khanh/Common5/Workspace/University/Web2/Project/web2-2020/packages/api-server/services/OTP.js',
  apiSecret: 'viGtFDVHNf8TN7kp',
});

class OTP {
  static async sendOTP () {
    // try {
    //   const phoneNumber = '+84795676288';
    //   const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { size: 'invisible' });
    //   firebase.auth().settings.appVerificationDisabledForTesting = true;
    //   const response = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
    //   console.log(response);
    // }
    // catch (error) {
    //   console.log(error);
    // }
    // nexmo.verify.request({
    //   number: '84795676288',
    //   brand: 'piggy-bank',
    //   code_length: 6,749833
    // }, (err, result) => {
    //   console.log(err);
    //   console.log(result);
    // });
    nexmo.verify.check({
      request_id: 'f4625e9661024448b2086da8c9ef96ec',
      code: 749833,
    }, (err, result) => {
      console.log(result);
      console.log(err);
    });

    // error 16
  }
}
try {
  setTimeout(() => {
    OTP.sendOTP();
  }, 2000);
}
catch (error) {
  console.log(error);
}
