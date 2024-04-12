import { Button, Card, Col, Form, Input, Pagination, Typography, Popconfirm, Row, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDeleteStaff, useListStaff } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { StaffCreate } from './staff.create';

import { InputType } from '#/api';
import { Staff } from '#/entity';

const { Title } = Typography;

export default function StaffManagerList() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Staff>();
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useListStaff(id);
  const { mutateAsync: deleteMutate } = useDeleteStaff(id);
  if (isLoading) return <CircleLoading />;
  console.log('data', data);
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
    // {
    //   title: 'AvatarUrl',
    //   dataIndex: 'avatarUrl',
    //   render: (text) => <Image style={{ width: 100, height: 'auto' }} src={text} />,
    // },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'username',
      dataIndex: 'userName',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      render: (text) => <Tag color="cyan">{text[0].name}</Tag>,
    },

    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="text-gray flex w-full justify-center">
          <IconButton onClick={() => onOpenFormHandler(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete the staff"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => {
              deleteMutate(record.id.toString());
            }}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
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

  return (
    <Card
      title="List Staff"
      extra={
        <Button type="primary" onClick={() => onOpenFormHandler()}>
          New
        </Button>
      }
    >
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={8}>
            <Form.Item name="Search">
              <Input placeholder="Search by name" allowClear />
            </Form.Item>
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
        dataSource={data?.contends.filter((e) => e.roles[0].name !== 'StationManager')}
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
