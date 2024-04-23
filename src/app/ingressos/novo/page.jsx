"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function CadastroIngressos() {
  // Estados para os campos do formulário
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [eventoId, setEventoId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [loteId, setLoteId] = useState('');
  // Estado para exibir mensagens de sucesso ou erro
  const [mensagem, setMensagem] = useState('');
  // Estado para armazenar a lista de ingressos cadastrados
  const [ingressos, setIngressos] = useState([]);

  // Esquema de validação para os campos do formulário
  const schema = yup.object().shape({
    quantidade: yup.number().positive("Quantidade deve ser um número positivo").required('Quantidade é obrigatória'),
    valor: yup.number().positive("Valor deve ser um número positivo").required('Valor é obrigatório'),
    eventoId: yup.string().required('ID do evento é obrigatório'),
    categoriaId: yup.string().required('ID da categoria é obrigatório'),
    loteId: yup.string().required('ID do lote é obrigatório'),
  });

  // Carregar a lista de ingressos cadastrados ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/ingressos");
        setIngressos(response.data); // Ingressos cadastrados no estado
      } catch (error) {
        console.error("Erro ao carregar ingressos:", error);
      }
    };
    fetchData();
  }, []);

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validação dos campos do formulário
      await schema.validate({ quantidade, valor, eventoId, categoriaId, loteId });

      // Objeto contendo os dados do novo ingresso
      const novoIngresso = {
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor),
        eventoId,
        categoriaId,
        loteId
      };

      // Requisição POST para cadastrar o novo ingresso
      const response = await axios.post("/api/ingressos", novoIngresso);
      // Exibe mensagem de sucesso
      setMensagem("Ingresso cadastrado com sucesso!");
      // Limpa os campos do formulário
      setQuantidade('');
      setValor('');
      setEventoId('');
      setCategoriaId('');
      setLoteId('');
      // Adiciona o novo ingresso à lista de ingressos exibida
      setIngressos([...ingressos, response.data]);
    } catch (error) {

      setMensagem("Erro ao cadastrar ingresso.");
      console.error("Erro ao cadastrar ingresso:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Cadastro de Ingressos</h1>
        {/* Formulário de cadastro de ingressos */}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Valor:</label>
            <input type="number" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="eventoId">Evento:</label>
            <input type="text" id="eventoId" value={eventoId} onChange={(e) => setEventoId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="categoriaId">Categoria:</label>
            <input type="text" id="categoriaId" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="loteId">Lote:</label>
            <input type="text" id="loteId" value={loteId} onChange={(e) => setLoteId(e.target.value)} required />
          </div>
          <button type="submit" className="button">Cadastrar</button>
        </form>
        {/* Exibe mensagem de sucesso ou erro */}
        {mensagem && <p>{mensagem}</p>}
      </div>
      {/* Lista de ingressos cadastrados */}
      <div className="lista-container">
        <h2>Ingressos Cadastrados</h2>
        <ul>
          {ingressos.map((ingresso) => (
            <li key={ingresso.id} className="ingresso-item">
              <div className="ingresso-info">
                <strong>Quantidade: </strong>{ingresso.quantidade}<br />
                <strong>Valor: </strong>{ingresso.valor}<br />
                <strong>Evento ID: </strong>{ingresso.eventoId}<br />
                <strong>Categoria ID: </strong>{ingresso.categoriaId}<br />
                <strong>Lote ID: </strong>{ingresso.loteId}<br />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .form-container {
          flex: 1;
        }

        .lista-container {
          flex: 1;
          padding-left: 20px;
          border-left: 1px solid #ccc;
          margin-left: 20px;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 20px;
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
        input[type="number"] {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
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

        .ingresso-item {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
        }

        .ingresso-info {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
