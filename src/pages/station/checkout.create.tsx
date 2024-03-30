import { Button, Modal, message, Descriptions, Col, Card, Row, Avatar, List } from 'antd';
import { useState } from 'react';

import { useGetCheckOut, useCreateCheckOut } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

export type CheckOutCreateFormProps = {
  packageId: string;
};
export function ManageCheckOutCreate({ packageId }: CheckOutCreateFormProps) {
  const { data, isLoading } = useGetCheckOut(packageId);
  const { mutateAsync: createMutate } = useCreateCheckOut();
  const [loading, setLoading] = useState<boolean>(false);
  const [showFormCheckOut, setShowFormCheckOut] = useState<boolean>(true);
  if (isLoading) return <CircleLoading />;
  const submitHandle = async (status: string) => {
    setLoading(true);
    try {
      createMutate({ id: packageId, status });
      setLoading(false);
      setShowFormCheckOut(false);
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Check Out"
      open={showFormCheckOut}
      onCancel={() => setShowFormCheckOut(false)}
      footer={[
        <Button key="back" onClick={() => setShowFormCheckOut(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => submitHandle('return')}
        >
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => submitHandle('confirm')}
        >
          Confirm
        </Button>,
      ]}
      width={1300}
    >
      {data && (
        <>
          <Card
            bodyStyle={{ display: 'none' }}
            title={
              <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
                <Col span={24} md={12} className="col-info">
                  <Avatar.Group>
                    <Avatar size={74} shape="square" src={data.packageImages[0].imageUrl} />

                    <div className="flex items-center pl-4">
                      <div>
                        <h4 className="m-0 font-semibold">{data.name}</h4>
                        <p>{data.location}</p>
                        <p>{data.description}</p>
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
        </>
      )}
    </Modal>
  );
}
