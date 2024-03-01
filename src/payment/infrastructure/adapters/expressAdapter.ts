import express, { Request, Response } from 'express';
import { PaymentProcessor } from '../../domain/payment';

export class ExpressAdapter {
  constructor(private paymentProcessor: PaymentProcessor) {}

  public setupRoutes(): express.Application {
    const app = express();
    const PORT = 4000;

    app.use(express.json());

    app.post('/procesar-pago', (req: Request, res: Response) => {
      const paymentData = req.body;
      this.paymentProcessor.procesarPago(paymentData);
      res.sendStatus(200);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    return app;
  }
}
