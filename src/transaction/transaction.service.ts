import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Order } from './entities/Order';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { pinCodeGenerator, transactionStatusGenerator } from '../utils/utils';
import { PaymentStatusEnum } from '../enums/enums';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(order: Order): Promise<Transaction> {
    const status = transactionStatusGenerator();
    const createTransactionDto = new CreateTransactionDto(
      order.id,
      status,
      status === PaymentStatusEnum.CONFIRMED ? pinCodeGenerator() : null,
    );
    const newTransaction = await this.transactionRepository.create({
      ...createTransactionDto,
    });
    return this.transactionRepository.save(newTransaction);
  }
}
