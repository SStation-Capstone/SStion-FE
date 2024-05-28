import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Switch,
  Tag,
  Typography,
} from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import {
  UsersQueryType,
  useDeleteUser,
  useListUser,
  useUpdateUser,
} from '@/api/services/admin/userService';
import unnamedImage from '@/assets/images/unnamed.jpg';
import { CircleLoading } from '@/components/loading';

import { UserDetail } from './user.detail';
import { UserEdit } from './user.edit';

import { User, Station } from '#/entity';
import type { TableProps } from 'antd';

export default function ManageStationUserList() {
  const [form] = Form.useForm();

  const [listRelateParams, setListRelateParams] = useState<UsersQueryType>();
  const [clickOne, setClickOne] = useState<User>();
  const [clickOneStation, setClickOneStation] = useState<Station>();
  const [showInfo, setShowInfo] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { mutateAsync: updateMutate } = useUpdateUser();
  const { data, isLoading } = useListUser(listRelateParams);
  const { mutateAsync: deleteMutate } = useDeleteUser();
  if (isLoading) return <CircleLoading />;

  const onOpenFormHandler = (record?: User) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };
  const onOpenDetail = (record?: User) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowDetail(true);
  };
  const submitHandle = (record?: User) => {
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
  const closeDetail = async () => {
    setShowDetail(false);
  };
  const closeAndRefetchHandlerStation = async () => {
    setShowAddToStation(false);
  };
  const columns: TableProps<User>['columns'] = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text, _data, index) => <Typography>{++index}</Typography>,
      width: '5%',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      render: (text, record) =>
        text !== null && text.length > 0 ? (
          <Typography onClick={() => onOpenDetail(record)}>{text}</Typography>
        ) : (
          <Typography onClick={() => onOpenDetail(record)}>null</Typography>
        ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) =>
        text !== null && text.length > 0 ? (
          <Typography onClick={() => onOpenDetail(record)}>{text}</Typography>
        ) : (
          <Typography onClick={() => onOpenDetail(record)}>null</Typography>
        ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      render: (text, record) =>
        text !== null && text.length > 0 ? (
          <Typography onClick={() => onOpenDetail(record)}>{text}</Typography>
        ) : (
          <Typography onClick={() => onOpenDetail(record)}>null</Typography>
        ),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      render: (text, record) =>
        text !== null && text.length > 0 ? (
          <Typography onClick={() => onOpenDetail(record)}>{text}</Typography>
        ) : (
          <Typography onClick={() => onOpenDetail(record)}>null</Typography>
        ),
    },
    {
      title: 'AvatarUrl',
      dataIndex: 'avatarUrl',
      render: (text, avatarUrl) => (
        <Image
          style={{ width: 100, height: 100, objectFit: 'cover' }} // Thay đổi kích thước theo nhu cầu
          src={text ?? unnamedImage}
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
    {
      title: 'Role',
      dataIndex: 'roles',
      align: 'center',
      render: (text) => <Tag color="blue">{text[0].name}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      align: 'center',
      width: 120,
      render: (text, record) => (
        <Popconfirm
          icon={<ExclamationCircleOutlined />}
          title={
            <div>
              <span>Do you want to update this user status ?</span>
            </div>
          }
          onConfirm={async () => {
            await updateMutate({ id: record.id, isActive: !text });
          }}
          okText="Yes"
          cancelText="No"
        >
          <Switch checked={text} />
        </Popconfirm>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   align: 'center',
    //   width: 100,
    //   render: (_, record) => (
    //     <div className="text-gray flex w-full justify-center">
    //       {/* <IconButton onClick={() => onOpenFormHandler(record)}>
    //         <Iconify icon="solar:pen-bold-duotone" size={18} />
    //       </IconButton> */}
    //       <Popconfirm
    //         title="Delete this user ?"
    //         okText="Yes"
    //         cancelText="No"
    //         placement="left"
    //         onConfirm={() => submitHandle(record)}
    //       >
    //         <IconButton>
    //           <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
    //         </IconButton>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];
  const resetHandler = () => {
    form.resetFields();
  };

  const onPageChange = (page: number, pageSize: number) => {
    const values: UsersQueryType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };
  const onFinishHandler = (values: UsersQueryType) => {
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

  // const onEdit = (formValue: User) => {
  //   setRoleModalProps((prev) => ({
  //     ...prev,
  //     show: true,
  //     title: 'Edit',
  //     formValue,
  //   }));
  // };
  // const { data } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: userService.GetUser,
  // });
  // console.log('data', data);

  return (
    <Card>
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={20}>
            <Row wrap={false} gutter={24}>
              <Col span={6}>
                <Form.Item name="Search">
                  <Input placeholder="Search by name" allowClear />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Role" name="Role">
                  <Select allowClear>
                    {/* <Select.Option value="StationManager">Station Manager</Select.Option> */}
                    <Select.Option value="Staff">Staff</Select.Option>
                    <Select.Option value="User">User</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Status" name="IsActive">
                  <Select allowClear>
                    <Select.Option value="true">Active</Select.Option>
                    <Select.Option value="false">De-Active</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Row>
              <Col span={12}>
                <Form.Item name="search">
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button type="primary" onClick={resetHandler}>
                  Reset
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
        dataSource={data?.contends.filter(
          (e) => e.roles[0].name !== 'Admin' && e.roles[0].name !== 'StationManager',
        )}
        loading={isLoading}
      />
      <Pagination
        onChange={onPageChange}
        total={data?.totalItems}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
        showSizeChanger={false}
        defaultPageSize={20}
      />

      {/* <UserEdit {...roleModalPros} /> */}
      {showInfo && <UserEdit clickOne={clickOne} onClose={closeAndRefetchHandler} />}
      {showDetail && <UserDetail onClose={closeDetail} clickOne={clickOne} />}
    </Card>
  );
}
