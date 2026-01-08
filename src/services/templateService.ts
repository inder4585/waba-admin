import { api } from '@/lib/api';
import { WhatsAppTemplate } from '@/types/template';
import { API_CONTENT } from '@/utils/api_content';

export const templateService = {
  getAll: async (params?: { page?: number; limit?: number; userId?: string; wabaNumber?: string }) => {
    // Handling potential missing endpoint in API_CONTENT by falling back to likely string
    const endpoint = API_CONTENT.api.waba_template_list || '/templates/list';
    const response = await api.get(endpoint, { params });
    return response.data;
  },

  create: async (data: WhatsAppTemplate) => {
    const endpoint = API_CONTENT.api.waba_template_create || '/templates/create';
    const response = await api.post(endpoint, data);
    return response.data;
  },

  // Add more methods as needed (delete, getById)
};
