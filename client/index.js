function acceptJSHandler(response) {
  if (response.messages.resultCode === 'Error') {
    console.log(response.messages.message[0].code);
  } else {
    // response.opaqueData contains token
    this.CallBack(response.opaqueData);
  }
}

// Place inside methods of React Component
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
    // Bind this and token for CallBack
    window.responseHandler = acceptJSHandler.bind(this);
    Accept.dispatchData(secureData, 'responseHandler')
  }

