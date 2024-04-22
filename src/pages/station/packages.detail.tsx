import { Button, Descriptions, Col, Card, Row, Avatar, List, Modal, Table, Typography } from 'antd';
import { useState } from 'react';

import { useGetPackageDetail } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

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
      title: 'status',
      dataIndex: 'status',
    },
    { title: 'description', dataIndex: 'description' },
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
                <Col span={24} md={8} className="col-info">
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
                </Col>
                <Col span={24} md={8} className="col-info">
                  <div className="flex items-center justify-end">
                    <p className="pl-4 text-xl">totalPrice: {data.totalPrice} đ</p>
                  </div>
                </Col>
              </Row>
            }
          />
          <Row gutter={[24, 0]} className="mt-4">
            <Col span={24} md={8} className="mb-2">
              <Card
                bordered={false}
                title={<h6 className="m-0 font-semibold">Station</h6>}
                className="header-solid card-profile-information h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <p className="text-dark">{data.station.description}</p>
                <hr className="my-25" />
                <Descriptions title="Information">
                  <Descriptions.Item label="name" span={3}>
                    {data.station.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="address" span={3}>
                    {data.station.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="contact Phone" span={3}>
                    {data.station.contactPhone}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={24} md={8} className="mb-2">
              <Card
                bordered={false}
                title={<h6 className="m-0 font-semibold">Zone</h6>}
                className="header-solid card-profile-information h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <p className="text-dark">{data.zone.description}</p>
                <hr className="my-25" />
                <Descriptions title="Information">
                  <Descriptions.Item label="name" span={3}>
                    {data.zone.name}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={24} md={8} className="mb-2">
              <Card
                bordered={false}
                title={<h6 className="m-0 font-semibold">sender - receiver</h6>}
                className="header-solid card-profile-information h-full"
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
            </Col>
          </Row>
          <strong>packageStatusHistories</strong>
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
