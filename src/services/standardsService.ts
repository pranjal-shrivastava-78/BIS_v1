import { IndianStandard } from '../types';
import { standardsApi, StandardsFilterParams } from '../api/standards';
import { certificationApi } from '../api/certification';
import { StandardOut } from '../types/api';

export interface StandardsQueryParams {
  query?: string;
  department?: string;
  category?: string;
  year?: string;
  status?: string;
  qcoOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export interface PaginatedStandardsResult {
  items: IndianStandard[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function mapStandardOutToIndianStandard(std: StandardOut): IndianStandard {
  const isStatus = (std.status === 'ACTIVE' || std.status === 'UNDER_REVISION' || std.status === 'WITHDRAWN')
    ? std.status
    : 'ACTIVE';

  return {
    id: std.id,
    isNumber: std.is_number,
    title: std.title,
    year: std.year ? String(std.year) : undefined,
    status: isStatus,
    scope: std.scope || undefined,
    bisSourceUrl: std.source_url || undefined,
    sourceReference: std.source_name,
    lastUpdated: std.last_verified_at ? new Date(std.last_verified_at).toLocaleDateString() : undefined,
  };
}

export const standardsService = {
  /**
   * Fetch paginated standards directly from backend API
   */
  getPaginatedStandards: async (params?: StandardsQueryParams): Promise<PaginatedStandardsResult> => {
    const apiParams: StandardsFilterParams = {
      search: params?.query?.trim() || undefined,
      status: params?.status && params.status !== 'ALL' ? params.status : undefined,
      page: params?.page || 1,
      page_size: params?.pageSize || 20,
    };

    const response = await standardsApi.listStandards(apiParams);
    return {
      items: response.items.map(mapStandardOutToIndianStandard),
      page: response.pagination.page,
      pageSize: response.pagination.page_size,
      totalItems: response.pagination.total_items,
      totalPages: response.pagination.total_pages,
      hasNext: response.pagination.has_next,
      hasPrev: response.pagination.has_prev,
    };
  },

  /**
   * Fetch list of standards directly from backend API
   */
  getStandards: async (params?: StandardsQueryParams): Promise<IndianStandard[]> => {
    const paginated = await standardsService.getPaginatedStandards(params);
    return paginated.items;
  },

  /**
   * Fetch standard detail by IS number or ID directly from backend
   */
  getStandardById: async (idOrNumber: string): Promise<IndianStandard> => {
    const record = await standardsApi.getStandardByNumber(idOrNumber);
    return mapStandardOutToIndianStandard(record);
  },

  /**
   * Matches product to candidate standard using backend /certification/map-product endpoint
   */
  matchProductToStandards: async (description: string, category?: string, keywords?: string) => {
    const fullQuery = [description, category, keywords].filter(Boolean).join(' ');
    const mapping = await certificationApi.mapProduct(fullQuery);

    return [
      {
        id: mapping.candidate_standard,
        candidate_standard: mapping.candidate_standard,
        isNumber: mapping.candidate_standard,
        title: mapping.standard_title,
        standard_title: mapping.standard_title,
        is_mandatory: mapping.is_mandatory,
        qcoMandatory: mapping.is_mandatory,
        applicable_qco: mapping.applicable_qco,
        applicableQco: mapping.applicable_qco,
        certification_scheme: mapping.certification_scheme,
        certificationRequirement: mapping.certification_scheme,
        confidence: mapping.confidence,
        relevance: Math.round(mapping.confidence * 100),
        reasoning: mapping.reasoning,
        explanation: mapping.reasoning,
      },
    ];
  },
};
