// src/controllers/ticketController.ts
import { createTicket, getTicketStatus, deleteTicket, getAllIssues, getIssueById } from '../services/redmineService';

//Comentado por joaquin el 23-11-2024
/*export const handleCreateTicket = async (projectId: number, subject: string, description: string) => {
    return await createTicket(projectId, subject, description);
};*/

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

export const handleGetAllIssues = async () => {
    try {
        const issues = await getAllIssues();
        console.log(issues); // Devuelve la lista completa de issues
    } catch (error) {
        console.error('Error al manejar la obtención de todos los issues:', error);
        return [];
    }
};

export const handleGetIssueById = async (issueId: number) => {
    try {
        const issue = await getIssueById(issueId);
        return issue; // Devuelve los datos del issue específico
    } catch (error) {
        console.error(`Error al manejar la obtención del issue con ID ${issueId}:`, error);
        return null;
    }
};
export const handleCreateTicket = async (ticketData: {
    authorId: number;
    projectId: number;
    trackerId: number;
    assignedToId: number;
    priorityId: number;
    statusId: number;
    subject: string;
    description: string;
}) => {
    return await createTicket(ticketData);
};
