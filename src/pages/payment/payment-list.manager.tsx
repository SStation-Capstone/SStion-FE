import { Card, Avatar, Pagination, Typography, Image, List } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import { useListPaymentStation } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';

import { InputType } from '#/api';
import { StorageEnum } from '#/enum';

const { Title } = Typography;

export default function PaymentStationManagerList() {
  const id = getItem(StorageEnum.User).stationManager as string;
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListPaymentStation({ stationIds: id, values: listRelateParams });
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
      title: 'createdBy',
      dataIndex: 'createdBy',
    },
    {
      title: 'modifiedBy',
      dataIndex: 'modifiedBy',
    },
    { title: 'priceCod', dataIndex: 'priceCod' },
    { title: 'totalPrice', dataIndex: 'totalPrice' },
    { title: 'status', dataIndex: 'status' },
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
        total={data?.totalPages * 10}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
    </Card>
  );
}
