import { Button, Card, Col, Form, Input, Popconfirm, Row } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDeleteZone, useListZone } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { ManageCheckInCreate } from './checkin.create';
// eslint-disable-next-line import/named
import ManageShelfManagerList from './shelf-list.container';
import { ManageShelfCreate } from './shelf.create';
import { ManageZoneCreate } from './zone.create';

import { InputType } from '#/api';
import { Station } from '#/entity';

export default function ManageZoneManagerList() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [, setListRelateParams] = useState<InputType>();
  const [clickOne, setClickOne] = useState<Station>();
  const [clickTwo, setClickTwo] = useState<Station>();
  const [showInfo, setShowInfo] = useState(false);
  const [showInfoShelf, setShowInfoShelf] = useState(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const { data, isLoading } = useListZone(id);
  const { mutateAsync: deleteMutate } = useDeleteZone(id);
  if (isLoading) return <CircleLoading />;

  const onOpenFormHandler = (record?: Station) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };
  const onOpenFormShelf = (record?: Station) => {
    if (record) {
      setClickTwo(record);
    } else {
      setClickTwo(undefined);
    }
    setShowInfoShelf(true);
  };
  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const closeAndRefetchShelf = async () => {
    setShowInfoShelf(false);
  };
  const closeFormCheckIn = async () => {
    setShowFormCheckIn(false);
  };
  const resetHandler = () => {
    form.resetFields();
    // 清空时间组件，无参请求API
  };

  // const onPageChange = (page: number, pageSize: number) => {
  //   const values: InputType = { PageIndex: page, PageSize: pageSize };
  //   setListRelateParams(values);
  // };

  const onFinishHandler = (values: InputType) => {
    setListRelateParams(values);
  };

  return (
    <Card
      title="Package Management"
      extra={
        <>
          <Button type="primary" onClick={() => onOpenFormHandler()}>
            New
          </Button>
          <Button className="ml-2" type="primary" onClick={() => setShowFormCheckIn(true)}>
            Check in
          </Button>
          {/* <Button
            className="ml-2"
            type="primary"
            onClick={() => navigate(`?packageId=${packageId}`)}
          >
            Check out
          </Button> */}
        </>
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
      {data && (
        <Row gutter={[24, 0]}>
          {data.contends.map((item, index) => (
            <Col className="mb-5 h-fit w-min" key={index}>
              <Card
                bordered={false}
                className="header-solid h-full"
                title={<h6 className="m-0 font-semibold">Zone {index + 1}</h6>}
                extra={
                  <div className="text-gray flex w-full justify-center">
                    <div
                      className="relative mr-2 flex flex-col rounded-xl bg-gray-300 bg-clip-border text-gray-700 shadow-md"
                      onClick={() => onOpenFormShelf(item)}
                    >
                      <div className="flex cursor-pointer flex-wrap justify-center gap-2 p-2">
                        <h5 className="text-blue-gray-900 block font-sans text-base font-semibold leading-snug tracking-normal antialiased">
                          + shelf
                        </h5>
                      </div>
                    </div>
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
      {showInfo && <ManageZoneCreate clickOne={clickOne} onClose={closeAndRefetchHandler} />}
      {showFormCheckIn && <ManageCheckInCreate onClose={closeFormCheckIn} />}
      {showInfoShelf && <ManageShelfCreate clickOne={clickTwo} onClose={closeAndRefetchShelf} />}
    </Card>
  );
}
