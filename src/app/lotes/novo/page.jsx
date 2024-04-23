"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function CadastroLotes() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  // Estado para exibir mensagens de sucesso ou erro
  const [mensagem, setMensagem] = useState('');
  // Estado para armazenar a lista de lotes cadastrados
  const [lotes, setLotes] = useState([]);

  // Esquema de validação para os campos do formulário
  const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    descricao: yup.string().required('Descrição é obrigatória'),
    quantidade: yup.number().positive("Quantidade deve ser um número positivo").required('Quantidade é obrigatória'),
    valor: yup.number().positive("Valor deve ser um número positivo").required('Valor é obrigatório'),
  });

  // Carregar a lista de lotes cadastrados ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/lotes-ingresso");
        setLotes(response.data); // Lotes cadastrados no estado
      } catch (error) {
        console.error("Erro ao carregar lotes de ingresso:", error);
      }
    };
    fetchData();
  }, []);

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validação dos campos do formulário
      await schema.validate({ nome, descricao, data, quantidade, valor });

      // Objeto contendo os dados do novo lote
      const novoLote = {
        nome,
        descricao,
        data,
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
      };

      // Requisição POST para cadastrar o novo lote
      const response = await axios.post("/api/lotes-ingresso", novoLote);
      // Exibe mensagem de sucesso
      setMensagem("Lote de ingresso cadastrado com sucesso!");
      // Limpa os campos do formulário
      setNome('');
      setDescricao('');
      setQuantidade('');
      setValor('');
      // Adiciona o novo lote à lista de lotes exibida
      setLotes([...lotes, response.data]);
    } catch (error) {
      // Em caso de erro, exibe mensagem de erro
      setMensagem("Erro ao cadastrar lote de ingresso.");
      console.error("Erro ao cadastrar lote de ingresso:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Cadastro de Lotes de Ingresso</h1>
        {/* Formulário de cadastro de lotes */}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Valor:</label>
            <input type="number" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} required />
          </div>
          <button type="submit" className="button">Cadastrar</button>
        </form>
        {/* Exibe mensagem de sucesso ou erro */}
        {mensagem && <p>{mensagem}</p>}
      </div>
      {/* Lista de lotes cadastrados */}
      <div className="lista-container">
        <h2>Lotes de Ingresso Cadastrados</h2>
        <ul>
          {lotes.map((lote) => (
            <li key={lote.id} className="lote-item">
              <div className="lote-info">
                <strong>Nome: </strong>{lote.nome}<br />
                <strong>Descrição: </strong>{lote.descricao}<br />
                <strong>Quantidade: </strong>{lote.quantidade}<br />
                <strong>Valor: </strong>{lote.valor}<br />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          justify-content: space-between;
        }

        .form-container {
          flex: 0 0 45%;
        }

        .lista-container {
          flex: 0 0 45%;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
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
        input[type="number"],
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        textarea {
          resize: vertical;
          height: 100px;
        }

        .button {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .button:hover {
          background-color: #0056b3;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .lote-item {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .lote-info {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
