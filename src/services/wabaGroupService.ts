import { api } from '@/lib/api';

export interface CreateWabaGroupDto {
  name: string;
  userId: string;
  description?: string;
}

export interface WabaGroup {
  id: string; // Assuming mapped from database _id or id
  name: string;
  userId: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  // Add other fields based on backend response, e.g. phoneNumberCount if added by backend aggregation
}

export const wabaGroupService = {
  getAll: async () => {
    const response = await api.get('/waba-group?sortBy=createdAt');
    return response.data;
  },

  create: async (data: CreateWabaGroupDto) => {
    const response = await api.post('/waba-group', data);
    return response.data;
  },

  // Add other methods (update, delete) as needed
};
