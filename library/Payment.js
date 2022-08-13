function PaymentCreate(apiKey, payment) {
  const endpoint = ENDPOINT.PAYMENT;
  const request = {
    url,
    endpoint,
    headers: getHeaders_(apiKey),
    payload: payment,
  };
  const response = FetchApp.GetJson(FetchApp.Post(request));

  const isCreated = PaymentRead(apiKey, response?.id)?.id == response?.id;

  if (!isCreated) {
    throw ERRORS.PAYMENT.CREATE(payment);
  }

  ServiceLogger('Created payment', payment.customer, response.id);
  return response;
}

function PaymentRead(apiKey, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}`;
  const request = {
    url,
    endpoint,
    headers: getHeaders_(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response;
}

function PaymentUpdate(apiKey, payment, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}`;
  const request = {
    url,
    endpoint,
    headers: getHeaders_(apiKey),
    payload: payment,
  };
  const response = FetchApp.GetJson(FetchApp.Post(request));

  const updatedPayment = PaymentRead(apiKey, response.id);
  const updateVerification = (previous, current) => {
    return previous || current;
  };
  const isUpdated = Object.keys(payment)
    .map(key => payment[key] === updatedPayment[key])
    .reduce(updateVerification);

  if (!isUpdated) {
    throw ERRORS.PAYMENT.UPDATE(payment);
  }

  ServiceLogger('Updated payment', payment.customer, id);
  return updatedPayment;
}

function PaymentDelete(apiKey, payment, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}`;
  const request = {
    url,
    endpoint,
    headers: getHeaders_(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Delete(request));
  if (response?.deleted) {
    ServiceLogger('Deleted payment', payment.customer, id);
    return response;
  }

  throw ERRORS.PAYMENT.DELETE(payment);
}

// function PaymentRefund(apiKey, id, payload = null) {
//   const endpoint = `${ENDPOINT.PAYMENT}/${id}/refund`;
//   const request = {
//     url,
//     endpoint,
//     headers: getHeaders_(apiKey),
//     payload: JSON.stringify(payload),
//   };
//   const response = FetchApp.GetJson(FetchApp.Post(request));

//   return response?.refunds;
// }

function PaymentGetBarCode(apiKey, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}/identificationField`;
  const request = {
    url,
    endpoint,
    headers: getHeaders_(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response?.barCode;
}

function PaymenGetPixCode(apiKey, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}/pixQrCode`;
  const request = {
    url,
    endpoint,
    headers: getHeaders_(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response?.payload;
}
