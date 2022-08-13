function PaymentCreate(apiKey, payment) {
  const endpoint = ENDPOINT.PAYMENT;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
    payload: payment,
  };
  const response = FetchApp.GetJson(FetchApp.Post(request));

  const isCreated = PaymentRead(apiKey, response?.id)?.id == response?.id;

  if (!isCreated) {
    throw ERRORS.PAYMENT.CREATE(payment);
  }

  return response;
}

function PaymentRead(apiKey, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response;
}

function PaymentUpdate(apiKey, payment, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
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

  return updatedPayment;
}

function PaymentDelete(apiKey, payment, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Delete(request));
  if (response?.deleted) {
    return response;
  }

  throw ERRORS.PAYMENT.DELETE(payment);
}

function PaymentRefund(apiKey, id, payload = null) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}/refund`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
    payload: JSON.stringify(payload),
  };
  const response = FetchApp.GetJson(FetchApp.Post(request));

  return response?.refunds;
}

function PaymentGetBarCode(apiKey, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}/identificationField`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response?.barCode;
}

function PaymenGetPixCode(apiKey, id) {
  const endpoint = `${ENDPOINT.PAYMENT}/${id}/pixQrCode`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response?.payload;
}
