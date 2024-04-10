import {
  Button,
  message,
  Descriptions,
  Col,
  Card,
  Row,
  Avatar,
  List,
  Modal,
  Tabs,
  Image,
} from 'antd';
import { useState } from 'react';

import { useDeletePackage, useGetPackageBySlot } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';

import { ManageCheckInCreate } from './checkin.create';

export type PackagesFormProps = {
  zoneId?: any;
  clickOne?: any;
  onClose: () => void;
};
export function PackagesInfo({ zoneId, clickOne, onClose }: PackagesFormProps) {
  const { data, isLoading } = useGetPackageBySlot(clickOne.id);
  const { mutateAsync: deleteMutate } = useDeletePackage();
  const [loading, setLoading] = useState<boolean>(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const [packageId, setPackageId] = useState<any>(false);
  if (isLoading) return <CircleLoading />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const transformedArray = data.contends.map((item: any, index: number) => ({
    key: item.id,
    label: `Package ${index + 1}`,
    children: (
      <>
        <Card
          bodyStyle={{ display: 'none' }}
          title={
            <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
              <Col span={24} md={12} className="col-info">
                <Avatar.Group className="gap-4">
                  {item.packageImages.map((image: any, i: any) => (
                    <Image
                      width={100}
                      src={image.imageUrl}
                      key={i}
                      placeholder={<Image preview={false} src={image.imageUrl} width={200} />}
                      style={{ borderRadius: '5px' }}
                    />
                  ))}
                  <div className="flex items-center pl-4">
                    <div>
                      <h4 className="m-0 font-semibold">{item.name}</h4>
                      <p>{item.location}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Avatar.Group>
              </Col>
            </Row>
          }
        />

        <Row gutter={[24, 0]} className="mt-4">
          <Col span={24} md={8} className="mb-2">
            <Card
              bordered={false}
              title={<h6 className="m-0 font-semibold">Station</h6>}
              className="header-solid card-profile-information h-full"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
              <p className="text-dark">{item.station.description}</p>
              <hr className="my-25" />
              <Descriptions title="Information">
                <Descriptions.Item label="name" span={3}>
                  {item.station.name}
                </Descriptions.Item>
                <Descriptions.Item label="address" span={3}>
                  {item.station.address}
                </Descriptions.Item>
                <Descriptions.Item label="contact Phone" span={3}>
                  {item.station.contactPhone}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={24} md={8} className="mb-2">
            <Card
              bordered={false}
              title={<h6 className="m-0 font-semibold">Zone</h6>}
              className="header-solid card-profile-information h-full"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
              <p className="text-dark">{item.zone.description}</p>
              <hr className="my-25" />
              <Descriptions title="Information">
                <Descriptions.Item label="name" span={3}>
                  {item.zone.name}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={24} md={8} className="mb-2">
            <Card
              bordered={false}
              title={<h6 className="m-0 font-semibold">sender - receiver</h6>}
              className="header-solid card-profile-information h-full"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
              <List
                itemLayout="horizontal"
                dataSource={[item.sender, item.receiver]}
                split={false}
                className="conversations-list"
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={48} src={item.avatarUrl} />}
                      title={item.fullName}
                      description={item.phoneNumber}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </>
    ),
  }));
  // useEffect(() => {
  //   const transformedArray = data.contends.map((item: any, index: number) => ({
  //     key: item.id,
  //     label: `Package ${index + 1}`,
  //     children: (
  //       <>
  //         <Card
  //           bodyStyle={{ display: 'none' }}
  //           title={
  //             <Row justify="space-between" align="middle" gutter={[24, 0]} className="p-4">
  //               <Col span={24} md={12} className="col-info">
  //                 <Avatar.Group className="gap-4">
  //                   {item.packageImages.map((image: any, i: any) => (
  //                     <Image
  //                       width={100}
  //                       src={image.imageUrl}
  //                       key={i}
  //                       placeholder={<Image preview={false} src={image.imageUrl} width={200} />}
  //                       style={{ borderRadius: '5px' }}
  //                     />
  //                   ))}
  //                   <div className="flex items-center pl-4">
  //                     <div>
  //                       <h4 className="m-0 font-semibold">{item.name}</h4>
  //                       <p>{item.location}</p>
  //                       <p>{item.description}</p>
  //                     </div>
  //                   </div>
  //                 </Avatar.Group>
  //               </Col>
  //             </Row>
  //           }
  //         />

  //         <Row gutter={[24, 0]} className="mt-4">
  //           <Col span={24} md={8} className="mb-2">
  //             <Card
  //               bordered={false}
  //               title={<h6 className="m-0 font-semibold">Station</h6>}
  //               className="header-solid card-profile-information h-full"
  //               bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
  //             >
  //               <p className="text-dark">{item.station.description}</p>
  //               <hr className="my-25" />
  //               <Descriptions title="Information">
  //                 <Descriptions.Item label="name" span={3}>
  //                   {item.station.name}
  //                 </Descriptions.Item>
  //                 <Descriptions.Item label="address" span={3}>
  //                   {item.station.address}
  //                 </Descriptions.Item>
  //                 <Descriptions.Item label="contact Phone" span={3}>
  //                   {item.station.contactPhone}
  //                 </Descriptions.Item>
  //               </Descriptions>
  //             </Card>
  //           </Col>
  //           <Col span={24} md={8} className="mb-2">
  //             <Card
  //               bordered={false}
  //               title={<h6 className="m-0 font-semibold">Zone</h6>}
  //               className="header-solid card-profile-information h-full"
  //               bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
  //             >
  //               <p className="text-dark">{item.zone.description}</p>
  //               <hr className="my-25" />
  //               <Descriptions title="Information">
  //                 <Descriptions.Item label="name" span={3}>
  //                   {item.zone.name}
  //                 </Descriptions.Item>
  //               </Descriptions>
  //             </Card>
  //           </Col>
  //           <Col span={24} md={8} className="mb-2">
  //             <Card
  //               bordered={false}
  //               title={<h6 className="m-0 font-semibold">sender - receiver</h6>}
  //               className="header-solid card-profile-information h-full"
  //               bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
  //             >
  //               <List
  //                 itemLayout="horizontal"
  //                 dataSource={[item.sender, item.receiver]}
  //                 split={false}
  //                 className="conversations-list"
  //                 renderItem={(item) => (
  //                   <List.Item>
  //                     <List.Item.Meta
  //                       avatar={<Avatar shape="square" size={48} src={item.avatarUrl} />}
  //                       title={item.fullName}
  //                       description={item.phoneNumber}
  //                     />
  //                   </List.Item>
  //                 )}
  //               />
  //             </Card>
  //           </Col>
  //         </Row>
  //       </>
  //     ),
  //   }));
  //   setDataPackage(transformedArray);
  // }, [data]);
  const closeFormCheckIn = async () => {
    setShowFormCheckIn(false);
  };
  const submitHandle = async () => {
    setLoading(true);
    try {
      setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  // const updateHandle = async () => {};
  const deleteHandle = async () => {
    setLoading(true);
    try {
      deleteMutate(packageId ? packageId.toString() : data.contends[0].id.toString());
      setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  const onChange = (key: string) => {
    console.log(key);
    setPackageId(key);
  };
  return (
    <Modal
      title="Packages by slot"
      open
      width={1300}
      onOk={submitHandle}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        // data.contends.length > 0 && (
        //   <Button key="submit" type="primary" loading={loading} onClick={updateHandle}>
        //     Update
        //   </Button>
        // ),
        clickOne.isActive && data.contends.length > 0 && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {data.contends[0].name && (
              <Button key="submit" type="primary" loading={loading} onClick={deleteHandle}>
                Delete
              </Button>
            )}
          </>
        ),
        clickOne.isActive && (
          <Button key="submit" type="primary" onClick={() => setShowFormCheckIn(true)}>
            Check In
          </Button>
        ),
      ]}
    >
      {transformedArray.length > 0
        ? data.contends[0] && (
            <Tabs
              defaultActiveKey={data.contends[0].id}
              type="card"
              items={transformedArray}
              onChange={onChange}
            />
          )
        : 'not found'}
      {showFormCheckIn && (
        <ManageCheckInCreate
          zoneId={zoneId}
          slotId={clickOne.id}
          onClose={closeFormCheckIn}
          onCloseCheckIn={onClose}
        />
      )}
    </Modal>
  );
}
