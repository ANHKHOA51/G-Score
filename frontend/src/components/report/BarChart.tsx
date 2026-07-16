import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { SubjectStatistic } from '../../api/studentApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: SubjectStatistic;
  subjectName: string;
}

export default function BarChart({ data, subjectName }: BarChartProps) {
  const chartData = {
    labels: ['>= 8.0', '6.0 - 7.9', '4.0 - 5.9', '< 4.0'],
    datasets: [
      {
        label: 'Number of Students',
        data: [
          data.excellentCount,
          data.goodCount,
          data.averageCount,
          data.poorCount,
        ],
        backgroundColor: [
          '#22C55E', // Excellent
          '#0058be', // Good (Secondary)
          '#F59E0B', // Average
          '#EF4444', // Poor
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e3e5', // outline-variant/30 equivalent
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const total = data.excellentCount + data.goodCount + data.averageCount + data.poorCount;

  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg flex flex-col">
      <div className="flex justify-between items-start mb-stack-lg">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Score Distribution: {subjectName}
          </h3>
          <p className="text-on-surface-variant text-body-md font-body-md">
            Total: {total.toLocaleString('en-US')} students
          </p>
        </div>
      </div>
      
      <div className="relative h-[360px] w-full mt-4">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="mt-stack-lg flex justify-center gap-stack-lg flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
          <span className="text-label-md font-label-md text-on-surface-variant">Excellent (&gt;= 8.0)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0058be]"></div>
          <span className="text-label-md font-label-md text-on-surface-variant">Good (6.0 - 7.9)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
          <span className="text-label-md font-label-md text-on-surface-variant">Average (4.0 - 5.9)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
          <span className="text-label-md font-label-md text-on-surface-variant">Poor (&lt; 4.0)</span>
        </div>
      </div>
    </div>
  );
}
