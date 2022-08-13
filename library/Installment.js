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
    throw ERRORS.INSTALLMENT.CREATE(installment);
  }

  ServiceLogger('Created installment', installment.customer, response.installment);
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
    throw ERRORS.INSTALLMENT.UPDATE(installment);
  }

  const response = InstallmentCreate(apiKey, installment);

  ServiceLogger('Updated installment', installment.customer, response.installment);
  return response;
}

function InstallmentDelete(apiKey, installment, installmentId) {
  const endpoint = `${ENDPOINT.INSTALLMENT}/${installmentId}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Delete(request));
  if (response?.deleted) {
    ServiceLogger('Deleted installment', installment.customer, installmentId);
    return response;
  }

  throw ERRORS.INSTALLMENT.DELETE(installment);
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
