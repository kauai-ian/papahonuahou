import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const NapChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        datasets: [
                            {
                                label: 'Nap Duration (minutes)',
                                data: [30, 45, 60, 20, 50],
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, []);

    return <canvas ref={chartRef} />;
};

export default NapChart;

// TODO: update the component to be functional. and import into the StatisticsPage component.