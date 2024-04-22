import {
  Button,
  message,
  Avatar,
  List,
  Modal,
  Image,
  Table,
  Pagination,
  Typography,
  Popconfirm,
} from 'antd';
import { useState } from 'react';

import { useDeletePackage, useGetPackageBySlot } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { ManageCheckInCreate } from './checkin.create';

const { Title } = Typography;
export type PackagesFormProps = {
  zoneId?: any;
  clickOne?: any;
  onClose: () => void;
};
export function PackagesInfo({ zoneId, clickOne, onClose }: PackagesFormProps) {
  const { mutateAsync: deleteMutate } = useDeletePackage();
  const [listRelateParams, setListRelateParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const { data, isLoading } = useGetPackageBySlot({ id: clickOne.id, payload: listRelateParams });
  if (isLoading) return <CircleLoading />;
  const onPageChange = (page: number, pageSize: number) => {
    const values = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text: any, _data: any, index: number) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    {
      title: 'Images',
      dataIndex: 'packageImages',
      render: (_: any, record: { packageImages: { imageUrl: string }[] }) => (
        <Avatar.Group className="gap-4">
          {record.packageImages.map((image: any, i: any) => (
            <Image
              width={50}
              src={image.imageUrl}
              key={i}
              placeholder={<Image preview={false} src={image.imageUrl} width={200} />}
              style={{ borderRadius: '5px' }}
            />
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    { title: 'Location', dataIndex: 'location' },
    {
      title: 'Sender',
      dataIndex: 'sender',
      render: (_: any, record: any) => (
        <List.Item>
          <List.Item.Meta
            className="flex gap-3"
            avatar={<Avatar shape="square" size={48} src={record.sender.avatarUrl} />}
            title={record.sender.fullName}
            description={record.sender.phoneNumber}
          />
        </List.Item>
      ),
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      render: (_: any, record: any) => (
        <List.Item>
          <List.Item.Meta
            className="flex gap-3"
            avatar={<Avatar shape="square" size={48} src={record.receiver.avatarUrl} />}
            title={record.receiver.fullName}
            description={record.receiver.phoneNumber}
          />
        </List.Item>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => (
        <>
          {/* <IconButton onClick={() => onOpenFormHandler(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton> */}
          {clickOne.isActive && (
            <Popconfirm
              title="Delete the package"
              okText="Yes"
              cancelText="No"
              placement="right"
              onConfirm={() => {
                deleteMutate(record.id.toString());
                onClose();
              }}
            >
              <IconButton>
                <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
              </IconButton>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];
  const closeFormCheckIn = async () => {
    setShowFormCheckIn(false);
  };
  const submitHandle = async () => {
    setLoading(true);
    try {
      setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Packages by slot"
      open
      width={1300}
      onOk={submitHandle}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        clickOne.isActive && (
          <Button key="submit" type="primary" onClick={() => setShowFormCheckIn(true)}>
            Check In
          </Button>
        ),
      ]}
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns as any}
        dataSource={data?.contends}
        loading={isLoading}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        total={data?.totalPages}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {showFormCheckIn && (
        <ManageCheckInCreate
          zoneId={zoneId}
          slotId={clickOne.id}
          onClose={closeFormCheckIn}
          onCloseCheckIn={onClose}
        />
      )}
    </Modal>
  );
}