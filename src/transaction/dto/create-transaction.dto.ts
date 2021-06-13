import { IsIn, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(0)
  orderId: number;

  @IsIn(['confirmed', 'declined'])
  status: string;

  pin: number | null;
}
