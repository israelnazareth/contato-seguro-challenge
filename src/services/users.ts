import { UserModel } from '@/interfaces';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/users',
})

export async function getUsers() {
  const response = await api.get('/');
  return response.data;
}

export async function getUserByID(id: number) {
  const response = await api.get(`/${id}`);
  return response.data;
}

export async function createUser(user: UserModel) {
  const response = await api.post('/', user);
  return response.data;
}

export async function updateUser(id: number, user: UserModel) {
  const response = await api.put(`/${id}`, user);
  return response.data;
}

export async function deleteUser(id: number) {
  await api.delete(`/${id}`);
}

export async function getCompaniesByUserID(id: number) {
  const response = await api.get(`/${id}/companies`);
  return response.data;
}
