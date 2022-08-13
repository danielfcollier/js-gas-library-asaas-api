const PaymentRequestDTO = (data) => {
  return {
    customer: data.customerId,
    billingType: 'UNDEFINED',
    dueDate: data.dueDate,
    value: data.value,
    description: data.description,
    externalReference: data?.id,
    postalService: false,
  };
};

const PaymentResponseDTO = (response) => {
  const {
    id,
    dateCreated,
    status,
    paymentDate,
    clientPaymentDate,
    refunds,
  } = response;

  return {
    id,
    dateCreated,
    status,
    paymentDate,
    clientPaymentDate,
    billingType,
    refunds,
  };
};
