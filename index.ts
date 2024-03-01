import express, { Request, Response } from 'express';
import WebSocket from 'ws';
import { PaymentService } from './src/payment/application/services/paymentService';

const app = express();
const PORT = 4000;

// Configurar el servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });
const connectedClients = new Set<WebSocket>(); 

wss.on('connection', function connection(ws) {
  if (!connectedClients.has(ws)) {
    console.log('New client connected');
    connectedClients.add(ws); 
    ws.send('¡Bienvenido!');
  }

  ws.on('close', () => {
    connectedClients.delete(ws);
    console.log('Client disconnected');
  });
});

// Crear una instancia del servicio de pago con los clientes WebSocket
const paymentService = new PaymentService(connectedClients);

// Definir la ruta para procesar pagos
app.post('/procesar-pago', (req: Request, res: Response) => {
  const paymentData = req.body;
  
  // Utilizar el servicio de pago para procesar el pago
  paymentService.procesarPago(paymentData);

  res.sendStatus(200);
});

// Escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
