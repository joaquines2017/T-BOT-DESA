// src/flows/deleteTicketFlow.ts
import { addKeyword } from '@builderbot/bot';
import { handleDeleteTicket } from '../controllers/ticketController';

export const flowEliminarTicket = addKeyword(['x'])
    .addAnswer('Por favor, proporciona el ID del ticket a eliminar.')
    .addAction(async (ctx) => {
        const issueId = 123; // Reemplaza con la entrada del usuario
        const result = await handleDeleteTicket(issueId);
        ctx.send(result);
    });
