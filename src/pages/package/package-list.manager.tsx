import { TinyColor } from '@ctrl/tinycolor';
import { Card, Avatar, Pagination, Typography, Image, List, Button, ConfigProvider } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import {
  useCreateExpire,
  useCreatePushNotification,
  useListPackageStation,
} from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';

import { ManageExpireCreate } from '../station/expire.create';

import { InputType } from '#/api';
import { StorageEnum } from '#/enum';

const { Title } = Typography;

export default function PackageStationManagerList() {
  const id = getItem(StorageEnum.User).stationManager as string;
  const idStaff = getItem(StorageEnum.User).stationId as number;
  const { mutateAsync: createExpire } = useCreateExpire();
  const { mutateAsync: createPushNotification } = useCreatePushNotification();
  const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#40e495', '#30dd8a', '#2bb673'];
  const colors3 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [showExpire, setShowExpire] = useState(false);
  const [zoneId, setZoneId] = useState();
  const [slotId, setSlotId] = useState();
  const [packageId, setPackageId] = useState();
  const { data, isLoading } = useListPackageStation({
    stationIds: id || `?StationIds=${idStaff}`,
    values: listRelateParams,
  });
  // const { mutateAsync: deleteMutate } = useDeleteStation();
  if (isLoading) return <CircleLoading />;
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  const onOpenFormExpire = (record?: any) => {
    setZoneId(record.zone.id);
    setSlotId(record.slot.id);
    setPackageId(record.id);
    setShowExpire(true);
  };
  const closeExpire = async () => {
    setShowExpire(false);
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
                onClick={() => {
                  onOpenFormExpire(record);
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
                onClick={() => {
                  createExpire(record.id.toString());
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
                onClick={() => {
                  createPushNotification(record.id.toString());
                }}
              >
                push-noti
              </Button>
            </ConfigProvider>
          </div>
        </div>
      ),
    },
  ];

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  return (
    <Card title="List package station">
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
        total={data?.totalPages * 10}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {showExpire && (
        <ManageExpireCreate
          zoneId={zoneId}
          slotId={slotId}
          packageId={packageId}
          onClose={closeExpire}
        />
      )}
    </Card>
  );
}
