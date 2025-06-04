import { sheets } from '../config/googleClient';

const spreadsheetId = process.env.SPREADSHEET_ID!;
const gastosSheet = process.env.SHEET_NAME_GASTOS || 'Gastos';
const presupuestoSheet = process.env.SHEET_NAME_PRESUPUESTO || 'Presupuesto';

export async function appendGastoFila(values: (string | number)[]) {
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${gastosSheet}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [values],
        },
    });
}

export async function getPresupuestosPorCategoria(mes: string): Promise<Record<string, number>> {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${presupuestoSheet}!A1:F`,
    });

    const rows = res.data.values || [];
    if (rows.length < 2) throw new Error('No hay datos suficientes en la hoja de presupuesto');

    const header = rows[0]; // ['Mes', 'Mercado', 'Supermercado', ...]
    const mesRow = rows.find(row => row[0]?.toLowerCase() === mes.toLowerCase());

    if (!mesRow) {
        throw new Error(`No se encontró presupuesto para el mes "${mes}"`);
    }

    const presupuesto: Record<string, number> = {};
    for (let i = 1; i < header.length; i++) {
        const categoria = header[i].toLowerCase();
        const monto = Number(mesRow[i]) || 0;
        presupuesto[categoria] = monto;
    }

    return presupuesto;
}

