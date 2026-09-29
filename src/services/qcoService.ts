import { QcoRecord } from '../types';
import { MOCK_QCOS } from '../data/qco';

export interface QcoQueryParams {
  query?: string;
  ministry?: string;
  status?: string;
  standard?: string;
}

export const qcoService = {
  getQcoRecords: async (params?: QcoQueryParams): Promise<QcoRecord[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...MOCK_QCOS];

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.product.toLowerCase().includes(q) ||
          (item.qcoTitle && item.qcoTitle.toLowerCase().includes(q)) ||
          item.isNumber.toLowerCase().includes(q) ||
          item.notificationNo.toLowerCase().includes(q) ||
          item.ministry.toLowerCase().includes(q) ||
          (item.applicableProducts && item.applicableProducts.some((p) => p.toLowerCase().includes(q)))
      );
    }

    if (params?.ministry && params.ministry !== 'ALL') {
      filtered = filtered.filter((item) => item.ministry === params.ministry);
    }

    if (params?.status && params.status !== 'ALL') {
      filtered = filtered.filter((item) => item.status === params.status);
    }

    if (params?.standard && params.standard !== 'ALL') {
      const s = params.standard.toLowerCase();
      filtered = filtered.filter((item) => item.isNumber.toLowerCase().includes(s));
    }

    return filtered;
  },

  getQcoById: async (id: string): Promise<QcoRecord | null> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_QCOS.find((q) => q.id === id) || MOCK_QCOS[0];
  },
};
