import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import {
  Card,
  Pagination,
  Typography,
  Tag,
  Button,
  Col,
  Form,
  Row,
  Select,
  DatePicker,
} from 'antd';
import Table from 'antd/es/table';
import moment from 'moment';
import { useState } from 'react';

import { useListStation } from '@/api/services/admin/stationService';
import { useListPaymentStationTest } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { numberWithCommas } from '@/utils/string';

// import { TransactionTpeRender } from '../admin/transactions/constant';

import { TransactionTpeRender } from './constant';
import { PaymenAdmintDetail } from './payment.detail';

import { InputType } from '#/api';

// import { TransactionTpeRender } from '../transactions/constant';

const { Title } = Typography;

export default function PaymentStationManagerAdminList() {
  const [form] = Form.useForm();

  // const id = getItem(StorageEnum.User).stationManager as string;
  // const [stationId, setStationId] = useState<string>('');
  // const stationRef = useRef();
  const { data: listStation } = useListStation();
  const { RangePicker } = DatePicker;
  // const idStaff = getItem(StorageEnum.User).stationId as number;
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  // const { data, isLoading } = useListPaymentStation({
  //   stationIds: `?StationIds=${stationId}`,
  //   values: listRelateParams,
  // });
  const { data, isLoading } = useListPaymentStationTest(listRelateParams);
  const [clickOne, setClickOne] = useState<any>();
  const [showInfo, setShowInfo] = useState(false);
  // const { mutateAsync: deleteMutate } = useDeleteStation();
  if (isLoading) return <CircleLoading />;

  // const handleSelectChange = (value: string) => {
  //   setStationId(value);
  // };
  const onOpenFormHandler = (record?: any) => {
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
      title: 'Type',
      dataIndex: 'type',
      render: (_: any, record: any) => (
        <Tag color={TransactionTpeRender.find((e) => e.status === record?.type)?.color}>
          {record.type}
        </Tag>
      ),
    },
    // {
    //   title: 'Created By',
    //   dataIndex: 'createdBy',
    // },
    // {
    //   title: 'Modified By',
    //   dataIndex: 'modifiedBy',
    // },
    // {
    //   title: 'Price Cod',
    //   dataIndex: 'priceCod',
    //   render: (_: any, record: any) => <div>{numberWithCommas(record.priceCod)} đ</div>,
    // },
    {
      title: 'Service Fees',
      dataIndex: 'serviceFee',
      render: (_: any, record: any) => <div>{numberWithCommas(record.serviceFee)} đ</div>,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (_: any, record: any) => <div>{numberWithCommas(record.totalPrice)} đ</div>,
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      render: (_, text) => (
        <Typography>{moment(text.createdAt).format('DD/MM/YYYY').toString()}</Typography>
      ),
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

  const onFinishHandler = (values: any) => {
    console.log('values submit', values);
    if (form.getFieldValue('date') !== undefined) {
      const formDate = {
        ...values,
        From: values.date[0].format('YYYY-MM-DD'),
        To: values.date[1].format('YYYY-MM-DD'),
      };
      delete formDate?.date;
      setListRelateParams(formDate);
    } else {
      setListRelateParams(values);
    }
  };
  const resetHandler = () => {
    form.resetFields();
    // 清空时间组件，无参请求API
  };

  return (
    <Card title="List Payments">
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={20}>
            <Row wrap={false} gutter={24}>
              <Col span={8}>
                <Form.Item label="From - To" name="date">
                  <RangePicker allowClear />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Type" name="PaymentType">
                  <Select allowClear>
                    <Select.Option value="Cash">Cash</Select.Option>
                    <Select.Option value="Wallet">Wallet</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Station" name="StationId">
                  <Select
                    showSearch
                    placeholder="Select Station"
                    // optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    fieldNames={{ value: 'id', label: 'name' }}
                    options={listStation?.contends}
                    style={{ minWidth: '13rem' }}
                    // value={stationId}
                    // onSelect={handleSelectChange}
                    allowClear
                    // onClear={() => {
                    //   setStationId('');
                    // }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Row>
              <Col span={12}>
                <Form.Item>
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
        columns={columns as any}
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
        total={data?.totalItems}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
        defaultPageSize={20}
      />
      {showInfo && <PaymenAdmintDetail onClose={closeAndRefetchHandler} clickOne={clickOne} />}
    </Card>
  );
}
