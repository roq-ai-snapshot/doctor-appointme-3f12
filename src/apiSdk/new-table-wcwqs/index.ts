import axios from 'axios';
import queryString from 'query-string';
import { NewTableWcwqInterface, NewTableWcwqGetQueryInterface } from 'interfaces/new-table-wcwq';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNewTableWcwqs = async (
  query?: NewTableWcwqGetQueryInterface,
): Promise<PaginatedInterface<NewTableWcwqInterface>> => {
  const response = await axios.get('/api/new-table-wcwqs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createNewTableWcwq = async (newTableWcwq: NewTableWcwqInterface) => {
  const response = await axios.post('/api/new-table-wcwqs', newTableWcwq);
  return response.data;
};

export const updateNewTableWcwqById = async (id: string, newTableWcwq: NewTableWcwqInterface) => {
  const response = await axios.put(`/api/new-table-wcwqs/${id}`, newTableWcwq);
  return response.data;
};

export const getNewTableWcwqById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/new-table-wcwqs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNewTableWcwqById = async (id: string) => {
  const response = await axios.delete(`/api/new-table-wcwqs/${id}`);
  return response.data;
};
