import { api } from './apiClient';
import { AdminSyncRecord, SourceHealthMetric, HumanReviewQueueItem } from '../types';

export interface DashboardStats {
  totalStandards: number | null;
  qcoRecords: number | null;
  laboratories: number | null;
  ahcCentres: number | null;
  licensedJewellers: number | null;
  sourcesActive: number | null;
  lastSyncTimestamp: string | null;
}

export const adminService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await api.get<DashboardStats>('/admin/stats');
    if (res.data) return res.data;

    // Default API-ready state without fabricated numbers
    return {
      totalStandards: null,
      qcoRecords: null,
      laboratories: null,
      ahcCentres: null,
      licensedJewellers: null,
      sourcesActive: null,
      lastSyncTimestamp: null,
    };
  },

  getSyncLogs: async (): Promise<AdminSyncRecord[]> => {
    const res = await api.get<AdminSyncRecord[]>('/admin/sync-logs');
    return res.data || [];
  },

  getSourceHealth: async (): Promise<SourceHealthMetric[]> => {
    const res = await api.get<SourceHealthMetric[]>('/admin/source-health');
    return res.data || [];
  },

  getReviewQueue: async (): Promise<HumanReviewQueueItem[]> => {
    const res = await api.get<HumanReviewQueueItem[]>('/admin/review-queue');
    return res.data || [];
  },

  resolveReviewItem: async (id: string, action: string) => {
    return api.post(`/admin/review-queue/${id}/resolve`, { action });
  },

  triggerSync: async () => {
    return api.post('/admin/sync/trigger');
  },
};
