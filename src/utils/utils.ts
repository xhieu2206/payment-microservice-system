import { PaymentStatusEnum } from '../enums/enums';

export const transactionStatusGenerator = (): string => {
  return Math.random() < 0.6
    ? PaymentStatusEnum.CONFIRMED
    : PaymentStatusEnum.DECLINED;
};

export const pinCodeGenerator = (min = 1000, max = 9999): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
