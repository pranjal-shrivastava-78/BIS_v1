import { QcoRecord } from '../types';
import { qcoApi, QCOFilterParams } from '../api/qco';
import { QCOOut } from '../types/api';

export interface QcoQueryParams {
  query?: string;
  ministry?: string;
  status?: string;
  standard?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedQcoResult {
  items: QcoRecord[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function mapQCOOutToQcoRecord(qco: QCOOut): QcoRecord {
  const isEnforced = qco.status === 'ACTIVE' || qco.status === 'ENFORCED';
  const statusFormatted: 'ENFORCED' | 'UPCOMING' | 'EXTENDED' = isEnforced
    ? 'ENFORCED'
    : qco.status === 'UPCOMING'
    ? 'UPCOMING'
    : 'ENFORCED';

  return {
    id: qco.id,
    qcoTitle: qco.title,
    product: qco.product_name,
    isNumber: qco.is_number,
    ministry: qco.ministry,
    notificationNo: qco.notification_number || qco.qco_number || undefined,
    notificationDate: qco.notification_date ? String(qco.notification_date) : undefined,
    effectiveDate: qco.effective_date ? String(qco.effective_date) : undefined,
    status: statusFormatted,
    applicableProducts: [qco.product_name],
    applicableStandards: [qco.is_number],
    sourceGazette: qco.source_url || undefined,
  };
}

export const qcoService = {
  getPaginatedQcoRecords: async (params?: QcoQueryParams): Promise<PaginatedQcoResult> => {
    const apiParams: QCOFilterParams = {
      ministry: params?.ministry && params.ministry !== 'ALL' ? params.ministry : undefined,
      status: params?.status && params.status !== 'ALL' ? params.status : undefined,
      is_number: params?.standard && params.standard !== 'ALL' ? params.standard : undefined,
      page: params?.page || 1,
      page_size: params?.pageSize || 20,
    };

    const res = await qcoApi.listQCOs(apiParams);
    let items = res.items.map(mapQCOOutToQcoRecord);

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.product.toLowerCase().includes(q) ||
          (item.qcoTitle && item.qcoTitle.toLowerCase().includes(q)) ||
          item.isNumber.toLowerCase().includes(q) ||
          (item.notificationNo && item.notificationNo.toLowerCase().includes(q)) ||
          item.ministry.toLowerCase().includes(q)
      );
    }

    return {
      items,
      page: res.pagination.page,
      pageSize: res.pagination.page_size,
      totalItems: res.pagination.total_items,
      totalPages: res.pagination.total_pages,
      hasNext: res.pagination.has_next,
      hasPrev: res.pagination.has_prev,
    };
  },

  getQcoRecords: async (params?: QcoQueryParams): Promise<QcoRecord[]> => {
    const res = await qcoService.getPaginatedQcoRecords(params);
    return res.items;
  },

  getQcoById: async (id: string): Promise<QcoRecord> => {
    const qco = await qcoApi.getQCOById(id);
    return mapQCOOutToQcoRecord(qco);
  },
};
