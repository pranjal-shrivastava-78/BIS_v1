/**
 * BIS Parakh - FastAPI Backend Integration Types
 * Strictly reflects backend Pydantic schemas from Parakh FastAPI service.
 */

export interface PaginationMeta {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  request_id?: string;
  details?: any;
}

export interface ApiErrorEnvelope {
  error: ApiErrorDetail;
}

// 1. Standards
export interface StandardOut {
  id: string;
  is_number: string;
  title: string;
  year?: number | null;
  status: string;
  scope?: string | null;
  source_name: string;
  source_url?: string | null;
  last_verified_at: string;
}

// 2. QCO
export interface QCOOut {
  id: string;
  qco_number?: string | null;
  title: string;
  product_name: string;
  is_number: string;
  ministry: string;
  notification_number?: string | null;
  notification_date?: string | null;
  effective_date?: string | null;
  status: string;
  source_url?: string | null;
}

// 3. Certification Schemes & Product Mapping
export interface CertificationSchemeOut {
  id?: string;
  scheme_code: string;
  name: string;
  description?: string;
  procedure: string;
}

export interface ProductMappingRequest {
  description: string;
}

export interface ProductMappingResponse {
  candidate_standard: string;
  standard_title: string;
  is_mandatory: boolean;
  applicable_qco: string;
  certification_scheme: string;
  confidence: number;
  reasoning: string;
}

// 4. Laboratories
export interface LaboratoryOut {
  id: string;
  recognition_code: string;
  name: string;
  address?: string | null;
  city: string;
  district?: string | null;
  state: string;
  pincode?: string | null;
  status: string;
  valid_from?: string | null;
  valid_until?: string | null;
}

// 5. Hallmarking Centres
export interface AHCCentreOut {
  id: string;
  recognition_number: string;
  name: string;
  city: string;
  district?: string | null;
  state: string;
  status: string;
  metal_capabilities?: string[];
}

// 6. Licensed Jewellers
export interface JewellerOut {
  id: string;
  registration_number: string;
  name: string;
  city: string;
  district?: string | null;
  state: string;
  metal_category?: string | null;
  status: string;
}

// 7. Verification
export type VerificationStatus = 'VERIFIED' | 'NOT_FOUND' | 'EXPIRED' | 'SUSPENDED' | 'ERROR';

export interface VerificationResponse {
  status: VerificationStatus;
  normalized_identifier: string;
  source_name: string;
  source_url?: string | null;
  retrieved_at: string;
  data?: Record<string, any> | null;
  notes?: string | null;
}

// 8. Vision / Scanner & Assay
export interface JewelleryScanDetection {
  detected_huid?: string | null;
  detected_fineness?: string | null;
  detected_bis_logo: boolean;
  confidence_score: number;
}

export interface AssayReportData {
  report_number?: string | null;
  centre_name?: string | null;
  metal?: string | null;
  reported_purity?: string | null;
  test_date?: string | null;
  sample_description?: string | null;
}

// 9. AI Chat Assistant
export interface ChatRequest {
  message?: string;
  query?: string;
  conversation_id?: string;
}

export interface ChatResponse {
  conversation_id: string;
  answer: string;
  citations: Array<{
    title?: string;
    is_number?: string;
    clause?: string;
    source_url?: string;
    [key: string]: any;
  }>;
}

export interface ConversationOut {
  id: string;
  title: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ChatMessageOut {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<Record<string, any>>;
  created_at?: string | null;
}

// 10. Authentication
export interface UserResponse {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  role: string;
  user_id: string;
}

// 11. Admin Operations
export interface SyncRunOut {
  id: string;
  dataset: string;
  status: string;
  records_seen: number;
  records_created: number;
  records_updated: number;
  records_deactivated: number;
  source: string;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface SyncErrorOut {
  id: string;
  sync_run_id?: string | null;
  item_identifier?: string | null;
  error_type: string;
  message: string;
  raw_payload?: Record<string, any> | null;
  created_at?: string | null;
}

export interface SourceHealthSource {
  name: string;
  status: string;
  endpoint?: string;
  type?: string;
  last_checked_at?: string;
}

export interface SourceHealthOut {
  status: string;
  sources: SourceHealthSource[];
  checked_at: string;
}

export interface TriggerSyncResponse {
  dataset: string;
  status: string;
  records_seen: number;
  records_created: number;
  records_updated: number;
  records_deactivated: number;
  errors: number;
  sync_run_id?: string;
}
