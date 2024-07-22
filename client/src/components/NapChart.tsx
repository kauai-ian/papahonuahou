import React, { useEffect, useRef } from "react";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import "chart.js/auto";
import { useStatistics } from "../context/statsContext";
import { Box } from "@chakra-ui/react";

Chart.register(...registerables);

const NapTrendChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const { statistics } = useStatistics();

  useEffect(() => {
    if (statistics && chartRef.current) {
      const context = chartRef.current.getContext("2d");
      if (context && statistics.napEvents) {
        const napData = statistics.napEvents.map((event) => ({
          date: new Date(event.eventStart),
          napDuration:
            (new Date(event.eventEnd).getTime() -
              new Date(event.eventStart).getTime()) /
            (1000 * 60 * 60),
        }));

        const chartData: ChartData<"line", number[], unknown> = {
          labels: napData.map((row) => row.date.toISOString().split("T")[0]),
          datasets: [
            {
              label: "Nap duration trend",
              data: napData.map((row) => row.napDuration),
              backgroundColor: "#8f4bc0",
              borderColor: "#8f4bc0",
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


  return (
    <Box width="800px">
      <canvas ref={chartRef}></canvas>
    </Box>
  );
};

export default NapTrendChart;

