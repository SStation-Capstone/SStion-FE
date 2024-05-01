import { Typography, Select } from 'antd';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { useGetStatisticalPackage } from '@/api/services/stationService';

import { CircleLoading } from '../loading';

import eChart from './configs/eChart';

interface Item {
  Title: string;
  user: string;
}
export type DashboardEChartProps = {
  stationId: string;
};
export default function EChart({ stationId }: DashboardEChartProps) {
  const { Title, Paragraph } = Typography;
  const [year, setYear] = useState<string | undefined>('2024');
  const { data, isLoading } = useGetStatisticalPackage({ year, stationId });
  const transformData = data?.map((e) => e.packageCount);

  const handleYearSelection = (values: string) => {
    setYear(values);
  };
  if (isLoading) return <CircleLoading />;

  const items: Item[] = [
    {
      Title: '3,6K',
      user: 'Users',
    },
    {
      Title: '2m',
      user: 'Clicks',
    },
    {
      Title: '$772',
      user: 'Sales',
    },
    {
      Title: '82',
      user: 'Items',
    },
  ];

  return (
    <>
      <div className="linechart mb-6">
        <div>
          <Title level={5}>Statistical Package</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        {/* <div className="sales">
          <ul>
            <li>
              <MinusOutlined /> Check In
            </li>
            <li>
              <MinusOutlined /> Check Out
            </li>
          </ul>
        </div> */}
        <Select
          style={{ minWidth: '10rem' }}
          options={[
            { value: '2023', label: '2023' },
            { value: '2024', label: '2024' },
          ]}
          onSelect={handleYearSelection}
          placeholder="Select year"
          value={year}
        />
      </div>

      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={[{ name: 'Package', data: transformData }]}
          type="bar"
          height={350}
        />
      </div>
      {/* <div className="chart-vistior">
        <Title level={5}>Active Users</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise into pixel perfect
          pages.
        </Paragraph>
        <Row gutter={16}>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}
    </>
  );
}
