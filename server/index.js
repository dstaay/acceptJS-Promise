export function chargeCreditCard(token, amount) {

  return (
    new Promise ((resolve, reject) => {
      const apiLoginKey = API_LOGIN_KEY;
      const transactionKey = TRANSACTION_KEY;

      const merchantAuthType = new APIContracts.MerchantAuthenticationType();
      const opaqueData = new APIContracts.OpaqueDataType();
      const paymentType = new APIContracts.PaymentType();
      const transactionRequestType = new APIContracts.TransactionRequestType();
      const createRequest = new APIContracts.CreateTransactionRequest();

      merchantAuthType.setName(apiLoginKey);
      merchantAuthType.setTransactionKey(transactionKey);

      opaqueData.setDataDescriptor(token.dataDescriptor);
      opaqueData.setDataValue(token.dataValue);

      paymentType.setOpaqueData(opaqueData);

      transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
      transactionRequestType.setPayment(paymentType);
      transactionRequestType.setAmount(amount);

      createRequest.setMerchantAuthentication(merchantAuthType);
      createRequest.setTransactionRequest(transactionRequestType);

      const control = new APIControllers.CreateTransactionController(createRequest.getJSON());

      control.execute(() => {

        const apiResponse = control.getResponse();
        const response = new APIContracts.CreateTransactionResponse(apiResponse);

        if(response != null) {
          if(response.getMessages().getResultCode() == APIContracts.MessageTypeEnum.OK &&
            response.getTransactionResponse().getResponseCode() == '1') {
            console.log('Transaction ID:', response.getTransactionResponse().getTransId());
            resolve(response.getTransactionResponse().getTransId());
          } else {
            console.log('Result Code:' + response.getMessages().getResultCode());
            console.log('Transaction Response Code:' + response.getTransactionResponse().getResponseCode());
            console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
            console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
            reject(response.getMessages().getMessage()[0].getCode())
          }
        } else {
          reject('No response from Credit Card Processor');
        }
      });
    })
  );
}
