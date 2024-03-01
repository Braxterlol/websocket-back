import WebSocket from 'ws';

// Definimos una interfaz para el cliente de WebSocket
interface WebSocketClient {
  send: (message: string) => void;
  readyState: number;
}

export class PaymentService {
  private webSocketClients: Set<WebSocketClient>; // Lista de clientes WebSocket

  constructor(webSocketClients: Set<WebSocketClient>) {
    this.webSocketClients = webSocketClients;
  }

  procesarPago(paymentData: any): void {
    // Aquí irá la lógica para procesar el pago
    console.log('Procesando pago:', paymentData);

    // Notificar a los clientes WebSocket sobre el nuevo pago
    this.webSocketClients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log("Pago confirmado")
        client.send('¡Nuevo pago recibido!');
      }
    });
  }
}
