import { Button, Card, Col, DatePicker, Form, Pagination, Row, Select, Typography } from 'antd';
import Table from 'antd/es/table';
import moment from 'moment';
import { useState } from 'react';

import { TransactionData, useListTransaction } from '@/api/services/admin/transactionService';
import { CircleLoading } from '@/components/loading';
import ProTag from '@/theme/antd/components/tag';
import { numberWithCommas } from '@/utils/string';

import { TransactionDetail } from './transaction.detail';
import { QueryInput } from './type';

import { InputType } from '#/api';
import type { TableProps } from 'antd';

export default function ManageStationManagerList() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const [listRelateParams, setListRelateParams] = useState<QueryInput>();
  const [clickOne, setClickOne] = useState<TransactionData>();
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useListTransaction(listRelateParams);
  if (isLoading) return <CircleLoading />;

  const onOpenFormHandler = (record?: TransactionData) => {
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
  const columns: TableProps<TransactionData>['columns'] = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text, _data, index) => <Typography>{++index}</Typography>,
      width: '5%',
    },
    // {
    //   title: 'count',
    //   dataIndex: 'id',
    //   render: (_, data, index) => <Typography>{index}</Typography>,
    // },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value) => <Typography>{numberWithCommas(value)}</Typography>,
    },
    {
      title: 'User',
      dataIndex: 'user',
      render: (text) => <Typography>{text.userName}</Typography>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status !== 'Completed' ? 'error' : 'success'}>{status}</ProTag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
      render: (status) => <Typography.Text strong>{status}</Typography.Text>,
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      render: (_, text) => (
        <Typography>{moment(text.createdAt).format('DD/MM/YYYY').toString()}</Typography>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   align: 'center',
    //   width: 100,
    //   render: (_, record) => (
    //     <div className="text-gray flex w-full justify-center">
    //       <IconButton onClick={() => onOpenFormHandler(record)}>
    //         <Iconify icon="solar:pen-bold-duotone" size={18} />
    //       </IconButton>
    //       <Popconfirm
    //         title="Delete the station"
    //         okText="Yes"
    //         cancelText="No"
    //         placement="left"
    //         onConfirm={() => {
    //           deleteMutate(record.id.toString());
    //         }}
    //       >
    //         <IconButton>
    //           <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
    //         </IconButton>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];

  const resetHandler = () => {
    form.resetFields();
    // 清空时间组件，无参请求API
  };

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  const onFinishHandler = (values: any) => {
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
  return (
    <Card>
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
                <Form.Item label="Type" name="type">
                  <Select allowClear>
                    <Select.Option value="Deposit">Deposit</Select.Option>
                    <Select.Option value="Withdraw">Withdraw</Select.Option>
                    <Select.Option value="Pay">Pay</Select.Option>
                    <Select.Option value="Receive">Receive</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
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
        onChange={onPageChange}
        total={data?.totalItems}
        defaultPageSize={20}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
        showSizeChanger={false}
      />
      {showInfo && <TransactionDetail onClose={closeAndRefetchHandler} clickOne={clickOne} />}
    </Card>
  );
}
