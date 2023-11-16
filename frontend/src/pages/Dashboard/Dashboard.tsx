import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [12, 19, 3],
      backgroundColor: [
        '#eba374',
        'rgba(37, 235, 116, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: "#fff",
      borderWidth: 0,
    },
  ],
};


export const Dashboard = () => {
  React.useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <div className="p-12 mt-24 w-full flex justify-between items-center mx-auto">
      <div className="w-96 flex flex-col items-center border p-5 rounded-md shadow-md">
        <h2 className="mb-5 text-xl font-medium text-blue-600">Vendas por categorias</h2>
        <Pie data={data} />
      </div>
      <div className="w-96 flex flex-col items-center border p-5 rounded-md shadow-md">
        <h2 className="mb-5 text-xl font-medium text-blue-600">Vendas por categorias</h2>
        <Pie data={data} />
      </div>
    </div>
  );
}
