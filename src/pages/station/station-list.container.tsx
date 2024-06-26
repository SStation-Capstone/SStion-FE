import { Avatar, Button, Card, Col, Form, Input, Pagination, Row } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useListStation } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

import { PackageList } from './package-list.container';
import { PaymentStationList } from './payment-list.container';
import { StationDetail } from './station.detail';
import { ManageStationEdit } from './station.edit';

import { InputType } from '#/api';
import { Station } from '#/entity';

export default function ManageStationManagerList() {
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Station>();
  const [clickTwo, setClickTwo] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showPayment, setShowPayment] = useState<any>(false);
  const [showPackageDetail, setShowPackageDetail] = useState(false);
  const { data, isLoading } = useListStation(listRelateParams);
  // const { mutateAsync: deleteMutate } = useDeleteStation();
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: Station) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };
  const onOpenFormDetail = (record?: Station) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowDetail(true);
  };
  const onOpenPackageDetail = (record?: any) => {
    if (record) {
      setClickTwo(record);
    } else {
      setClickTwo(undefined);
    }
    setShowPackageDetail(true);
  };

  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const closeDetail = async () => {
    setShowDetail(false);
  };
  const closePayment = async () => {
    setShowPayment(false);
  };
  const closePackageDetail = async () => {
    setShowPackageDetail(false);
  };
  const columns: ColumnsType<Station> = [
    // {
    //   title: 'No',
    //   dataIndex: 'no',
    //   // eslint-disable-next-line no-plusplus
    //   render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
    //   width: '5%',
    // },
    {
      title: 'Images',
      dataIndex: 'stationImages',
      render: (_, record: any) => (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={record.stationImages[0].imageUrl}
          />
        </Avatar.Group>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    { title: 'ContactPhone', dataIndex: 'contactPhone' },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   align: 'center',
    //   width: 120,
    //   render: (status) => (
    //     <ProTag color={status === BasicStatus.DISABLE ? 'error' : 'success'}>
    //       {status === BasicStatus.DISABLE ? 'Disable' : 'Enable'}
    //     </ProTag>
    //   ),
    // },
    {
      title: 'Address',
      align: 'center',
      dataIndex: 'address',
      render: (text) => (
        <div
          style={{
            maxWidth: 200,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {text}
        </div>
      ),
    },

    {
      title: '',
      key: 'operation',
      align: 'center',
      width: 250,
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Link to={`/zone/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">zones</span>
              </div>
            </Link>
            <Link to={`/staff/${record.id}`} state={{ stationData: JSON.stringify(record) }}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">staff</span>
              </div>
            </Link>
            <Link to={`/pricing/${record.id}`} state={{ stationData: JSON.stringify(record) }}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">service fees</span>
              </div>
            </Link>
          </div>
          {/* <IconButton onClick={() => onOpenFormHandler(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete the station"
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
          </Popconfirm> */}
        </div>
      ),
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px' }}
              onClick={(e) => {
                e.stopPropagation();
                setShowPayment(record.id);
              }}
            >
              payments
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px', backgroundColor: '#13c2c2' }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenPackageDetail(record);
              }}
            >
              packages
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const resetHandler = () => {
    form.resetFields();
    // 清空时间组件，无参请求API
  };

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  const onFinishHandler = (values: InputType) => {
    setListRelateParams(values);
  };

  console.log('staion click one', clickOne);
  return (
    <Card>
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={20}>
            <Row gutter={24} justify="flex-start">
              <Col span={8}>
                <Form.Item name="Search">
                  <Input placeholder="Search by name" allowClear />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={7}>
                    <Form.Item name="search">
                      <Button type="primary" htmlType="submit">
                        Search
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Button type="primary" onClick={resetHandler}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={2}>
            <Row>
              <Col span={12}>
                <Button type="primary" onClick={() => onOpenFormHandler()}>
                  New
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
              onOpenFormDetail(record);
            },
          };
        }}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        total={data?.totalPages}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {/* <ManageStationEdit {...roleModalPros} /> */}
      {showDetail && <StationDetail clickOne={clickOne} onClose={closeDetail} />}
      {showPayment && <PaymentStationList clickOne={showPayment} onClose={closePayment} />}
      {showPackageDetail && <PackageList clickOne={clickTwo} onClose={closePackageDetail} />}
      {showInfo && <ManageStationEdit clickOne={clickOne} onClose={closeAndRefetchHandler} />}
    </Card>
  );
}
