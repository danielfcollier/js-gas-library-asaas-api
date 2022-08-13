const InstallmentRequestDTO = (data, installmentCount) => {
  return {
    customer: data.customerId,
    billingType: 'CREDIT_CARD',
    dueDate: data.dueDate,
    installmentCount: installmentCount,
    totalValue: data.value,
    description: data.description,
    externalReference: data?.id,
    postalService: false,
  };
};

const InstallmentResponseDTO = (response) => {
  const {
    id,
    installment,
    dateCreated,
    status,
    paymentDate,
    clientPaymentDate,
    refunds,
  } = response;

  return {
    id,
    installmentId: installment,
    dateCreated,
    status,
    paymentDate,
    clientPaymentDate,
    billingType,
    refunds,
  };
};
