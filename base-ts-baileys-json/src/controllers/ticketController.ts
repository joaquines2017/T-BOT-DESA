// src/controllers/ticketController.ts
import { createTicket, getTicketStatus, deleteTicket } from '../services/redmineService';

export const handleCreateTicket = async (projectId: number, subject: string, description: string) => {
    return await createTicket(projectId, subject, description);
};

/*export const handleGetTicketStatus = async (issueId: number) => {
    return await getTicketStatus(issueId);
};
*/
export const handleGetTicketStatus = async (issueId: number) => {
    const ticket = await getTicketStatus(issueId);
    if (!ticket) {
        return null;
    }
    return ticket; // Devuelve directamente el objeto con estado y responsable
};


export const handleDeleteTicket = async (issueId: number) => {
    return await deleteTicket(issueId);
};
