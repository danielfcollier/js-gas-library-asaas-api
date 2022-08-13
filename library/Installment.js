function InstallmentCreate(apiKey, installment) {
  const endpoint = ENDPOINT.PAYMENT;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
    payload: installment,
  };
  const response = FetchApp.GetJson(FetchApp.Post(request));

  const isCreated = InstallmentRead(apiKey, response?.installment)?.id == response?.installment;

  if (!isCreated) {
    throw ERRORS.PAYMENT.CREATE(installment);
  }

  return response;
}

function InstallmentRead(apiKey, installmentId) {
  const endpoint = `${ENDPOINT.INSTALLMENT}/${installmentId}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response;
}

function InstallmentUpdate(apiKey, installment, installmentId) {
  const { deleted } = InstallmentDelete(apiKey, installment, installmentId);
  if (!deleted) {
    throw ERRORS.PAYMENT.UPDATE(installment);
  }

  const response = InstallmentCreate(apiKey, installment);

  return response;
}

function InstallmentDelete(apiKey, payment, installmentId) {
  const endpoint = `${ENDPOINT.INSTALLMENT}/${installmentId}`;
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

// function InstallmentRefund(apiKey, id, payload = null) {
//   const endpoint = `${ENDPOINT.PAYMENT}/${id}/refund`;
//   const request = {
//     url,
//     endpoint,
//     headers: _getHeaders(apiKey),
//     payload: JSON.stringify(payload),
//   };
//   const response = FetchApp.GetJson(FetchApp.Post(request));

//   return response?.refunds;
// }
