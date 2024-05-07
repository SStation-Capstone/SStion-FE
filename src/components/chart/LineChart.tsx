import { Select, Typography } from 'antd';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { useGetStatisticalRevenue } from '@/api/services/stationService';

import { CircleLoading } from '../loading';

import lineChart from './configs/lineChart';

export type DashboardLineChartProps = {
  stationId: string;
};
export default function LineChart({ stationId }: DashboardLineChartProps) {
  const { Title, Paragraph } = Typography;
  const [year, setYear] = useState<string | undefined>('2024');
  const { data, isLoading } = useGetStatisticalRevenue({ year, stationId });
  const transformData = data?.map((e) => e.revenue);
  const handleYearSelection = (values: string) => {
    setYear(values);
  };
  if (isLoading) return <CircleLoading />;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Statistical Revenue</Title>
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

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={[{ name: 'Revenue', data: transformData }]}
        type="area"
        height={350}
        width="100%"
      />
    </>
  );
}
