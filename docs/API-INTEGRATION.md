# BIS Parakh — Complete Frontend ↔ Backend Integration Matrix

This document provides the authoritative integration matrix between the **BIS Parakh Frontend** (`BIS_v1`) and the **Parakh FastAPI Backend** (`https://github.com/yuvraj-dw/Parakh`).

The backend acts as the single source of truth for all supported regulatory, verification, and laboratory datasets.

---

## 1. Environment & API Configuration

| Variable | Local Development Value | Production Example | Description |
|---|---|---|---|
| `VITE_API_URL` | `http://localhost:8000/api/v1` | `https://api.bis-parakh.gov.in/api/v1` | Base URL for centralized REST client |

---

## 2. Integration Status Matrix

| Frontend Feature / Page | Backend Endpoint | HTTP Method | Request Payload / Params | Response Structure | Status | Notes |
|---|---|---|---|---|---|---|
| **Standards Explorer** | `/standards` | `GET` | `?query=...&status=...&page=...&page_size=...` | `PaginatedResponse<StandardOut>` | **Connected** | Authoritative list with server-side pagination |
| **Standard Details** | `/standards/{is_number}` | `GET` | Path param `{is_number}` | `StandardOut` | **Connected** | Scope, year, status, and metadata from backend |
| **QCO Explorer** | `/qco` | `GET` | `?ministry=...&status=...&page=...&page_size=...` | `PaginatedResponse<QcoOut>` | **Connected** | Mandatory gazette orders with server pagination |
| **QCO Details** | `/qco/{id}` | `GET` | Path param `{id}` | `QcoOut` | **Connected** | Single QCO details |
| **Certification Schemes** | `/certification/schemes` | `GET` | None | `List<CertificationSchemeOut>` | **Connected** | Official schemes (Scheme-I ISI, Scheme-II CRS, Hallmarking, Eco Mark, MSCS) |
| **Product to Standard Mapping** | `/certification/map-product` | `POST` | `{"description": "..."}` | `ProductStandardMappingResponse` | **Connected** | ML/heuristic candidate standard matching |
| **Testing Laboratories** | `/laboratories` | `GET` | `?state=...&city=...&page=...&page_size=...` | `PaginatedResponse<LaboratoryOut>` | **Connected** | Recognized testing labs registry |
| **Laboratory Details** | `/laboratories/{code}` | `GET` | Path param `{code}` | `LaboratoryOut` | **Connected** | Single laboratory details |
| **Hallmarking Centres (AHC)** | `/hallmarking/centres` | `GET` | `?state=...&city=...&page=...&page_size=...` | `PaginatedResponse<HallmarkingCentreOut>` | **Connected** | Recognized Assaying & Hallmarking Centres |
| **Licensed Jewellers** | `/jewellers` | `GET` | `?state=...&city=...&page=...&page_size=...` | `PaginatedResponse<JewellerOut>` | **Connected** | BIS licensed jewellers registry |
| **HUID Verification** | `/verification/huid` | `POST` | `{"huid": "..."}` | `VerificationResponse` | **Connected** | Real verification against central database/provider |
| **Licence (CM/L) Verification** | `/verification/licence` | `POST` | `{"licence_number": "..."}` | `VerificationResponse` | **Connected** | Real e-Manak licence lookup |
| **CRS R-Number Verification** | `/verification/r-number` | `POST` | `{"r_number": "..."}` | `VerificationResponse` | **Connected** | Real MeitY/BIS CRS registration verification |
| **Hallmark Optical Scanner** | `/jewellery/scan` | `POST` | `multipart/form-data` (`file`) | `JewelleryScanDetection` | **Connected** | Neural mark detection (HUID, BIS logo, fineness, confidence) |
| **Assay Report Explainer** | `/jewellery/assay-report` | `POST` | `multipart/form-data` (`file`) | `AssayReportData` | **Connected** | Certified purity, laboratory name, test date & plain language analysis |
| **AI Assistant (Query)** | `/chat` | `POST` | `{"message": "...", "conversation_id": "..."}` | `ChatResponse` (`answer`, `citations`) | **Connected** | Real RAG/AI answering with authentic database citations |
| **Conversation List** | `/chat/conversations` | `GET` | None | `List<ConversationOut>` | **Connected** | Persisted chat history sessions |
| **Conversation Messages** | `/chat/conversations/{id}/messages` | `GET` | Path param `{id}` | `List<ChatMessageOut>` | **Connected** | Loaded message log with authentic citations |
| **User Registration** | `/auth/register` | `POST` | `{"email": "...", "password": "...", "role": "..."}` | `UserResponse` | **Connected** | Direct backend user registration |
| **User Login** | `/auth/login` | `POST` | `{"email": "...", "password": "..."}` | `TokenResponse` (`access_token`, `role`) | **Connected** | JWT bearer token generation & localStorage injection |
| **Current User Profile** | `/auth/me` | `GET` | Bearer Token Header | `UserResponse` | **Connected** | Session validation and role check |
| **Source Endpoint Health** | `/admin/source-health` | `GET` | Bearer Token Header | `SourceHealthResponse` | **Connected** | Official portal ping diagnostics |
| **Admin Sync Runs** | `/admin/sync/runs` | `GET` | `?page=...&page_size=...` | `PaginatedResponse<SyncRunOut>` | **Connected** | Real ingested sync history and record counts |
| **Admin Sync Errors** | `/admin/sync/errors` | `GET` | `?page=...&page_size=...` | `PaginatedResponse<SyncErrorOut>` | **Connected** | Gazette & feed parsing error logs |
| **Manual Feed Trigger** | `/admin/sync/{dataset}` | `POST` | Path param `{dataset}` | `SyncRunResult` | **Connected** | Ingestion pipeline invocation |
| **Compliance Gap Analysis** | *None* | N/A | N/A | Local static rules | **Frontend-only** | Advisory compliance checklist clearly badged as prototype |
| **Technical Document Analyzer** | *None* | N/A | N/A | Local OCR extraction | **Frontend-only** | Demonstrator clearly badged as prototype |
| **Product Image Analyzer** | *None* | N/A | N/A | Local feature tagging | **Frontend-only** | Demonstrator clearly badged as prototype |
| **BIS Label Packaging Scanner** | *None* | N/A | N/A | Local OCR detection | **Frontend-only** | Demonstrator clearly badged as prototype; formal verification routes live in Verification Hub |

---

## 3. Data Integrity & Architecture Guarantees

1. **No Mock Fallbacks in try/catch**: If a backend API call fails or the server is unavailable, the frontend renders an `<ErrorState>` component with a `Retry` action, never substituting fake success data.
2. **Authoritative Pagination**: List endpoints utilize `page`, `page_size`, `total_items`, `total_pages`, `has_next`, and `has_prev` returned from the backend.
3. **Strict Type Contracts**: All TypeScript interfaces in `src/types/api.ts` mirror the Pydantic schemas in `app/schemas/` and `app/models/`.
4. **Secure Token Handling**: JWT Bearer tokens are stored in `localStorage` and dispatched via `Authorization: Bearer <token>` in `src/api/client.ts`. Secrets and passwords are never persisted.
