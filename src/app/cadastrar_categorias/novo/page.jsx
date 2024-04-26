"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function CadastroCategoriaIngresso() {
  const [categorias, setCategorias] = useState([]); 
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    descricao: yup.string().required('Descrição é obrigatória'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/categorias-ingresso");
        setCategorias(response.data); 
      } catch (error) {
        console.error("Erro ao carregar categorias de ingresso:", error);
      }
    };
    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate({ nome, descricao });

      const novaCategoria = {
        nome,
        descricao,
      };

      const response = await axios.post("/api/categorias-ingresso", novaCategoria);
      setMensagem("Categoria de ingresso cadastrada!");
      setNome('');
      setDescricao('');
      setCategorias([...categorias, response.data]);
    } catch (error) {
      setMensagem("Erro ao cadastrar categoria do ingresso.");
      console.error("Erro ao cadastrar categoria do ingresso:", error);
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="form">
          <h1 style={{ color: '#ffffff' }}>Categoria de Ingresso</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="nome" style={{ color: '#ffffff' }}>Nome:</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="descricao" style={{ color: '#ffffff' }}>Descrição:</label>
              <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
            </div>
            <button type="submit" className="button" style={{ color: '#ffffff' }}>Cadastrar Categoria de Ingresso</button>
          </form>
          {mensagem && <p style={{ color: '#ffffff' }}>{mensagem}</p>}
        </div>
        <div className="categorias">
          <h2 style={{ color: '#ffffff' }}>Categorias Cadastradas</h2>
          <ul>
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <strong style={{ color: '#ffffff' }}>{categoria.nome}</strong> - <span style={{ color: '#ffffff' }}>{categoria.descricao}</span>
              </li>
            ))}
          </ul>
        </div>
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
          border: 1px solid #ccc;
          border-radius: 5px;
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

        .categorias {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
        }

        h2 {
          font-size: 20px;
          margin-bottom: 10px;
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
