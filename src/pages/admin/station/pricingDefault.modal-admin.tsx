import { Button, Form, Pagination, Typography, Modal } from 'antd';
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
      title: 'From (day)',
      dataIndex: 'startTime',
    },
    {
      title: 'To (day)',
      dataIndex: 'endTime',
    },
    {
      title: 'Price',
      dataIndex: 'formatPrice',
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
      title="Service fee default"
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
