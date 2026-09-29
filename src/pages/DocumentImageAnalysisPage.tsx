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

interface DocumentImageAnalysisPageProps {
  initialTab?: 'document' | 'image' | 'label' | 'assay';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const DocumentImageAnalysisPage: React.FC<DocumentImageAnalysisPageProps> = ({
  initialTab = 'document',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'document' | 'image' | 'label' | 'assay'>(initialTab);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Tool A: Document Analyzer State
  const [docResult, setDocResult] = useState<{
    fileName: string;
    docType: string;
    extractedInfo: Record<string, string>;
    importantFields: { field: string; value: string; status: 'VALID' | 'WARNING' }[];
    detectedStandards: string[];
    complianceObservations: string[];
    summary: string;
  } | null>(null);

  // Tool B: Image Analyzer State
  const [imageResult, setImageResult] = useState<{
    detectedObjects: string[];
    classification: string;
    relevantBisInfo: string;
    confidence: number;
    explanation: string;
  } | null>(null);

  // Tool C: BIS Label Scanner State
  const [labelResult, setLabelResult] = useState<{
    bisMarkDetected: boolean;
    cmlNumber: string;
    standardNumber: string;
    productInformation: string;
    detectedText: string;
    verificationSummary: string;
    isOperative: boolean;
  } | null>(null);

  // Tool D: Assay Report Explainer State
  const [assayResult, setAssayResult] = useState<{
    reportType: string;
    metal: string;
    purity: string;
    testResults: { parameter: string; foundValue: string; statutoryLimit: string; pass: boolean }[];
    importantValues: { key: string; val: string }[];
    explanationSimpleLanguage: string;
    potentialInconsistencies: string[];
    summary: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulation handler for Document Analyzer
  const handleSimulateDocument = (docName: string) => {
    setIsProcessing(true);
    setUploadedFileName(docName);
    setTimeout(() => {
      setIsProcessing(false);
      setDocResult({
        fileName: docName,
        docType: 'Mill Test Certificate & Factory Quality Control Docket',
        extractedInfo: {
          'Manufacturer': 'Apex Metal Containers Pvt. Ltd.',
          'Material Heat Number': 'HT-2026-SS-0982',
          'Alloy Chemistry': 'Cr: 18.25%, Ni: 8.35%, C: 0.042%, Mn: 1.65%',
          'Report Date': '15 September 2026',
        },
        importantFields: [
          { field: 'Material Grade Specification', value: 'SS 304 (04Cr18Ni10) conforming to IS 6911', status: 'VALID' },
          { field: 'Chemical Ladle Analysis', value: 'Within austenitic SS 304 food-grade envelope', status: 'VALID' },
          { field: 'Traceability Heat Marking', value: 'Heat number etched on coil batch tag', status: 'VALID' },
          { field: 'Migration Test Endorsement', value: 'Overall migration test per IS 9845 report reference missing', status: 'WARNING' },
        ],
        detectedStandards: ['IS 17526 : 2021', 'IS 6911 : 2017', 'IS 9845'],
        complianceObservations: [
          'Raw material grade complies with Clause 4.1 food-grade stainless steel requirement.',
          'Yield strength (245 MPa) and Tensile strength (580 MPa) comply with IS 6911 coupon criteria.',
          'Action Required: Append third-party silicone stopper migration test report to finalize docket.',
        ],
        summary:
          'The uploaded document is a valid manufacturer mill test certificate confirming SS 304 austenitic steel quality for insulated water bottles under IS 17526. Technical compliance is 90% complete.',
      });
    }, 450);
  };

  // Simulation handler for Image Analyzer
  const handleSimulateImage = (imgName: string) => {
    setIsProcessing(true);
    setUploadedFileName(imgName);
    setTimeout(() => {
      setIsProcessing(false);
      setImageResult({
        detectedObjects: ['Domestic Potable Water Container', 'Double-Walled Stainless Body', 'Polypropylene Stopper', 'Embossed Standard Mark'],
        classification: 'Insulated Domestic Vacuum Flask (Utensil Category)',
        relevantBisInfo:
          'Subject to the mandatory Cookware and Insulated Flasks (Quality Control) Order, 2023 under Indian Standard IS 17526 : 2021. Requires Scheme I ISI mark.',
        confidence: 94.8,
        explanation:
          'Neural vision analysis identified a domestic vacuum container with reflective stainless steel body. The geometry matches insulated drinkware covered under mandatory DPIIT order S.O. 4112(E).',
      });
    }, 450);
  };

  // Simulation handler for BIS Label Scanner
  const handleSimulateLabel = (labelName: string) => {
    setIsProcessing(true);
    setUploadedFileName(labelName);
    setTimeout(() => {
      setIsProcessing(false);
      setLabelResult({
        bisMarkDetected: true,
        cmlNumber: 'CM/L-7200142981',
        standardNumber: 'IS 17526 : 2021',
        productInformation: 'Stainless Steel Vacuum Flasks (Milton Pro Series)',
        detectedText: 'MILTON PRO • IS 17526 • CM/L-7200142981 • CAPACITY: 1000 ML • GRADE SS 304 • MADE IN INDIA',
        verificationSummary: 'Official ISI mark layout matches BIS graphical standards. Licence CM/L-7200142981 verified as OPERATIVE in e-Manak registry.',
        isOperative: true,
      });
    }, 450);
  };

  // Simulation handler for Assay Report Explainer
  const handleSimulateAssay = (reportName: string) => {
    setIsProcessing(true);
    setUploadedFileName(reportName);
    setTimeout(() => {
      setIsProcessing(false);
      setAssayResult({
        reportType: 'Gold Jewellery Assaying Certificate (Fire Assay & XRF Cupellation)',
        metal: 'Gold (Au)',
        purity: '22 Karat (916.4 parts per thousand)',
        testResults: [
          { parameter: 'Gold Content (Au)', foundValue: '916.4 ‰ (91.64%)', statutoryLimit: '>= 916.0 ‰', pass: true },
          { parameter: 'Silver (Ag)', foundValue: '48.2 ‰ (4.82%)', statutoryLimit: 'Alloy balance', pass: true },
          { parameter: 'Copper (Cu)', foundValue: '35.4 ‰ (3.54%)', statutoryLimit: 'Alloy balance', pass: true },
          { parameter: 'Harmful Elements (Cd, Pb)', foundValue: '< 0.01 ‰ (ND)', statutoryLimit: '<= 0.02 ‰ max', pass: true },
        ],
        importantValues: [
          { key: 'Gross Sample Weight', val: '6.425 grams' },
          { key: 'Net Pure Gold Mass', val: '5.888 grams' },
          { key: 'Cupellation Loss', val: '0.04% (within permissible error limit)' },
          { key: 'AHC Registration', val: 'AHC-DL-0012' },
        ],
        explanationSimpleLanguage:
          'In simple terms: Your gold piece was tested using both laser X-ray and high-temperature fire melting. The results confirm it contains 91.64% pure gold. This slightly exceeds the 91.60% requirement for 22 Karat gold, meaning your gold is genuine and higher than the legal minimum purity.',
        potentialInconsistencies: [
          'None: All elemental tests fall within statutory tolerances. Zero negative deviation observed.',
        ],
        summary:
          'Sample AR-2026/4482 conforms fully to 22 Karat (916 fineness) statutory benchmarks specified in IS 1417 : 2016. Suitable for legal 6-digit HUID hallmarking.',
      });
    }, 450);
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
            onChange={(id) => {
              setActiveTab(id);
              setIsProcessing(false);
            }}
          />
        </div>
      </div>

      {/* ==================================================
          TOOL A: DOCUMENT ANALYZER (Per Section 11.A)
          ================================================== */}
      {activeTab === 'document' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
              Upload Technical Document or Test Certificate
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '600px', margin: '0 auto 18px', lineHeight: 1.5 }}>
              Upload a PDF or image of a factory mill certificate, test report, or technical specification sheet to extract compliance fields and detect standards.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleSimulateDocument('Sample_Mill_Certificate_SS304.pdf')}
                className="btn btn-primary"
                disabled={isProcessing}
              >
                <Upload size={15} />
                Analyze Sample Mill Test Certificate (PDF)
              </button>
              <button
                onClick={() => handleSimulateDocument('Factory_Quality_Manual_Extract.pdf')}
                className="btn btn-secondary"
                disabled={isProcessing}
              >
                Analyze Factory Quality Manual
              </button>
            </div>
          </div>

          {isProcessing ? (
            <LoadingSkeleton type="detail" count={1} message="Extracting text, OCR fields, and standard references..." />
          ) : docResult ? (
            <div className="card" style={{ padding: '28px', backgroundColor: '#FFFFFF', border: '1.5px solid #3A74C2', borderRadius: '16px' }}>
              <div style={{ borderBottom: '1px solid #E2EAF5', paddingBottom: '14px', marginBottom: '18px' }}>
                <span className="badge badge-sky">{docResult.docType}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginTop: '6px' }}>
                  Analysis Report: {docResult.fileName}
                </h3>
              </div>

              {/* Extracted & Important Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '18px' }}>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Extracted Information
                  </h4>
                  {Object.entries(docResult.extractedInfo).map(([k, v]) => (
                    <div key={k} style={{ fontSize: '12.5px', marginBottom: '6px', color: '#1E293B' }}>
                      <strong style={{ color: '#64748B' }}>{k}:</strong> {v}
                    </div>
                  ))}
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Important Verification Fields
                  </h4>
                  {docResult.importantFields.map((f, idx) => (
                    <div key={idx} style={{ fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: f.status === 'VALID' ? '#166534' : '#92400E', fontWeight: 700 }}>
                        {f.status === 'VALID' ? '✓' : '⚠️'}
                      </span>{' '}
                      <strong>{f.field}:</strong> <span style={{ color: '#475569' }}>{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Standards & Compliance Observations */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '18px' }}>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Detected Standards
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {docResult.detectedStandards.map((st, idx) => (
                      <span key={idx} className="badge badge-sky" style={{ fontSize: '12px' }}>
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Compliance Observations
                  </h4>
                  {docResult.complianceObservations.map((obs, idx) => (
                    <div key={idx} style={{ fontSize: '12px', color: '#334155', marginBottom: '4px' }}>
                      • {obs}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#F0F9FF', borderRadius: '10px', border: '1px solid #BAE6FD', fontSize: '13px', color: '#0369A1' }}>
                <strong>Executive Summary:</strong> {docResult.summary}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ==================================================
          TOOL B: IMAGE ANALYZER (Per Section 11.B)
          ================================================== */}
      {activeTab === 'image' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
              Product & Object Image Classifier
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '600px', margin: '0 auto 18px', lineHeight: 1.5 }}>
              Upload any product photo to classify manufactured goods, detect standards marks, and identify regulatory mandates.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleSimulateImage('product_water_flask.jpg')}
                className="btn btn-primary"
                disabled={isProcessing}
              >
                <Sparkles size={15} />
                Analyze Sample Vacuum Flask Photo
              </button>
              <button
                onClick={() => handleSimulateImage('electronic_led_driver.jpg')}
                className="btn btn-secondary"
                disabled={isProcessing}
              >
                Analyze LED Lighting Driver Photo
              </button>
            </div>
          </div>

          {isProcessing ? (
            <LoadingSkeleton type="detail" count={1} message="Classifying objects and matching regulatory taxonomy..." />
          ) : imageResult ? (
            <div className="card" style={{ padding: '28px', backgroundColor: '#FFFFFF', border: '1.5px solid #3A74C2', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #E2EAF5', paddingBottom: '14px' }}>
                <div>
                  <span className="badge badge-sky">Image Classification Result</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginTop: '4px' }}>
                    {imageResult.classification}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>CONFIDENCE</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#166534' }}>{imageResult.confidence}%</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '18px' }}>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Detected Objects & Features
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {imageResult.detectedObjects.map((obj, idx) => (
                      <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '6px', fontSize: '12px', color: '#2A3C5B', fontWeight: 600 }}>
                        • {obj}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Relevant BIS Information
                  </h4>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                    {imageResult.relevantBisInfo}
                  </p>
                </div>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#F0F9FF', borderRadius: '10px', border: '1px solid #BAE6FD', fontSize: '13px', color: '#0369A1' }}>
                <strong>Explanation:</strong> {imageResult.explanation}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ==================================================
          TOOL C: BIS LABEL SCANNER (Per Section 11.C)
          ================================================== */}
      {activeTab === 'label' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
              Scan / Upload Product Packaging Label
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '600px', margin: '0 auto 18px', lineHeight: 1.5 }}>
              Scan consumer product packaging or label stickers to detect BIS mark compliance, verify CM/L licence numbers, and extract statutory text.
            </p>

            <button
              onClick={() => handleSimulateLabel('Milton_Thermosteel_Packaging_Label.png')}
              className="btn btn-primary"
              disabled={isProcessing}
            >
              <Scan size={16} />
              Scan Sample ISI Label (Bottle Base)
            </button>
          </div>

          {isProcessing ? (
            <LoadingSkeleton type="detail" count={1} message="Scanning label geometry, OCR text, and checking licence..." />
          ) : labelResult ? (
            <div className="card" style={{ padding: '28px', backgroundColor: '#FFFFFF', border: '1.5px solid #3A74C2', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #E2EAF5', paddingBottom: '14px' }}>
                <div>
                  <span className="badge badge-verified">
                    <CheckCircle2 size={13} /> BIS Mark Detected
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginTop: '4px' }}>
                    {labelResult.productInformation}
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('/verify/licence')}
                  className="btn btn-sm btn-secondary"
                >
                  Verify CM/L in Hub &rarr;
                </button>
              </div>

              {/* Required Outputs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '18px' }}>
                <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>LICENCE / CM/L NUMBER</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#3A74C2', marginTop: '2px' }}>
                    {labelResult.cmlNumber}
                  </div>
                </div>

                <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>INDIAN STANDARD NUMBER</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#1D2B42', marginTop: '2px' }}>
                    {labelResult.standardNumber}
                  </div>
                </div>

                <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>STATUS IN REGISTRY</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#166534', marginTop: '2px' }}>
                    OPERATIVE & VERIFIED
                  </div>
                </div>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5', marginBottom: '14px' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Detected Label Text (OCR Extract)
                </div>
                <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#1D2B42' }}>
                  {labelResult.detectedText}
                </div>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#F0F9FF', borderRadius: '10px', border: '1px solid #BAE6FD', fontSize: '13px', color: '#0369A1' }}>
                <strong>Verification Summary:</strong> {labelResult.verificationSummary}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ==================================================
          TOOL D: ASSAY REPORT EXPLAINER (Per Section 12)
          ================================================== */}
      {activeTab === 'assay' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
              Assay Report Explainer & Purity Decoder
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '600px', margin: '0 auto 18px', lineHeight: 1.5 }}>
              Upload any laboratory gold assay certificate or cupellation test sheet to translate complex metallurgical values into plain consumer language.
            </p>

            <button
              onClick={() => handleSimulateAssay('Gold_Fire_Assay_Report_22K.pdf')}
              className="btn btn-primary"
              disabled={isProcessing}
            >
              <FlaskConical size={16} />
              Decode Sample Assay Report (22 Karat Ring)
            </button>
          </div>

          {isProcessing ? (
            <LoadingSkeleton type="detail" count={1} message="Analyzing assay parameters and synthesizing plain language explanation..." />
          ) : assayResult ? (
            <div className="card" style={{ padding: '28px', backgroundColor: '#FFFFFF', border: '1.5px solid #3A74C2', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #E2EAF5', paddingBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span className="badge badge-sky">{assayResult.reportType}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginTop: '4px' }}>
                    Metal: {assayResult.metal} • Purity: <span style={{ color: '#B45309' }}>{assayResult.purity}</span>
                  </h3>
                </div>
                <span className="badge badge-verified">Conforms to IS 1417</span>
              </div>

              {/* Test Results Table (Per Section 12) */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                  Laboratory Test Results
                </h4>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Tested Parameter</th>
                        <th>Found Laboratory Value</th>
                        <th>Statutory Limit (IS 1417)</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assayResult.testResults.map((t, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{t.parameter}</td>
                          <td style={{ fontWeight: 800, color: '#1D2B42' }}>{t.foundValue}</td>
                          <td style={{ fontSize: '12.5px', color: '#64748B' }}>{t.statutoryLimit}</td>
                          <td>
                            <span className="badge badge-verified">PASS</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Important Values Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '18px' }}>
                {assayResult.importantValues.map((v, idx) => (
                  <div key={idx} style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '8px', border: '1px solid #E2EAF5' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{v.key}</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#1D2B42', marginTop: '2px' }}>{v.val}</div>
                  </div>
                ))}
              </div>

              {/* Explanation in Simple Language */}
              <div style={{ padding: '16px', backgroundColor: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#166534', marginBottom: '6px' }}>
                  Explanation in Plain Language
                </h4>
                <p style={{ fontSize: '13.5px', color: '#14532D', lineHeight: 1.6 }}>
                  {assayResult.explanationSimpleLanguage}
                </p>
              </div>

              {/* Potential Inconsistencies & Summary */}
              <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5', fontSize: '12.5px', color: '#475569', marginBottom: '14px' }}>
                <strong>Potential Inconsistencies:</strong> {assayResult.potentialInconsistencies.join(', ')}
              </div>

              <div style={{ padding: '14px', backgroundColor: '#F0F9FF', borderRadius: '10px', border: '1px solid #BAE6FD', fontSize: '13px', color: '#0369A1' }}>
                <strong>Conclusion Summary:</strong> {assayResult.summary}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
