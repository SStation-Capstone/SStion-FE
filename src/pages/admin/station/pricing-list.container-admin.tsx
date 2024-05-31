import { Button, Card, Col, Form, Input, Pagination, Typography, Popconfirm, Row } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  useDeletePricing,
  useGoPricingDefault,
  useListPricing,
} from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { PricingCreate } from './pricing.create-admin';
import PricingDefaultModal from './pricingDefault.modal-admin';

import { InputType } from '#/api';
import { Pricing } from '#/entity';

const { Title } = Typography;
export type PricingFormProps = {
  check?: any;
};
export default function PricingAdminList({ check }: PricingFormProps) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { state } = useLocation();
  console.log('state', state);
  // const stationData = JSON.parse(state?.stationData);
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Pricing>();
  const [clickTwo, setClickTwo] = useState<any>();
  const [showInfo, setShowInfo] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const { data, isLoading } = useListPricing(check || id);
  const { mutateAsync: deleteMutate } = useDeletePricing(check || id);
  const { mutateAsync: createMutate } = useGoPricingDefault(check || id);
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
  const onOpenDefault = (record?: any) => {
    if (record) {
      setClickTwo(record);
    } else {
      setClickTwo(undefined);
    }
    setShowDefault(true);
  };

  const closeDefault = async () => {
    setShowDefault(false);
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
            title="Delete the service fee?"
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
    <>
      {/* <Card
        style={{ marginBottom: '1rem' }}
        bodyStyle={{ display: 'none' }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
            <Col span={24} md={8} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={stationData?.stationImages[0]?.imageUrl} />
                <div className="flex items-center pl-4">
                  <div>
                    <h4 className="m-0 font-semibold">{stationData?.name}</h4>
                    <p>{stationData?.description}</p>
                    <p>{stationData?.address}</p>
                  </div>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      /> */}
      <Card
        title="Service fees"
        extra={
          <div className="flex gap-3">
            <Button type="primary" onClick={() => onOpenFormHandler()}>
              New
            </Button>
            <Button type="primary" onClick={() => onOpenDefault(check || id)}>
              Use default service fees
            </Button>
          </div>
        }
      >
        <Form form={form} onFinish={onFinishHandler}>
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
        </Form>
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          columns={columns}
          dataSource={data}
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
        {showInfo && (
          <PricingCreate clickOne={clickOne} check={check || id} onClose={closeAndRefetchHandler} />
        )}
        {showDefault && <PricingDefaultModal click={clickTwo} onClose={closeDefault} />}
      </Card>
    </>
  );
}
