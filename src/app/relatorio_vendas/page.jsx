
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

export default function RelatorioVendas() {

  const [vendas, setVendas] = useState([]);
  const [totalVendido, setTotalVendido] = useState(0);

  useEffect(() => {
    async function fetchVendas() {
      try {
        const response = await axios.get("/api/relatorio-vendas");
        setVendas(response.data);
        const total = response.data.reduce((acc, venda) => acc + venda.valorTotal, 0);
        setTotalVendido(total);
      } catch (error) {
        console.error("Erro ao buscar relatório de vendas:", error);
      }
    }
    fetchVendas();
  }, []);

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: vendas.map(venda => venda.dataVenda),
    },
    yaxis: {
      title: {
        text: 'Valor Total Vendido',
        style: {
          fontSize: '16px',
          fontWeight: 600,
          fontFamily: 'Arial, sans-serif',
          color: '#555555'
        }
      },
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          colors: '#555555'
        }
      }
    },
    fill: {
      colors: ['#007bff']
    }
  };

  const series = [{
    name: 'Vendas',
    data: vendas.map(venda => venda.valorTotal)
  }];

  return (
    <div className="container">
      <h1>Relatório de Vendas</h1>
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
      <div className="total">
        <h2>Total Vendido: R$ {totalVendido.toFixed(2)}</h2>
      </div>

      <style jsx>{`        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333333;
        }

        .chart {
          margin-bottom: 40px;
        }

        .total {
          text-align: center;
        }

        /* Estilo para o valor total vendido */
        .total h2 {
          font-size: 24px;
          color: #007bff; /* Cor azul */
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}