import {
  CheckCircleOutlined,
  CloseCircleOutlined,
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
import { useState } from 'react';

import { useGetPackageDetail } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
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
  const { data, isLoading } = useGetPackageDetail(clickOne.id);
  const [showExpire, setShowExpire] = useState(false);
  if (isLoading) return <CircleLoading />;
  const closeExpire = async () => {
    setShowExpire(false);
    onClose();
  };
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text: any, _data: any, index: number) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    { title: 'Description', dataIndex: 'description' },
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
                      <p className="pl-4">checkinDays: {data.checkinDays}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="pl-4">volume: {data.volume}</p>
                      <p className="pl-4">weight: {data.weight}</p>
                      <p className="pl-4">status: {data.status}</p>
                      <p className="pl-4">serviceFee: {data.serviceFee}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="pl-4">priceCod: {data.priceCod} đ</p>
                      <p className="pl-4">isCod: {data.isCod ? 'true' : 'false'}</p>
                      <p className="pl-4">totalHours: {data.totalHours}</p>
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
                    {data.weight} kg
                  </Descriptions.Item>
                  <Descriptions.Item label="Status" span={3}>
                    {data.status}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price cod" span={3}>
                    {numberWithCommas(data.priceCod)} đ
                  </Descriptions.Item>
                  <Descriptions.Item label="Is cod" span={3}>
                    {data.isCod ? 'true' : 'false'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Hours" span={3}>
                    {data.totalHours}
                  </Descriptions.Item>
                  <Descriptions.Item label="Checkin Days" span={3}>
                    {data.checkinDays}
                  </Descriptions.Item>
                  <Descriptions.Item label="Service fee" span={3}>
                    {numberWithCommas(data.serviceFee)} đ
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={24} md={12} className="mb-2">
              <Card
                bordered={false}
                title={<h6 className="m-0 font-semibold">Sender - Receiver</h6>}
                className="mb-2"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[data.sender, data.receiver]}
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
                  <Descriptions.Item label="Name" span={3}>
                    {data.zone.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Slot" span={3}>
                    {data.slot.name}
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
            dataSource={data?.packageStatusHistories}
            loading={isLoading}
          />
        </>
      )}
      {showExpire && (
        <ManageExpireCreate slotId={slotId} packageId={clickOne.id} onClose={closeExpire} />
      )}
    </Modal>
  );
}
