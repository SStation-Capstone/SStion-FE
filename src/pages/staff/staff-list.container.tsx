import { Card, Form, Pagination, Typography, Tag, Avatar } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDeleteStaff, useListStaffUser } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';

import { StaffCreate } from './staff.create';

import { InputType } from '#/api';
import { Staff } from '#/entity';
import { StorageEnum } from '#/enum';

const { Title } = Typography;

export default function StaffManagerList() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const idStaff = getItem(StorageEnum.User).stationId as number;
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Staff>();
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useListStaffUser(idStaff);
  const { mutateAsync: deleteMutate } = useDeleteStaff(id);
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: Staff) => {
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
  const columns: ColumnsType<any> = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    {
      title: 'avatarUrl',
      dataIndex: 'avatarUrl',
      render: (_, record: any) => (
        <Avatar.Group>
          <Avatar className="shape-avatar" shape="square" size={40} src={record.avatarUrl} />
        </Avatar.Group>
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'username',
      dataIndex: 'userName',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      render: (text) => <Tag color="cyan">{text[0].name}</Tag>,
      showSorterTooltip: { target: 'full-header' },
      filters: [
        {
          text: 'User',
          value: 'User',
        },
        {
          text: 'Admin',
          value: 'Admin',
        },
        {
          text: 'Staff',
          value: 'Staff',
        },
        {
          text: 'StationManager',
          value: 'StationManager',
        },
      ],
      onFilter: (value, record) => record.roles[0].name.indexOf(value as string) === 0,
      sorter: (a, b) => a.roles[0].name.localeCompare(b.roles[0].name),
      sortDirections: ['descend'],
    },
  ];

  const resetHandler = () => {
    form.resetFields();
  };

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  const onFinishHandler = (values: InputType) => {
    setListRelateParams(values);
  };

  return (
    <Card title="List Staff">
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        // dataSource={data?.contends.filter((e) => e.roles[0].name !== 'StationManager')}
        dataSource={data?.contends}
        loading={isLoading}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        total={data?.totalPages}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {/* <ManageStationEdit {...roleModalPros} /> */}
      {showInfo && <StaffCreate clickOne={clickOne} onClose={closeAndRefetchHandler} />}
    </Card>
  );
}
