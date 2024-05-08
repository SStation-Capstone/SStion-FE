import { Button, Avatar, Modal, Table } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ManageStationEdit } from '../station/station.edit';

export type PackagesFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function StationByManager({ clickOne, onClose }: PackagesFormProps) {
  const [showCreateStation, setShowCreateStation] = useState(false);
  const onOpenFormStation = () => {
    setShowCreateStation(true);
  };
  const closeFormStation = async () => {
    setShowCreateStation(false);
    onClose();
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
      title: 'View',
      key: 'operation',
      align: 'center',
      width: 250,
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Link to={`/zone/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">config</span>
              </div>
            </Link>
            <Link to={`/staff/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">staff</span>
              </div>
            </Link>
            <Link to={`/pricing/${record.id}`}>
              <div className="flex cursor-pointer items-center rounded-md bg-blue-200 fill-blue-400 p-2 duration-100 hover:bg-blue-300 active:border active:border-blue-400">
                <span className="text-sm font-bold text-blue-500">service fees</span>
              </div>
            </Link>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Modal
      title="Station By Manager"
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button type="primary" key="back" onClick={onOpenFormStation}>
          Create Station
        </Button>,
      ]}
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns as any}
        dataSource={clickOne?.stations}
      />
      {showCreateStation && (
        <ManageStationEdit managerId={clickOne?.id} onClose={closeFormStation} />
      )}
    </Modal>
  );
}
