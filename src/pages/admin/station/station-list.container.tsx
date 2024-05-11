import { Button, Card, Col, Form, Input, Pagination, Row } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useListStation } from '@/api/services/admin/stationService';
import { CircleLoading } from '@/components/loading';
import { PackageList } from '@/pages/station/package-list.container';
import { PaymentStationList } from '@/pages/station/payment-list.container';
import { StationDetail } from '@/pages/station/station.detail';

import { StationPricing } from './station-list.pricing';
import { StationStaff } from './station-list.staff';
import { ManageStationEdit } from './station.edit';

import { InputType } from '#/api';
import { Station } from '#/entity';

// const DEFAULE_ROLE_VALUE: Station = {
//   id: -1,
//   name: '',
//   description: '',
//   contactPhone: '',
//   address: '',
//   latitude: '',
//   longitude: '',
//   stationImages: [],
// };
export default function ManageStationManagerList() {
  const [form] = Form.useForm();

  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Station>();
  const [clickTwo, setClickTwo] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [stationId, setStationId] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const { data, isLoading } = useListStation(listRelateParams);
  const [showPayment, setShowPayment] = useState<any>(false);
  const [showPackageDetail, setShowPackageDetail] = useState(false);
  if (isLoading) return <CircleLoading />;

  const onOpenPricing = (record?: any) => {
    setStationId(record);
    setShowPricing(true);
  };
  const onOpenStaff = (record?: any) => {
    setStationId(record);
    setShowStaff(true);
  };
  const onOpenFormHandler = (record?: Station) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };
  const onOpenPackageDetail = (record?: any) => {
    if (record) {
      setClickTwo(record);
    } else {
      setClickTwo(undefined);
    }
    setShowPackageDetail(true);
  };
  const onOpenFormDetail = (record?: Station) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowDetail(true);
  };
  const closePayment = async () => {
    setShowPayment(false);
  };
  const closePricing = async () => {
    setShowPricing(false);
  };
  const closeStaff = async () => {
    setShowStaff(false);
  };
  const closePackageDetail = async () => {
    setShowPackageDetail(false);
  };
  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const closeDetail = async () => {
    setShowDetail(false);
  };
  const columns: ColumnsType<Station> = [
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
      title: 'View',
      key: 'operation',
      align: 'center',
      width: 250,
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Link to={`/zone/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">manage</span>
              </div>
            </Link>
            <div
              className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                onOpenStaff(record.id);
              }}
            >
              <span className="text-sm font-bold text-blue-500">staffs</span>
            </div>
            <div
              className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPricing(record.id);
              }}
            >
              <span className="text-sm font-bold text-blue-500">service fees</span>
            </div>
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
      title: 'Action',
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
              Payments
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
              Packages
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
        total={data?.totalItems}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {/* <ManageStationEdit {...roleModalPros} /> */}
      {showStaff && <StationStaff clickOne={stationId} onClose={closeStaff} />}
      {showPricing && <StationPricing clickOne={stationId} onClose={closePricing} />}
      {showDetail && <StationDetail clickOne={clickOne} check onClose={closeDetail} />}
      {showInfo && <ManageStationEdit clickOne={clickOne} onClose={closeAndRefetchHandler} />}
      {showPayment && <PaymentStationList clickOne={showPayment} onClose={closePayment} />}
      {showPackageDetail && <PackageList clickOne={clickTwo} onClose={closePackageDetail} />}
    </Card>
  );
}
