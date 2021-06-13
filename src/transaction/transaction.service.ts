import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const newTransaction = await this.transactionRepository.create({
      ...createTransactionDto,
    });
    return this.transactionRepository.save(newTransaction);
  }

  async get(id: number): Promise<Transaction> {
    return this.transactionRepository.findOne(id);
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    let updateTransaction = await this.transactionRepository.findOne(id);
    updateTransaction = {
      ...updateTransaction,
      ...updateTransactionDto,
      transactionDate: new Date(),
    };
    return this.transactionRepository.save(updateTransaction);
  }
}
