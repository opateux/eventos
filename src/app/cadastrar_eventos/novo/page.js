"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function CadastroEvento() {
  const [eventos, setEventos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [mensagem, setMensagem] = useState('');

  const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    descricao: yup.string().required('Descrição é obrigatória'),
    data: yup.date().required('Data é obrigatória'),
    local: yup.string().required('Local é obrigatório'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/eventos");
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => { e.preventDefault();
    try {
      await schema.validate({ nome, descricao, data, local });

      const novoEvento = {
        nome,
        descricao,
        data,
        local,
      };

      const response = await axios.post("/api/eventos", novoEvento);
      setMensagem("Evento cadastrado!");
      setNome('');
      setDescricao('');
      setData('');
      setLocal('');
      setEventos([...eventos, response.data]);
    } catch (error) {
      setMensagem("Erro ao cadastrar evento.");
      console.error("Erro ao cadastrar evento:", error);
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="form">
          <h1 style={{ color: '#ffffff' }}>Cadastrar Evento</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="nome" style={{ color: '#ffffff' }}>Nome:</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="descricao" style={{ color: '#ffffff' }}>Descrição:</label>
              <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="data" style={{ color: '#ffffff' }}>Data:</label>
              <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="local" style={{ color: '#ffffff' }}>Local:</label>
              <input type="text" id="local" value={local} onChange={(e) => setLocal(e.target.value)} required />
            </div>
            <button type="submit" className="button" style={{ color: '#ffffff' }}>Cadastrar</button>
          </form>
          {mensagem && <p style={{ color: '#ffffff' }}>{mensagem}</p>}
        </div>
        <div className="eventos">
          <h2 style={{ color: '#ffffff' }}>Eventos Cadastrados</h2>
          <div className="grid-eventos">
            {eventos.map((evento) => (
              <div key={evento.id} className="evento">
                <h3 style={{ color: '#ffffff' }}>{evento.nome}</h3>
                <p style={{ color: '#ffffff' }}><strong>Descrição:</strong> {evento.descricao}</p>
                <p style={{ color: '#ffffff' }}><strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}</p>
                <p style={{ color: '#ffffff' }}><strong>Local:</strong> {evento.local}</p>
              </div>
            ))}
          </div>
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
        input[type="date"],
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

        .eventos {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
        }

        h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .grid-eventos {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .evento {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
        }

        .evento h3 {
          margin-top: 0;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
