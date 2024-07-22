import { Box } from "@chakra-ui/react";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import "chart.js/auto";
import { useEffect, useRef } from "react";
import { useStatistics } from "../context/statsContext";

Chart.register(...registerables);

const SleepTrendChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const { statistics } = useStatistics();

  useEffect(() => {
    if (statistics && chartRef.current) {
      const context = chartRef.current.getContext("2d");

      if (context && statistics.sleepEvents) {
        const sleepData = statistics.sleepEvents.map((event) => ({
          date: new Date(event.eventStart),
          sleepDuration:
            (new Date(event.eventEnd).getTime() -
              new Date(event.eventStart).getTime()) /
            (1000 * 60 * 60),
        }));

        const chartData: ChartData<"line", number[], unknown> = {
          labels: sleepData.map((row) => row.date.toISOString().split("T")[0]),
          datasets: [
            {
              label: "Sleep duration trend",
              data: sleepData.map((row) => row.sleepDuration),
              backgroundColor: "rgba(75, 192, 192, 1)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
          ],
        };

        const chartOptions: ChartOptions<"line"> = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(context, {
          type: "line",
          data: chartData,
          options: chartOptions,
        });
      }
    }
  }, [statistics]);

// console.log("statistics data:", statistics)

  return (
    <Box width="800px">
      <canvas ref={chartRef}></canvas>
    </Box>
  );
};

export default SleepTrendChart;