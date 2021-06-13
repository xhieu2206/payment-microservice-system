import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'status', default: 'pending' })
  status: string;

  @Column({ name: 'pin_code', nullable: true })
  pin: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'transaction_date',
    type: 'datetime',
    nullable: true,
  })
  transactionDate: Date;
}
