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
  | '/certification/schemes'
  | '/certification/mapping'
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
  | '/hallmarking/centres'
  | '/hallmarking/scanner'
  | '/hallmarking/purity'
  | '/hallmarking/assay'
  | '/hallmarking/huid'
  | 'licensed-jewellers'
  | '/licensed-jewellers'
  | 'verification-suite'
  | '/verification-suite'
  | 'verify'
  | '/verify'
  | '/verify/huid'
  | '/verify/licence'
  | '/verify/crs'
  | 'consumer-services'
  | '/consumer-services'
  | 'documents-analysis'
  | 'document-image-lab'
  | '/document-image-lab'
  | '/document-analysis'
  | '/image-analysis'
  | '/label-scanner'
  | '/assay-explainer'
  | 'compliance-gap'
  | '/compliance-gap'
  | 'admin-dashboard'
  | 'admin'
  | '/admin'
  | '/admin/health'
  | '/admin/sync'
  | '/admin/review'
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
  year?: string;
  department?: string;
  category?: string;
  status: 'ACTIVE' | 'UNDER_REVISION' | 'WITHDRAWN';
  qcoMandatory?: boolean;
  qcoDate?: string;
  scope?: string;
  description?: string;
  applicableProducts?: string[];
  clauses?: ClauseInfo[];
  amendments?: string[];
  certificationScheme?: string;
  relatedStandards?: string[];
  bisSourceUrl?: string;
  lastUpdated?: string;
  qcoInfo?: {
    mandatory?: boolean;
    orderTitle?: string;
    ministry?: string;
    effectiveDate?: string;
    notificationNo?: string;
  };
  certificationInfo?: {
    scheme?: string;
    mark?: string;
    procedure?: string;
  };
  sourceReference?: string;
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
  district?: string;
  city: string;
  address?: string;
  contact?: string;
  email?: string;
  capabilities?: string[];
  accreditedStandards?: string[];
  services?: string[];
  validity?: string;
  status: 'RECOGNIZED' | 'AUDIT_PENDING' | 'SUSPENDED';
  officialSource?: string;
  lastVerified?: string;
  distanceKm?: number;
}

export interface HallmarkingCentre {
  id: string;
  name: string;
  code: string;
  state: string;
  city: string;
  district?: string;
  address?: string;
  contact?: string;
  services?: string[];
  metalCapability?: string;
  status: 'OPERATIONAL' | 'RECOGNITION_EXPIRED' | 'AUDIT_IN_PROGRESS';
  validity?: string;
  officialSource?: string;
  lastVerified?: string;
}

export interface LicensedJeweller {
  id: string;
  licenceNo: string;
  jewellerName: string;
  address?: string;
  city: string;
  state: string;
  district?: string;
  contact?: string;
  metalCategory?: string;
  status: 'OPERATIVE' | 'SURRENDERED' | 'CANCELLED';
  validTill?: string;
  lastSynchronized?: string;
}

export interface QcoRecord {
  id: string;
  qcoTitle?: string;
  product: string;
  isNumber: string;
  ministry: string;
  notificationNo?: string;
  notificationDate?: string;
  effectiveDate?: string;
  status: 'ENFORCED' | 'UPCOMING' | 'EXTENDED';
  applicableProducts?: string[];
  applicableStandards?: string[];
  complianceRequirements?: string[];
  importantDates?: {
    notification?: string;
    enforcement?: string;
    extension?: string;
  };
  sourceGazette?: string;
  sourceReference?: string;
  lastSynchronized?: string;
}

export interface CertificationScheme {
  id: string;
  name: string;
  code: string;
  badge: string;
  description: string;
  applicableProducts?: string[];
  eligibility?: string;
  basicProcedure?: string[];
  requiredDocuments?: string[];
  importantSteps?: string[];
}

export interface ProductCertificationMapping {
  id: string;
  productName: string;
  category: string;
  applicableScheme: string;
  applicableStandard: string;
  standardTitle: string;
  requiredDocuments?: string[];
  basicProcess?: string[];
}

export interface HuidVerificationResult {
  huid: string;
  isValidFormat: boolean;
  isVerifiedLive: boolean;
  status: 'VERIFIED' | 'INVALID_FORMAT' | 'NOT_FOUND' | 'UNAVAILABLE';
  jewellerRegNo?: string;
  jewellerName?: string;
  jewellerCity?: string;
  ahcCode?: string;
  ahcName?: string;
  metalFineness?: string; // e.g. "22K (916)"
  metal?: string; // e.g. "Gold"
  purityPercent?: string; // e.g. "91.6%"
  hallmarkingDate?: string;
  articleType?: string;
  articleWeight?: string;
  officialSource?: string;
  verifiedAt?: string;
  disclaimer?: string;
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
  certificationDetails?: string;
  officialSource?: string;
  verifiedAt?: string;
}

export interface CrsVerificationResult {
  rNumber: string;
  status: 'ACTIVE' | 'EXPIRED' | 'INVALID' | 'SUSPENDED';
  companyName?: string;
  modelNumbers?: string[];
  productCategory?: string;
  isStandard?: string;
  validTill?: string;
  registrationDetails?: string;
  officialSource?: string;
  verifiedAt?: string;
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
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ComplianceSummary {
  overallStatus: 'COMPLIANT' | 'GAP_FOUND' | 'PARTIAL_COMPLIANCE' | 'AUDIT_READY';
  requirementsMet: number;
  requirementsPending: number;
  missingInformation: string[];
}

export interface AdminSyncRecord {
  id: string;
  sourceName: string;
  dataType: string;
  recordsAdded?: number;
  recordsUpdated?: number;
  recordsRemoved?: number;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  lastRun: string;
  durationMs?: number;
  completedAt?: string;
  recordsProcessed?: number;
  errorsCount?: number;
}

export interface SyncErrorRecord {
  id: string;
  dataset: string;
  errorType: string;
  message: string;
  timestamp: string;
}

export interface SourceHealthMetric {
  name: string;
  endpoint?: string;
  status: 'HEALTHY' | 'WARNING' | 'ERROR' | 'STALE';
  uptimePercentage?: number;
  latencyMs?: number;
  lastChecked: string;
  lastSuccessSync?: string;
  records?: number;
}

export interface HumanReviewQueueItem {
  id: string;
  issue: string;
  type: 'AMBIGUOUS_MAPPING' | 'CONFLICTING_SOURCE' | 'OCR_FAILURE' | 'REGULATORY_UNCERTAINTY';
  source: string;
  dataset?: string;
  created: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_REVIEW' | 'RESOLVED';
  confidenceScore: number;
}
