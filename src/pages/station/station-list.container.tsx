import { TinyColor } from '@ctrl/tinycolor';
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Row,
  Typography,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useListStation } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

import { PackageList } from './package-list.container';
import { PaymentStationList } from './payment-list.container';
import { ManageStationEdit } from './station.edit';

import { InputType } from '#/api';
import { Station } from '#/entity';

const { Title } = Typography;

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
  const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#40e495', '#30dd8a', '#2bb673'];
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Station>();
  const [clickTwo, setClickTwo] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [showPayment, setShowPayment] = useState<any>(false);
  const [showPackageDetail, setShowPackageDetail] = useState(false);
  const { data, isLoading } = useListStation(listRelateParams);
  // const { mutateAsync: deleteMutate } = useDeleteStation();
  if (isLoading) return <CircleLoading />;
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

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

  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const closePayment = async () => {
    setShowPayment(false);
  };
  const closePackageDetail = async () => {
    setShowPackageDetail(false);
  };
  const columns: ColumnsType<Station> = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
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
    { title: 'Address', dataIndex: 'address' },
    {
      title: 'View',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Link to={`/zone/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">zone</span>
              </div>
            </Link>
            <Link to={`/staff/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">staff</span>
              </div>
            </Link>
            <Link to={`/pricing/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">pricing</span>
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
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(
                      ', ',
                    )})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(
                      ', ',
                    )})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ padding: '0 10px', height: '35px' }}
                onClick={() => setShowPayment(record.id)}
              >
                Payment
              </Button>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors2.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors2).join(
                      ', ',
                    )})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors2).join(
                      ', ',
                    )})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ padding: '0 10px', height: '35px' }}
                onClick={() => onOpenPackageDetail(record)}
              >
                Package
              </Button>
            </ConfigProvider>
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
    <Card
      title="List station"
      extra={
        <Button type="primary" onClick={() => onOpenFormHandler()}>
          New
        </Button>
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
        dataSource={data?.contends}
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
      {/* <ManageStationEdit {...roleModalPros} /> */}
      {showPayment && <PaymentStationList clickOne={showPayment} onClose={closePayment} />}
      {showPackageDetail && <PackageList clickOne={clickTwo} onClose={closePackageDetail} />}
      {showInfo && <ManageStationEdit clickOne={clickOne} onClose={closeAndRefetchHandler} />}
    </Card>
  );
}
