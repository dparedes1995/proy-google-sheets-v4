import type { VercelRequest, VercelResponse } from '@vercel/node';
import { registrarGasto } from '../src/controllers/gastos.controller';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Solo se permite método POST' });
    }

    try {
        const resultado = await registrarGasto(req.body);
        return res.status(200).json(resultado);
    } catch (error: any) {
        console.error('[registrar-gasto] Error:', error.message);
        return res.status(500).json({ error: 'Error interno al registrar el gasto' });
    }
}
