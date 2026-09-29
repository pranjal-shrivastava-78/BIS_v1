import {
  AdminSyncRecord,
  SourceHealthMetric,
  HumanReviewQueueItem,
  SyncErrorRecord,
} from '../types';

export interface AdminOverviewStats {
  totalStandards: number;
  totalQcos: number;
  certificationSchemes: number;
  laboratories: number;
  hallmarkingCentres: number;
  jewellers: number;
  verificationRequests: number;
  activeSources: number;
  lastSyncTimestamp: string;
}

export const MOCK_ADMIN_STATS: AdminOverviewStats = {
  totalStandards: 21480,
  totalQcos: 672,
  certificationSchemes: 6,
  laboratories: 840,
  hallmarkingCentres: 1520,
  jewellers: 18450,
  verificationRequests: 142390,
  activeSources: 8,
  lastSyncTimestamp: 'Today, 08:30 AM IST',
};

export const MOCK_SOURCE_HEALTH: SourceHealthMetric[] = [
  {
    name: 'BIS e-Manak Portal (Standards & Licences)',
    endpoint: 'https://www.services.bis.gov.in/emanak',
    status: 'HEALTHY',
    uptimePercentage: 99.8,
    latencyMs: 142,
    lastChecked: '5 mins ago',
    lastSuccessSync: 'Today, 08:30 AM',
    records: 21480,
  },
  {
    name: 'The Gazette of India (QCO Gazette Orders)',
    endpoint: 'https://egazette.gov.in/rss/dpiit-orders',
    status: 'HEALTHY',
    uptimePercentage: 99.4,
    latencyMs: 210,
    lastChecked: '12 mins ago',
    lastSuccessSync: 'Today, 08:15 AM',
    records: 672,
  },
  {
    name: 'BIS Central Hallmarking Database (HUID Repository)',
    endpoint: 'https://hallmarking.bis.gov.in/api/v2/registry',
    status: 'HEALTHY',
    uptimePercentage: 99.9,
    latencyMs: 98,
    lastChecked: '2 mins ago',
    lastSuccessSync: 'Today, 08:28 AM',
    records: 18450,
  },
  {
    name: 'BIS LIMS Portal (Recognized Laboratories)',
    endpoint: 'https://lims.bis.gov.in/directory/feed',
    status: 'HEALTHY',
    uptimePercentage: 98.7,
    latencyMs: 340,
    lastChecked: '20 mins ago',
    lastSuccessSync: 'Yesterday, 11:45 PM',
    records: 840,
  },
  {
    name: 'MeitY CRS Portal (Electronics Registration)',
    endpoint: 'https://www.crsbis.in/BIS/publicfeed',
    status: 'WARNING',
    uptimePercentage: 96.2,
    latencyMs: 780,
    lastChecked: '15 mins ago',
    lastSuccessSync: 'Yesterday, 06:12 PM',
    records: 4320,
  },
  {
    name: 'NABL India Testing Laboratories Directory',
    endpoint: 'https://nabl-india.org/accredited-facilities',
    status: 'HEALTHY',
    uptimePercentage: 99.1,
    latencyMs: 185,
    lastChecked: '30 mins ago',
    lastSuccessSync: 'Today, 04:00 AM',
    records: 3950,
  },
];

export const MOCK_SYNC_RUNS: AdminSyncRecord[] = [
  {
    id: 'sync-01',
    sourceName: 'e-Manak Standards Catalogue',
    dataType: 'Indian Standards (IS)',
    recordsProcessed: 124,
    recordsAdded: 4,
    recordsUpdated: 18,
    recordsRemoved: 0,
    status: 'SUCCESS',
    lastRun: 'Today, 08:30 AM',
    completedAt: 'Today, 08:32 AM',
    durationMs: 12480,
    errorsCount: 0,
  },
  {
    id: 'sync-02',
    sourceName: 'Gazette of India RSS Feed',
    dataType: 'QCO Orders & Amendments',
    recordsProcessed: 32,
    recordsAdded: 2,
    recordsUpdated: 5,
    recordsRemoved: 0,
    status: 'SUCCESS',
    lastRun: 'Today, 08:15 AM',
    completedAt: 'Today, 08:16 AM',
    durationMs: 4120,
    errorsCount: 0,
  },
  {
    id: 'sync-03',
    sourceName: 'BIS Hallmarking HUID Stream',
    dataType: 'AHC & Jeweller Licences',
    recordsProcessed: 450,
    recordsAdded: 28,
    recordsUpdated: 64,
    recordsRemoved: 1,
    status: 'SUCCESS',
    lastRun: 'Today, 08:28 AM',
    completedAt: 'Today, 08:29 AM',
    durationMs: 8940,
    errorsCount: 0,
  },
  {
    id: 'sync-04',
    sourceName: 'MeitY CRS Public Feed',
    dataType: 'Electronic R-Numbers',
    recordsProcessed: 88,
    recordsAdded: 12,
    recordsUpdated: 4,
    recordsRemoved: 0,
    status: 'WARNING',
    lastRun: 'Yesterday, 06:12 PM',
    completedAt: 'Yesterday, 06:15 PM',
    durationMs: 18230,
    errorsCount: 2,
  },
  {
    id: 'sync-05',
    sourceName: 'BIS LIMS Laboratory Registry',
    dataType: 'Testing Facilities & Accreditation',
    recordsProcessed: 16,
    recordsAdded: 1,
    recordsUpdated: 3,
    recordsRemoved: 0,
    status: 'SUCCESS',
    lastRun: 'Yesterday, 11:45 PM',
    completedAt: 'Yesterday, 11:46 PM',
    durationMs: 5410,
    errorsCount: 0,
  },
];

export const MOCK_SYNC_ERRORS: SyncErrorRecord[] = [
  {
    id: 'err-01',
    dataset: 'MeitY CRS Public Feed',
    errorType: 'SCHEMA_VALIDATION_ERROR',
    message: 'Record model array contained invalid null identifier for R-41098231.',
    timestamp: 'Yesterday, 06:14 PM',
  },
  {
    id: 'err-02',
    dataset: 'MeitY CRS Public Feed',
    errorType: 'TIMEOUT_RETRY_EXCEEDED',
    message: 'HTTP 504 Gateway Timeout while retrieving pagination index page 42.',
    timestamp: 'Yesterday, 06:13 PM',
  },
  {
    id: 'err-03',
    dataset: 'Gazette OCR Processing',
    errorType: 'OCR_UNREADABLE_CHARACTER',
    message: 'Low confidence score (<65%) on scanned gazette table footer for S.O. 1290(E). Item routed to Human Review Queue.',
    timestamp: '24 Sep 2026, 11:22 AM',
  },
];

export const MOCK_REVIEW_QUEUE: HumanReviewQueueItem[] = [
  {
    id: 'rev-01',
    issue: 'Potential ambiguous product mapping: "Smart Thermal Beverage Flask" matches both IS 17526 (Utensils) and IS 302-2-15 (Electrical Appliances).',
    type: 'AMBIGUOUS_MAPPING',
    source: 'Automated Catalog Ingestion Engine',
    dataset: 'Product Taxonomy',
    created: 'Today, 07:45 AM',
    priority: 'HIGH',
    status: 'PENDING',
    confidenceScore: 0.68,
  },
  {
    id: 'rev-02',
    issue: 'Discrepancy in QCO effective enforcement date between DPIIT press release (01 Aug) and official gazette notification (15 Aug).',
    type: 'CONFLICTING_SOURCE',
    source: 'Gazette Cross-Validator',
    dataset: 'QCO Orders',
    created: 'Yesterday, 03:15 PM',
    priority: 'HIGH',
    status: 'IN_REVIEW',
    confidenceScore: 0.54,
  },
  {
    id: 'rev-03',
    issue: 'OCR text recognition uncertainty on Clause 5.2.1 formula in Amendment 3 PDF for IS 1554 (Part 1).',
    type: 'OCR_FAILURE',
    source: 'Document OCR Pipeline',
    dataset: 'Standards Clauses',
    created: '26 Sep 2026',
    priority: 'MEDIUM',
    status: 'PENDING',
    confidenceScore: 0.62,
  },
  {
    id: 'rev-04',
    issue: 'Laboratory address mismatch: BIS LIMS address differs from updated MCA filing corporate address for ERDA Vadodara.',
    type: 'REGULATORY_UNCERTAINTY',
    source: 'LIMS Reconciliation Job',
    dataset: 'Testing Laboratories',
    created: '25 Sep 2026',
    priority: 'LOW',
    status: 'RESOLVED',
    confidenceScore: 0.82,
  },
];
