import { Modal, Button, Descriptions, Tag, Typography } from 'antd';
import moment from 'moment';

import { TransactionData } from '@/api/services/admin/transactionService';
import { numberWithCommas } from '@/utils/string';

import { TransactionStatusRender, TransactionTpeRender } from '../admin/transactions/constant';

export type PaymentDetailProps = {
  clickOne?: TransactionData;
  onClose: () => void;
};
export function PaymentDetail({ clickOne, onClose }: PaymentDetailProps) {
  return (
    <Modal
      open
      onCancel={() => onClose()}
      width={1300}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Descriptions title="Transaction Info" bordered style={{ marginBottom: '2rem' }}>
          {/* <Descriptions.Item label="Id" span={3}>
            {clickOne?.id}
          </Descriptions.Item> */}
          <Descriptions.Item label="Description" span={3}>
            {clickOne?.transaction?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Amount" span={3}>
            {numberWithCommas(clickOne?.transaction?.amount)} đ
          </Descriptions.Item>
          <Descriptions.Item label="Method" span={3}>
            <Typography.Text strong>{clickOne?.transaction?.method}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Create at">
            {moment(clickOne?.transaction?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Type" span={2}>
            <Tag
              color={
                TransactionTpeRender.find((e) => e.status === clickOne?.transaction?.type)?.color
              }
            >
              {clickOne?.transaction?.type}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
            <Tag
              color={
                TransactionStatusRender.find((e) => e.status === clickOne?.transaction?.status)
                  ?.color
              }
            >
              {clickOne?.transaction?.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="User Info" bordered>
          <Descriptions.Item label=" User Name" span={3}>
            {clickOne?.transaction?.user.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Full Name" span={3}>
            {clickOne?.transaction?.user.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {clickOne?.transaction?.user.email}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Account balance">
          {numberWithCommas(clickOne?.user.wallet.balance)} đ
        </Descriptions.Item> */}
          <Descriptions.Item label="Role" span={3}>
            <Typography.Text strong>{clickOne?.transaction?.user.roles[0].name}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {clickOne?.transaction?.user.phoneNumber}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Descriptions title="Package" bordered style={{ marginBottom: '2rem' }}>
          <Descriptions.Item label="Name" span={3}>
            {clickOne?.package.name}
          </Descriptions.Item>
          <Descriptions.Item label="Location" span={3}>
            {clickOne?.package.location}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {clickOne?.package.description}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Amount" span={3}>
            {numberWithCommas(clickOne.amount)} đ
          </Descriptions.Item> */}
          {/* <Descriptions.Item label="Method" span={3}>
            <Typography.Text strong>{clickOne?.method}</Typography.Text>
          </Descriptions.Item> */}
          <Descriptions.Item label="Create at" span={3}>
            {moment(clickOne?.package.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Height" span={1}>
            {clickOne?.package.height} cm
          </Descriptions.Item>
          <Descriptions.Item label="Length" span={1}>
            {clickOne?.package.length} cm
          </Descriptions.Item>
          <Descriptions.Item label="Total Days" span={1}>
            {clickOne?.package.totalDays}
          </Descriptions.Item>
          <Descriptions.Item label="Volume" span={1}>
            {clickOne?.package.volume}
          </Descriptions.Item>
          <Descriptions.Item label="Weight" span={1}>
            {clickOne?.package.weight} cm
          </Descriptions.Item>
          <Descriptions.Item label="width" span={1}>
            {clickOne?.package.width} kg
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Tag color={TransactionStatusRender.find((e) => e.status === clickOne?.status)?.color}>
              {clickOne?.package.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Station" bordered>
          <Descriptions.Item label="Name" span={3}>
            {clickOne?.station.name}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {clickOne?.station.description}
          </Descriptions.Item>
          <Descriptions.Item label="Phone" span={3}>
            {clickOne?.station.contactPhone}
          </Descriptions.Item>
          <Descriptions.Item label="Create at" span={3}>
            {moment(clickOne?.station.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={3}>
            {clickOne?.station.address}
          </Descriptions.Item>
          <Descriptions.Item label="Balance" span={3}>
            {clickOne?.station.formatBalance}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
}
