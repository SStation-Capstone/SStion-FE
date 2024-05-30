import { Button, Card, Form, Pagination, Typography, Popconfirm } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { useDeletePricingDefault, useListPricingDefault } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { PricingDefaultCreate } from './pricingDefault.create';

import { InputType } from '#/api';
import { Pricing } from '#/entity';

const { Title } = Typography;

export default function StaffManagerList() {
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Pricing>();
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useListPricingDefault();
  const { mutateAsync: deleteMutate } = useDeletePricingDefault();
  if (isLoading) return <CircleLoading />;

  const onOpenFormHandler = (record?: Pricing) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const columns: ColumnsType<any> = [
    // {
    //   title: 'No',
    //   dataIndex: 'no',
    //   // eslint-disable-next-line no-plusplus
    //   render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
    //   width: '5%',
    // },
    {
      title: 'From (day)',
      dataIndex: 'startTime',
    },
    {
      title: 'To (day)',
      dataIndex: 'endTime',
    },
    {
      title: 'Price (đ)',
      dataIndex: 'price',
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="text-gray flex w-full justify-center">
          <IconButton onClick={() => onOpenFormHandler(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete the pricing"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => {
              deleteMutate(record.id.toString());
            }}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
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
    <Card
      extra={
        <Button type="primary" onClick={() => onOpenFormHandler()}>
          New
        </Button>
      }
    >
      {/* <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={8}>
            <Form.Item name="Search">
              <Input placeholder="Search by name" allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Row>
              <Col span={12}>
                <Form.Item name="search">
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button type="primary" onClick={resetHandler}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form> */}
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
        total={data?.totalItems}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {showInfo && <PricingDefaultCreate clickOne={clickOne} onClose={closeAndRefetchHandler} />}
    </Card>
  );
}
