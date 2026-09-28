import React, { useState } from 'react';
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
  ExternalLink,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { NavRoute } from '../types';

interface DocumentImageAnalysisPageProps {
  initialTab?: 'document' | 'image' | 'hallmark' | 'assay' | 'label';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const DocumentImageAnalysisPage: React.FC<DocumentImageAnalysisPageProps> = ({
  initialTab = 'document',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'document' | 'image' | 'hallmark' | 'assay' | 'label'>(initialTab);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Analysis result state
  const [docResult, setDocResult] = useState<{
    fileName: string;
    docType: string;
    identifiedStandard: string;
    clausesReferenced: string[];
    complianceStatus: string;
    findings: string;
  } | null>(null);

  const [labelResult, setLabelResult] = useState<{
    detected: {
      isiLogo: boolean;
      isStandard: string;
      cmlNumber: string;
      brand: string;
    };
    verified: {
      isOperative: boolean;
      licensee: string;
      standardTitle: string;
      status: string;
    };
  } | null>({
    detected: {
      isiLogo: true,
      isStandard: 'IS 17526',
      cmlNumber: 'CM/L-7200142981',
      brand: 'MILTON PRO',
    },
    verified: {
      isOperative: true,
      licensee: 'Milton Flasks & Home Appliances Pvt. Ltd.',
      standardTitle: 'Stainless Steel Vacuum Flasks (IS 17526:2021)',
      status: 'OPERATIVE & VERIFIED IN BIS REGISTRY',
    },
  });

  const handleSimulateDocumentUpload = (type: string) => {
    setIsProcessing(true);
    setUploadedFileName(`Sample_${type.replace(/\s+/g, '_')}.pdf`);
    setTimeout(() => {
      setIsProcessing(false);
      setDocResult({
        fileName: `Sample_${type.replace(/\s+/g, '_')}.pdf`,
        docType: type,
        identifiedStandard: 'IS 17526 : 2021',
        clausesReferenced: ['Clause 4.1 Material Specification', 'Clause 5.2 Thermal Retention Test'],
        complianceStatus: 'PARTIAL COMPLIANCE (1 Test Pending)',
        findings: 'Material conforms to SS 304 food-grade requirements. Thermal test curve satisfies 6-hour retention requirement above 65°C.',
      });
    }, 600);
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
        <button
          onClick={() => onNavigate('/analysis-tools')}
          style={{ color: '#3A74C2', fontWeight: 600, cursor: 'pointer' }}
        >
          Analysis & Consumer Tools
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#EAF2FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3A74C2',
            }}
          >
            <FileSearch size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              Document & Image Lab
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>
              Upload documents or images for multimodal compliance analysis (product specifications, test reports, hallmarks, or ISI labels).
            </p>
          </div>
        </div>

        {/* 5 Sub-Feature Navigation Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            marginTop: '20px',
            borderTop: '1px solid #E2EAF5',
            paddingTop: '16px',
          }}
        >
          {[
            { id: 'document', title: '1. Document Analysis', desc: 'Specs, test reports, compliance docs' },
            { id: 'image', title: '2. Image Analysis', desc: 'Product labels, marks & identifiers' },
            { id: 'hallmark', title: '3. Hallmark Scanner', desc: 'Laser HUID & fineness stamps' },
            { id: 'assay', title: '4. Assay Explainer', desc: 'Deconstruct XRF & assay reports' },
            { id: 'label', title: '5. BIS Label Scanner', desc: 'ISI mark & CM/L verification' },
          ].map((sub) => {
            const isActive = activeTab === sub.id;
            return (
              <div
                key={sub.id}
                onClick={() => setActiveTab(sub.id as any)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? '#EAF2FE' : '#FFFFFF',
                  border: isActive ? '1.5px solid #3A74C2' : '1px solid #D6E4F8',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: isActive ? '#1D2B42' : '#39527B' }}>
                  {sub.title}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  {sub.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-Feature 1: Document Analysis */}
      {activeTab === 'document' && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '4px' }}>
              Statutory Document Analysis
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Upload your technical documentation to compare clauses and extract conformity parameters.
            </p>
          </div>

          <div
            style={{
              border: '2px dashed #C4DCFA',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              backgroundColor: '#F8FAFD',
            }}
          >
            <Upload size={36} color="#3A74C2" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D2B42' }}>
              Drag and drop document or choose sample below
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
              Supports PDF, DOCX, scanned reports up to 25MB.
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                'Product Specification',
                'Independent Test Report',
                'Factory Quality Manual',
                'Assay Report',
              ].map((docType) => (
                <button
                  key={docType}
                  onClick={() => handleSimulateDocumentUpload(docType)}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '6px' }}
                >
                  Analyze Sample {docType}
                </button>
              ))}
            </div>
          </div>

          {isProcessing && (
            <div style={{ padding: '16px', backgroundColor: '#F0F6FE', borderRadius: '10px', textAlign: 'center', color: '#1E40AF', fontSize: '13px' }}>
              Parsing document structure, extracting clause identifiers, and verifying against BIS standards index...
            </div>
          )}

          {docResult && !isProcessing && (
            <div style={{ padding: '20px', backgroundColor: '#F8FAFD', border: '1px solid #D6E4F8', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <strong style={{ fontSize: '15px', color: '#1D2B42' }}>
                  Analysis Report: {docResult.fileName}
                </strong>
                <span className="badge badge-warning">{docResult.complianceStatus}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div><strong>Document Type:</strong> {docResult.docType}</div>
                <div><strong>Mapped Standard:</strong> {docResult.identifiedStandard}</div>
              </div>

              <div style={{ marginTop: '12px', fontSize: '13px', color: '#334155' }}>
                <strong>Identified Clauses:</strong>
                <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                  {docResult.clausesReferenced.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '12px', padding: '10px', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2EAF5', fontSize: '13px', color: '#1E293B' }}>
                <strong>Technical Summary:</strong> {docResult.findings}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 2 & 5: Image Analysis & BIS Label Scanner */}
      {(activeTab === 'image' || activeTab === 'label') && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '4px' }}>
              BIS Mark / ISI Label Optical Scanner
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Examine product packaging to verify standard number, CM/L licence number, and brand consistency against the central registry.
            </p>
          </div>

          <div
            style={{
              border: '2px dashed #C4DCFA',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
              backgroundColor: '#F8FAFD',
            }}
          >
            <Camera size={36} color="#3A74C2" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D2B42' }}>
              Upload Product Label or Nameplate Photo
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
              Evaluates ISI mark geometry, font typography, and mandatory standard inscription.
            </div>
          </div>

          {labelResult && (
            <div style={{ padding: '20px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <CheckCircle2 size={20} color="#166534" />
                <strong style={{ fontSize: '15px', color: '#166534' }}>
                  {labelResult.verified.status}
                </strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div><strong>Standard:</strong> {labelResult.detected.isStandard}</div>
                <div><strong>CM/L Licence:</strong> {labelResult.detected.cmlNumber}</div>
                <div><strong>Registered Licensee:</strong> {labelResult.verified.licensee}</div>
                <div><strong>Scope Title:</strong> {labelResult.verified.standardTitle}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 3: Hallmark Scanner & Sub-Feature 4: Assay Explainer */}
      {(activeTab === 'hallmark' || activeTab === 'assay') && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
              {activeTab === 'hallmark' ? 'Jewellery Hallmark Scanner' : 'Assay Report Explainer'}
            </h3>
            <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '20px' }}>
              For comprehensive hallmarking tools and AHC directory integration, access the dedicated hallmarking suite.
            </p>
            <button
              onClick={() => onNavigate('/hallmarking', { subFeature: activeTab === 'hallmark' ? 'scanner' : 'assay' })}
              className="btn btn-primary"
              style={{ borderRadius: '8px', padding: '10px 24px' }}
            >
              Open in Hallmarking Suite &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
