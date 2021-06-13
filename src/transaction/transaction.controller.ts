import {
  Body,
  Controller,
  Get,
  HttpService,
  Param,
  Patch,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { EventPattern } from '@nestjs/microservices';
import { Order } from './entities/Order';
import { transactionStatusGenerator, pinCodeGenerator } from '../utils/utils';

@Controller('transactions')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private httpService: HttpService,
  ) {}

  @Get(':id')
  get(@Param('id') id: number): Promise<Transaction> {
    return this.transactionService.get(id);
  }

  @Patch(':id')
  update(
    @Param(':id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @EventPattern('order_created')
  async create(order: Order) {
    const createTransactionDto = new CreateTransactionDto();
    createTransactionDto.orderId = order.id;
    createTransactionDto.status = transactionStatusGenerator();
    createTransactionDto.pin =
      createTransactionDto.status === 'confirmed' ? pinCodeGenerator() : null;
    await this.transactionService.create(createTransactionDto);
    this.httpService
      .patch(`http://localhost:3001/api/orders/${order.id}`, {
        productName: order.productName,
        image: order.image,
        quantity: order.quantity,
        deliveryAddress: order.deliveryAddress,
        customerName: order.customerName,
        phone: order.phone,
        email: order.email,
        status:
          createTransactionDto.status === 'confirmed'
            ? 'confirmed'
            : 'cancelled',
        pin: createTransactionDto.pin,
      })
      .subscribe((res) => console.log(res.status));
  }
}
