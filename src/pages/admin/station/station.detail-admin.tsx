import { Button, Col, Card, Row, Avatar, Modal, Table, Typography } from 'antd';
import { useState } from 'react';

import { Iconify } from '@/components/icon';
import { numberWithCommas } from '@/utils/string';

// import { ManagerListStation } from '../admin/station/station-list.manager';

import { ManagerListStation } from './station-list.manager';

const { Title } = Typography;
export type PackagesFormProps = {
  clickOne?: any;
  check?: any;
  onClose: () => void;
};
export function StationAdminDetail({ clickOne, check, onClose }: PackagesFormProps) {
  console.log('clickone admin', clickOne);
  // const { clickone, isLoading } = useGetPackageDetail(clickOne.id);
  // console.log('clickone pacakge detail', clickone);
  const [clickOneStation, setClickOneStation] = useState();
  const [showChangeManager, setShowChangeManager] = useState(false);
  const onOpenFormHandlerStation = (record?: any) => {
    setClickOneStation(record);
    setShowChangeManager(true);
  };
  const closeAndRefetchHandler = async () => {
    setShowChangeManager(false);
    onClose();
  };
  const closeChangeMangerModal = () => {
    setShowChangeManager(false);
  };
  const columns = [
    // {
    //   title: 'No',
    //   dataIndex: 'no',
    //   // eslint-disable-next-line no-plusplus
    //   render: (_text: any, _data: any, index: number) => <Title level={5}>{++index}</Title>,
    //   width: '5%',
    // },
    {
      title: 'From (day)',
      dataIndex: 'startTime',
    },
    {
      title: 'To (day)',
      dataIndex: 'endTime',
    },
    {
      title: 'Price (đ)',
      dataIndex: 'formatPrice',
    },
  ];
  return (
    <Modal
      title="Station detail"
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
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
                    <Avatar size={74} shape="square" src={clickOne.stationImages[0]?.imageUrl} />
                    <div className="flex items-center pl-4">
                      <div>
                        <h4 className="m-0 font-semibold">{clickOne.name}</h4>
                        <p>{clickOne.description}</p>
                        <p>{clickOne.address}</p>
                      </div>
                    </div>
                  </Avatar.Group>
                </Col>
                <Col span={24} md={8} className="col-info">
                  <div className="items-center justify-end">
                    <p className="pl-4 text-xl">Balance: {numberWithCommas(clickOne.balance)} đ</p>
                    <p className="pl-4 text-xl">Contact Phone: {clickOne.contactPhone}</p>
                  </div>
                </Col>
              </Row>
            }
          />
          <Row gutter={[24, 0]} className="mt-4">
            <Col span={24} md={24} className="mb-2">
              <Card
                bordered={false}
                title={<h6 className="m-0 font-semibold">Manager</h6>}
                className="mb-2"
                bodyStyle={{
                  paddingTop: 16,
                  paddingBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  // justifyContent: 'space-between',
                }}
              >
                <Avatar.Group>
                  <Avatar size={74} shape="square" src={clickOne?.manager?.avatarUrl} />
                  <div className="flex items-center pl-4">
                    <div>
                      <h4 className="m-0 font-semibold">{clickOne.manager?.fullName}</h4>
                      <p>Email: {clickOne?.manager?.email}</p>
                      <p>Phone Number: {clickOne?.manager?.phoneNumber}</p>
                    </div>
                  </div>
                </Avatar.Group>
                {check && (
                  <Button
                    type="primary"
                    size="large"
                    style={{ padding: '0 10px', height: '35px' }}
                    onClick={() => {
                      onOpenFormHandlerStation(clickOne);
                    }}
                  >
                    <Iconify icon="mdi:folder-location" size={18} />
                    Change manager
                  </Button>
                )}
              </Card>
            </Col>
          </Row>
          <strong>Service fees</strong>
          <Table
            rowKey="id"
            size="small"
            scroll={{ x: 'max-content' }}
            pagination={false}
            columns={columns}
            dataSource={clickOne?.pricings}
            // loading={isLoading}
          />
        </>
      )}
      {showChangeManager && (
        <ManagerListStation clickOne={clickOneStation} onClose={closeAndRefetchHandler} />
      )}
    </Modal>
  );
}
