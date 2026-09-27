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
  Info,
  ExternalLink,
} from 'lucide-react';
import { NavRoute } from '../types';

interface DocumentImageAnalysisPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const DocumentImageAnalysisPage: React.FC<DocumentImageAnalysisPageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'ASSAY' | 'LABEL'>('ASSAY');
  const [isProcessing, setIsProcessing] = useState(false);
  const [assayResult, setAssayResult] = useState<{
    reportId: string;
    centreName: string;
    sampleWeight: string;
    reportedPurity: string;
    karatEquivalent: string;
    xrfElements: { element: string; percentage: number }[];
    testMethod: string;
    conclusion: string;
    caveat: string;
  } | null>({
    reportId: 'AR-2026/09/DL-4482',
    centreName: 'Apex Gold Assaying & Hallmarking Centre (AHC-DL-0012)',
    sampleWeight: '4.821 grams',
    reportedPurity: '916.4 parts per thousand (Au: 91.64%)',
    karatEquivalent: '22 Karat Standard Grade',
    xrfElements: [
      { element: 'Gold (Au)', percentage: 91.64 },
      { element: 'Silver (Ag)', percentage: 5.12 },
      { element: 'Copper (Cu)', percentage: 3.18 },
      { element: 'Zinc (Zn)', percentage: 0.06 },
    ],
    testMethod: 'X-Ray Fluorescence Spectrometry (XRF) per IS 1417 Clause 6.1',
    conclusion: 'Sample conforms to 22 Karat (916) fineness requirements specified in IS 1417 : 2016.',
    caveat: 'Analysis represents non-destructive surface XRF assay on the tested point. Homogeneity of core alloy is not guaranteed for heavily soldered articles.',
  });

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

  const handleSimulateAssayUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <FileSearch size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            Document & Label Analysis Laboratory
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          AI-assisted document parsing for Assay reports, laboratory test certificates, and product packaging labels — highlighting "Detected" vs "Verified" facts.
        </p>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
          <button
            onClick={() => setActiveTab('ASSAY')}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '6px',
              backgroundColor: activeTab === 'ASSAY' ? '#39527B' : '#F1F6FD',
              color: activeTab === 'ASSAY' ? '#FFFFFF' : '#39527B',
            }}
          >
            1. Assay Test Report Explainer (F12)
          </button>
          <button
            onClick={() => setActiveTab('LABEL')}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '6px',
              backgroundColor: activeTab === 'LABEL' ? '#39527B' : '#F1F6FD',
              color: activeTab === 'LABEL' ? '#FFFFFF' : '#39527B',
            }}
          >
            2. Product Label & Mark Scanner (Detected vs Verified)
          </button>
        </div>
      </div>

      {/* TAB 1: Assay Report Explainer */}
      {activeTab === 'ASSAY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '6px' }}>
              Upload Assay / Metallurgical Test Report
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Upload a test report issued by an Assaying & Hallmarking Centre (AHC) or NABL accredited testing laboratory. The system extracts reported purity, elemental breakdown, and caveats without fabricating conclusions.
            </p>

            <div
              style={{
                border: '2px dashed #92BBF8',
                borderRadius: '8px',
                padding: '28px',
                textAlign: 'center',
                backgroundColor: '#F8FAFD',
                cursor: 'pointer',
                marginBottom: '14px',
              }}
              onClick={handleSimulateAssayUpload}
            >
              <Upload size={32} color="#3A74C2" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#2A3C5B' }}>
                {isProcessing ? 'Analyzing Test Document...' : 'Click to Upload Assay Certificate (PDF/Image)'}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                Extracts reported parameters per IS 1417 & IS 15820
              </div>
            </div>
          </div>

          {assayResult && (
            <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  borderBottom: '1px solid #EDF3FB',
                  paddingBottom: '10px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                    PARSED ASSAY CERTIFICATE
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#2A3C5B' }}>
                    {assayResult.reportId}
                  </div>
                </div>
                <span className="badge badge-verified">Extracted & Interpreted</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                  marginBottom: '18px',
                  fontSize: '13px',
                }}
              >
                <div>
                  <span style={{ color: '#64748B', fontSize: '11.5px' }}>Testing Facility:</span>
                  <div style={{ fontWeight: 700, color: '#2A3C5B' }}>{assayResult.centreName}</div>
                </div>

                <div>
                  <span style={{ color: '#64748B', fontSize: '11.5px' }}>Reported Purity (Au):</span>
                  <div style={{ fontWeight: 800, color: '#166534', fontSize: '15px' }}>
                    {assayResult.reportedPurity}
                  </div>
                  <div style={{ color: '#3A74C2', fontWeight: 600 }}>{assayResult.karatEquivalent}</div>
                </div>

                <div>
                  <span style={{ color: '#64748B', fontSize: '11.5px' }}>Sample Weight:</span>
                  <div style={{ fontWeight: 700, color: '#2A3C5B' }}>{assayResult.sampleWeight}</div>
                </div>

                <div>
                  <span style={{ color: '#64748B', fontSize: '11.5px' }}>Test Methodology:</span>
                  <div style={{ color: '#334155' }}>{assayResult.testMethod}</div>
                </div>
              </div>

              {/* Elemental Spectrum Breakdown */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '8px' }}>
                  Spectrometric Elemental Breakdown (XRF)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {assayResult.xrfElements.map((el, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px',
                        backgroundColor: '#F8FAFD',
                        borderRadius: '6px',
                        border: '1px solid #E2EAF5',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>{el.element}</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#39527B', marginTop: '2px' }}>
                        {el.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caveat & Hallucination Guard Alert */}
              <div
                style={{
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  fontSize: '12px',
                  color: '#92400E',
                }}
              >
                <strong>Report Caveat / Scope Limitation:</strong> {assayResult.caveat}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Product Label Scanner (Detected vs Verified) */}
      {activeTab === 'LABEL' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '6px' }}>
              Product Label / Packaging Scanner (F23)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Optical recognition extracts marks from product packaging and compares them with authoritative BIS database records:
            </p>

            {labelResult && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}
              >
                {/* Column 1: Detected Information */}
                <div
                  style={{
                    backgroundColor: '#F8FAFD',
                    border: '1px solid #E2EAF5',
                    borderRadius: '8px',
                    padding: '18px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#2A3C5B' }}>
                      1. Detected on Packaging (Vision OCR)
                    </h4>
                    <span className="badge badge-ai">Detected</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Standard Mark: </span>
                      <strong style={{ color: '#166534' }}>ISI Logo Visible</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Indian Standard: </span>
                      <strong>{labelResult.detected.isStandard}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Visible Licence No: </span>
                      <strong style={{ color: '#3A74C2' }}>{labelResult.detected.cmlNumber}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Brand Printed: </span>
                      <strong>{labelResult.detected.brand}</strong>
                    </div>
                  </div>
                </div>

                {/* Column 2: Officially Verified Information */}
                <div
                  style={{
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '8px',
                    padding: '18px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#166534' }}>
                      2. Authoritative Verification (BIS Database)
                    </h4>
                    <span className="badge badge-verified">Verified</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Licence Status: </span>
                      <strong style={{ color: '#166534' }}>OPERATIVE</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Registered Licensee: </span>
                      <strong>{labelResult.verified.licensee}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Conforming Standard: </span>
                      <strong>{labelResult.verified.standardTitle}</strong>
                    </div>
                    <div style={{ paddingTop: '8px', borderTop: '1px solid #DCFCE7' }}>
                      <span style={{ color: '#166534', fontWeight: 700, fontSize: '12px' }}>
                        ✓ Cross-check Match: Detected CM/L matches official licensee brand.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
