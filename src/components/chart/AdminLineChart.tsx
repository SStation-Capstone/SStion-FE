import { Select } from 'antd';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { useListUserCountByMonth } from '@/api/services/admin/dashboardService';

import { CircleLoading } from '../loading';

import adminLineChart from './configs/adminLineChart';

export default function AdminLineChart() {
  const [year, setYear] = useState<string | undefined>('2024');
  const { data, isLoading } = useListUserCountByMonth({ Year: year });
  const handleYearSelection = (values: string) => {
    setYear(values);
  };
  console.log('dataChart', data);
  const transformData = data?.map((e) => e.userCount);
  console.log('lineData', transformData);
  if (isLoading) return <CircleLoading />;
  return (
    <>
      <div className="linechart">
        {/* <div>
          <Title level={5}>Active Users</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div> */}
        <div className="sales">
          {/* <ul>
            <li>
              <MinusOutlined /> Check In
            </li>
            <li>
              <MinusOutlined /> Check Out
            </li>
          </ul> */}
          <Select
            style={{ minWidth: '10rem' }}
            options={[
              { value: '2023', label: '2023' },
              { value: '2024', label: '2024' },
            ]}
            onSelect={handleYearSelection}
            value={year}
          />
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={adminLineChart.options}
        series={[{ name: 'User', data: transformData }]}
        type="area"
        height={350}
        width="100%"
      />
    </>
  );
}
