import { api } from '@/lib/api';

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
  getAll: async () => {
    // Assuming the same sortBy param pattern
    const response = await api.get('/api/waba-number?sortBy=createdAt');
    return response.data;
  },

  create: async (data: CreateWabaNumberDto) => {
    const response = await api.post('/api/waba-number', data);
    return response.data;
  },
};
