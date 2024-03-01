export interface Payment {
    amount: number
  }
  
  export interface PaymentProcessor {
    procesarPago(paymentData: Payment): void;
  }
  