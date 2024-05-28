import { Button, Card, Col, Form, Image, Input, Pagination, Row, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { useDeleteManager, useListManager } from '@/api/services/admin/managerService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { ManagerListStation } from './manager-list.station';
import { ManagerEdit } from './manger.edit';
import { StationByManager } from './station-list.manager';

import { InputType } from '#/api';
import { Manager, Station } from '#/entity';

const DEFAULE_ROLE_VALUE: Manager = {
  id: '-1',
  userName: '',
  email: '',
  phoneNumber: '',
  fullName: '',
  avatarUrl: '',
  password: '',
};

export default function ManageStationManagerList() {
  const [form] = Form.useForm();

  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Manager>();
  const [clickOneStation, setClickOneStation] = useState<Station>();
  const [showInfo, setShowInfo] = useState(false);
  const [showStation, setShowStation] = useState(false);
  const [showAddToStation, setShowAddToStation] = useState(false);
  const { data, isLoading } = useListManager(listRelateParams);
  const { mutateAsync: deleteMutate } = useDeleteManager();
  if (isLoading) return <CircleLoading />;

  const onOpenFormHandler = (record?: Manager) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };
  const onOpenStation = (record?: any) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowStation(true);
  };
  const submitHandle = (record?: Manager) => {
    if (record?.id) {
      deleteMutate(record);
    }
    // onclose();
  };
  const onOpenFormHandlerStation = (record?: Station) => {
    setClickOneStation(record);

    setShowAddToStation(true);
  };

  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const closeStation = async () => {
    setShowStation(false);
  };
  const closeAndRefetchHandlerStation = async () => {
    setShowAddToStation(false);
  };
  const columns: ColumnsType<Manager> = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text, _data, index) => <Typography>{++index}</Typography>,
      width: '5%',
    },
    {
      title: 'UserName',
      dataIndex: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    { title: 'PhoneNumber', dataIndex: 'phoneNumber' },
    { title: 'FullName', dataIndex: 'fullName' },
    {
      title: 'AvatarUrl',
      dataIndex: 'avatarUrl',
      render: (text, avatarUrl) => (
        <Image
          style={{ width: 100, height: 'auto' }} // Thay đổi kích thước theo nhu cầu
          src={text}
        />
      ),
    },
    // {
    //   title: 'AvatarUrl',
    //   dataIndex: 'avatarUrl',
    //   render: (_, { avatarUrl}) => (
    //     <>
    //       {avatarUrl.map((avatarUrl) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })
    // },
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
    // { title: 'Desc', dataIndex: 'desc' },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="text-gray flex w-full justify-center">
          {/* <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onOpenFormHandlerStation(record);
            }}
          >
            <Iconify icon="solar:add-circle-line-duotone" size={18} />
          </IconButton> */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onOpenFormHandler(record);
            }}
          >
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          {/* <Popconfirm
            title="Delete the Role"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => submitHandle(record)}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm> */}
        </div>
      ),
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

  // const onCreate = () => {
  //   setRoleModalProps((prev) => ({
  //     ...prev,
  //     show: true,
  //     title: 'Create New',
  //     formValue: {
  //       ...prev.formValue,
  //       ...DEFAULE_ROLE_VALUE,
  //     },
  //   }));
  // };

  // const onEdit = (formValue: Manager) => {
  //   setRoleModalProps((prev) => ({
  //     ...prev,
  //     show: true,
  //     title: 'Edit',
  //     formValue,
  //   }));
  // };
  // const { data } = useQuery({
  //   queryKey: ['manager'],
  //   queryFn: managerService.GetManager,
  // });
  // console.log('data', data);

  return (
    <Card>
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={20}>
            <Row gutter={24} justify="flex-start">
              <Col span={8}>
                <Form.Item name="Search">
                  <Input placeholder="Search by name" allowClear />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={7}>
                    <Form.Item name="search">
                      <Button type="primary" htmlType="submit">
                        Search
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Button type="primary" onClick={resetHandler}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={2}>
            <Row>
              <Col span={12}>
                <Button type="primary" onClick={() => onOpenFormHandler()}>
                  New
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={data?.contends}
        loading={isLoading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onOpenStation(record);
            },
          };
        }}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        total={data?.totalItems}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {/* <ManagerEdit {...roleModalPros} /> */}
      {showInfo && <ManagerEdit clickOne={clickOne} onClose={closeAndRefetchHandler} />}
      {showStation && <StationByManager clickOne={clickOne} onClose={closeStation} />}
      {showAddToStation && (
        <ManagerListStation clickOne={clickOneStation} onClose={closeAndRefetchHandlerStation} />
      )}
    </Card>
  );
}
