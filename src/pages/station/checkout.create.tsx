import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Button, message, Descriptions, Col, Card, Row, Avatar, List, Tag } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetCheckOut,
  useCreateCheckOutConfirm,
  useCreateCheckOutCancel,
} from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

export function ManageCheckOutCreate() {
  const { id } = useParams();
  const { data, isLoading } = useGetCheckOut(id);
  const { mutateAsync: createMutate } = useCreateCheckOutConfirm();
  const { mutateAsync: createCancelMutate } = useCreateCheckOutCancel();
  const [loading, setLoading] = useState<boolean>(false);
  if (isLoading) return <CircleLoading />;
  const submitHandle = async (status: string) => {
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

  return (
    <Card
      title="Check Out"
      extra={
        <div className="flex gap-2">
          {data.status === 'Canceled' && (
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => submitHandle('return')}
            >
              Return
            </Button>
          )}
          {data.status === 'Paid' && (
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => submitHandle('confirm')}
            >
              Confirm
            </Button>
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
                <Col span={20} md={20} className="col-info">
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
                <Col span={4} md={4}>
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
                  {data.status === 'Completed' && (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      {data.status}
                    </Tag>
                  )}
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
                  <Descriptions.Item label="Name" span={3}>
                    {data.zone.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Slot" span={3}>
                    {data.slot.name}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={24} md={8} className="mb-2">
              <Card
                bordered={false}
                title={<h6 className="m-0 font-semibold">Sender - Receiver</h6>}
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
    </Card>
  );
}
