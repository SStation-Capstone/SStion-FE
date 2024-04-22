interface STATUSTAGTYPE {
  status: string;
  color: string;
}
const STATUS_TAG: STATUSTAGTYPE[] = [
  {
    status: 'Initialized',
    color: 'cyan',
  },
  {
    status: 'Returned',
    color: 'yellow',
  },
  { status: 'Paid', color: 'green' },
  { status: 'Completed', color: 'blue' },
  { status: 'Canceled', color: 'red' },
  { status: 'Expired', color: 'gray' },
];
