// src/app.ts
import { createBot, createProvider, createFlow } from '@builderbot/bot';
import { BaileysProvider } from '@builderbot/provider-baileys';
import { MemoryDB } from './models/memoryDB';
import { flowBienvenido } from './flows/flowBienvenido';
import { flowCrearTicket } from './flows/flowCrearTicket';
import { flowEstadoTicket } from './flows/flowEstadoTicket';
import { flowEliminarTicket } from './flows/flowEliminarTicket';
import { flowVerIssues} from './flows/flowAllIssues';
const main = async () => {
    const adapterDB = new MemoryDB();
    const adapterFlow = createFlow([flowBienvenido, flowCrearTicket, flowEstadoTicket, flowEliminarTicket, flowVerIssues]);
    const adapterProvider = createProvider(BaileysProvider);

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    httpServer(3001); // Servidor HTTP en el puerto 3000
};

main();