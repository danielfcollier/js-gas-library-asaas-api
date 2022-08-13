const AsaasAPIError = { name: 'AsaasAPIError' };

const ERRORS = {
  CUSTOMER: {
    CREATE: (customer) => new Error(`Could not create customer! ${customer?.name} - ${customer?.documentId}`, AsaasAPIError),
    UPDATE: (customer) => new Error(`Could not update customer! ${customer?.name} - ${customer?.documentId}`, AsaasAPIError),
    DELETE: (customer) => new Error(`Could not delete customer! ${customer?.name} - ${customer?.documentId}`, AsaasAPIError),
  },
  PAYMENT: {
    CREATE: (payment) => new Error(`Could not create payment! ${payment?.id} - ${payment?.description}`, AsaasAPIError),
    UPDATE: (payment) => new Error(`Could not update payment! ${payment?.id} - ${payment?.description}`, AsaasAPIError),
    DELETE: (payment) => new Error(`Could not delete payment! ${payment?.id} - ${payment?.description}`, AsaasAPIError),
  },
  INSTALLMENT: {
    CREATE: (payment) => new Error(`Could not create installment! Payment: ${payment?.id} - ${payment?.description}`, AsaasAPIError),
    UPDATE: (payment) => new Error(`Could not update installment! Payment: ${payment?.id} - ${payment?.description}`, AsaasAPIError),
    DELETE: (payment) => new Error(`Could not delete installment! Payment: ${payment?.id} - ${payment?.description}`, AsaasAPIError),
  },
  RECEIPT: {
    CREATE: (payment) => new Error(`Could not create receipt! Payment: ${payment?.id} - ${payment?.description}`, AsaasAPIError),
    UPDATE: (payment) => new Error(`Could not update receipt! Payment: ${payment?.id} - ${payment?.description}`, AsaasAPIError),
    DELETE: (payment) => new Error(`Could not delete receipt! Payment: ${payment?.id} - ${payment?.description}`, AsaasAPIError),
  },
};
