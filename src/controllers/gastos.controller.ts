import { appendGastoFila, getPresupuestosPorCategoria } from '../services/googleSheets.service';
import { sheets } from '../config/googleClient';

const spreadsheetId = process.env.SPREADSHEET_ID!;
const gastosSheet = process.env.SHEET_NAME_GASTOS || 'Gastos';

export interface GastoInput {
    fecha: string;
    monto: number;
    categoria: string;
    descripcion: string;
    metodo: string;
    destinatario: string;
    tipo: string;
    mes: string;
}

export async function registrarGasto(input: GastoInput) {
    const { categoria, monto, mes } = input;
    const presupuestos = await getPresupuestosPorCategoria(mes);
    const topeCategoria = presupuestos[categoria.toLowerCase()] || 0;

    // Leer gastos previos del mes y categoría
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${gastosSheet}!A2:H`,
    });

    const rows = res.data.values || [];
    const totalGastado = rows
        .filter(row => row[2]?.toLowerCase() === categoria.toLowerCase() && row[7] === mes)
        .reduce((acc, row) => acc + Number(row[1]), 0);

    const nuevoTotal = totalGastado + monto;
    const excede = nuevoTotal > topeCategoria;

    // Registrar el gasto
    await appendGastoFila([
        input.fecha,
        input.monto,
        input.categoria,
        input.descripcion,
        input.metodo,
        input.destinatario,
        input.tipo,
        input.mes,
    ]);

    return {
        registrado: true,
        categoria,
        mes,
        monto,
        totalGastado: nuevoTotal,
        tope: topeCategoria,
        excedido: excede,
    };
}
