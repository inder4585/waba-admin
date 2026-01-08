import { api } from '@/lib/api';
import { API_CONTENT } from '@/utils/api_content';

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
  getAll: async (params?: { page: number; limit: number; userId: string }) => {
    const endpoint = API_CONTENT.api.waba_group || '/waba-group';
    const response = await api.get(`${endpoint}?sortBy=createdAt`, { params });
    return response.data;
  },

  create: async (data: CreateWabaGroupDto) => {
    const endpoint = API_CONTENT.api.waba_group || '/waba-group';
    const response = await api.post(endpoint, data);
    return response.data;
  },

  // Add other methods (update, delete) as needed
};
