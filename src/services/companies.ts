import { CompanyModel } from '@/interfaces';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/companies',
})

export async function getCompanies() {
  const response = await api.get('/');
  return response.data;
}

export async function getCompanyByID(id: number) {
  const response = await api.get(`/${id}`);
  return response.data;
}

export async function createCompany(company: CompanyModel) {
  const response = await api.post('/', company);
  return response.data;
}

export async function updateCompany(id: number, company: CompanyModel) {
  const response = await api.put(`/${id}`, company);
  return response.data;
}

export async function deleteCompany(id: number) {
  await api.delete(`/${id}`);
}

export async function getUsersByCompanyID(id: number) {
  const response = await api.get(`/${id}/users`);
  return response.data;
}