import { Avatar, Button, Card, Col, Modal, Row } from 'antd';

import StaffManagerList from '@/pages/staff/staff-list.user';

export type PackagesFormProps = {
  clickOne?: any;
  onClose: () => void;
  stationData: any;
};
export function StationAdminStaff({ clickOne, onClose, stationData }: PackagesFormProps) {
  return (
    <Modal
      open
      width={1300}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
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
            </Col>
            {/* <Col span={24} md={8} className="col-info">
              <div className="items-center justify-end">
                <p className="pl-4 text-xl">Balance: {numberWithCommas(stationData?.balance)} đ</p>
                <p className="pl-4 text-xl">Contact Phone: {stationData?.contactPhone}</p>
              </div>
            </Col> */}
          </Row>
        }
      />
      <StaffManagerList check={clickOne} />
    </Modal>
  );
}
