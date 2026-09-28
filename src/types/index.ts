export type NavRoute =
  | 'dashboard'
  | '/'
  | 'ai-assistant'
  | 'chat'
  | '/chat'
  | 'standards-explorer'
  | 'standards'
  | '/standards'
  | '/standards/search'
  | '/standards/:id'
  | '/standards/:id/clauses'
  | 'product-to-standard'
  | '/product-to-standard'
  | 'certification'
  | '/certification'
  | '/certification/roadmap'
  | '/certification/checklist'
  | 'qco-regulations'
  | '/qco-regulations'
  | 'testing-laboratories'
  | 'laboratories'
  | '/laboratories'
  | 'hallmarking-jewellery'
  | 'hallmarking'
  | '/hallmarking'
  | '/hallmarking/huid'
  | '/hallmarking/scanner'
  | '/hallmarking/purity'
  | '/hallmarking/assay'
  | '/hallmarking/jewellers'
  | 'licensed-jewellers'
  | 'verification-suite'
  | 'consumer-services'
  | '/consumer-services'
  | 'documents-analysis'
  | 'document-image-lab'
  | '/document-image-lab'
  | '/document-analysis'
  | '/image-analysis'
  | 'compliance-gap'
  | '/compliance-gap'
  | 'admin-dashboard'
  | 'admin'
  | '/admin'
  | 'government-services'
  | '/government-services'
  | 'analysis-tools'
  | '/analysis-tools'
  | 'administration'
  | '/administration';

export type Language = 'en' | 'hi' | 'ta' | 'bn' | 'mr';

export type VerificationBadgeType = 
  | 'VERIFIED' 
  | 'SOURCE-BACKED' 
  | 'AI-ASSISTED' 
  | 'UNVERIFIED' 
  | 'UNABLE_TO_VERIFY';

export interface SourceCitation {
  id: string;
  documentTitle: string;
  isNumber: string;
  versionYear: string;
  clause?: string;
  page?: string;
  sourceName: string;
  sourceUrl: string;
  retrievedDate: string;
  confidence: number;
}

export interface ClauseInfo {
  clauseNumber: string;
  title: string;
  text: string;
  page: string;
}

export interface IndianStandard {
  id: string;
  isNumber: string;
  title: string;
  year: string;
  department: string;
  category: string;
  status: 'ACTIVE' | 'UNDER_REVISION' | 'WITHDRAWN';
  qcoMandatory: boolean;
  qcoDate?: string;
  scope: string;
  clauses: ClauseInfo[];
  amendments: string[];
  certificationScheme: 'Scheme I (ISI Mark)' | 'Scheme II (CRS)' | 'Scheme IV' | 'Voluntary';
  relatedStandards: string[];
  bisSourceUrl: string;
  lastUpdated: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
  confidence: number;
}

export interface TestingLab {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  city: string;
  address: string;
  contact: string;
  email: string;
  capabilities: string[];
  accreditedStandards: string[];
  validity: string;
  status: 'RECOGNIZED' | 'AUDIT_PENDING' | 'SUSPENDED';
  officialSource: string;
  lastVerified: string;
  distanceKm?: number;
}

export interface HallmarkingCentre {
  id: string;
  name: string;
  code: string;
  state: string;
  city: string;
  address: string;
  metalCapability: 'Gold (Au)' | 'Silver (Ag)' | 'Gold & Silver';
  status: 'OPERATIONAL' | 'RECOGNITION_EXPIRED' | 'AUDIT_IN_PROGRESS';
  validity: string;
  officialSource: string;
  lastVerified: string;
}

export interface LicensedJeweller {
  id: string;
  licenceNo: string;
  jewellerName: string;
  address: string;
  city: string;
  state: string;
  metalCategory: 'Gold' | 'Silver' | 'Both';
  status: 'OPERATIVE' | 'SURRENDERED' | 'CANCELLED';
  validTill: string;
  lastSynchronized: string;
}

export interface QcoRecord {
  id: string;
  product: string;
  isNumber: string;
  ministry: string;
  notificationNo: string;
  notificationDate: string;
  effectiveDate: string;
  status: 'ENFORCED' | 'UPCOMING' | 'EXTENDED';
  sourceGazette: string;
  lastSynchronized: string;
}

export interface HuidVerificationResult {
  huid: string;
  isValidFormat: boolean;
  isVerifiedLive: boolean;
  status: 'VERIFIED' | 'INVALID_FORMAT' | 'NOT_FOUND' | 'UNAVAILABLE';
  jewellerRegNo?: string;
  jewellerName?: string;
  ahcCode?: string;
  ahcName?: string;
  metalFineness?: string; // e.g. "22K (916)"
  hallmarkingDate?: string;
  articleType?: string;
  officialSource: string;
  verifiedAt: string;
  disclaimer: string;
}

export interface LicenceVerificationResult {
  licenceNo: string;
  status: 'OPERATIVE' | 'EXPIRED' | 'SUSPENDED' | 'NOT_FOUND';
  licenseeName?: string;
  factoryAddress?: string;
  isNumber?: string;
  productName?: string;
  brand?: string;
  validTill?: string;
  scheme?: string;
  officialSource: string;
  verifiedAt: string;
}

export interface CrsVerificationResult {
  rNumber: string;
  status: 'ACTIVE' | 'EXPIRED' | 'INVALID' | 'SUSPENDED';
  companyName?: string;
  modelNumbers?: string[];
  productCategory?: string;
  isStandard?: string;
  validTill?: string;
  officialSource: string;
  verifiedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  standard?: {
    isNumber: string;
    title: string;
  };
  reasoning?: string;
  citations?: SourceCitation[];
  actions?: {
    label: string;
    route: NavRoute;
    payload?: any;
  }[];
  isHallucinationGuard?: boolean;
}

export interface ConversationHistoryItem {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  messageCount: number;
}

export interface ComplianceGapItem {
  id: string;
  clause: string;
  parameter: string;
  bisRequirement: string;
  evidenceFound: string;
  gapStatus: 'COMPLIANT' | 'GAP_FOUND' | 'PARTIAL' | 'UNVERIFIABLE';
  remedialAction: string;
  sourceStandard: string;
}

export interface AdminSyncRecord {
  id: string;
  sourceName: string;
  dataType: string;
  recordsAdded: number;
  recordsUpdated: number;
  recordsRemoved: number;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  lastRun: string;
  durationMs: number;
}

export interface SourceHealthMetric {
  name: string;
  endpoint: string;
  status: 'HEALTHY' | 'WARNING' | 'ERROR' | 'STALE';
  uptimePercentage: number;
  latencyMs: number;
  lastChecked: string;
  lastSuccessSync: string;
}

export interface HumanReviewQueueItem {
  id: string;
  issue: string;
  type: 'AMBIGUOUS_MAPPING' | 'CONFLICTING_SOURCE' | 'OCR_FAILURE' | 'REGULATORY_UNCERTAINTY';
  source: string;
  created: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_REVIEW' | 'RESOLVED';
  confidenceScore: number;
}
