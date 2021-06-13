export const transactionStatusGenerator = (): string => {
  return Math.random() < 0.5 ? 'confirmed' : 'declined';
};
