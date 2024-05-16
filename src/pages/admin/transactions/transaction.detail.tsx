import { Modal, UploadFile, Button, Descriptions, Tag, Typography } from 'antd';

// import { PERMISSION_LIST } from '@/_mock/assets';

import moment from 'moment';
import { useState } from 'react';

import { useCreateSManager, useUpdateManager } from '@/api/services/admin/managerService';
import { TransactionData } from '@/api/services/admin/transactionService';
import { numberWithCommas } from '@/utils/string';

import { TransactionStatusRender, TransactionTpeRender } from './constant';

export type TransactionDetailProps = {
  clickOne?: TransactionData;
  onClose: () => void;
  // onOk: VoidFunction;
  // onCancel: VoidFunction;
};
// const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function TransactionDetail({ clickOne, onClose }: TransactionDetailProps) {
  const { mutateAsync: createMutate } = useCreateSManager();
  const { mutateAsync: updateMutate } = useUpdateManager();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const submitHandle = async () => {
  //   const values = await form.validateFields();
  //   setLoading(true);
  //   try {
  //     if (clickOne) {
  //       const updateData: MangerPayload = {
  //         ...clickOne,
  //         id: clickOne.id,
  //       };
  //       if (isArray(values.avatarUrl) && values.avatarUrl.length > 0) {
  //         const updateImageUrl: string = await uploadFileToFirebase(values?.avatarUrl[0]);
  //         const imageUrl = updateImageUrl;
  //         updateData.avatarUrl = imageUrl;
  //       }
  //       updateData.userName = values.userNamec;
  //       updateData.email = values.email;
  //       updateData.fullName = values.fullName;
  //       updateData.password = values.password;
  //       updateMutate(updateData);
  //       setLoading(false);
  //     } else {
  //       const imageUrl: string = await uploadFileToFirebase(values?.avatarUrl[0]);
  //       const createData: MangerPayload = {
  //         ...values,
  //         avatarUrl: imageUrl,
  //       };
  //       createMutate(createData);
  //       setLoading(false);
  //     }
  //     onClose();
  //   } catch (error) {
  //     message.error(error.message || error);
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // const onImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };
  return (
    <Modal
      open
      onCancel={() => onClose()}
      width={1300}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        // <Button key="submit" type="primary" loading={loading} onClick={submitHandle}>
        //   Submit
        // </Button>,
      ]}
    >
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Descriptions title="Transaction Info" bordered style={{ marginBottom: '2rem' }}>
          {/* <Descriptions.Item label="Id" span={3}>
            {clickOne?.id}
          </Descriptions.Item> */}
          <Descriptions.Item label="Description" span={3}>
            {clickOne?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Amount" span={3}>
            {numberWithCommas(clickOne.amount)} đ
          </Descriptions.Item>
          <Descriptions.Item label="Method" span={3}>
            <Typography.Text strong>{clickOne?.method}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Create at">
            {moment(clickOne?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Type" span={2}>
            <Tag color={TransactionTpeRender.find((e) => e.status === clickOne?.type)?.color}>
              {clickOne?.type}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
            <Tag color={TransactionStatusRender.find((e) => e.status === clickOne?.status)?.color}>
              {clickOne?.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="User Info" bordered>
          <Descriptions.Item label=" User Name" span={3}>
            {clickOne?.user.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Full Name" span={3}>
            {clickOne?.user.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {clickOne?.user.email}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Account balance">
          {numberWithCommas(clickOne?.user.wallet.balance)} đ
        </Descriptions.Item> */}
          <Descriptions.Item label="Role" span={3}>
            <Typography.Text strong>{clickOne?.user.roles[0].name}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">{clickOne?.user.phoneNumber}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {clickOne?.payment && (
          <Descriptions title="Package" bordered style={{ marginBottom: '2rem' }}>
            <Descriptions.Item label="Name" span={3}>
              {clickOne?.payment?.package.name}
            </Descriptions.Item>
            <Descriptions.Item label="Location" span={3}>
              {clickOne?.payment?.package.location}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {clickOne?.payment?.package.description}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Amount" span={3}>
            {numberWithCommas(clickOne.amount)} đ
          </Descriptions.Item> */}
            {/* <Descriptions.Item label="Method" span={3}>
            <Typography.Text strong>{clickOne?.method}</Typography.Text>
          </Descriptions.Item> */}
            <Descriptions.Item label="Create at" span={3}>
              {moment(clickOne?.payment?.package.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Height" span={1}>
              {clickOne?.payment?.package.height} cm
            </Descriptions.Item>
            <Descriptions.Item label="Length" span={1}>
              {clickOne?.payment?.package.length} cm
            </Descriptions.Item>
            <Descriptions.Item label="Total Days" span={1}>
              {clickOne?.payment?.package.totalDays}
            </Descriptions.Item>
            <Descriptions.Item label="Volume" span={1}>
              {clickOne?.payment?.package.volume}
            </Descriptions.Item>
            <Descriptions.Item label="Weight" span={1}>
              {clickOne?.payment?.package.weight} cm
            </Descriptions.Item>
            <Descriptions.Item label="width" span={1}>
              {clickOne?.payment?.package.width} kg
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Tag
                color={TransactionStatusRender.find((e) => e.status === clickOne?.status)?.color}
              >
                {clickOne?.payment?.package.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
        {clickOne?.payment?.station && (
          <Descriptions title="Station" bordered>
            <Descriptions.Item label="Name" span={3}>
              {clickOne?.payment?.station.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {clickOne?.payment?.station.description}
            </Descriptions.Item>
            <Descriptions.Item label="Phone" span={3}>
              {clickOne?.payment?.station.contactPhone}
            </Descriptions.Item>
            <Descriptions.Item label="Create at" span={3}>
              {moment(clickOne?.payment?.station.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={3}>
              {clickOne?.payment?.station.address}
            </Descriptions.Item>
            <Descriptions.Item label="Balance" span={3}>
              {clickOne?.payment?.station.formatBalance}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
    </Modal>
  );
}
