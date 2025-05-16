import React, { useEffect, useRef } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Filler, 
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function PortfolioChart() {
  const chartRef = useRef(null);
  
  // Mock portfolio history data
  const portfolioHistory = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [85000, 92000, 88000, 95000, 105000, 102000, 110000, 118000, 113000, 120000, 124000, 124567]
  };

  const data = {
    labels: portfolioHistory.labels,
    datasets: [
      {
        label: 'Portfolio Value (USD)',
        data: portfolioHistory.data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: function(context: any) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(160, 174, 192, 0.1)'
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
