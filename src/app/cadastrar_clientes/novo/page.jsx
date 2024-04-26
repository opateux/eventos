"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CadastroClientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoCliente = {
      nome,
      email
    };

    try {
      const response = await axios.post("/api/clientes", novoCliente);
      setClientes([...clientes, response.data]);
      setMensagem("Cliente cadastrado com sucesso!");
      setNome('');
      setEmail('');
    } catch (error) {
      setMensagem("Erro ao cadastrar cliente.");
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Clientes </h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nome" style={{ color: '#ffffff' }}>Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          {mensagem && <p style={{ color: '#ffffff' }}>{mensagem}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email" style={{ color: '#ffffff' }}>Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {mensagem && <p style={{ color: '#ffffff' }}>{mensagem}</p>}
        </div>
        <button type="submit" className="button" style={{ color: '#ffffff' }}>Cadastrar Cliente</button>
      </form>
      <div className="clientes">
        <h2 style={{ color: '#ffffff' }}>Clientes Cadastrados</h2>
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              <strong style={{ color: '#ffffff' }}>{cliente.nome}</strong> - <span style={{ color: '#ffffff' }}>{cliente.email}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          border: 1px solid #ffffff;
          border-radius: 5px;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input[type="text"],
        input[type="email"] {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ffffff;
          border-radius: 5px;
          color: #ffffff;
          background-color: transparent;
        }
        .button {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .button:hover {
          background-color: #0056b3;
        }
        .clientes {
          border: 1px solid #ffffff;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        h2 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #ffffff;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}