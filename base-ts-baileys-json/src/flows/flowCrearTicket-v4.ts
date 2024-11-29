import { addKeyword } from '@builderbot/bot';
import { handleCreateTicket } from '../controllers/ticketController';

// Define el tipo del estado personalizado
interface TicketCreationState {
    problemType?: string;
    description?: string;
}

const tecnicos = [
    { id: 68, nombre: 'Néstor' },
    { id: 72, nombre: 'Ariel Medina' },
    { id: 53, nombre: 'Ale' },
    { id: 59, nombre: 'Jose' },
    { id: 51, nombre: 'Ariel' },
    { id: 28, nombre: 'Santiago' },
    { id: 11, nombre: 'Miguel' },
    { id: 60, nombre: 'Mariano' },
    { id: 54, nombre: 'Rodri' },
];

export const flowCrearTicket = addKeyword(['1'])
    .addAnswer(
        'Bienvenido al sistema de creación de tickets. ¿Qué tipo de problema tienes?',
        { capture: true },
        async (ctx) => {
            // Inicializamos el estado si no existe
           // ctx.state = ctx.state || {};

            // Guardamos la primera respuesta en el estado
            //ctx.state.problemType = ctx.body;
            const problemType = ctx.body;
            console.log('Primera respuesta capturada:', problemType);
        }
    )
    .addAnswer(
        'Por favor, proporciona una breve descripción del problema:',
        { capture: true },
        async (ctx) => {
            // Guardamos la segunda respuesta en el estado
            //ctx.state.description = ctx.body;
            const description = ctx.body;
            console.log('Segunda respuesta capturada:', description);
        }
    )
    .addAction(async (ctx, { flowDynamic }) => {
        try {
            const { problemType, description } = ctx.body as TicketCreationState;

            if (!problemType || !description) {
                await flowDynamic('❌ No se pudieron capturar todos los datos. Inténtalo de nuevo.');
                return;
            }

            // Asignación aleatoria de técnico
            const tecnicoAsignado = tecnicos[Math.floor(Math.random() * tecnicos.length)];

            // Creamos el subject para el ticket
            const subjectD = `Problema: ${problemType} - Detalles: ${description}`;
console.log(subjectD);
            // Creamos el ticket utilizando la función del controlador
            const ticket = await handleCreateTicket({
                authorId: 55, // Ajusta según corresponda
                projectId: 33, // Ajusta según corresponda
                trackerId: 26, // Ajusta según corresponda
                assignedToId: tecnicoAsignado.id, // Técnico asignado aleatoriamente
                priorityId: 2, // Prioridad del ticket
                statusId: 7, // Estado del ticket
                subject: subjectD,
                description: `Tipo de problema: ${problemType}. Descripción: ${description}.`,
            });

            if (ticket) {
                await flowDynamic(
                    `✅ Ticket creado con éxito.\n\nID del ticket: ${ticket.id}\nTécnico asignado: ${tecnicoAsignado.nombre}.`
                );
            } else {
                await flowDynamic('❌ No se pudo crear el ticket. Inténtalo más tarde.');
            }
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            await flowDynamic('❌ Ocurrió un error inesperado. Inténtalo más tarde.');
        }
    });
