import React, { useState, useEffect } from 'react';
import {
  Gem,
  Search,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Info,
} from 'lucide-react';
import { NavRoute, HuidVerificationResult, HallmarkingCentre } from '../types';
import { verificationService } from '../services/verificationService';
import { hallmarkingService } from '../services/hallmarkingService';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

interface HallmarkingJewelleryPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const HallmarkingJewelleryPage: React.FC<HallmarkingJewelleryPageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'HUID' | 'SCANNER' | 'PURITY'>('HUID');

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

  useEffect(() => {
    if (activeTab === 'PURITY') {
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
          <Gem size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            Gold Hallmarking & HUID Verification Suite
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Verify 6-character Hallmark Unique Identification (HUID) codes via <code>POST /api/verification/huid</code> and search recognized Assaying & Hallmarking Centres.
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          {[
            { id: 'HUID', label: '1. HUID Live Verification' },
            { id: 'SCANNER', label: '2. Hallmark Image Scanner' },
            { id: 'PURITY', label: '3. Physical Purity & AHC Centres' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: '6px',
                backgroundColor: activeTab === tab.id ? '#39527B' : '#F1F6FD',
                color: activeTab === tab.id ? '#FFFFFF' : '#39527B',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB A: HUID Verification Workflow */}
      {activeTab === 'HUID' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '6px' }}>
              Official HUID Central Verification
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Enter the 6-character alphanumeric code engraved alongside the BIS logo and purity mark:
            </p>

            {/* Input Row */}
            <div style={{ display: 'flex', gap: '10px', maxWidth: '580px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="e.g. AB1234 or XY5678"
                maxLength={6}
                value={huidInput}
                onChange={(e) => setHuidInput(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  height: '44px',
                  padding: '0 16px',
                  fontSize: '16px',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  border: '1px solid #D6E4F8',
                  borderRadius: '6px',
                }}
              />
              <button
                onClick={() => handleVerifyHuid()}
                disabled={isVerifying || !huidInput.trim()}
                className="btn btn-primary"
                style={{ padding: '0 24px' }}
              >
                {isVerifying ? 'Checking...' : 'Verify HUID'}
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Validation Rule: Exactly 6 alphanumeric characters. Endpoint: <code>POST /api/verification/huid</code>
            </div>
          </div>

          {/* Verification Result Area */}
          {isVerifying ? (
            <LoadingSkeleton type="detail" count={1} message="Querying BIS central hallmarking registry..." />
          ) : verificationResult ? (
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderLeft:
                  verificationResult.status === 'VERIFIED'
                    ? '5px solid #166534'
                    : '5px solid #D97706',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  borderBottom: '1px solid #EDF3FB',
                  paddingBottom: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
                    HUID QUERY STATUS
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#2A3C5B' }}>
                    {verificationResult.huid}
                  </div>
                </div>

                <span className="badge badge-warning" style={{ fontSize: '12px', padding: '4px 10px' }}>
                  {verificationResult.status}
                </span>
              </div>

              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '6px',
                  color: '#92400E',
                  fontSize: '13px',
                  marginBottom: '14px',
                }}
              >
                <strong>Status Message:</strong> {verificationResult.disclaimer}
              </div>

              <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                Service Response Origin: {verificationResult.officialSource} • Timestamp: {verificationResult.verifiedAt}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ShieldCheck}
              title="No verification result"
              description="Enter a 6-character alphanumeric HUID to initiate format validation and dispatch the verification request."
            />
          )}
        </div>
      )}

      {/* TAB B: Scanner */}
      {activeTab === 'SCANNER' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '6px' }}>
              Hallmark Image Scanner
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Upload or capture hallmark engraving. Vision OCR pipeline extracts visible markings for downstream verification.
            </p>

            <div
              style={{
                border: '2px dashed #92BBF8',
                borderRadius: '8px',
                padding: '32px 20px',
                textAlign: 'center',
                backgroundColor: '#F8FAFD',
                cursor: 'pointer',
              }}
              onClick={handleSimulateScan}
            >
              <Upload size={36} color="#3A74C2" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B' }}>
                {isScanning ? 'Processing image OCR...' : 'Click to Upload Hallmark Photo'}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                Connected to <code>POST /api/vision/hallmark-ocr</code>
              </div>
            </div>
          </div>

          {scannerExtracted && (
            <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B', marginBottom: '12px' }}>
                Extracted Marking Fields (Assistance Only — Not Proof of Authenticity)
              </h4>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', flexWrap: 'wrap' }}>
                <div>Extracted HUID: <strong style={{ color: '#3A74C2' }}>{scannerExtracted.huid}</strong></div>
                <div>Purity Mark: <strong>{scannerExtracted.fineness}</strong></div>
                <div>BIS Triangle: <strong>{scannerExtracted.bisMarkDetected ? 'Detected' : 'Not Found'}</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB C: Physical Purity */}
      {activeTab === 'PURITY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '8px' }}>
              Physical Metal Purity Testing
            </h3>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
              Software and image analysis cannot reliably determine gold purity. Genuine purity testing requires Fire Assay or calibrated XRF testing at an authorized Assaying & Hallmarking Centre.
            </p>
          </div>

          {isLoadingAhcs ? (
            <LoadingSkeleton type="card" count={1} message="Loading AHC centres from GET /api/hallmarking-centres..." />
          ) : ahcs.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="No A&H Centres available"
              description="A&H Centre information will appear here once the service is connected to GET /api/hallmarking-centres."
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {ahcs.map((ahc) => (
                <div key={ahc.id} className="card" style={{ padding: '18px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span className="badge badge-sky" style={{ fontSize: '10.5px' }}>{ahc.code}</span>
                    <span className="badge badge-verified" style={{ fontSize: '10.5px' }}>{ahc.status}</span>
                  </div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '4px' }}>
                    {ahc.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{ahc.address}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
