import { api } from '@/lib/api';
import { API_CONTENT } from '@/utils/api_content';

export interface CreateWabaNumberDto {
  accessToken: string;
  businessId: string;
  wabaId: string;
  number: string;
  userId: string;
  rating: string;
  vendor: string;
  groupName: string;
  groupId: string;
  description: string;
}

export interface WabaNumber {
  id: string; // Assuming mapped from database _id or id
  number: string;
  wabaId: string;
  businessId: string;
  status: string; // 'Connected' | 'Disconnected'
  quality: string; // 'High' | 'Medium' | 'Low'
  groupName: string;
  groupId: string;
  createdAt?: string;
  updatedAt?: string;
}

export const wabaNumberService = {
  getAll: async (params?: { page: number; limit: number; userId: string }) => {
    const endpoint = API_CONTENT.api.waba_number || '/waba-number';
    const response = await api.get(`${endpoint}?sortBy=createdAt`, { params });
    return response.data;
  },

  create: async (data: CreateWabaNumberDto) => {
    const endpoint = API_CONTENT.api.waba_number || '/waba-number';
    const response = await api.post(endpoint, data);
    return response.data;
  },
};
