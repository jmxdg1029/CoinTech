
export const chartConfigs = {
    lineHeightAnnotation: {
        always: true, 
        hover: false,
        lineWeight: 1.5
    },
    animation:{
        duration:2000
  },
    maintainAspectRation:false, 
    responsive: true,
    scales: {
        xAxes: [
            {
                type: "time",
                distribution: "linear"
            }
        ],

    }
}

