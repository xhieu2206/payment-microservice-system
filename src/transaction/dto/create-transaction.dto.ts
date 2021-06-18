import { IsIn, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  constructor(orderId, status, pin) {
    this.orderId = orderId;
    this.status = status;
    this.pin = pin;
  }

  @IsNumber()
  @Min(0)
  orderId: number;

  @IsIn(['confirmed', 'declined'])
  status: string;

  pin?: number | null;
}
