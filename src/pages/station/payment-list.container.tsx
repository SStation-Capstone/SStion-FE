import { Pagination, Typography, Button, Modal } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import { useListStationPayment } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

import { InputType } from '#/api';

const { Title } = Typography;
export type PackagesFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function PaymentStationList({ clickOne, onClose }: PackagesFormProps) {
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListStationPayment({ id: clickOne, listRelateParams });
  if (isLoading) return <CircleLoading />;

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text: any, _data: any, index: number) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    {
      title: 'stationName',
      dataIndex: 'stationName',
    },
    {
      title: 'packageName',
      dataIndex: 'packageName',
    },
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
    <Modal
      title="List Payment station"
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
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
    </Modal>
  );
}
