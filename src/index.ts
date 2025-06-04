import { registrarGasto } from './controllers/gastos.controller';

(async () => {
    try {
        const respuesta = await registrarGasto({
            fecha: '2025-06-03',
            monto: 30,
            categoria: 'Transporte',
            descripcion: 'Taxi a oficina',
            metodo: 'Yape',
            destinatario: 'Taxista',
            tipo: 'Laboral',
            mes: 'Junio',
        });

        console.log('✅ Gasto registrado:');
        console.table(respuesta);
    } catch (error) {
        console.error('❌ Error al registrar el gasto:', error);
    }
})();
