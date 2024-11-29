// src/flows/createTicketFlow.ts
import { addKeyword } from '@builderbot/bot';
import { handleCreateTicket } from '../controllers/ticketController';

export const flowCrearTicket = addKeyword('1')
    .addAnswer('Por favor, proporciona el ID del proyecto y una breve descripción del problema.')
    .addAction(async (ctx) => {
        // Aquí manejamos la lógica asincrónica
        const projectId = 1; // Reemplaza con la entrada del usuario
        const subject = 'Problema técnico'; // Reemplaza con la entrada del usuario
        const description = 'Descripción del problema'; // Reemplaza con la entrada del usuario

        const ticket = await handleCreateTicket(projectId, subject, description);
        ctx.send(ticket ? `Ticket creado: ${ticket.id}` : 'Error al crear el ticket.');
    });
