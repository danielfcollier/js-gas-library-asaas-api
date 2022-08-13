class ServiceLogger {
  constructor(message, customerId, paymentId = null) {
    console.log(`### ${message.toUpperCase()} <> Customer: ${customerId} ${paymentId ? '<> Payment ' + paymentId : ''}`);
  }
}
