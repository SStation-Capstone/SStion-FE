interface TransactionType {
  status: string;
  color: string;
}
export const TransactionTpeRender: TransactionType[] = [
  {
    status: 'Deposit',
    color: 'green',
  },
  {
    status: 'Withdraw',
    color: 'red',
  },
  { status: 'Receive', color: 'blue' },
  { status: 'Pay', color: 'orange' },
];

export const TransactionStatusRender: TransactionType[] = [
  {
    status: 'Completed',
    color: 'green',
  },
  {
    status: 'Canceled',
    color: 'red',
  },
];
