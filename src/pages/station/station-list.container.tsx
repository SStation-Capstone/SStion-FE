import { useQuery } from '@tanstack/react-query';
import { Button, Card, Popconfirm } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import stationService from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';

import { ManageStationEdit, RoleModalProps } from './station.edit';

import { Station } from '#/entity';

const DEFAULE_ROLE_VALUE: Station = {
  id: -1,
  name: '',
  description: '',
  contactPhone: '',
  address: '',
  latitude: '',
  longitude: '',
  stationImages: [],
};
export default function ManageStationManagerList() {
  const [roleModalPros, setRoleModalProps] = useState<RoleModalProps>({
    formValue: { ...DEFAULE_ROLE_VALUE },
    title: 'New',
    show: false,
    onOk: () => {
      setRoleModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setRoleModalProps((prev) => ({ ...prev, show: false }));
    },
  });
  const columns: ColumnsType<Station> = [
    {
      title: 'Id',
      dataIndex: 'id',
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
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   align: 'center',
    //   width: 120,
    //   render: (status) => (
    //     <ProTag color={status === BasicStatus.DISABLE ? 'error' : 'success'}>
    //       {status === BasicStatus.DISABLE ? 'Disable' : 'Enable'}
    //     </ProTag>
    //   ),
    // },
    { title: 'Address', dataIndex: 'address' },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the Role" okText="Yes" cancelText="No" placement="left">
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onCreate = () => {
    setRoleModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Create New',
      formValue: {
        ...prev.formValue,
        ...DEFAULE_ROLE_VALUE,
      },
    }));
  };

  const onEdit = (formValue: Station) => {
    setRoleModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }));
  };

  const { data } = useQuery({
    queryKey: ['station'],
    queryFn: stationService.getStation,
  });
  console.log('data', data);
  return (
    <Card
      title="Station List"
      extra={
        <Button type="primary" onClick={onCreate}>
          New
        </Button>
      }
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={data?.contends}
      />

      <ManageStationEdit {...roleModalPros} />
    </Card>
  );
}
