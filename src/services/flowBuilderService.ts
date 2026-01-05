import { api } from '@/lib/api';

export interface FlowData {
  id: string;
  name: string;
  userId: string;
  wabanumber: string;
  groupId: string;
  description?: string;
  nodes: any[];
  edges: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFlowDto {
  name: string;
  userId: string;
  wabanumber: string;
  groupId: string;
  description?: string;
  nodes: any[];
  edges: any[];
}

export const flowBuilderService = {
  getAll: async () => {
    const response = await api.get('/api/flow-builder?sortBy=createdAt');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/flow-builder/${id}`);
    return response.data;
  },

  create: async (data: CreateFlowDto) => {
    const response = await api.post('/api/flow-builder', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateFlowDto>) => {
    const response = await api.patch(`/api/flow-builder/${id}`, data);
    return response.data;
  },
};
