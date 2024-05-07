import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DisconnectOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import {
  Card,
  Avatar,
  Pagination,
  Typography,
  Image,
  List,
  Button,
  Form,
  Row,
  Col,
  DatePicker,
  Tag,
  Select,
  Input,
  message,
} from 'antd';
import Table from 'antd/es/table';
import moment from 'moment';
import { useState } from 'react';

import {
  useCreateExpire,
  useCreatePushNotification,
  useListPackageStation,
} from '@/api/services/stationService';
import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';

import { ManageExpireCreate } from '../station/expire.create';
import { PackageDetail } from '../station/packages.detail';

import { InputType } from '#/api';
import { StorageEnum } from '#/enum';

const { Title } = Typography;

export default function PackageStationManagerList() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const id = getItem(StorageEnum.User).stationManager as string;
  const idStaff = getItem(StorageEnum.User).stationId as number;
  const { mutateAsync: createExpire } = useCreateExpire();
  const { mutateAsync: createPushNotification } = useCreatePushNotification();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [showExpire, setShowExpire] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [clickTwo, setClickTwo] = useState();
  const [zoneId, setZoneId] = useState();
  const [slotId, setSlotId] = useState();
  const [packageId, setPackageId] = useState();
  const { data, isLoading } = useListPackageStation({
    stationIds: id || `?StationIds=${idStaff}`,
    values: listRelateParams,
  });
  // const { mutateAsync: deleteMutate } = useDeleteStation();
  if (isLoading) return <CircleLoading />;
  const onOpenFormExpire = (record?: any) => {
    setZoneId(record.station.id);
    setSlotId(record.slot.id);
    setPackageId(record.id);
    setShowExpire(true);
  };
  const onOpenFormHandler = (record?: any) => {
    setClickTwo(record);
    setShowInfo(true);
  };
  const closeExpire = async () => {
    setShowExpire(false);
  };
  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const resetHandler = () => {
    form.resetFields();
  };
  const onFinishHandler = (values: any) => {
    if (form.getFieldValue('date') !== undefined) {
      const formDate = {
        ...values,
        From: values.date[0].format('YYYY-MM-DD'),
        To: values.date[1].format('YYYY-MM-DD'),
      };
      delete formDate?.date;
      setListRelateParams(formDate);
    } else {
      setListRelateParams(values);
    }
  };
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      // eslint-disable-next-line no-plusplus
      render: (_text: any, _data: any, index: number) => <Title level={5}>{++index}</Title>,
      width: '5%',
    },
    {
      title: 'Images',
      dataIndex: 'packageImages',
      render: (_: any, record: { packageImages: { imageUrl: string }[] }) => (
        <Avatar.Group className="gap-4">
          {record.packageImages.map((image: any, i: any) => (
            <Image
              width={50}
              src={image.imageUrl}
              key={i}
              placeholder={<Image preview={false} src={image.imageUrl} width={200} />}
              style={{ borderRadius: '5px' }}
            />
          ))}
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
    {
      title: 'Station',
      dataIndex: 'station',
      render: (text: any) => <Typography.Text>{text.name}</Typography.Text>,
    },
    { title: 'Location', dataIndex: 'location' },
    {
      title: 'Modified At',
      dataIndex: 'modifiedAt',
      render: (_: any, record: any) => (
        <div>{moment(record.modifiedAt).format('DD/MM/YYYY HH:mm:ss')}</div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <>
          {record.status === 'Paid' && (
            <Tag icon={<MinusCircleOutlined />} color="default">
              {record.status}
            </Tag>
          )}
          {record.status === 'Returned' && (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {record.status}
            </Tag>
          )}
          {record.status === 'Canceled' && (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              {record.status}
            </Tag>
          )}
          {record.status === 'Completed' && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {record.status}
            </Tag>
          )}
          {record.status === 'Initialized' && (
            <Tag icon={<ExclamationCircleOutlined />} color="cyan">
              {record.status}
            </Tag>
          )}
          {record.status === 'Expired' && (
            <Tag icon={<DisconnectOutlined />} color="volcano">
              {record.status}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
      render: (_: any, record: any) => (
        <List.Item>
          <List.Item.Meta
            className="flex gap-3"
            avatar={<Avatar shape="square" size={48} src={record.sender.avatarUrl} />}
            title={record.sender.fullName}
            description={record.sender.phoneNumber}
          />
        </List.Item>
      ),
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      render: (_: any, record: any) => (
        <List.Item>
          <List.Item.Meta
            className="flex gap-3"
            avatar={<Avatar shape="square" size={48} src={record.receiver.avatarUrl} />}
            title={record.receiver.fullName}
            description={record.receiver.phoneNumber}
          />
        </List.Item>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => (
        <div className="text-gray flex w-full items-center justify-center">
          <div className="flex gap-2">
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px' }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenFormExpire(record);
              }}
            >
              <Iconify icon="mdi:folder-location" size={18} />
              Change location
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px', backgroundColor: '#13c2c2' }}
              onClick={(e) => {
                e.stopPropagation();
                if (record.status === 'Expired') {
                  message.error('Package have been expired!');
                } else {
                  createExpire(record.id.toString());
                }
              }}
            >
              <Iconify icon="pajamas:expire" size={18} />
              Expire
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 10px', height: '35px', backgroundColor: '#faad14' }}
              onClick={(e) => {
                e.stopPropagation();
                createPushNotification(record.id.toString());
              }}
            >
              <Iconify icon="iconamoon:notification-fill" size={18} />
              Push noti
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  return (
    <Card title="List package station">
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col span={20}>
            <Row wrap={false} gutter={24}>
              <Col span={8}>
                <Form.Item label="From - To" name="date">
                  <RangePicker allowClear />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Status" name="status">
                  <Select allowClear placeholder="Select status">
                    <Select.Option value="Initialized">Receive</Select.Option>
                    <Select.Option value="Paid">Paid</Select.Option>
                    <Select.Option value="Completed">Receive</Select.Option>
                    <Select.Option value="Returned">Returned</Select.Option>
                    <Select.Option value="Canceled">Canceled</Select.Option>
                    <Select.Option value="Expired">Expired</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Check in day(s) above" name="CheckinFromDays">
                  <Input />
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
        columns={columns as any}
        dataSource={data?.contends}
        loading={isLoading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onOpenFormHandler(record);
            },
          };
        }}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        // eslint-disable-next-line no-unsafe-optional-chaining
        total={data?.totalItems}
        // showTotal={(total) => `共 ${total} 条`}
        current={data?.page}
        style={{ marginTop: '1rem' }}
      />
      {showInfo && (
        <PackageDetail
          clickOne={clickTwo}
          check
          slotId={clickTwo}
          onClose={closeAndRefetchHandler}
        />
      )}
      {showExpire && (
        <ManageExpireCreate
          zoneId={zoneId}
          slotId={slotId}
          packageId={packageId}
          onClose={closeExpire}
        />
      )}
    </Card>
  );
}
