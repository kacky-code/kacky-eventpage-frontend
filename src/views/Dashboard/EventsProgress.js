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
    formatter: (seriesName, opts) => [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]]
  },
  dataLabels: {
    enabled: false
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true
        }
      }
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