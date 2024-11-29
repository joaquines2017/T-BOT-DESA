import { addKeyword } from '@builderbot/bot';
import { handleGetAllIssues, handleGetIssueById } from '../controllers/ticketController';

export const flowVerIssues = addKeyword(['4'])
    .addAnswer('Selecciona una opción:')
    .addAnswer(
        '*1* - Ver todos los tickets\n' +
        '*2* - Ver un ticket específico (proporciona su ID después).',
        { capture: true }
    )
    .addAction(async (ctx, { flowDynamic }) => {
        const userInput = ctx.body?.trim();

        if (userInput === '1') {
            // Consultar todos los tickets
            const issues = await handleGetAllIssues();
            if (issues && issues.length > 0) {
                // Enviar detalles de los issues al usuario
                let responseMessage = 'Se encontraron los siguientes tickets:\n\n';
                issues.forEach((issue, index) => {
                    responseMessage += `#${index + 1} - ID: ${issue.id}, Título: ${issue.subject}\n`;
                });
                await flowDynamic(responseMessage);
            } else {
                await flowDynamic('No se encontraron tickets o hubo un error.');
            }
        } else if (userInput === '2') {
            // Consultar un ticket específico
            await flowDynamic('Por favor, proporciona el ID del ticket.');
        } else if (!isNaN(Number(userInput))) {
            // Si el usuario proporciona un ID directamente después de la opción "2"
            const issueId = Number(userInput);
            const issue = await handleGetIssueById(issueId);
            if (issue) {
                await flowDynamic(
                    `Detalles del ticket con ID ${issueId}:\n` +
                    `Título: ${issue.subject}\n` +
                    `Estado: ${issue.status.name}\n` +
                    `Responsable: ${issue.assigned_to?.name || 'No asignado'}\n`
                );
            } else {
                await flowDynamic(`No se encontró el ticket con ID ${issueId} o hubo un error.`);
            }
        } else {
            // Entrada no válida
            await flowDynamic('Entrada no válida. Intenta de nuevo.');
        }
    });
