const ERRORS = {
  CUSTOMER: {
    CREATE: (customer) => new Error(`Could not create customer! ${customer?.name} - ${customer?.documentId}`, { name: 'AsaasAPIError' }),
    UPDATE: (customer) => new Error(`Could not update customer! ${customer?.name} - ${customer?.documentId}`, { name: 'AsaasAPIError' }),
    DELETE: (customer) => new Error(`Could not delete customer! ${customer?.name} - ${customer?.documentId}`, { name: 'AsaasAPIError' }),
  },
  PAYMENT: {
    CREATE: (payment) => new Error(`Could not create payment! ${payment?.id} - ${payment?.description}`, { name: 'AsaasAPIError' }),
    UPDATE: (payment) => new Error(`Could not update payment! ${payment?.id} - ${payment?.description}`, { name: 'AsaasAPIError' }),
    DELETE: (payment) => new Error(`Could not delete payment! ${payment?.id} - ${payment?.description}`, { name: 'AsaasAPIError' }),
  },
  INSTALLMENT: {
    CREATE: (installment) => new Error(`Could not create installment! ${installment?.installmentId} - ${installment?.description}`, { name: 'AsaasAPIError' }),
    UPDATE: (installment) => new Error(`Could not update installment! ${installment?.installmentId} - ${installment?.description}`, { name: 'AsaasAPIError' }),
    DELETE: (installment) => new Error(`Could not delete installment! ${installment?.installmentId} - ${installment?.description}`, { name: 'AsaasAPIError' }),
  },
};
