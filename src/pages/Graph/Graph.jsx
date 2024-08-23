import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import GraphData from './GraphData';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../../styles/pages/Graph.scss';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [selectedCategory, setSelectedCategory] = useState('Paper');

  const data = {
    labels: GraphData[selectedCategory].map((item) => item.baseYear),
    datasets: [
      {
        label: `${selectedCategory} Average`,
        data: GraphData[selectedCategory].map((item) => item.average),
        fill: false,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#007bff',
        pointHoverBorderColor: '#007bff',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="graph-container">
      <h1>재활용 자원 단가 그래프</h1>
      <div className="selector">
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Paper">종이류</option>
          <option value="Plastic">플라스틱류</option>
          <option value="Styrofoam">스티로폼류</option>
          <option value="coCurrent">병류</option>
          <option value="Metals">금속류</option>
          <option value="Aluminum">알루미늄류</option>
        </select>
      </div>
      <div className="chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
