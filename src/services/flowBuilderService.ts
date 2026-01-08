import { api } from '@/lib/api';
import { API_CONTENT } from '@/utils/api_content';

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
  getAll: async (params?: { page?: number; limit?: number; userId?: string; groupName?: string; wabaNumber?: string }) => {
    const endpoint = API_CONTENT.api.waba_flow_builder || '/flow-builder';
    const response = await api.get(`${endpoint}?sortBy=createdAt`, { params });
    return response.data;
  },

  getById: async (id: string) => {
    const endpoint = API_CONTENT.api.waba_flow_builder || '/flow-builder';
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  },

  create: async (data: CreateFlowDto) => {
    const endpoint = API_CONTENT.api.waba_flow_builder || '/flow-builder';
    const response = await api.post(endpoint, data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateFlowDto>) => {
    const endpoint = API_CONTENT.api.waba_flow_builder || '/flow-builder';
    const response = await api.patch(`${endpoint}/${id}`, data);
    return response.data;
  },
};
