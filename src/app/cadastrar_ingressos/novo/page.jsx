"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function CadastroIngressos() {
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [eventoId, setEventoId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [loteId, setLoteId] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [ingressos, setIngressos] = useState([]);

  const schema = yup.object().shape({
    quantidade: yup.number().positive("Quantidade deve ser um número positivo").required('Quantidade é obrigatória'),
    valor: yup.number().positive("Valor deve ser um número positivo").required('Valor é obrigatório'),
    eventoId: yup.string().required('ID do evento é obrigatório'),
    categoriaId: yup.string().required('ID da categoria é obrigatório'),
    loteId: yup.string().required('ID do lote é obrigatório'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/ingressos");
        setIngressos(response.data);
      } catch (error) {
        console.error("Erro ao carregar ingressos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate({ quantidade, valor, eventoId, categoriaId, loteId });

      const novoIngresso = {
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor),
        eventoId,
        categoriaId,
        loteId
      };

      const response = await axios.post("/api/ingressos", novoIngresso);
      setMensagem("Ingresso cadastrado com sucesso!");
      
      setQuantidade('');
      setValor('');
      setEventoId('');
      setCategoriaId('');
      setLoteId('');
      
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
        
        {mensagem && <p>{mensagem}</p>}
      </div>
      
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
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form {
          padding: 20px;
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
          color: #ffffff;
        }

        input[type="text"],
        input[type="number"],
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ffffff;
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

        .categorias {
          border: 1px solid #ffffff;
          border-radius: 5px;
          padding: 20px;
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