import { Button, Card, Col, Form, Input, Popconfirm, Row } from 'antd';
import { useState } from 'react';

import { useDeleteZone, useListZone } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import ManageShelfManagerList from './shelf-list.container';
import { ManageZoneCreate } from './zone.create';

import { InputType } from '#/api';
import { Station } from '#/entity';

export default function ManageZoneManagerList() {
  const [form] = Form.useForm();

  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Station>();
  const [showInfo, setShowInfo] = useState(false);
  const { data, isLoading } = useListZone();
  const { mutateAsync: deleteMutate } = useDeleteZone();
  if (isLoading) return <CircleLoading />;

  const onOpenFormHandler = (record?: Station) => {
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

  const resetHandler = () => {
    form.resetFields();
    // 清空时间组件，无参请求API
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
      title="Package Management"
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
      {showInfo && <ManageZoneCreate clickOne={clickOne} onClose={closeAndRefetchHandler} />}
      {data && (
        <Row gutter={[24, 0]}>
          {data.contends.map((item, index) => (
            <Col span={24} md={8} className="mb-24 " key={index}>
              <Card
                bordered={false}
                className="header-solid h-full"
                title={<h6 className="m-0 font-semibold">Zone {index + 1}</h6>}
                extra={
                  <div className="text-gray flex w-full justify-center">
                    <IconButton onClick={() => onOpenFormHandler(item)}>
                      <Iconify icon="solar:pen-bold-duotone" size={18} />
                    </IconButton>
                    <Popconfirm
                      title="Delete the station"
                      okText="Yes"
                      cancelText="No"
                      placement="left"
                      onConfirm={() => {
                        deleteMutate(item.id.toString());
                      }}
                    >
                      <IconButton>
                        <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                      </IconButton>
                    </Popconfirm>
                  </div>
                }
              >
                <ManageShelfManagerList id={item.id.toString()} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );
}
