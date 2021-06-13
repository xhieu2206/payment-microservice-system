import { IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(0)
  orderId: number;
}
