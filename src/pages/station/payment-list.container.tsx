import {
  MinusCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Pagination, Typography, Button, Modal, Tag } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import { useListStationPayment } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { numberWithCommas } from '@/utils/string';

import { PaymentDetail } from '../payment/payment.detail';

import { InputType } from '#/api';

const { Title } = Typography;
export type PackagesFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function PaymentStationList({ clickOne, onClose }: PackagesFormProps) {
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [click, setClick] = useState<any>();
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useListStationPayment({ id: clickOne, listRelateParams });
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    if (record) {
      setClick(record);
    } else {
      setClick(undefined);
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
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
      title: 'Station Name',
      dataIndex: 'station',
      render: (_: any, record: any) => <div>{record.station.name}</div>,
    },
    {
      title: 'Package Name',
      dataIndex: 'package',
      render: (_: any, record: any) => <div>{record.package.name}</div>,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (text: any, record: any) => <div>{numberWithCommas(text)} đ</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <>
          {record.status === 'Failed' && (
            <Tag icon={<MinusCircleOutlined />} color="error">
              {record.status}
            </Tag>
          )}
          {record.status === 'Canceled' && (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              {record.status}
            </Tag>
          )}
          {record.status === 'Success' && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {record.status}
            </Tag>
          )}
        </>
      ),
    },
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
        // eslint-disable-next-line no-unsafe-optional-chaining
        total={data?.totalPages * 10}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {showInfo && <PaymentDetail onClose={closeAndRefetchHandler} clickOne={click} />}
    </Modal>
  );
}
