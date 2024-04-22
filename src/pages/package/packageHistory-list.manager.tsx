import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Card, Pagination, Tag, Typography } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import { useListPackageHistoryStation } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';

import { InputType } from '#/api';
import { StorageEnum } from '#/enum';

const { Title } = Typography;

export default function PackageHistoryStationManagerList() {
  const id = getItem(StorageEnum.User).stationManager as string;
  const idStaff = getItem(StorageEnum.User).stationId as number;
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListPackageHistoryStation({
    stationIds: id || `?StationIds=${idStaff}`,
    values: listRelateParams,
  });
  // const { mutateAsync: deleteMutate } = useDeleteStation();
  if (isLoading) return <CircleLoading />;
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text: any, _data: any, index: number) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    // {
    //   title: 'Images',
    //   dataIndex: 'packageImages',
    //   render: (_: any, record: { packageImages: { imageUrl: string }[] }) => (
    //     <Avatar.Group className="gap-4">
    //       {record.packageImages.map((image: any, i: any) => (
    //         <Image
    //           width={50}
    //           src={image.imageUrl}
    //           key={i}
    //           placeholder={<Image preview={false} src={image.imageUrl} width={200} />}
    //           style={{ borderRadius: '5px' }}
    //         />
    //       ))}
    //     </Avatar.Group>
    //   ),
    // },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'packageName',
      dataIndex: 'packageName',
    },
    // { title: 'Location', dataIndex: 'location' },
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
        </>
      ),
    },
    // {
    //   title: 'Sender',
    //   dataIndex: 'sender',
    //   render: (_: any, record: any) => (
    //     <List.Item>
    //       <List.Item.Meta
    //         className="flex gap-3"
    //         avatar={<Avatar shape="square" size={48} src={record.sender.avatarUrl} />}
    //         title={record.sender.fullName}
    //         description={record.sender.phoneNumber}
    //       />
    //     </List.Item>
    //   ),
    // },
    // {
    //   title: 'Receiver',
    //   dataIndex: 'receiver',
    //   render: (_: any, record: any) => (
    //     <List.Item>
    //       <List.Item.Meta
    //         className="flex gap-3"
    //         avatar={<Avatar shape="square" size={48} src={record.receiver.avatarUrl} />}
    //         title={record.receiver.fullName}
    //         description={record.receiver.phoneNumber}
    //       />
    //     </List.Item>
    //   ),
    // },
  ];

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  return (
    <Card title="List package history station">
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
    </Card>
  );
}
