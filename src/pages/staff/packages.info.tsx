import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DisconnectOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
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
  Tag,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';

import {
  useCreateExpireStaff,
  useCreatePushNotification,
  useDeletePackage,
  useGetPackageBySlot,
} from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';

import { ManageCheckInCreate } from './checkin.create';
import { ManageExpireCreate } from './expire.create';
import { PackageDetail } from './packages.detail';

import { StorageEnum } from '#/enum';

const { Title } = Typography;
export type PackagesFormProps = {
  zoneId?: any;
  clickOne?: any;
  onClose: () => void;
};
export function PackagesInfo({ zoneId, clickOne, onClose }: PackagesFormProps) {
  const { mutateAsync: deleteMutate } = useDeletePackage();
  const id = getItem(StorageEnum.User).stationId as string;
  const [listRelateParams, setListRelateParams] = useState<any>();
  const { mutateAsync: createExpire } = useCreateExpireStaff();
  const { mutateAsync: createPushNotification } = useCreatePushNotification();
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  const [loading, setLoading] = useState<boolean>(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const { data, isLoading } = useGetPackageBySlot({ id: clickOne.id, payload: listRelateParams });
  const [showInfo, setShowInfo] = useState(false);
  const [clickTwo, setClickTwo] = useState();
  const [clickExpire, setClickExpire] = useState();
  const [showExpire, setShowExpire] = useState(false);
  if (isLoading) return <CircleLoading />;
  const onPageChange = (page: number, pageSize: number) => {
    const values = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };
  console.log('data staff', data);
  const onOpenFormHandler = (record?: any) => {
    setClickTwo(record);
    setShowInfo(true);
  };
  const onOpenFormExpire = (record?: any) => {
    setClickExpire(record);
    setShowExpire(true);
  };
  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const closeExpire = async () => {
    setShowExpire(false);
    onClose();
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
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <>
          {record.status === 'Paid' && (
            <Tag icon={<MinusCircleOutlined />} color="default">
              {record.status}
            </Tag>
          )}
          {record.status === 'Returned' && (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {record.status}
            </Tag>
          )}
          {record.status === 'Canceled' && (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              {record.status}
            </Tag>
          )}
          {record.status === 'Completed' && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {record.status}
            </Tag>
          )}
          {record.status === 'Initialized' && (
            <Tag icon={<ExclamationCircleOutlined />} color="cyan">
              {record.status}
            </Tag>
          )}
          {record.status === 'Expired' && (
            <Tag icon={<DisconnectOutlined />} color="volcano">
              {record.status}
            </Tag>
          )}
        </>
      ),
    },
    { title: 'Location', dataIndex: 'location' },
    {
      title: 'Modified At',
      dataIndex: 'modifiedAt',
      render: (_: any, record: any) => (
        <div>{moment(record.modifiedAt).format('DD/MM/YYYY HH:mm:ss')}</div>
      ),
    },
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
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px' }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenFormExpire(record.id.toString());
              }}
            >
              <Iconify icon="mdi:folder-location" size={18} />
              Change location
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px', backgroundColor: '#13c2c2' }}
              onClick={(e) => {
                e.stopPropagation();
                if (record.status === 'Expired') {
                  message.error('Package have been expired!');
                } else {
                  createExpire(record.id.toString());
                  onClose();
                }
              }}
            >
              <Iconify icon="pajamas:expire" size={18} />
              Expire
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px', backgroundColor: '#faad14' }}
              onClick={(e) => {
                e.stopPropagation();
                createPushNotification(record.id.toString());
                onClose();
              }}
            >
              <Iconify icon="iconamoon:notification-fill" size={18} />
              Notification
            </Button>
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
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                </IconButton>
              </Popconfirm>
            )}
          </div>
        </div>
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
        dataSource={data?.contends.filter(
          (c: any) => c.status !== 'Completed' && c.status !== 'Returned',
        )}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onOpenFormHandler(record);
            },
          };
        }}
        loading={isLoading}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        total={
          data?.contends.filter((c: any) => c.status !== 'Completed' && c.status !== 'Returned')
            .length
        }
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
      {showInfo && (
        <PackageDetail
          clickOne={clickTwo}
          check
          slotId={clickOne.id}
          onClose={closeAndRefetchHandler}
        />
      )}
      {showExpire && (
        <ManageExpireCreate
          zoneId={id}
          slotId={clickOne.id}
          packageId={clickExpire}
          onClose={closeExpire}
        />
      )}
    </Modal>
  );
}
