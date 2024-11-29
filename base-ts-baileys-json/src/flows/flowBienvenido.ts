// src/flows/welcomeFlow.ts
import { addKeyword } from '@builderbot/bot';
import { flowEstadoTicket } from './flowEstadoTicket';
import { flowCrearTicket } from './flowCrearTicket';
import { flowEliminarTicket } from './flowEliminarTicket';
import {flowVerIssues } from './flowAllIssues';

// Flujo de bienvenida corregido '/.*/', {regex:true}
//const pattern = "^.+";
//const result = pattern.match(pattern).forEach(element => console.log(element));
export const flowBienvenido = addKeyword(['hola', 'Hola','buen','Buen','buenos','Buenos'])//Permite capturar cualquier caracter para inciar la conversación con el bot
.addAnswer(['👋 Hola, Soy el Sr. T-BOT🤖, tu asistente virtual del MPF. Por favor, elije una de las opcines y te ayudaré.😁'])
//.addAnswer(['Escribe una de las siguientes opciones para continuar:'])
.addAnswer(['👉 *1*-Abrir un nuevo ticket.'])
.addAnswer(['👉 *2*-Consultar el estado de un ticket.'])
.addAnswer(['👉 *3*-Eliminar un ticket existente.'])
.addAnswer(['👉 *4*-Obtener todos los tickets.']);
//[flowCrearTicket, flowEstadoTicket, flowEliminarTicket, flowVerIssues]
//[flowVerIssues]