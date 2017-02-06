### Example Implementation of Accept.JS for Authorize.net using tokens, in React + Node.JS + Promises

Basic guide for using Authorize.net's Accept.JS

Usage: 

```
// build promise
const creditCardPromise = chargeCreditCard(token, DOLLAR_AMOUNT);

// attempt transaction
creditCardPromise
  .then((transactionId) => { ... })
  .catch((errCode) => { ... })
```

## Installation

On Client

1) To HTML head:
```
<script type="text/javascript" src="https://jstest.authorize.net/v1/Accept.js" charset="utf-8"></script>
```
2) Add Accept.JS response handler (similiar to offical documentation), using your own this.CallBack
```
function acceptJSHandler(response) {
  if (response.messages.resultCode === 'Error') {
    console.log(response.messages.message[0].code);
  } else {
    const token = response.opaqueData;
    this.CallBack(token);
  }
}
```
3) In Relevant React Component Add Method:
```
handlePrepOrder(privateCardDetails) {
    const authData = { 
      clientKey: CLIENT_KEY,
      apiLoginID: API_LOGIN_ID,
    }
    const secureData = { 
      cardData: { ...privateCardDetails },
      authData,
    }

    // Accept JS requires callback handler to be in window (UGLY...)
    // Bind this for CallBack
    window.responseHandler = acceptJSHandler.bind(this);
    Accept.dispatchData(secureData, 'responseHandler')
  }
```

On Server (Node.js)

1) Add function as shown in /server/index.js



