import { Button, message, Descriptions, Col, Card, Row, Avatar, List, Modal } from 'antd';
import { useState } from 'react';

import { useDeletePackage, useGetPackageBySlot } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

import { ManageCheckInCreate } from './checkin.create';

export type PackagesFormProps = {
  zoneId?: any;
  clickOne?: any;
  onClose: () => void;
};
export function PackagesInfo({ zoneId, clickOne, onClose }: PackagesFormProps) {
  const { data, isLoading } = useGetPackageBySlot(clickOne.id);
  const { mutateAsync: deleteMutate } = useDeletePackage();
  const [loading, setLoading] = useState<boolean>(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  if (isLoading) return <CircleLoading />;
  const closeFormCheckIn = async () => {
    setShowFormCheckIn(false);
  };
  const submitHandle = async () => {
    setLoading(true);
    try {
      setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  // const updateHandle = async () => {};
  const deleteHandle = async () => {
    setLoading(true);
    try {
      deleteMutate(data.contends[0].id.toString());
      setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Packages by slot"
      open
      width={1300}
      onOk={submitHandle}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        // data.contends.length > 0 && (
        //   <Button key="submit" type="primary" loading={loading} onClick={updateHandle}>
        //     Update
        //   </Button>
        // ),
        data.contends.length > 0 && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {data.contends[0].name && (
              <Button key="submit" type="primary" loading={loading} onClick={deleteHandle}>
                Delete
              </Button>
            )}
          </>
        ),
        <Button key="submit" type="primary" onClick={() => setShowFormCheckIn(true)}>
          Check In
        </Button>,
      ]}
    >
      {data.contends.length > 0
        ? data.contends[0] && (
            <>
              <Card
                bodyStyle={{ display: 'none' }}
                title={
                  <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
                    <Col span={24} md={12} className="col-info">
                      <Avatar.Group>
                        <Avatar
                          size={74}
                          shape="square"
                          src={data.contends[0].packageImages[0].imageUrl}
                        />

                        <div className="flex items-center pl-4">
                          <div>
                            <h4 className="m-0 font-semibold">{data.contends[0].name}</h4>
                            <p>{data.contends[0].location}</p>
                            <p>{data.contends[0].description}</p>
                          </div>
                        </div>
                      </Avatar.Group>
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
                    <p className="text-dark">{data.contends[0].station.description}</p>
                    <hr className="my-25" />
                    <Descriptions title="Information">
                      <Descriptions.Item label="name" span={3}>
                        {data.contends[0].station.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="address" span={3}>
                        {data.contends[0].station.address}
                      </Descriptions.Item>
                      <Descriptions.Item label="contact Phone" span={3}>
                        {data.contends[0].station.contactPhone}
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
                    <p className="text-dark">{data.contends[0].zone.description}</p>
                    <hr className="my-25" />
                    <Descriptions title="Information">
                      <Descriptions.Item label="name" span={3}>
                        {data.contends[0].zone.name}
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
                      dataSource={[data.contends[0].sender, data.contends[0].receiver]}
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
            </>
          )
        : 'not found'}
      {showFormCheckIn && (
        <ManageCheckInCreate
          zoneId={zoneId}
          slotId={clickOne.id}
          onClose={closeFormCheckIn}
          onCloseCheckIn={onClose}
        />
      )}
    </Modal>
  );
}
