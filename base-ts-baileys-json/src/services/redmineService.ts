// src/services/redmineService.ts
import axios from 'axios';

const REDMINE_API_URL = 'https://incidentes.mpftucuman.gob.ar';
const API_KEY = 'caa5569e969a7a7dd08f2dd1268579aceb93b3f4';

export const getProjects = async () => {
    try {
        const response = await axios.get(`${REDMINE_API_URL}/projects.json`, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });
        return response.data.projects;
    } catch (error) {
        console.error('Error al obtener el o los proyectos:', error);
        return [];
    }
};
//Comentado por joaquin para probar nueva función 
/*
export const createTicket = async (projectId: number, subject: string, description: string) => {
    try {
        const response = await axios.post(`${REDMINE_API_URL}/issues.json`, {
            issue: { project_id: projectId, subject, description }
        }, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });
        return response.data.issue;
    } catch (error) {
        console.error('Error al crear el ticket:', error.response?.data || error.message);
        //return null;
        throw new Error('No se pudo crear el ticket.');
    }
};*/
export const createTicket = async (ticketData: {
    authorId: number;
    projectId: number;
    trackerId: number;
    assignedToId: number;
    priorityId: number;
    statusId: number;
    subject: string;
    description: string;
}) => {
    try {
        const response = await axios.post(
            `${REDMINE_API_URL}/issues.json`,
            {
                issue: {
                    author_id: ticketData.authorId,
                    project_id: ticketData.projectId,
                    tracker_id: ticketData.trackerId,
                    assigned_to_id: ticketData.assignedToId,
                    priority_id: ticketData.priorityId,
                    status_id: ticketData.statusId,
                    subject: ticketData.subject,
                    description: ticketData.description,
                },
            },
            {
                headers: { 'X-Redmine-API-Key': API_KEY },
            }
        );
        return response.data.issue;
    } catch (error) {
        console.error('Error al crear el ticket:', error.response?.data || error);
        return null;
    }
};

export const getTicketStatus = async (issueId: number) => {
    try {
        const response = await axios.get(`${REDMINE_API_URL}/issues/${issueId}.json`, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });

        const issue = response.data.issue;

        // Extraemos el estado y el responsable
        const status = issue.status?.name || 'Desconocido';
        const assignedTo = issue.assigned_to?.name || 'No asignado';

        // Devolvemos un objeto con ambas propiedades
        return { status, assignedTo };
    } catch (error) {
        console.error('Error al obtener el estado del ticket:', error);
        return null; // Retornamos null si ocurre un error
    }
};

/*export const getTicketStatus = async (issueId: number) => {
    try {
        const response = await axios.get(`${REDMINE_API_URL}/issues/${issueId}.json`, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });
        return response.data.issue.status.name;
    } catch (error) {
        console.error('Error al obtener el estado del ticket:', error);
        return 'Desconocido';
    }
};*/

export const deleteTicket = async (issueId: number) => {
    try {
        await axios.delete(`${REDMINE_API_URL}/issues/${issueId}.json`, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });
        return 'Ticket eliminado con éxito.';
    } catch (error) {
        console.error('Error al eliminar el ticket:', error);
        return 'Error al eliminar el ticket.';
    }
};

export const getAllIssues = async () => {
    try {
        const response = await axios.get(`${REDMINE_API_URL}/issues.json`, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });
        return response.data.issues; // Retorna la lista de issues
    } catch (error) {
        console.error('Error al obtener los tickets:', error);
        return [];
    }
};

// Obtener un issue específico
export const getIssueById = async (issueId: number) => {
    try {
        const response = await axios.get(`${REDMINE_API_URL}/issues/${issueId}.json`, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });
        return response.data.issue; // Retorna los detalles del issue
    } catch (error) {
        console.error(`Error al obtener el ticket con ID ${issueId}:`, error);
        return null;
    }
};
