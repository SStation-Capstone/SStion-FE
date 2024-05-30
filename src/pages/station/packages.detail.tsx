import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DisconnectOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Descriptions,
  Col,
  Card,
  Row,
  Avatar,
  List,
  Modal,
  Table,
  Typography,
  Tag,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';

import { numberWithCommas } from '@/utils/string';

import { ManageExpireCreate } from './expire.create';

const { Title } = Typography;
export type PackagesFormProps = {
  clickOne?: any;
  check?: any;
  slotId?: any;
  onClose: () => void;
};
export function PackageDetail({ clickOne, check, slotId, onClose }: PackagesFormProps) {
  // const { clickone, isLoading } = useGetPackageDetail(clickOne.id);
  // console.log('clickone pacakge detail', clickone);
  console.log('clickOne', clickOne);
  const [showExpire, setShowExpire] = useState(false);
  // if (isLoading) return <CircleLoading />;
  const closeExpire = async () => {
    setShowExpire(false);
    onClose();
  };
  const columns = [
    {
      title: '',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text: any, _data: any, index: number) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    // },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      render: (_, text) => (
        <Typography>{moment(text.createdAt).format('DD/MM/YYYY').toString()}</Typography>
      ),
    },
  ];
  return (
    <Modal
      title="Packages detail"
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        // check && (
        //   <Button key="submit" type="primary" onClick={() => setShowExpire(true)}>
        //     Expire
        //   </Button>
        // ),
      ]}
    >
      {clickOne && (
        <>
          <Card
            bodyStyle={{ display: 'none' }}
            title={
              <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
                <Col span={24} md={8} className="col-info">
                  <Avatar.Group>
                    <Avatar size={74} shape="square" src={clickOne.packageImages[0]?.imageUrl} />
                    <div className="flex items-center pl-4">
                      <div>
                        <h4 className="m-0 font-semibold">{clickOne.name}</h4>
                        <p>{clickOne.location}</p>
                        <p>{clickOne.description}</p>
                      </div>
                    </div>
                  </Avatar.Group>
                </Col>
                {/* <Col span={24} md={8} className="col-info">
                  <div>
                    <div className="flex items-center">
                      <p className="pl-4">width: {clickOne.width}</p>
                      <p className="pl-4">height: {clickOne.height}</p>
                      <p className="pl-4">length: {clickOne.length}</p>
                      <p className="pl-4">checkinDays: {clickOne.checkinDays}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="pl-4">volume: {clickOne.volume}</p>
                      <p className="pl-4">weight: {clickOne.weight}</p>
                      <p className="pl-4">status: {clickOne.status}</p>
                      <p className="pl-4">serviceFee: {clickOne.serviceFee}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="pl-4">priceCod: {clickOne.priceCod} đ</p>
                      <p className="pl-4">isCod: {clickOne.isCod ? 'true' : 'false'}</p>
                      <p className="pl-4">totalHours: {clickOne.totalHours}</p>
                    </div>
                  </div>
                </Col> */}
                <Col span={24} md={8} className="col-info">
                  <div className="flex items-center justify-end">
                    {clickOne.status === 'Paid' && (
                      <Tag icon={<MinusCircleOutlined />} color="default">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Returned' && (
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Canceled' && (
                      <Tag icon={<ExclamationCircleOutlined />} color="warning">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Initialized' && (
                      <Tag icon={<ExclamationCircleOutlined />} color="cyan">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Completed' && (
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Expired' && (
                      <Tag icon={<DisconnectOutlined />} color="volcano">
                        {clickOne.status}
                      </Tag>
                    )}
                    <p className="pl-4 text-xl">
                      Total Price: {numberWithCommas(clickOne.totalPrice)} đ
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
              >
                <Descriptions bordered>
                  <Descriptions.Item label="Width" span={3}>
                    {clickOne.width} cm
                  </Descriptions.Item>
                  <Descriptions.Item label="Height" span={3}>
                    {clickOne.height} cm
                  </Descriptions.Item>
                  <Descriptions.Item label="Length" span={3}>
                    {clickOne.length} cm
                  </Descriptions.Item>
                  <Descriptions.Item label="Volume" span={3}>
                    {clickOne.volume}
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight" span={3}>
                    {clickOne.weight} g
                  </Descriptions.Item>
                  <Descriptions.Item label="Status" span={3}>
                    {clickOne.status === 'Paid' && (
                      <Tag icon={<MinusCircleOutlined />} color="default">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Returned' && (
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Canceled' && (
                      <Tag icon={<ExclamationCircleOutlined />} color="warning">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Initialized' && (
                      <Tag icon={<ExclamationCircleOutlined />} color="cyan">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Completed' && (
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        {clickOne.status}
                      </Tag>
                    )}
                    {clickOne.status === 'Expired' && (
                      <Tag icon={<DisconnectOutlined />} color="volcano">
                        {clickOne.status}
                      </Tag>
                    )}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Price cod" span={3}>
                    {numberWithCommas(clickOne.priceCod)} đ
                  </Descriptions.Item> */}
                  {/* <Descriptions.Item label="Is cod" span={3}>
                    {clickOne.isCod ? 'true' : 'false'}
                  </Descriptions.Item> */}
                  <Descriptions.Item label="Total Days" span={3}>
                    {clickOne.totalDays}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Checkin Days" span={3}>
                    {clickOne.checkinDays}
                  </Descriptions.Item> */}
                  <Descriptions.Item label="Service fees" span={3}>
                    {numberWithCommas(clickOne.serviceFee)} đ
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
                  dataSource={[clickOne.receiver]}
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
                <p className="text-dark">{clickOne.station.description}</p>
                <hr className="my-25" />
                <Descriptions title="Information">
                  <Descriptions.Item label="Name" span={3}>
                    {clickOne.station.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address" span={3}>
                    {clickOne.station.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact Phone" span={3}>
                    {clickOne.station.contactPhone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Price" span={3}>
                    {clickOne.totalPrice} đ
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card
                bordered={false}
                title={<h6 className="m-0 font-semibold">Zone</h6>}
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <p className="text-dark">Description: {clickOne.zone.description}</p>
                <hr className="my-25" />
                <Descriptions title="Information">
                  <Descriptions.Item label="Zone" span={3}>
                    {clickOne.zone.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shelf" span={3}>
                    {clickOne?.shelf?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rack" span={3}>
                    {clickOne?.rack?.name}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <strong>Package Histories</strong>
          <Table
            rowKey="id"
            size="small"
            scroll={{ x: 'max-content' }}
            pagination={false}
            columns={columns}
            dataSource={clickOne?.packageStatusHistories}
            // loading={isLoading}
          />
        </>
      )}
      {showExpire && (
        <ManageExpireCreate slotId={slotId} packageId={clickOne.id} onClose={closeExpire} />
      )}
    </Modal>
  );
}
