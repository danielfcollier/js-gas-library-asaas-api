function CustomerCreate(apiKey, customer) {
  const endpoint = ENDPOINT.CUSTOMER;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
    payload: customer,
  };
  const response = JSON.parse(FetchApp.Post(request)?.getContentText());

  const isCreated = CustomerRead(apiKey, response?.id)?.id == response?.id;

  if (!isCreated) {
    throw ERRORS.CUSTOMER.CREATE(customer);
  }

  return response;
}

function CustomerRead(apiKey, id) {
  const endpoint = `${ENDPOINT.CUSTOMER}/${id}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.Get(request);

  return JSON.parse(response?.getContentText());
}

function CustomerUpdate(apiKey, customer, id) {
  const endpoint = `${ENDPOINT.CUSTOMER}/${id}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
    payload: customer,
  };
  const response = FetchApp.GetJson(FetchApp.Post(request));

  const updatedCustomer = CustomerRead(apiKey, response.id);
  const updateVerification = (previous, current) => {
    return previous || current;
  };
  const isUpdated = Object.keys(customer)
    .map(key => customer[key] === updatedCustomer[key])
    .reduce(updateVerification);

  if (!isUpdated) {
    throw ERRORS.CUSTOMER.UPDATE(customer);
  }

  return updatedCustomer;
}

function CustomerDelete(apiKey, customer, id) {
  const endpoint = `${ENDPOINT.CUSTOMER}/${id}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Delete(request));
  if (response?.deleted) {
    return response;
  }

  throw ERRORS.CUSTOMER.DELETE(customer);
}

function CustomerAll(apiKey) {
  const endpoint = `${ENDPOINT.CUSTOMER}`;
  const request = {
    url,
    endpoint,
    headers: _getHeaders(apiKey),
  };
  const response = FetchApp.GetJson(FetchApp.Get(request));

  return response;
}
