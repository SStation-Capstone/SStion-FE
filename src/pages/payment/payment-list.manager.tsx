import { CheckCircleOutlined } from '@ant-design/icons';
import { Card, Pagination, Typography, Tag } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import { useListPaymentStation } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';
import { numberWithCommas } from '@/utils/string';

import { InputType } from '#/api';
import { StorageEnum } from '#/enum';

const { Title } = Typography;

export default function PaymentStationManagerList() {
  const id = getItem(StorageEnum.User).stationManager as string;
  const idStaff = getItem(StorageEnum.User).stationId as number;
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListPaymentStation({
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
      title: 'Station Name',
      dataIndex: 'stationName',
      render: (_: any, record: any) => <div>{record.station.name}</div>,
    },
    {
      title: 'Package Name',
      dataIndex: 'packageName',
      render: (_: any, record: any) => <div>{record.package.name}</div>,
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
    },
    {
      title: 'Modified By',
      dataIndex: 'modifiedBy',
    },
    {
      title: 'Price Cod',
      dataIndex: 'priceCod',
      render: (_: any, record: any) => <div>{numberWithCommas(record.priceCod)} đ</div>,
    },
    {
      title: 'Service Fee',
      dataIndex: 'serviceFee',
      render: (_: any, record: any) => <div>{numberWithCommas(record.serviceFee)} đ</div>,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (_: any, record: any) => <div>{numberWithCommas(record.totalPrice)} đ</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {record.status}
        </Tag>
      ),
    },
  ];

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  return (
    <Card title="List payment station">
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
        // eslint-disable-next-line no-unsafe-optional-chaining
        total={data?.totalPages * 10}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
    </Card>
  );
}
