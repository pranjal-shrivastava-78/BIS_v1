import React, { useState, useRef } from 'react';
import {
  FileSearch,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Eye,
  Sparkles,
  ChevronLeft,
  Camera,
  Image as ImageIcon,
  Scan,
  FlaskConical,
  Scale,
} from 'lucide-react';
import { NavRoute } from '../types';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { SegmentedControl } from '../components/common/SegmentedControl';
import { ErrorState } from '../components/common/ErrorState';
import { jewelleryApi } from '../api/jewellery';
import { AssayReportData } from '../types/api';

interface DocumentImageAnalysisPageProps {
  initialTab?: 'document' | 'image' | 'label' | 'assay';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const DocumentImageAnalysisPage: React.FC<DocumentImageAnalysisPageProps> = ({
  initialTab = 'document',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'document' | 'image' | 'label' | 'assay'>(initialTab);

  // Tool D: Assay Report Explainer State (Connected to Parakh FastAPI Backend)
  const [isProcessingAssay, setIsProcessingAssay] = useState(false);
  const [assayError, setAssayError] = useState<string | null>(null);
  const [assayData, setAssayData] = useState<AssayReportData | null>(null);
  const [assayFileName, setAssayFileName] = useState<string | null>(null);

  const assayFileInputRef = useRef<HTMLInputElement>(null);

  // Real backend handler for Assay Report Explainer (POST /api/v1/jewellery/assay-report)
  const handleAssayFile = async (file: File) => {
    setIsProcessingAssay(true);
    setAssayError(null);
    setAssayFileName(file.name);
    try {
      const result = await jewelleryApi.parseAssayReport(file);
      setAssayData(result);
    } catch (err: any) {
      setAssayError(err.message || 'Failed to analyze assay report with Parakh AI service.');
      setAssayData(null);
    } finally {
      setIsProcessingAssay(false);
    }
  };

  const handleAssayInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAssayFile(file);
    }
  };

  const handleTriggerSampleAssay = () => {
    const sampleBlob = new Blob(
      [
        'ASSAY CERTIFICATE\nCentre: AHC-DL-0012 Hallmarking Centre\nReport No: AR-2026/4482\nMetal: Gold (Au)\nReported Purity: 22K (916 Fineness)\nTest Date: 2026-09-20\nSample: 22K Gold Ring with Hallmarking'
      ],
      { type: 'text/plain' }
    );
    const sampleFile = new File([sampleBlob], 'sample_gold_assay_report.txt', { type: 'text/plain' });
    handleAssayFile(sampleFile);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
        <button
          onClick={() => onNavigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: '#3A74C2',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={16} /> Home
        </button>
        <span>/</span>
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Document & Image Lab</span>
      </div>

      {/* Header Banner */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          background: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%)',
          border: '1px solid #D6E4F8',
          borderRadius: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#EAF2FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3A74C2',
              border: '1px solid #C4DCFA',
            }}
          >
            <FileSearch size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              Document & Image Lab
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Specialized analysis tools for test reports, product imagery, BIS packaging labels, and metallurgical assay reports.
            </p>
          </div>
        </div>

        {/* Pill / Segmented Control Bar (Per Section 1 & 2) */}
        <div style={{ marginTop: '16px', borderTop: '1px solid #E2EAF5', paddingTop: '16px' }}>
          <SegmentedControl<'document' | 'image' | 'label' | 'assay'>
            items={[
              {
                id: 'document',
                label: 'Document Analyzer',
                number: 1,
                icon: FileText,
              },
              {
                id: 'image',
                label: 'Image Analyzer',
                number: 2,
                icon: ImageIcon,
              },
              {
                id: 'label',
                label: 'BIS Label Scanner',
                number: 3,
                icon: Scan,
              },
              {
                id: 'assay',
                label: 'Assay Report Explainer',
                number: 4,
                icon: FlaskConical,
              },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />
        </div>
      </div>

      {/* ==================================================
          TOOL A: DOCUMENT ANALYZER (Per Section 11.A)
          ================================================== */}
      {activeTab === 'document' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '12px 16px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '10px', fontSize: '13px', color: '#92400E', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-warning" style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800 }}>Prototype</span>
            <span>Prototype — backend integration pending</span>
          </div>

          <div className="card" style={{ padding: '36px 24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F1F6FD', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#3A74C2' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
              Technical Document Analyzer
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '540px', margin: '0 auto 16px', lineHeight: 1.5 }}>
              Prototype — backend integration pending. General document OCR and technical certificate parsing endpoints are planned for a subsequent backend release.
            </p>
            <div style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '20px', backgroundColor: '#F8FAFD', border: '1px solid #D6E4F8', color: '#475569', fontSize: '12px' }}>
              Note: For gold jewellery assay report parsing, please use Tab 4 (Assay Report Explainer), which is integrated live with the Parakh backend.
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          TOOL B: IMAGE ANALYZER (Per Section 11.B)
          ================================================== */}
      {activeTab === 'image' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '12px 16px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '10px', fontSize: '13px', color: '#92400E', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-warning" style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800 }}>Prototype</span>
            <span>Prototype — backend integration pending</span>
          </div>

          <div className="card" style={{ padding: '36px 24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F1F6FD', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#3A74C2' }}>
              <ImageIcon size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
              Product & Object Image Classifier
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '540px', margin: '0 auto 16px', lineHeight: 1.5 }}>
              Prototype — backend integration pending. General product classification models are not yet deployed in the backend API.
            </p>
            <div style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '20px', backgroundColor: '#F8FAFD', border: '1px solid #D6E4F8', color: '#475569', fontSize: '12px' }}>
              Note: Gold hallmark optical mark recognition is supported live in Hallmarking & Jewellery &rarr; Optical Hallmark Scanner.
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          TOOL C: BIS LABEL SCANNER (Per Section 11.C)
          ================================================== */}
      {activeTab === 'label' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '12px 16px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '10px', fontSize: '13px', color: '#92400E', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-warning" style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800 }}>Prototype</span>
            <span>Prototype — backend integration pending</span>
          </div>

          <div className="card" style={{ padding: '36px 24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F1F6FD', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#3A74C2' }}>
              <Scan size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
              BIS Packaging Label Scanner
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '540px', margin: '0 auto 16px', lineHeight: 1.5 }}>
              Prototype — backend integration pending. Direct optical scanning of packaged ISI labels is pending backend endpoint integration.
            </p>
            <div style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '20px', backgroundColor: '#F8FAFD', border: '1px solid #D6E4F8', color: '#475569', fontSize: '12px' }}>
              Note: To verify CM/L licence numbers or CRS R-numbers immediately, please use the Verification Hub.
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          TOOL D: ASSAY REPORT EXPLAINER (Connected to Backend)
          ================================================== */}
      {activeTab === 'assay' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="file"
            ref={assayFileInputRef}
            onChange={handleAssayInputFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            style={{ display: 'none' }}
          />

          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px', padding: '4px 12px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', fontSize: '12px', color: '#166534', fontWeight: 700 }}>
              <FlaskConical size={14} /> Backend-Powered Metallurgical Parser (/api/v1/jewellery/assay-report)
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
              Assay Report Explainer & Purity Decoder
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '600px', margin: '0 auto 18px', lineHeight: 1.5 }}>
              Upload any laboratory gold assay certificate, fire assay test sheet, or cupellation report. The backend parser extracts certified parameters, validates legal limits per IS 1417, and produces a plain consumer explanation.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => assayFileInputRef.current?.click()}
                className="btn btn-primary"
                disabled={isProcessingAssay}
              >
                <Upload size={16} />
                Upload Assay Certificate (PDF / Image)
              </button>
              <button
                onClick={handleTriggerSampleAssay}
                className="btn btn-secondary"
                disabled={isProcessingAssay}
              >
                <FlaskConical size={16} />
                Load Sample Certificate (22K Gold)
              </button>
            </div>
          </div>

          {assayError && (
            <ErrorState
              title="Assay Report Parsing Error"
              message={assayError}
              apiEndpoint="/api/v1/jewellery/assay-report"
              onRetry={() => assayFileInputRef.current?.click()}
            />
          )}

          {isProcessingAssay ? (
            <LoadingSkeleton type="detail" count={1} message="Sending assay certificate to Parakh AI metallurgical service..." />
          ) : assayData ? (
            <div className="card" style={{ padding: '28px', backgroundColor: '#FFFFFF', border: '1.5px solid #3A74C2', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #E2EAF5', paddingBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span className="badge badge-sky">Certificate #{assayData.report_number}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginTop: '4px' }}>
                    Metal: {assayData.metal} • Certified Purity: <span style={{ color: '#B45309' }}>{assayData.reported_purity}</span>
                  </h3>
                </div>
                <span className="badge badge-verified">Conforms to IS 1417 (916 Fineness)</span>
              </div>

              {/* Parsed Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Testing Centre / Lab</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginTop: '3px' }}>
                    {assayData.centre_name}
                  </div>
                </div>

                <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Report Number</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#3A74C2', marginTop: '3px' }}>
                    {assayData.report_number}
                  </div>
                </div>

                <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Sample Description</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D2B42', marginTop: '3px' }}>
                    {assayData.sample_description}
                  </div>
                </div>

                <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Test Date</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#166534', marginTop: '3px' }}>
                    {assayData.test_date}
                  </div>
                </div>
              </div>

              {/* Explanation in Plain Language */}
              <div style={{ padding: '18px', backgroundColor: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#166534', marginBottom: '6px' }}>
                  Consumer Explanation (Plain Language)
                </h4>
                <p style={{ fontSize: '13.5px', color: '#14532D', lineHeight: 1.6 }}>
                  According to official laboratory assay certificate <strong>#{assayData.report_number}</strong> issued by <strong>{assayData.centre_name}</strong> on {assayData.test_date}, the tested sample (<em>{assayData.sample_description}</em>) possesses a verified purity of <strong>{assayData.reported_purity}</strong> in {assayData.metal}. This purity rating conforms with the mandatory purity threshold stipulated under Indian Standard IS 1417 for genuine hallmarked jewellery.
                </p>
              </div>

              <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '12px', fontSize: '12px', color: '#64748B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Source: <strong>Parakh Jewellery Backend API</strong></span>
                <span>File: {assayFileName || 'assay_certificate'}</span>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
