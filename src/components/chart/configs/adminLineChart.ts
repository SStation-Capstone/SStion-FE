const adminLineChart = {
  series: [
    {
      name: 'Mobile apps',
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500, 400, 100, 200],
      offsetY: 0,
    },
    // {
    //   name: 'Websites',
    //   data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    //   offsetY: 0,
    // },
  ],

  options: {
    chart: {
      width: '100%',
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c'],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: [
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
          ],
        },
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'],
    },

    tooltip: {
      y: {
        formatter(val: any) {
          return val;
        },
      },
    },
  },
};

export default adminLineChart;
