import { UserModel } from '@/interfaces';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export async function getUsers() {
  const response = await api.get('/users');
  return response.data;
}

export async function getUserByID(id: number) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function createUser(user: UserModel) {
  const response = await api.post('/users', user);
  return response.data;
}

export async function updateUser(id: number, user: UserModel) {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
}

export async function deleteUser(id: number) {
  await api.delete(`/users/${id}`);
}