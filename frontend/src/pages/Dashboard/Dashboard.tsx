import React, { useEffect } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useQuery } from "react-query";
import { ProductModel } from "../../models/ProductModel";
import axios from "axios";
import { AuthenticationService } from "../../services/AuthenticationService";
import { PurchaseModel } from "../../models/PurchaseModel";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

ChartJS.register(...registerables);

dayjs.locale('pt-br');

export const Dashboard = () => {
  const { companyId } = AuthenticationService.getUser();
  const [categoryData, setCategoryData] = React.useState<{ labels: string[], datasets: any[] }>({
    labels: [],
    datasets: []
  });
  const [sellsData, setSellsData] = React.useState<{ labels: string[], datasets: any[] }>({
    labels: [],
    datasets: []
  });

  const helloMessage = dayjs().hour() < 12 ? 'Bom dia' : dayjs().hour() < 18 ? 'Boa tarde' : 'Boa noite';

  useEffect(() => {
    document.title = 'Home | Dashboard';
  }, [])

  useQuery<{ data: ProductModel[] }>({
    queryKey: 'products',
    queryFn: async () => {
      return await axios.get(`http://localhost:5000/api/Product/all/${companyId}`);
    },
    onSuccess: ({ data }) => {
      const categories = data.map(product => product.category);
      const uniqueCategories = [...new Set(categories)];
      const categoryCount = uniqueCategories.map(category => {
        return {
          category,
          count: categories.filter(c => c === category).length
        }
      });

      setCategoryData({
        labels: uniqueCategories,
        datasets: [
          {
            label: 'Produtos por categoria',
            data: categoryCount.map(c => c.count),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#A2EB36',
              '#EB36A2',
              '#36EBA2',
              '#A236EB',
              '#EBA236',
              '#36EBA2',
              '#A236EB',
            ]
          }
        ]
      });
    }
  })

  useQuery<{ data: PurchaseModel[] }>({
    queryKey: 'sells',
    queryFn: async () => {
      return await axios.get(`http://localhost:5000/api/sells/${companyId}`);
    },
    onSuccess: ({ data }) => {
      const sells = data.map(sell => dayjs(sell.date).format('MMMM').charAt(0).toUpperCase() + dayjs(sell.date).format('MMMM').slice(1));
      const uniqueSells = [...new Set(sells)];
      const sellsCount = uniqueSells.map(sell => {
        return {
          sell,
          count: sells.filter(s => s === sell).length
        }
      });

      setSellsData({
        labels: uniqueSells,
        datasets: [
          {
            label: 'Vendas por mês',
            data: sellsCount.map(s => s.count),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#A2EB36',
              '#EB36A2',
              '#36EBA2',
              '#A236EB',
              '#EBA236',
              '#36EBA2',
              '#A236EB',
            ]
          }
        ]
      });
    }
  })

  return (
    <div className="flex flex-col p-24">
      <h1 className="text-xl font-medium text-blue-600 mb-10 mt-2">{helloMessage}, boas vendas!</h1>
      <div className="w-full flex items-center mx-auto justify-center gap-20">
        <div className="flex flex-col items-center border p-5 rounded-md shadow-md">
          <h2 className="mb-5 text-xl font-medium text-blue-600">Produtos criados por categoria</h2>
          {
            categoryData.labels.length > 0 ? <Pie data={categoryData} height={350} /> : (
              <div className="flex flex-col items-center justify-center h-[311px] w-[428px] border rounded-md">
                <h2 className="mb-5 text-xl font-medium text-gray-500 text-center p-8">
                  Nenhum produto cadastrado ainda, que tal cadastrar alguns? 😃
                </h2>
              </div>
            )
          }
        </div>
        <div className="flex flex-col items-center border p-5 rounded-md shadow-md">
          <h2 className="mb-5 text-xl font-medium text-blue-600">Número de vendas por mês deste ano</h2>
          {
            sellsData.labels.length > 0 ? <Bar data={sellsData} height={242} /> : (
              <div className="flex flex-col items-center justify-center h-[311px] w-[428px] border rounded-md">
                <h2 className="mb-5 text-xl font-medium text-gray-500 text-center p-8">
                  Nenhuma venda realizada ainda, que tal cadastrar algumas? 🚀
                </h2>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
