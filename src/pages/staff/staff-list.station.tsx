import { Button, Card, Col, Popconfirm, Row } from 'antd';
import { useState } from 'react';

import { useDeleteZone, useListZone, useListZoneStaff } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { ManageCheckInCreate } from '../station/checkin.create';
// eslint-disable-next-line import/named
import ManageShelfManagerList from '../station/shelf-list.container';
import { ManageShelfCreate } from '../station/shelf.create';
import { ManageZoneCreate } from '../station/zone.create';

import { Station } from '#/entity';

export default function ManageZoneManagerList() {
  const [clickOne, setClickOne] = useState<Station>();
  const [clickTwo, setClickTwo] = useState<Station>();
  const [clickThree, setClickThree] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [showInfoShelf, setShowInfoShelf] = useState(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const { data: idData, isLoading: isIdLoading } = useListZoneStaff();
  const { data, isLoading } = useListZone(idData?.id);
  const { mutateAsync: deleteMutate } = useDeleteZone(idData?.id);
  if (isIdLoading || isLoading) return <CircleLoading />;

  const onOpenFormHandler = (record?: Station) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };
  const onOpenCheckInFormHandler = (record?: any) => {
    setClickThree(record);
    setShowFormCheckIn(true);
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

  return (
    <Card
      title="Package Management"
      // extra={
      //   <Button type="primary" onClick={() => onOpenFormHandler()}>
      //     New
      //   </Button>
      // }
    >
      {data && (
        <Row gutter={[24, 0]}>
          {data.contends.map((item, index) => (
            <Col className="mb-5 h-fit w-min" key={index}>
              <Card
                bordered={false}
                className="header-solid h-full"
                title={<h6 className="m-0 font-semibold">Zone {index + 1}</h6>}
                extra={
                  <div className="text-gray flex w-full items-center justify-center gap-2">
                    <Button
                      className="ml-2"
                      type="primary"
                      onClick={() => onOpenCheckInFormHandler(item.id)}
                    >
                      Check in
                    </Button>
                    <Button onClick={() => onOpenFormShelf(item)}>+ Shelf</Button>
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
      {showInfo && (
        <ManageZoneCreate
          stationId={idData?.id}
          clickOne={clickOne}
          onClose={closeAndRefetchHandler}
        />
      )}
      {showFormCheckIn && (
        <ManageCheckInCreate
          stationId={idData?.id}
          zoneId={clickThree}
          onClose={closeFormCheckIn}
        />
      )}
      {showInfoShelf && <ManageShelfCreate clickOne={clickTwo} onClose={closeAndRefetchShelf} />}
    </Card>
  );
}
