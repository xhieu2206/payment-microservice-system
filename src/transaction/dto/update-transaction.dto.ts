import { IsIn, IsNumber, Min } from 'class-validator';

export class UpdateTransactionDto {
  @IsIn(['confirmed', 'declined'])
  status: string;
}
