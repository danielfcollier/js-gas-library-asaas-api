const CustomerRequestDTO = (data) => {
  const customer = {
    externalReference: data.id,
    name: data.fullName,
    email: data.email,
    mobilePhone: data.cellPhone,
    cpfCnpj: data.documentId,
    postalCode: data.postalCode,
    addressNumber: data?.number ?? 's/n',
    notificationDisabled: true,
    emailEnabledForProvider: false,
    smsEnabledForProvider: false,
    emailEnabledForCustomer: false,
    smsEnabledForCustomer: false,
    phoneCallEnabledForCustomer: false,
  };

  return customer;
};

const CustomerResponseDTO = (response) => {
  const {
    id,
    dateCreated,
  } = response;

  return {
    id,
    dateCreated,
  };
};
