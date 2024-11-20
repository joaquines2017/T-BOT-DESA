// src/flows/welcomeFlow.ts
import { addKeyword } from '@builderbot/bot';
import { flowEstadoTicket } from './flowEstadoTicket';
import { flowCrearTicket } from './flowCrearTicket';
import { flowEliminarTicket } from './flowEliminarTicket';

// Flujo de bienvenida corregido '/.*/', {regex:true}
const pattern = "^.+";
const result = pattern.match(pattern).forEach(element => console.log(element));
export const flowBienvenido = addKeyword(['hola', 'Hola','buen','Buen','buenos','Buenos'])//Permite capturar cualquier caracter para inciar la conversación con el bot
.addAnswer(['👋 Hola, gracias por comunicarte con el soporte técnico del MPF✨. Soy el Sr. T-BOT🤖, tu asistente virtual.', 
    'Por favor indícame en que puedo ayudarte, elije el número de la opción que deseas consultar (1, 2, o 3) y te ayudaré.😁'])
//.addAnswer(['Escribe una de las siguientes opciones para continuar:'])
.addAnswer(['-"1" para abrir un nuevo ticket.'])
.addAnswer(['-"2" para consultar el estado de un ticket.'])
.addAnswer(['-"3" para eliminar un ticket existente.']);
[flowCrearTicket, flowEstadoTicket, flowEliminarTicket]