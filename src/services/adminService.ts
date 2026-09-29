import {
  AdminSyncRecord,
  SourceHealthMetric,
  HumanReviewQueueItem,
  SyncErrorRecord,
} from '../types';
import {
  MOCK_ADMIN_STATS,
  MOCK_SYNC_RUNS,
  MOCK_SOURCE_HEALTH,
  MOCK_REVIEW_QUEUE,
  MOCK_SYNC_ERRORS,
  AdminOverviewStats,
} from '../data/admin';

export type DashboardStats = AdminOverviewStats;

export const adminService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return { ...MOCK_ADMIN_STATS };
  },

  getSyncLogs: async (): Promise<AdminSyncRecord[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return [...MOCK_SYNC_RUNS];
  },

  getSourceHealth: async (): Promise<SourceHealthMetric[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return [...MOCK_SOURCE_HEALTH];
  },

  getSyncErrors: async (): Promise<SyncErrorRecord[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return [...MOCK_SYNC_ERRORS];
  },

  getReviewQueue: async (): Promise<HumanReviewQueueItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return [...MOCK_REVIEW_QUEUE];
  },

  resolveReviewItem: async (id: string, action: string) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const item = MOCK_REVIEW_QUEUE.find((r) => r.id === id);
    if (item) {
      item.status = 'RESOLVED';
    }
    return { success: true, id, action };
  },

  triggerSync: async () => {
    // Pure frontend demo interaction per Section 16: "Sync started" -> loading -> mock success
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: 'Automated synchronization completed across 8 data sources.',
      syncedAt: new Date().toLocaleTimeString(),
    };
  },
};
