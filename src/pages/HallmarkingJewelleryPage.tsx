import React, { useState, useEffect } from 'react';
import {
  Gem,
  Search,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  ChevronLeft,
  Camera,
  FileText,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { NavRoute, HuidVerificationResult, HallmarkingCentre } from '../types';
import { verificationService } from '../services/verificationService';
import { hallmarkingService } from '../services/hallmarkingService';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

interface HallmarkingJewelleryPageProps {
  initialSubFeature?: 'huid' | 'scanner' | 'purity' | 'assay' | 'jewellers';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const HallmarkingJewelleryPage: React.FC<HallmarkingJewelleryPageProps> = ({
  initialSubFeature = 'huid',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'huid' | 'scanner' | 'purity' | 'assay' | 'jewellers'>(initialSubFeature);

  // HUID verification state
  const [huidInput, setHuidInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<HuidVerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [scannerExtracted, setScannerExtracted] = useState<{
    huid: string;
    fineness: string;
    bisMarkDetected: boolean;
    confidence: number;
  } | null>(null);

  // AHC state
  const [ahcs, setAhcs] = useState<HallmarkingCentre[]>([]);
  const [isLoadingAhcs, setIsLoadingAhcs] = useState(false);
  const [ahcStateFilter, setAhcStateFilter] = useState('ALL');

  // Assay Explainer State
  const [assayExplanation, setAssayExplanation] = useState<{
    reportId: string;
    centreName: string;
    sampleWeight: string;
    reportedPurity: string;
    karatEquivalent: string;
    conclusion: string;
  } | null>(null);

  useEffect(() => {
    if (activeTab === 'purity') {
      setIsLoadingAhcs(true);
      hallmarkingService.getAhcCentres({ state: ahcStateFilter }).then((data) => {
        setAhcs(data);
        setIsLoadingAhcs(false);
      });
    }
  }, [activeTab, ahcStateFilter]);

  const handleVerifyHuid = async (queryHuid?: string) => {
    const raw = (queryHuid || huidInput).trim().toUpperCase();
    if (!raw) return;

    setIsVerifying(true);
    setVerificationResult(null);

    const result = await verificationService.verifyHuid(raw);
    setVerificationResult(result);
    setIsVerifying(false);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannerExtracted({
        huid: 'AB1234',
        fineness: '22K (916)',
        bisMarkDetected: true,
        confidence: 0.92,
      });
    }, 600);
  };

  const handleSimulateAssayExplainer = () => {
    setAssayExplanation({
      reportId: 'AR-2026/09/DL-4482',
      centreName: 'Apex Gold Assaying & Hallmarking Centre (AHC-DL-0012)',
      sampleWeight: '4.821 grams',
      reportedPurity: '916.4 parts per thousand (Au: 91.64%)',
      karatEquivalent: '22 Karat Standard Grade per IS 1417',
      conclusion: 'Sample conforms to 22 Karat (916) fineness requirements specified in IS 1417 : 2016.',
    });
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
          onClick={() => onNavigate('/government-services')}
          style={{ color: '#3A74C2', fontWeight: 600, cursor: 'pointer' }}
        >
          Government Services
        </button>
        <span>/</span>
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Hallmarking & Jewellery</span>
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
            <Gem size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              Gold Hallmarking & Jewellery Suite
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>
              6-character HUID verification, hallmark OCR scanner, purity testing guidance, and licensed jewellers directory.
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
            { id: 'huid', title: '1. HUID Verification', desc: 'Verify 6-character code' },
            { id: 'scanner', title: '2. Hallmark Scanner', desc: 'OCR & visual mark detect' },
            { id: 'purity', title: '3. Purity Guidance', desc: 'Find recognized A&H centres' },
            { id: 'assay', title: '4. Assay Explainer', desc: 'Deconstruct lab reports' },
            { id: 'jewellers', title: '5. Jeweller Registry', desc: 'Search licensed jewellers' },
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

      {/* Sub-Feature 1: HUID Verification */}
      {activeTab === 'huid' && (
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
              Hallmark Unique Identification (HUID) Verification
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Enter the 6-character alphanumeric code laser-engraved on your gold article.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', maxWidth: '520px' }}>
            <input
              type="text"
              placeholder="e.g. AB1234 or HUID01"
              maxLength={6}
              value={huidInput}
              onChange={(e) => setHuidInput(e.target.value.toUpperCase())}
              style={{
                flex: 1,
                height: '44px',
                padding: '0 14px',
                fontSize: '15px',
                letterSpacing: '2px',
                fontWeight: 700,
                borderRadius: '8px',
                border: '1.5px solid #C4DCFA',
                backgroundColor: '#F8FAFD',
              }}
            />
            <button
              onClick={() => handleVerifyHuid()}
              disabled={isVerifying || !huidInput.trim()}
              className="btn btn-primary"
              style={{ height: '44px', padding: '0 20px', borderRadius: '8px', fontWeight: 700 }}
            >
              {isVerifying ? 'Verifying...' : 'Verify HUID'}
            </button>
          </div>

          {/* Quick Samples */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ color: '#64748B' }}>Try sample HUID:</span>
            {['AB1234', 'XY9876', 'INVALID'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setHuidInput(s);
                  handleVerifyHuid(s);
                }}
                style={{
                  backgroundColor: '#F1F6FD',
                  border: '1px solid #D6E4F8',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: '#3A74C2',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: verificationResult.status === 'VERIFIED' ? '#F0FDF4' : '#FFFBEB',
                border: verificationResult.status === 'VERIFIED' ? '1px solid #BBF7D0' : '1px solid #FDE68A',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {verificationResult.status === 'VERIFIED' ? (
                  <CheckCircle2 size={20} color="#166534" />
                ) : (
                  <AlertTriangle size={20} color="#92400E" />
                )}
                <strong style={{ fontSize: '15px', color: verificationResult.status === 'VERIFIED' ? '#166534' : '#92400E' }}>
                  {verificationResult.status === 'VERIFIED'
                    ? `HUID ${verificationResult.huid} Verified in Central Database`
                    : `HUID Status: ${verificationResult.status}`}
                </strong>
              </div>

              {verificationResult.jewellerName && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '13px' }}>
                  <div><strong>Registered Jeweller:</strong> {verificationResult.jewellerName}</div>
                  <div><strong>Licence No:</strong> {verificationResult.jewellerRegNo}</div>
                  <div><strong>Assaying Centre:</strong> {verificationResult.ahcName} ({verificationResult.ahcCode})</div>
                  <div><strong>Purity / Fineness:</strong> {verificationResult.metalFineness}</div>
                  <div><strong>Hallmarked Date:</strong> {verificationResult.hallmarkingDate}</div>
                </div>
              )}

              <div style={{ fontSize: '11.5px', color: '#64748B', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '8px' }}>
                <strong>Official Caveat:</strong> {verificationResult.disclaimer}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 2: Scanner */}
      {activeTab === 'scanner' && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
              Jewellery Hallmark Optical Scanner
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Upload or capture macro photo of hallmark engraving to extract HUID, purity stamp, and triangular BIS logo.
            </p>
          </div>

          <div
            onClick={handleSimulateScan}
            style={{
              border: '2px dashed #C4DCFA',
              borderRadius: '12px',
              padding: '36px',
              textAlign: 'center',
              backgroundColor: '#F8FAFD',
              cursor: 'pointer',
            }}
          >
            <Camera size={36} color="#3A74C2" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D2B42' }}>
              {isScanning ? 'Processing image with BIS Hallmark OCR...' : 'Click to Upload Hallmark Photo / Take Macro Shot'}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
              Supports high-resolution JPG, PNG under macro ring illumination.
            </div>
          </div>

          {scannerExtracted && (
            <div style={{ padding: '16px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px' }}>
              <strong style={{ fontSize: '14px', color: '#166534', display: 'block', marginBottom: '8px' }}>
                ✓ Features Detected via Vision Pipeline
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '13px' }}>
                <div><strong>Extracted HUID:</strong> {scannerExtracted.huid}</div>
                <div><strong>Purity Marking:</strong> {scannerExtracted.fineness}</div>
                <div><strong>BIS Triangle Mark:</strong> Detected (Confidence {(scannerExtracted.confidence * 100).toFixed(0)}%)</div>
              </div>
              <button
                onClick={() => {
                  setHuidInput(scannerExtracted.huid);
                  setActiveTab('huid');
                  handleVerifyHuid(scannerExtracted.huid);
                }}
                className="btn btn-sm btn-primary"
                style={{ marginTop: '12px', borderRadius: '6px' }}
              >
                Proceed to Verify HUID &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 3: Physical Purity Testing Guidance */}
      {activeTab === 'purity' && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
              Physical Purity Testing Guidance & AHC Directory
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Workflow: User Location → Recognized A&H Centre → Physical Fire Assay / XRF Testing → Official Assay Report
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1D2B42' }}>Filter State:</span>
            <select
              value={ahcStateFilter}
              onChange={(e) => setAhcStateFilter(e.target.value)}
              style={{ height: '38px', padding: '0 12px', borderRadius: '8px', border: '1px solid #D6E4F8' }}
            >
              <option value="ALL">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          {isLoadingAhcs ? (
            <LoadingSkeleton type="card" count={2} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
              {ahcs.map((ahc) => (
                <div
                  key={ahc.id}
                  style={{
                    padding: '16px',
                    backgroundColor: '#F8FAFD',
                    border: '1px solid #D6E4F8',
                    borderRadius: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong style={{ fontSize: '14px', color: '#1D2B42' }}>{ahc.name}</strong>
                    <span className="badge badge-verified">{ahc.status}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    {ahc.address}, {ahc.city}, {ahc.state}
                  </div>
                  <div style={{ fontSize: '12px', color: '#39527B', marginTop: '6px' }}>
                    Capability: <strong>{ahc.metalCapability}</strong> • Code: {ahc.code}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 4: Assay Report Explainer */}
      {activeTab === 'assay' && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
              Assay Report Explainer
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Upload an assaying or touchstone test report to extract purity parts-per-thousand, Karat equivalents, and test standards.
            </p>
          </div>

          <button
            onClick={handleSimulateAssayExplainer}
            className="btn btn-secondary"
            style={{ width: 'fit-content' }}
          >
            Load Sample Assaying Report
          </button>

          {assayExplanation && (
            <div style={{ padding: '20px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #D6E4F8' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1D2B42', marginBottom: '8px' }}>
                Report: {assayExplanation.reportId}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div><strong>Centre Name:</strong> {assayExplanation.centreName}</div>
                <div><strong>Sample Weight:</strong> {assayExplanation.sampleWeight}</div>
                <div><strong>Reported Purity:</strong> {assayExplanation.reportedPurity}</div>
                <div><strong>Karat Grade:</strong> {assayExplanation.karatEquivalent}</div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12.5px', color: '#166534', backgroundColor: '#F0FDF4', padding: '10px', borderRadius: '6px' }}>
                {assayExplanation.conclusion}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 5: Jeweller Search */}
      {activeTab === 'jewellers' && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
                Licensed Jewellers Registry
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                Verify jeweller registration certificates issued by the Bureau of Indian Standards.
              </p>
            </div>
            <button
              onClick={() => onNavigate('licensed-jewellers')}
              className="btn btn-primary btn-sm"
            >
              Full Jewellers Directory &rarr;
            </button>
          </div>

          <div style={{ fontSize: '13px', color: '#475569' }}>
            Search over 180,000 registered jewellery outlets across India by name, certificate number, or city.
          </div>
        </div>
      )}
    </div>
  );
};
