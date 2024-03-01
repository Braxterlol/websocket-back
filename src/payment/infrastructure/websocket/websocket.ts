import WebSocket from 'ws';
import { PaymentProcessor } from '../../domain/payment';

export class WebSocketAdapter {
  private wss: WebSocket.Server;
  private connectedClients: Set<WebSocket>;

  constructor(private paymentProcessor: PaymentProcessor) {
    this.wss = new WebSocket.Server({ port: 8080 });
    this.connectedClients = new Set<WebSocket>();
    
    this.initWebSocketServer();
  }

  private initWebSocketServer(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      if (!this.connectedClients.has(ws)) {
        console.log('New client connected');
        this.connectedClients.add(ws); 
        ws.send('¡Bienvenido!');
      }

      ws.on('close', () => {
        this.connectedClients.delete(ws);
        console.log('Client disconnected');
      });
    });
  }

  public sendNotification(message: string): void {
    this.connectedClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
