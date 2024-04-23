import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {const { nome, descricao, data, local } = req.body;
                const novoEvento = await prisma.evento.create({
                data: {
                    nome,
                    descricao,
                    data: new Date(data),
                    local,
                },
            });

            res.status(201).json({ message: 'Evento cadastrado!', evento: novoEvento });
        } catch (error) {    
            console.error('Erro ao cadastrar:', error.message);
            res.status(500).json({ error: 'Erro ao cadastrar', message: error.message });
        }
    } else {res.status(405).json({ error: 'Metodo nao aceitavel' });
    }
}
