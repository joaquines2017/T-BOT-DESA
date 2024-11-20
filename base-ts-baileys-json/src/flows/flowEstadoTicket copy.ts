// src/flows/statusTicketFlow.ts
import { addKeyword } from '@builderbot/bot';
import { handleGetTicketStatus } from '../controllers/ticketController';

export const flowEstadoTicket = addKeyword(['2'])
    .addAnswer('Por favor, proporciona el ID del ticket.', { capture: true }) // Usamos `capture: true` para esperar la entrada del usuario
    .addAction(async (ctx, { provider }) => {
        // Capturamos la entrada del usuario y la procesamos
        const userMessage = ctx.body.trim(); // Captura el mensaje y elimina espacios innecesarios
        const issueId = parseInt(userMessage, 10); // Convertimos el mensaje a número

        // Validamos que el ID proporcionado sea un número válido
        if (isNaN(issueId)) {
            await provider.sendMessage(ctx.from, 'El ID del ticket no es válido. Por favor, proporciona un número válido.', {});
            return;
        }

        try {
            // Llamamos al controlador para obtener el estado del ticket desde la API de Redmine
            const status = await handleGetTicketStatus(issueId);
            
            if (status) {
                // Enviamos el estado del ticket al usuario
                await provider.sendMessage(ctx.from, `El estado del ticket es: ${status}`, {});
            } else {
                // Si no se encuentra el ticket
                await provider.sendMessage(ctx.from, 'No se encontró ningún ticket con ese ID.', {});
            }
        } catch (error) {
            console.error('Error al consultar el estado del ticket:', error);
            // Enviar un mensaje de error al usuario
            await provider.sendMessage(ctx.from, 'Hubo un problema al consultar el estado del ticket. Inténtalo de nuevo más tarde.', {});
        }
    });
