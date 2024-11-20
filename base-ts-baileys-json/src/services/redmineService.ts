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

export const createTicket = async (projectId: number, subject: string, description: string) => {
    try {
        const response = await axios.post(`${REDMINE_API_URL}/issues.json`, {
            issue: { project_id: projectId, subject, description }
        }, {
            headers: { 'X-Redmine-API-Key': API_KEY }
        });
        return response.data.issue;
    } catch (error) {
        console.error('Error al crear el ticket:', error);
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
