import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GraphData } from './GraphData';
import backIcon from "../../assets/LoginPage/backIcon.svg";

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
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const Graph = (props) => {
  const { setIsGraph, setIsCamera } = props;

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("종이류");

  const data = {
    labels: GraphData[selectedCategory].map((item) => item.baseYear),
    datasets: [
      {
        label: `${selectedCategory} 평균`,
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

  const categories = [
    { value: "종이류", label: "종이류" },
    { value: "플라스틱류", label: "플라스틱류" },
    { value: "스티로폼류", label: "스티로폼류" },
    { value: "병류", label: "병류" },
    { value: "금속류", label: "금속류" },
    { value: "알루미늄류", label: "알루미늄류" },
  ];

  return (
    <div className="graph-container">
      <div className="graph--Header">
        <img
          src={backIcon}
          alt="back-btn"
          className="graph--BackIcon"
          onClick={() => navigate("/")}
        />
        <div className="graph--Header--Text">자원거래</div>
      </div>
      <div className="graph--TopText">재활용 자원 가격</div>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.value}
            className={selectedCategory === category.value ? "active" : ""}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </li>
        ))}
      </ul>
      <div className="chart">
        <Line data={data} options={options} />
      </div>
      <div 
        className='graph--Btn'
        onClick={()=> {
          setIsGraph(false);
          setIsCamera(true);
        }}
      >재활용 자원 촬영하기</div>
    </div>
  );
};

export default Graph;
