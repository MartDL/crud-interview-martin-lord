import type {
  CreateUserRequest,
  UpdateUserRequest,
  User,
  EntityId,
} from '../types/user';

const BASE_URL = 'https://example.com';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function getUsers(): Promise<User[]> {
  const data = await request<{ users: User[] }>(`${BASE_URL}/user`);
  return data.users;
}

export async function createUser(payload: CreateUserRequest): Promise<User> {
  return request<User>(`${BASE_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateUser(
  id: EntityId,
  payload: UpdateUserRequest,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
}

export async function deleteUser(id: EntityId): Promise<void> {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
}
