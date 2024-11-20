// src/flows/flowEstadoTicket.ts
import { addKeyword } from '@builderbot/bot';
import { handleGetTicketStatus } from '../controllers/ticketController';

export const flowEstadoTicket = addKeyword(['2'])
    .addAnswer('Por favor, proporciona el ID del ticket.', { capture: true }) // Captura la entrada del usuario
    .addAction(async (ctx, { provider }) => {
        const userMessage = ctx.body?.trim(); // Captura el mensaje del usuario
        const issueId = parseInt(userMessage, 10); // Convierte el mensaje en un número

        // Validar que el ID sea un número válido
        if (isNaN(issueId)) {
            await provider.sendMessage(ctx.from, 'El ID del ticket no es válido. Por favor, proporciona un número válido.', {});
            return;
        }

        try {
            // Consultar el estado y el responsable del ticket
            const ticket = await handleGetTicketStatus(issueId);

            if (ticket) {
                const { status, assignedTo } = ticket;

                // Enviamos la información del ticket al usuario
                await provider.sendMessage(ctx.from, `*El estado del ticket es:* ${status}`, {});
                await provider.sendMessage(ctx.from, `*Asignado a:* ${assignedTo}`, {});
            } else {
                // Si no se encuentra el ticket
                await provider.sendMessage(ctx.from, 'No se encontró ningún ticket con ese ID.', {});
            }
        } catch (error) {
            console.error('Error al consultar el estado del ticket:', error);
            // Enviar mensaje de error genérico al usuario
            await provider.sendMessage(ctx.from, 'Hubo un problema al consultar el estado del ticket. Inténtalo de nuevo más tarde.', {});
        }
    });
