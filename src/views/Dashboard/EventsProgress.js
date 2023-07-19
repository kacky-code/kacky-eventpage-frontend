export const donutChartOptionsCharts1 = {
  chart: {
    width: "100%"
  },
  states: {
    hover: {
      filter: {
        type: "none"
      }
    }
  },
  legend: {
    show: true,
    horizontalAlign: 'left',
    fontSize: "14px",
    labels: {
      colors: ["light-grey"],
    },
    formatter: (seriesName, opts) => [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]],
    itemMargin: {
      horizontal: 5,
      vertical: 2
    },
  },
  dataLabels: {
    enabled: false
  },
  hover: { mode: null },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true,
          name: {
            show: false,
            color: "#999",
            offsetY: 5,
          },
          value: {
            show: true,
            color: "#999",
            offsetY: 5,
          },
          total: {
            show: true,
            color: "#999",
            label: 'Total',
            formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0)
          },
        },
      },
    }
  },
  fill: {
    colors: ["#63B3ED", "#4299E1", "#3182CE", "#2B6CB0", "#2C5282", "#2A4365"]
  },
  tooltip: {
    enabled: true,
    theme: "dark"
  }
};

export const donutChartDataCharts1 = [50, 15, 10, 20, 5];