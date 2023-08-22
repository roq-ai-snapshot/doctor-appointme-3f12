import axios from 'axios';
import queryString from 'query-string';
import { NewTableInterface, NewTableGetQueryInterface } from 'interfaces/new-table';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNewTables = async (
  query?: NewTableGetQueryInterface,
): Promise<PaginatedInterface<NewTableInterface>> => {
  const response = await axios.get('/api/new-tables', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createNewTable = async (newTable: NewTableInterface) => {
  const response = await axios.post('/api/new-tables', newTable);
  return response.data;
};

export const updateNewTableById = async (id: string, newTable: NewTableInterface) => {
  const response = await axios.put(`/api/new-tables/${id}`, newTable);
  return response.data;
};

export const getNewTableById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/new-tables/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNewTableById = async (id: string) => {
  const response = await axios.delete(`/api/new-tables/${id}`);
  return response.data;
};
