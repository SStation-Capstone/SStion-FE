import { Button, Avatar, Modal, Table, Card, Row, Col } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useListStationByManager } from '@/api/services/admin/managerService';

import { ManageStationEdit } from '../station/station.edit';

export type PackagesFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function StationByManager({ clickOne, onClose }: PackagesFormProps) {
  const [showCreateStation, setShowCreateStation] = useState(false);
  const { data, isLoading } = useListStationByManager(clickOne?.id);

  const onOpenFormStation = () => {
    setShowCreateStation(true);
  };
  const closeFormStation = async () => {
    setShowCreateStation(false);
    // onClose();
  };
  const columns = [
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
      title: 'Name manager',
      dataIndex: 'fullName',
      render: (_: any) => <div>{clickOne.fullName}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    { title: 'ContactPhone', dataIndex: 'contactPhone' },
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
      width: 350,
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Link to={`/zone/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">zones</span>
              </div>
            </Link>
            <Link to={`/staff/${record.id}`} state={{ stationData: JSON.stringify(record) }}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">staffs</span>
              </div>
            </Link>
            <Link to={`/pricing/${record.id}`} state={{ stationData: JSON.stringify(record) }}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">service fees</span>
              </div>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  // if (isLoading) return <CircleLoading />;
  return (
    <Modal
      title="Station By Manager"
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="backMain" onClick={onClose}>
          Cancel
        </Button>,
        <Button type="primary" key="back" onClick={onOpenFormStation}>
          Create Station
        </Button>,
      ]}
    >
      <Card
        bodyStyle={{ display: 'none' }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
            <Col span={24} md={8} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={clickOne.avatarUrl} />
                <div className="flex items-center pl-4">
                  <div>
                    <h4 className="m-0 font-semibold">Full Name: {clickOne.fullName}</h4>
                    {/* <p>{clickOne.phoneNumber}</p> */}
                    <p>Email: {clickOne.email}</p>
                  </div>
                </div>
              </Avatar.Group>
            </Col>
            <Col span={24} md={8} className="col-info">
              <div className="items-center justify-end">
                <p className="pl-4 text-xl">User Name: {clickOne.userName}</p>
                <p className="pl-4 text-xl">Phone Number: {clickOne.userName}</p>
              </div>
            </Col>
          </Row>
        }
      />
      <Table
        loading={isLoading}
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns as any}
        dataSource={data?.contends}
      />
      {showCreateStation && (
        <ManageStationEdit managerId={clickOne?.id} onClose={closeFormStation} />
      )}
    </Modal>
  );
}
