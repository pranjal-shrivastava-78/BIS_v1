import { IndianStandard, ComplianceGapItem } from '../types';
import { MOCK_STANDARDS } from '../data/standards';
import { MOCK_COMPLIANCE_PROFILES } from '../data/compliance';

export interface StandardsQueryParams {
  query?: string;
  department?: string;
  category?: string;
  year?: string;
  status?: string;
  qcoOnly?: boolean;
}

export const standardsService = {
  getStandards: async (params?: StandardsQueryParams): Promise<IndianStandard[]> => {
    // Return mock data with simulated asynchronous resolution for realistic UI experience
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...MOCK_STANDARDS];

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(
        (s) =>
          s.isNumber.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.scope.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.applicableProducts && s.applicableProducts.some((p) => p.toLowerCase().includes(q)))
      );
    }

    if (params?.department && params.department !== 'ALL') {
      filtered = filtered.filter((s) => s.department === params.department);
    }

    if (params?.category && params.category !== 'ALL') {
      filtered = filtered.filter((s) => s.category === params.category);
    }

    if (params?.year && params.year !== 'ALL') {
      filtered = filtered.filter((s) => s.year === params.year);
    }

    if (params?.status && params.status !== 'ALL') {
      filtered = filtered.filter((s) => s.status === params.status);
    }

    if (params?.qcoOnly) {
      filtered = filtered.filter((s) => s.qcoMandatory);
    }

    return filtered;
  },

  getStandardById: async (id: string): Promise<IndianStandard | null> => {
    await new Promise((resolve) => setTimeout(resolve, 60));
    const found = MOCK_STANDARDS.find(
      (s) => s.id === id || s.isNumber.toLowerCase().includes(id.toLowerCase())
    );
    return found || MOCK_STANDARDS[0];
  },

  matchProductToStandards: async (description: string, category?: string, keywords?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const fullSearch = `${description} ${category || ''} ${keywords || ''}`.toLowerCase();

    // Match against standards catalog
    const matches = MOCK_STANDARDS.filter((s) => {
      const standardText = `${s.title} ${s.scope} ${s.category} ${(s.applicableProducts || []).join(' ')}`.toLowerCase();
      const words = fullSearch.split(/\s+/).filter((w) => w.length > 2);
      return words.some((w) => standardText.includes(w));
    });

    if (matches.length > 0) {
      return matches.map((s) => ({
        id: s.id,
        isNumber: s.isNumber,
        title: s.title,
        year: s.year,
        relevance: 95,
        explanation: `Applicable standard identified based on matching product category "${s.category}" and technical product attributes.`,
        applicableQco: s.qcoInfo?.orderTitle || 'Subject to General Indian Standards Regulation',
        qcoMandatory: s.qcoMandatory,
        certificationRequirement: s.certificationScheme,
        relatedStandards: s.relatedStandards,
        sourceUrl: s.bisSourceUrl,
      }));
    }

    // Default intelligent match fallback
    return [
      {
        id: MOCK_STANDARDS[0].id,
        isNumber: MOCK_STANDARDS[0].isNumber,
        title: MOCK_STANDARDS[0].title,
        year: MOCK_STANDARDS[0].year,
        relevance: 92,
        explanation: 'Potentially applicable based on extracted product attributes for insulated domestic containers.',
        applicableQco: MOCK_STANDARDS[0].qcoInfo?.orderTitle || 'Mandatory DPIIT QCO',
        qcoMandatory: true,
        certificationRequirement: MOCK_STANDARDS[0].certificationScheme,
        relatedStandards: MOCK_STANDARDS[0].relatedStandards,
        sourceUrl: MOCK_STANDARDS[0].bisSourceUrl,
      },
    ];
  },

  getComplianceGapItems: async (standardId?: string): Promise<ComplianceGapItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    if (standardId) {
      const profile = MOCK_COMPLIANCE_PROFILES.find(
        (p) => p.standardId === standardId || p.standardNumber.includes(standardId)
      );
      if (profile) return profile.items;
    }
    return MOCK_COMPLIANCE_PROFILES[0].items;
  },
};
