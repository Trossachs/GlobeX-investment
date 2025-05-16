import React, { useEffect, useRef, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Filler, 
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Asset } from '@shared/schema';

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

// Time frames for chart display
export type TimeFrame = '1H' | '1D' | '1W' | '1M' | '1Y';

interface ChartContainerProps {
  asset: Asset;
  timeFrame: TimeFrame;
}

export function ChartContainer({ asset, timeFrame }: ChartContainerProps) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
    labels: []
  });

  // Generate mock data based on current price and timeframe
  useEffect(() => {
    const basePrice = parseFloat(asset.price);
    let labels: string[] = [];
    let data: number[] = [];
    const volatility = 0.005; // Base volatility factor
    
    // Generate time labels and data points based on timeframe
    switch(timeFrame) {
      case '1H':
        labels = Array.from({ length: 60 }, (_, i) => `${i}m`);
        break;
      case '1D':
        labels = Array.from({ length: 24 }, (_, i) => `${i}h`);
        break;
      case '1W':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case '1M':
        labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
        break;
      case '1Y':
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        break;
    }
    
    // Seed with current price
    let currentPrice = basePrice;
    
    // Generate price data with slight upward bias for positive percent change
    const trend = parseFloat(asset.percentChange) > 0 ? 1.002 : 0.998;
    
    data = labels.map((_, i) => {
      // Add some randomness around trend
      const change = (Math.random() - 0.5) * 2 * volatility * basePrice;
      currentPrice = currentPrice * trend + change;
      return Math.max(currentPrice, basePrice * 0.7); // Prevent price going too low
    });
    
    // Ensure final point matches current price
    if (data.length > 0) {
      data[data.length - 1] = basePrice;
    }
    
    const gradientColors = {
      positive: 'rgba(34, 197, 94, 0.2)', // green
      negative: 'rgba(239, 68, 68, 0.2)'  // red
    };
    
    const borderColors = {
      positive: 'rgb(34, 197, 94)',
      negative: 'rgb(239, 68, 68)'
    };

    const priceChange = data[data.length - 1] - data[0];
    const colorKey = priceChange >= 0 ? 'positive' : 'negative';

    setChartData({
      labels,
      datasets: [
        {
          label: `${asset.name} Price (USD)`,
          data,
          borderColor: borderColors[colorKey],
          backgroundColor: gradientColors[colorKey],
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: borderColors[colorKey]
        }
      ]
    });
  }, [asset, timeFrame]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
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
        position: 'right',
        grid: {
          color: 'rgba(160, 174, 192, 0.1)'
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line 
        ref={chartRef}
        data={chartData} 
        options={options}
      />
    </div>
  );
}
