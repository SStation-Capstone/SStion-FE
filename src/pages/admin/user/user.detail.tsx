import { Modal, Button, Descriptions, Typography } from 'antd';

export type UserDetailProps = {
  clickOne?: any;
  onClose: () => void;
};
export function UserDetail({ clickOne, onClose }: UserDetailProps) {
  return (
    <Modal
      open
      onCancel={() => onClose()}
      // width={1300}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label=" User Name" span={3}>
          {clickOne?.userName}
        </Descriptions.Item>
        <Descriptions.Item label="Full Name" span={3}>
          {clickOne?.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {clickOne?.email}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Account balance">
          {numberWithCommas(clickOne?.user.wallet.balance)} đ
        </Descriptions.Item> */}
        <Descriptions.Item label="Role" span={3}>
          <Typography.Text strong>{clickOne?.roles[0].name}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">{clickOne?.phoneNumber}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
