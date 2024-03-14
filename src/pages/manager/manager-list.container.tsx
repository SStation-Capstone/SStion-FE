import { Button, Card } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import ProTag from '@/theme/antd/components/tag';

import { RoleModalProps } from './role-modal';

import { Role } from '#/entity';
import { BasicStatus } from '#/enum';

const DEFAULE_ROLE_VALUE: Role = {
  id: '',
  name: '',
  label: '',
  status: BasicStatus.ENABLE,
  permission: [],
};
interface ManagerType {
  userName: string;
  password: string;
  fullName: string;
}
const Manager: ManagerType[] = [
  {
    userName: 'John Brown',
    password: 'John Brown',
    fullName: 'John Brown',
  },
  {
    userName: 'John Brown',
    password: 'John Brown',
    fullName: 'John Brown',
  },
];

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

  const columns: ColumnsType<ManagerType> = [
    {
      title: 'userName',
      dataIndex: 'userName',
    },
    {
      title: 'password',
      dataIndex: 'password',
    },
    { title: 'fullName', dataIndex: 'fullName' },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status === BasicStatus.DISABLE ? 'error' : 'success'}>
          {status === BasicStatus.DISABLE ? 'Disable' : 'Enable'}
        </ProTag>
      ),
    },
    { title: 'Desc', dataIndex: 'desc' },
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

  // const onEdit = (formValue: Role) => {
  //   setRoleModalProps((prev) => ({
  //     ...prev,
  //     show: true,
  //     title: 'Edit',
  //     formValue,
  //   }));

  return (
    <Card
      title="Role List"
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
        dataSource={Manager}
      />

      {/* <RoleModal {...roleModalPros} /> */}
    </Card>
  );
}
