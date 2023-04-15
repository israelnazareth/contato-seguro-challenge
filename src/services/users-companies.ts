import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
})

export async function getUsersCompanies() {
  const response = await api.get('/users-companies');
  return response.data;
}
