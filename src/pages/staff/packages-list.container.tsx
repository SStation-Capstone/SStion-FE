import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DisconnectOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Card,
  Pagination,
  Typography,
  Avatar,
  Image,
  List,
  Input,
  Space,
  Button,
  Tag,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
} from 'antd';
import Table from 'antd/es/table';
import moment from 'moment';
import { useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';

import { useListStaffPackage } from '@/api/services/stationService';
import unnamedImage from '@/assets/images/unnamed.jpg';
import { CircleLoading } from '@/components/loading';
import { getItem } from '@/utils/storage';

import { PackageDetail } from '../station/packages.detail';

import { InputType } from '#/api';
import { StorageEnum } from '#/enum';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

const { Title } = Typography;

export default function PackagesManagerList() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const id = getItem(StorageEnum.User).stationId as number;
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListStaffPackage({ id: id || 0, listRelateParams });
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [clickOne, setClickOne] = useState();
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    setClickOne(record);
    setShowInfo(true);
  };
  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: any,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
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
  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    // eslint-disable-next-line react/no-unstable-nested-components
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    // eslint-disable-next-line react/no-unstable-nested-components
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<any> = [
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
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
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
    // {
    //   title: 'Sender',
    //   dataIndex: 'sender',
    //   render: (_: any, record: any) => (
    //     <List.Item>
    //       <List.Item.Meta
    //         className="flex gap-3"
    //         avatar={
    //           <Avatar shape="square" size={48} src={record.sender?.avatarUrl || unnamedImage} />
    //         }
    //         title={record.sender?.fullName || 'null'}
    //         description={record.sender?.phoneNumber || 'null'}
    //       />
    //     </List.Item>
    //   ),
    // },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      render: (_: any, record: any) => (
        <List.Item>
          <List.Item.Meta
            className="flex gap-3"
            avatar={
              <Avatar shape="square" size={48} src={record.receiver?.avatarUrl || unnamedImage} />
            }
            title={record.receiver?.fullName || 'null'}
            description={record.receiver?.phoneNumber || 'null'}
          />
        </List.Item>
      ),
    },
  ];

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  const resetHandler = () => {
    form.resetFields();
    form.submit();
  };
  return (
    <Card title="List Packages">
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
        columns={columns}
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
      {showInfo && <PackageDetail clickOne={clickOne} onClose={closeAndRefetchHandler} />}
    </Card>
  );
}
