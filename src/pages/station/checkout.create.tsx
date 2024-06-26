import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import {
  Button,
  message,
  Descriptions,
  Col,
  Card,
  Row,
  Avatar,
  List,
  Tag,
  ConfigProvider,
  Popconfirm,
} from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetCheckOut,
  useCreateCheckOutConfirm,
  useCreateCheckOutPayment,
  useCreateCheckOutCancel,
} from '@/api/services/stationService';
import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { numberWithCommas } from '@/utils/string';

import { QRCodeComponent } from './qr-code';

export function ManageCheckOutCreate() {
  const { id } = useParams();
  // const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#40e495', '#30dd8a', '#2bb673'];
  const { data, isLoading, refetch } = useGetCheckOut(id);
  const [clickOne, setClickOne] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const { mutateAsync: createPayment } = useCreateCheckOutPayment();
  const { mutateAsync: createMutate } = useCreateCheckOutConfirm();
  const { mutateAsync: createCancelMutate } = useCreateCheckOutCancel();
  const [loading, setLoading] = useState<boolean>(false);
  if (isLoading) return <CircleLoading />;
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  const onOpenFormHandler = (record: any) => {
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
  const submitHandleReturn = async (status: string) => {
    setLoading(true);
    try {
      if (status === 'confirm') {
        createMutate({ id, status: 'confirm' });
        setLoading(false);
      } else {
        createCancelMutate({ id, status: 'return' });
        setLoading(false);
      }
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };

  const submitHandle = async () => {
    setLoading(true);
    try {
      await createPayment({ totalPrice: data.totalPrice, id });
      // await createMutate({ id, status: 'confirm' });
      await refetch();
      setLoading(false);
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Card
        title="Check Out"
        extra={
          <div className="flex gap-2">
            {data.status === 'Canceled' && (
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => submitHandleReturn('return')}
              >
                <Iconify icon="ic:twotone-assignment-return" size={18} />
                Return
              </Button>
            )}
            {/* {data.status === 'Paid' && (
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => submitHandle('confirm')}
            >
              Confirm
            </Button>
          )} */}
            {data.status !== 'Completed' && data.status !== 'Paid' && (
              <>
                <Popconfirm
                  title="Do yout want to pay by cash?"
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                  onConfirm={() => {
                    submitHandle();
                  }}
                >
                  <Button key="submit" type="primary" loading={loading}>
                    <Iconify icon="streamline:payment-cash-out-3-solid" size={18} />
                    Pay by cash
                  </Button>
                </Popconfirm>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: `linear-gradient(135deg, ${colors2.join(', ')})`,
                        colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors2).join(
                          ', ',
                        )})`,
                        colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                          colors2,
                        ).join(', ')})`,
                        lineWidth: 0,
                      },
                    },
                  }}
                >
                  <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={() => onOpenFormHandler(id)}
                  >
                    <Iconify icon="material-symbols:payments-outline" size={18} />
                    QR payment
                  </Button>
                </ConfigProvider>
              </>
            )}
          </div>
        }
      >
        {data && (
          <>
            <Card
              bodyStyle={{ display: 'none' }}
              title={
                <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
                  <Col span={24} md={8} className="col-info">
                    <Avatar.Group>
                      <Avatar size={74} shape="square" src={data.packageImages[0]?.imageUrl} />
                      <div className="flex items-center pl-4">
                        <div>
                          <h4 className="m-0 font-semibold">{data.name}</h4>
                          <p>{data.location}</p>
                          <p>{data.description}</p>
                        </div>
                      </div>
                    </Avatar.Group>
                  </Col>
                  {/* <Col span={24} md={8} className="col-info">
                  <div>
                    <div className="flex items-center">
                      <p className="pl-4">width: {data.width}</p>
                      <p className="pl-4">height: {data.height}</p>
                      <p className="pl-4">length: {data.length}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="pl-4">volume: {data.volume}</p>
                      <p className="pl-4">weight: {data.weight}</p>
                      <p className="pl-4">status: {data.status}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="pl-4">priceCod: {data.priceCod} đ</p>
                      <p className="pl-4">isCod: {data.isCod ? 'true' : 'false'}</p>
                      <p className="pl-4">totalHours: {data.totalHours}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="pl-4">checkinDays: {data.checkinDays}</p>
                      <p className="pl-4">serviceFee: {data.serviceFee}</p>
                    </div>
                  </div>
                </Col> */}
                  <Col span={24} md={8} className="col-info">
                    <div className="flex items-center justify-end">
                      {data.status === 'Paid' && (
                        <Tag icon={<MinusCircleOutlined />} color="default">
                          {data.status}
                        </Tag>
                      )}
                      {data.status === 'Returned' && (
                        <Tag icon={<CloseCircleOutlined />} color="error">
                          {data.status}
                        </Tag>
                      )}
                      {data.status === 'Canceled' && (
                        <Tag icon={<ExclamationCircleOutlined />} color="warning">
                          {data.status}
                        </Tag>
                      )}
                      {data.status === 'Initialized' && (
                        <Tag icon={<ExclamationCircleOutlined />} color="cyan">
                          {data.status}
                        </Tag>
                      )}
                      {data.status === 'Completed' && (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          {data.status}
                        </Tag>
                      )}
                      <p className="pl-4 text-xl">
                        Total Price: {numberWithCommas(data.totalPrice)} đ
                      </p>
                    </div>
                  </Col>
                </Row>
              }
            />

            <Row gutter={[24, 0]} className="mt-4">
              <Col span={24} md={12} className="mb-2">
                <Card
                  bordered={false}
                  title={<h6 className="m-0 font-semibold">Information</h6>}
                  className="header-solid card-profile-information h-full"
                  bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                  // actions={
                  //   data.status === 'Paid' && [
                  //     <Button
                  //       key="submit"
                  //       type="primary"
                  //       loading={loading}
                  //       onClick={() => submitHandleReturn('confirm')}
                  //     >
                  //       Confirm
                  //     </Button>,
                  //   ]
                  // }
                >
                  <Descriptions bordered>
                    <Descriptions.Item label="Width" span={3}>
                      {data.width} cm
                    </Descriptions.Item>
                    <Descriptions.Item label="Height" span={3}>
                      {data.height} cm
                    </Descriptions.Item>
                    <Descriptions.Item label="Length" span={3}>
                      {data.length} cm
                    </Descriptions.Item>
                    <Descriptions.Item label="Volume" span={3}>
                      {data.volume}
                    </Descriptions.Item>
                    <Descriptions.Item label="Weight" span={3}>
                      {data.weight} g
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                      {data.status}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Price cod" span={3}>
                  {/* <Descriptions.Item label="Price cod" span={3}>
                    {numberWithCommas(data.priceCod)} đ
                  </Descriptions.Item> */}
                    {/* <Descriptions.Item label="Is cod" span={3}>
                  </Descriptions.Item> */}
                    {/* <Descriptions.Item label="Is cod" span={3}>
                    {data.isCod ? 'true' : 'false'}
                  </Descriptions.Item> */}
                    {/* <Descriptions.Item label="Total Hours" span={3}>
                      {data.totalHours}
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Checkin Days" span={3}>
                      {data.totalDays}
                    </Descriptions.Item>
                    <Descriptions.Item label="Service fees" span={3}>
                      {numberWithCommas(data.serviceFee)} đ
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col span={24} md={12} className="mb-2">
                <Card
                  bordered={false}
                  title={<h6 className="m-0 font-semibold">Receiver</h6>}
                  className="mb-2"
                  bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={[data.receiver]}
                    split={false}
                    className="conversations-list"
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" size={48} src={item.avatarUrl} />}
                          title={item.fullName}
                          description={item.phoneNumber}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
                <Card
                  bordered={false}
                  title={<h6 className="m-0 font-semibold">Station</h6>}
                  className="mb-2"
                  bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                >
                  <p className="text-dark">{data.station.description}</p>
                  <hr className="my-25" />
                  <Descriptions title="Information">
                    <Descriptions.Item label="Name" span={3}>
                      {data.station.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>
                      {data.station.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Phone" span={3}>
                      {data.station.contactPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Price" span={3}>
                      {data.totalPrice} đ
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
                <Card
                  bordered={false}
                  title={<h6 className="m-0 font-semibold">Zone</h6>}
                  bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                >
                  <p className="text-dark">{data.zone.description}</p>
                  <hr className="my-25" />
                  <Descriptions title="Information">
                    {/* <Descriptions.Item label="Name" span={3}>
                    {data.zone.name}
                  </Descriptions.Item> */}
                    <Descriptions.Item label="Zone" span={3}>
                      {data?.zone.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Rack" span={3}>
                      {data?.rack.name}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </>
        )}
        {showInfo && <QRCodeComponent packageId={clickOne} onClose={closeAndRefetchHandler} />}
      </Card>
      {data.status === 'Paid' && (
        <Row justify="end" className="mt-3">
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => submitHandleReturn('confirm')}
          >
            Confirm
          </Button>
        </Row>
      )}
    </>
  );
}
