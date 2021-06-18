export enum PaymentStatusEnum {
  DECLINED = 'declined',
  CONFIRMED = 'confirmed',
}

export enum OrderStatusEnum {
  CREATED = 'created',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
}

export const PaymentOrderStatusMapping: Map<
  PaymentStatusEnum,
  OrderStatusEnum
> = new Map<PaymentStatusEnum, OrderStatusEnum>([
  [PaymentStatusEnum.DECLINED, OrderStatusEnum.CANCELLED],
  [PaymentStatusEnum.CONFIRMED, OrderStatusEnum.CONFIRMED],
]);
