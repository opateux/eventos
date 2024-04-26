"use client"

import { useState, useEffect } from 'react';

export default function Navbar({ currentPath }) {
  const [activeTab, setActiveTab] = useState('');
  useEffect(() => {
    setActiveTab(currentPath);
  }, [currentPath]);


  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          <li>
            <div className={`nav-link ${activeTab === '/cadastrar_eventos/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastrar_eventos/novo'}>
              <span>Cadastrar Evento</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastrar_categorias/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastrar_categorias/novo'}>
              <span>Categoria de Ingresso</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastrar_lotes/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastrar_lotes/novo'}>
              <span>Lotes de Ingressos</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastrar_ingressos/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastrar_ingressos/novo'}>
              <span>Cadastrar Ingressos</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastrar_clientes/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastrar_clientes/novo'}>
              <span>Cadastrar Clientes</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/relatorio_vendas' ? 'active' : ''}`} onClick={() => window.location.href = '/relatorio_vendas'}>
              <span>Relatório de Vendas</span>
            </div>
          </li>
        </ul>
      </div>

      <style jsx>{`

        .navbar {
          
          padding: 100px 0;
          transition: transform 0.3s ease;
          font-weight: 700;
          color: #fffffff;
          
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-links {
          list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        }

        .nav-links li {
          margin-right: 20px;
          text-align: center
        }

        .nav-links li:last-child {
          margin-right: 0;
          text-align: center
        }

        .nav-link {
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: transform 0.10s ease;
          transform: translateX(10px);
          border: 1px solid #ffffff;
          border-radius: 30px;
          padding: 10px; 

        }

        .nav-link:hover,
        .active {
          background-color: #ADD8E6;
          // color: #ADD8E6;
          color: black;
        }

        .icon {
          margin-right: 100px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .keyframes move {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
      }
      
      `}</style>
    </nav>
  );
}
