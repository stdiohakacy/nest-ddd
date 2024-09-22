import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentGateway {
  constructor(private httpService: HttpService) {}

  async processPayment(orderId: string, amount: number): Promise<boolean> {
    try {
      const response = await this.httpService
        .post('https://payment-gateway/api/pay', {
          orderId,
          amount,
        })
        .toPromise();
      return response.status === 200;
    } catch (error) {
      throw new Error('Payment processing failed');
    }
  }
}
