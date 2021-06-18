import { Controller, HttpService } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from './entities/Order';
import { PaymentOrderStatusMapping, PaymentStatusEnum } from '../enums/enums';

@Controller('transactions')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private httpService: HttpService,
  ) {}

  @EventPattern('order_created')
  async create(order: Order) {
    const newTransaction = await this.transactionService.create(order);
    const status =
      newTransaction.status === PaymentStatusEnum.DECLINED
        ? PaymentOrderStatusMapping.get(PaymentStatusEnum.DECLINED)
        : PaymentOrderStatusMapping.get(PaymentStatusEnum.CONFIRMED);
    this.httpService
      .patch(`http://localhost:3001/api/order-payment/${order.id}`, {
        status,
        pin: newTransaction.pin,
      })
      .toPromise()
      .then(() => console.log("Update order's status successfully"))
      .catch(() =>
        console.log("Error happened while updating order's status: "),
      );
  }
}
