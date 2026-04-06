import axios from 'axios';
import type { User } from '../types/user';

const BASE_URL = 'http://localhost:3001/api/users';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getUsers(): Promise<User[]> {
  await delay(750);
  const response = await axios.get<User[]>(BASE_URL);
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await axios.get<User>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function createUser(user: User): Promise<User> {
  const response = await axios.post<User>(BASE_URL, user);
  return response.data;
}

export async function updateUser(id: string, user: User): Promise<User> {
  const response = await axios.put<User>(`${BASE_URL}/${id}`, user);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}
