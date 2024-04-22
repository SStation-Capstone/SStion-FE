import { TinyColor } from '@ctrl/tinycolor';
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
  ConfigProvider,
} from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useCreateExpire,
  useCreatePushNotification,
  useDeletePackage,
  useGetPackageBySlot,
} from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { ManageCheckInCreate } from './checkin.create';
import { ManageExpireCreate } from './expire.create';
import { PackageDetail } from './packages.detail';

const { Title } = Typography;
export type PackagesFormProps = {
  zoneId?: any;
  clickOne?: any;
  onClose: () => void;
};
export function PackagesInfo({ zoneId, clickOne, onClose }: PackagesFormProps) {
  const { id } = useParams();
  const { mutateAsync: deleteMutate } = useDeletePackage();
  const { mutateAsync: createExpire } = useCreateExpire();
  const { mutateAsync: createPushNotification } = useCreatePushNotification();
  const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#40e495', '#30dd8a', '#2bb673'];
  const colors3 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const [listRelateParams, setListRelateParams] = useState<any>();
  const [showExpire, setShowExpire] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const { data, isLoading } = useGetPackageBySlot({ id: clickOne.id, payload: listRelateParams });
  const [showInfo, setShowInfo] = useState(false);
  const [clickTwo, setClickTwo] = useState();
  const [clickExpire, setClickExpire] = useState();
  if (isLoading) return <CircleLoading />;
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const onPageChange = (page: number, pageSize: number) => {
    const values = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };
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
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(
                      ', ',
                    )})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(
                      ', ',
                    )})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ padding: '0 10px', height: '35px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFormExpire(record.id.toString());
                }}
              >
                change-location
              </Button>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors3.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors3).join(
                      ', ',
                    )})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors3).join(
                      ', ',
                    )})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ padding: '0 10px', height: '35px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  createExpire(record.id.toString());
                  onClose();
                }}
              >
                expire
              </Button>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors2.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors2).join(
                      ', ',
                    )})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors2).join(
                      ', ',
                    )})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ padding: '0 10px', height: '35px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  createPushNotification(record.id.toString());
                  onClose();
                }}
              >
                push-noti
              </Button>
            </ConfigProvider>
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
        // clickOne.isActive && (
        //   <Button key="submit" type="primary" onClick={() => setShowFormCheckIn(true)}>
        //     Check In
        //   </Button>
        // ),
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
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onOpenFormHandler(record);
            },
          };
        }}
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
