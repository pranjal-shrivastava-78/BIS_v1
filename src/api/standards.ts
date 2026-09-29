import { apiClient } from './client';
import { PaginatedResponse, StandardOut } from '../types/api';

export interface StandardsFilterParams {
  search?: string;
  status?: string;
  page?: number;
  page_size?: number;
}

export const standardsApi = {
  listStandards: async (params?: StandardsFilterParams): Promise<PaginatedResponse<StandardOut>> => {
    return apiClient.get<PaginatedResponse<StandardOut>>('/standards', params);
  },

  getStandardByNumber: async (isNumber: string): Promise<StandardOut> => {
    return apiClient.get<StandardOut>(`/standards/${encodeURIComponent(isNumber)}`);
  },
};
