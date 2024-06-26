import { Card, Col, Row, Typography, Timeline, Radio, Select, Progress, Empty, Form } from 'antd';
import { useState } from 'react';

import {
  useListOrdersHistoryDashboard,
  useListPackagesDashboard,
} from '@/api/services/admin/dashboardService';
import { useListStation } from '@/api/services/admin/stationService';
import { useGetDashboardInfo } from '@/api/services/stationService';
import AdminLineChart from '@/components/chart/AdminLineChart';
import { CircleLoading } from '@/components/loading';
import { numberWithCommas } from '@/utils/string';

export default function MenuLevel() {
  const { Title, Text } = Typography;

  const [listRelateParams, setListRelateParams] = useState<string>('checkIn');
  const [stationId, setStationId] = useState<string>('');

  const { data: listStation } = useListStation();
  const { data: dashboardData } = useGetDashboardInfo(stationId);
  const { data: packageList, isLoading: isPackageLoading } = useListPackagesDashboard({
    checkIn: listRelateParams,
    StationId: stationId,
  });
  const { data: OrdersHistoryData, isLoading } = useListOrdersHistoryDashboard({
    StationId: stationId,
  });

  if (isLoading) return <CircleLoading />;
  if (isPackageLoading) return <CircleLoading />;
  // if (totaLoading) return <CircleLoading />;
  // if (totalPackageLoading) return <CircleLoading />;

  const handleSelectChange = (value: string) => {
    setStationId(value);
  };
  const doubleDollor = [
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 8 8">
      <path
        fill="currentColor"
        d="M3 0v1h-.75C1.57 1 1 1.57 1 2.25v.5c0 .68.44 1.24 1.09 1.41l2.56.66c.14.04.34.29.34.44v.5c0 .14-.11.25-.25.25h-2.5a.56.56 0 0 1-.25-.06v-.94h-1v1c0 .34.2.63.44.78c.23.16.52.22.81.22h.75v1h1v-1h.75c.69 0 1.25-.56 1.25-1.25v-.5c0-.68-.44-1.24-1.09-1.41l-2.56-.66C2.2 3.15 2 2.9 2 2.75v-.5c0-.14.11-.25.25-.25h2.5c.11 0 .21.04.25.06V3h1V2c0-.34-.2-.63-.44-.78c-.23-.16-.52-.22-.81-.22H4V0z"
      />
    </svg>,
  ];

  const packageLogo = [
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M12.25 4.299a.5.5 0 0 0-.5 0L6.206 7.5l1.813 1.047l5.798-3.343zm3.568 2.06L10.02 9.702l1.73.999a.5.5 0 0 0 .5 0L17.794 7.5l-1.976-1.14Zm2.976 2.873l-5.544 3.201a2.25 2.25 0 0 1-.25.126v6.709l5.544-3.201a.5.5 0 0 0 .25-.433zM11 19.268v-6.709a2.5 2.5 0 0 1-.25-.126L5.206 9.232v6.402a.5.5 0 0 0 .25.433zm-.25-16.701a2.5 2.5 0 0 1 2.5 0l6.294 3.634a2.5 2.5 0 0 1 1.25 2.165v7.268a2.5 2.5 0 0 1-1.25 2.165l-6.294 3.634a2.5 2.5 0 0 1-2.5 0l-6.294-3.634a2.5 2.5 0 0 1-1.25-2.165V8.366a2.5 2.5 0 0 1 1.25-2.165z"
        />
      </g>
    </svg>,
  ];
  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      />
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      />
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      />
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      />
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      />
      <path d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z" fill="#fff" />
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      />
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      />
    </svg>,
  ];
  const count = [
    {
      today: 'Today’s Sales',
      title: '$53,000',
      persent: '+30%',
      icon: dollor,
      bnb: 'bnb2',
    },
    {
      today: 'Today’s Users',
      title: '3,200',
      persent: '+20%',
      icon: profile,
      bnb: 'bnb2',
    },
    {
      today: 'New Clients',
      title: '+1,200',
      persent: '-20%',
      icon: heart,
      bnb: 'redtext',
    },
    {
      today: 'New Orders',
      title: '$13,200',
      persent: '10%',
      icon: cart,
      bnb: 'bnb2',
    },
  ];

  const count1 = dashboardData?.map((item) => {
    let today: string;
    let title: number | string;
    let persent: number | string;
    let icon: JSX.Element[];
    let bnb: string;

    switch (item.dashBoardType) {
      case 'TodaySales':
        today = 'Today’s Sales';
        title = `đ ${numberWithCommas(item.value)}`;
        persent = `${item.percent}%`;
        icon = dollor;
        bnb = item.percent >= 0 ? 'bnb2' : 'redtext';
        break;
      case 'TodayUsers':
        today = 'Today’s Users';
        title = `${numberWithCommas(item.value)}`;
        persent = `${item.percent}%`;
        icon = profile;
        bnb = item.percent >= 0 ? 'bnb2' : 'redtext';
        break;
      case 'NewClient':
        today = 'New Clients';
        title = `${numberWithCommas(item.value)}`;
        persent = `${item.percent}%`;
        icon = heart;
        bnb = item.percent >= 0 ? 'bnb2' : 'redtext';
        break;
      case 'NewOrders':
        today = 'New Orders';
        title = `${numberWithCommas(item.value)}`;
        persent = `${item.percent}%`;
        icon = cart;
        bnb = item.percent >= 0 ? 'bnb2' : 'redtext';
        break;
      default:
        today = '';
        title = '';
        persent = '';
        icon = cart;
        bnb = '';
    }

    return { today, title, persent, icon, bnb };
  });
  // const timelineList = [
  //   {
  //     title: '$2,400 - Redesign store',
  //     time: '09 JUN 7:20 PM',
  //     color: 'green',
  //   },
  //   {
  //     title: 'New order #3654323',
  //     time: '08 JUN 12:20 PM',
  //     color: 'green',
  //   },
  //   {
  //     title: 'Company server payments',
  //     time: '04 JUN 3:10 PM',
  //   },
  //   {
  //     title: 'New card added for order #4826321',
  //     time: '02 JUN 2:45 PM',
  //   },
  //   {
  //     title: 'Unlock folders for development',
  //     time: '18 MAY 1:30 PM',
  //   },
  //   {
  //     title: 'New order #46282344',
  //     time: '14 MAY 3:30 PM',
  //     color: 'gray',
  //   },
  // ];
  const onStatusChange = (e: any) => {
    const values = e.target.value;
    setListRelateParams(values.toString());
  };

  return (
    <div className="layout-content">
      <Row className="rowgap-vbox mb-6" justify="end" gutter={[24, 0]}>
        <Form.Item label="Station">
          <Select
            showSearch
            placeholder="Select Station"
            // optionFilterProp="label"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{ value: 'id', label: 'name' }}
            options={listStation?.contends}
            style={{ minWidth: '13rem' }}
            value={stationId}
            onSelect={handleSelectChange}
            allowClear
            onClear={() => {
              setStationId('');
            }}
          />
        </Form.Item>
      </Row>
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {count1?.map((c, index) => (
          <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-6">
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={18}>
                    <span>{c.today}</span>
                    <Title level={3}>
                      {c.title} <small className={c.bnb}>{c.persent}</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">{c.icon}</div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 0]}>
        {/* <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-6">
          <Card bordered={false} className="criclebox h-full">
            <EChart />
          </Card>
        </Col> */}
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-6">
          <Card bordered={false} className="criclebox h-full">
            <AdminLineChart />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-6">
          <Card bordered={false} className="criclebox cardbody h-full">
            <div className="project-ant">
              <div>
                <Title level={5}>Package</Title>
                {/* <Paragraph className="lastweek">
                  done this month<span className="blue">40%</span>
                </Paragraph> */}
              </div>
              <div className="ant-filtertabs">
                <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                  <Radio.Group onChange={onStatusChange} defaultValue="checkIn">
                    <Radio.Button value="checkIn">CHECKIN</Radio.Button>
                    <Radio.Button value="checkOut">CHECKOUT</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="ant-list-box table-responsive">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th>STATUS</th>
                    <th>PRICE</th>
                    <th>COMPLETION</th>
                  </tr>
                </thead>
                <tbody>
                  {packageList &&
                    packageList.contends.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6 className="package-avatar-title">
                            <img
                              src={d?.packageImages[0]?.imageUrl}
                              alt=""
                              className="avatar-sm mr-2"
                            />
                            {d.name}
                          </h6>
                        </td>
                        <td>{d.status}</td>
                        <td>
                          <span className="font-weight-bold text-xs">{d.formatTotalPrice} </span>
                        </td>
                        <td>
                          <div className="percent-progress">
                            <Progress percent={d.priceCod as any} size="small" />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {packageList?.contends.length === 0 && (
                <Empty className="w-full" imageStyle={{ width: '100%' }} />
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-6">
          <Card bordered={false} className="criclebox h-full">
            <div className="timeline-box">
              <Title level={5}>Orders History</Title>
              {/* <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                this month <span className="bnb2">20%</span>
              </Paragraph> */}
              {OrdersHistoryData?.contends.length === 0 && <Empty />}
              <Timeline className="timelinelist">
                {OrdersHistoryData?.contends &&
                  OrdersHistoryData?.contends.map((t, index) => (
                    <Timeline.Item color="green" key={index}>
                      <Title level={5}>{t.status}</Title>
                      <Text>Total price : {numberWithCommas(t.totalPrice)} đ</Text>
                    </Timeline.Item>
                  ))}
              </Timeline>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
