import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Typography,
  Popconfirm,
  Row,
  Tag,
  Avatar,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useDeleteStaff, useListStaff } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { StaffCreate } from './staff.create';

import { InputType } from '#/api';
import { Staff } from '#/entity';

const { Title } = Typography;
export type StaffFormProps = {
  check?: any;
};
export default function StaffManagerList({ check }: StaffFormProps) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { state } = useLocation();
  const stationData = JSON.parse(state?.stationData);
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Staff>();
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useListStaff(check || id);
  const { mutateAsync: deleteMutate } = useDeleteStaff(check || id);
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
      title: 'User Name',
      dataIndex: 'userName',
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
        // {
        //   text: 'Admin',
        //   value: 'Admin',
        // },
        // {
        //   text: 'Staff',
        //   value: 'Staff',
        // },
        // {
        //   text: 'StationManager',
        //   value: 'StationManager',
        // },
      ],
      onFilter: (value, record) => record.roles[0].name.indexOf(value as string) === 0,
      sorter: (a, b) => a.roles[0].name.localeCompare(b.roles[0].name),
      sortDirections: ['descend'],
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
    <>
      <Card
        style={{ marginBottom: '1rem' }}
        bodyStyle={{ display: 'none' }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
            <Col span={24} md={8} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={stationData?.stationImages[0]?.imageUrl} />
                <div className="flex items-center pl-4">
                  <div>
                    <h4 className="m-0 font-semibold">{stationData?.name}</h4>
                    <p>{stationData?.description}</p>
                    <p>{stationData?.address}</p>
                  </div>
                </div>
              </Avatar.Group>
            </Col>{' '}
          </Row>
        }
      />

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
              <Form.Item name="Search" key="searchByNameStaff">
                <Input placeholder="Search by name" allowClear />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Row>
                <Col span={12}>
                  <Form.Item name="search">
                    <Button type="primary" htmlType="submit" key="searchByNameStaff">
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
    </>
  );
}
