import { Button, Col, Form, Input, Pagination, Typography, Row, Modal } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { useGoPricingDefault, useListPricingDefault } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

import { InputType } from '#/api';

const { Title } = Typography;
export type PricingFormProps = {
  click?: any;
  onClose: () => void;
};
export default function PricingDefaultModal({ click, onClose }: PricingFormProps) {
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListPricingDefault();
  const { mutateAsync: createMutate } = useGoPricingDefault(click);
  if (isLoading) return <CircleLoading />;

  const columns: ColumnsType<any> = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
    },
    {
      title: 'Price',
      dataIndex: 'pricePerUnit',
    },
    {
      title: 'Duration',
      dataIndex: 'unitDuration',
    },
  ];

  const resetHandler = () => {
    form.resetFields();
  };

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  const onFinishHandler = (values: InputType) => {
    setListRelateParams(values);
  };

  return (
    <Modal
      title="List pricing default"
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Denied
        </Button>,
        <Button
          type="primary"
          onClick={() => {
            createMutate();
            onClose();
          }}
        >
          Accept
        </Button>,
      ]}
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={data.contends}
        loading={isLoading}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        total={data?.totalPages}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
    </Modal>
  );
}
