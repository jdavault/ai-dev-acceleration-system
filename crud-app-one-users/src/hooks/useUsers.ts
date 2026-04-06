import { useEffect, useState } from 'react';
import type { User } from '../types/user';
import * as userApi from '../api/userApi';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await userApi.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetch();
  }, []);

  const removeUser = async (id: number) => {
    try {
      await userApi.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return { users, removeUser };
}

export function useUser(id: string | undefined) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const data = await userApi.getUser(id);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetch();
  }, [id]);

  return { user, setUser };
}

export function useCreateUser() {
  const create = async (user: User) => {
    await userApi.createUser(user);
  };
  return { create };
}

export function useUpdateUser() {
  const update = async (id: string, user: User) => {
    await userApi.updateUser(id, user);
  };
  return { update };
}
