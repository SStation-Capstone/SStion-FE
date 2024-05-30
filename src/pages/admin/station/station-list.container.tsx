import { Button, Card, Col, Form, Input, Pagination, Popconfirm, Row } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDeleteStation, useListStation } from '@/api/services/admin/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { PackageList } from '@/pages/station/package-list.container';
import { PaymentStationList } from '@/pages/station/payment-list.container';

import { StationAdminPricing } from './station-list.pricing-admin';
import { StationAdminStaff } from './station-list.staff-admin';
import { StationAdminDetail } from './station.detail-admin';
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
  const [clickTwo, setClickTwo] = useState<Station>();
  const [showInfo, setShowInfo] = useState(false);
  const [stationId, setStationId] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const { data, isLoading } = useListStation(listRelateParams);
  const { mutate: deleteMutate } = useDeleteStation();
  const [showPayment, setShowPayment] = useState<any>(false);
  const [showPackageDetail, setShowPackageDetail] = useState(false);
  if (isLoading) return <CircleLoading />;

  const onOpenPricing = (record?: any) => {
    setStationId(record);
    setShowPricing(true);
    setClickTwo(record);
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
    setShowDetail(false);
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
      title: '',
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
                setClickTwo(record);
              }}
            >
              <span className="text-sm font-bold text-blue-500">staffs</span>
            </div>
            <div
              className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPricing(record.id);
                setClickTwo(record);
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
    {
      title: 'Action',
      dataIndex: 'status',
      render: (_, record) => (
        <Popconfirm
          title="Delete the station"
          okText="Yes"
          cancelText="No"
          placement="left"
          onConfirm={(e) => {
            e?.stopPropagation();
            deleteMutate(record.id.toString());
          }}
          onPopupClick={(e) => {
            e?.stopPropagation();
          }}
        >
          <IconButton onClick={(e) => e.stopPropagation()}>
            <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
          </IconButton>
        </Popconfirm>
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
                    <Form.Item name="search" key="searchNameStation">
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
          {/* <Col span={2}>
            <Row>
              <Col span={12}>
                <Button type="primary" onClick={() => onOpenFormHandler()}>
                  New
                </Button>
              </Col>
            </Row>
          </Col> */}
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
              event.stopPropagation();
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
      {showStaff && (
        <StationAdminStaff clickOne={stationId} stationData={clickTwo} onClose={closeStaff} />
      )}
      {showPricing && (
        <StationAdminPricing clickOne={stationId} stationData={clickTwo} onClose={closePricing} />
      )}
      {showDetail && <StationAdminDetail clickOne={clickOne} check onClose={closeDetail} />}
      {showInfo && <ManageStationEdit clickOne={clickOne} onClose={closeAndRefetchHandler} />}
      {showPayment && <PaymentStationList clickOne={showPayment} onClose={closePayment} />}
      {showPackageDetail && <PackageList clickOne={clickTwo} onClose={closePackageDetail} />}
    </Card>
  );
}
