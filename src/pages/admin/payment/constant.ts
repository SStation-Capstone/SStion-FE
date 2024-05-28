interface PaymentType {
  status: string;
  color: string;
}

interface TransactionType {
  status: string;
  color: string;
}
export const PaymentTpeRender: PaymentType[] = [
  {
    status: 'Success',
    color: 'green',
  },
  {
    status: 'Failed',
    color: 'red',
  },
  { status: 'Canceled', color: 'yellow' },
];

export const PaymentStatusRender: PaymentType[] = [
  {
    status: 'Success',
    color: 'green',
  },
  {
    status: 'Failed',
    color: 'red',
  },
  { status: 'Canceled', color: 'yellow' },
];

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
