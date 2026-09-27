import React, { useState } from 'react';
import {
  Gem,
  Search,
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Info,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { NavRoute, HuidVerificationResult } from '../types';
import { MOCK_HUID_DATABASE, HALLMARKING_CENTRES } from '../data/mockData';

interface HallmarkingJewelleryPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const HallmarkingJewelleryPage: React.FC<HallmarkingJewelleryPageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'HUID' | 'SCANNER' | 'PURITY'>('HUID');

  // HUID verification state
  const [huidInput, setHuidInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<HuidVerificationResult | null>(
    MOCK_HUID_DATABASE['AB1234']
  );
  const [isVerifying, setIsVerifying] = useState(false);

  // Scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [scannerExtracted, setScannerExtracted] = useState<{
    huid: string;
    fineness: string;
    bisMarkDetected: boolean;
    ahcLogoDetected: boolean;
    confidence: number;
  } | null>(null);

  // AHC state
  const [ahcStateFilter, setAhcStateFilter] = useState('ALL');

  const handleVerifyHuid = (queryHuid?: string) => {
    const rawHuid = (queryHuid || huidInput).trim().toUpperCase();
    if (!rawHuid) return;

    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      // Format validation rule (must be 6 alphanumeric chars)
      const isValidFormat = /^[A-Z0-9]{6}$/.test(rawHuid);

      if (!isValidFormat) {
        setVerificationResult({
          huid: rawHuid,
          isValidFormat: false,
          isVerifiedLive: false,
          status: 'INVALID_FORMAT',
          officialSource: 'BIS Format Specification (6-digit alphanumeric)',
          verifiedAt: new Date().toLocaleTimeString(),
          disclaimer:
            'Format validation failed. A genuine HUID consists of exactly 6 alphanumeric characters laser-marked by a recognized AHC.',
        });
        return;
      }

      // Check database
      if (MOCK_HUID_DATABASE[rawHuid]) {
        setVerificationResult(MOCK_HUID_DATABASE[rawHuid]);
      } else {
        setVerificationResult({
          huid: rawHuid,
          isValidFormat: true,
          isVerifiedLive: false,
          status: 'NOT_FOUND',
          officialSource: 'BIS CARE Hallmarking Central Verification Register',
          verifiedAt: new Date().toLocaleTimeString(),
          disclaimer:
            'Format is valid (6 alphanumeric characters), but no matching hallmarking record was found in the BIS central registry. Note: valid format alone does NOT prove authenticity.',
        });
      }
    }, 500);
  };

  const handleRunMockScan = (presetHuid: string, fineness: string) => {
    setIsScanning(true);
    setScannerExtracted(null);
    setTimeout(() => {
      setIsScanning(false);
      setScannerExtracted({
        huid: presetHuid,
        fineness,
        bisMarkDetected: true,
        ahcLogoDetected: true,
        confidence: 0.94,
      });
    }, 700);
  };

  const filteredAhcs =
    ahcStateFilter === 'ALL'
      ? HALLMARKING_CENTRES
      : HALLMARKING_CENTRES.filter((a) => a.state === ahcStateFilter);

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
          Verify 6-character Hallmark Unique Identification (HUID) numbers, inspect hallmark image markings, and locate recognized Assaying & Hallmarking Centres.
        </p>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '20px',
            borderBottom: '1px solid #E2EAF5',
            paddingBottom: '8px',
          }}
        >
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
                transition: 'all 0.15s ease',
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
              Enter the 6-character alphanumeric code engraved alongside the BIS logo and purity mark on your jewellery article:
            </p>

            {/* Input Row */}
            <div style={{ display: 'flex', gap: '10px', maxWidth: '580px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="e.g. AB1234 or MN5678"
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
                disabled={isVerifying}
                className="btn btn-primary"
                style={{ padding: '0 24px' }}
              >
                {isVerifying ? 'Checking...' : 'Verify HUID'}
              </button>
            </div>

            {/* Sample HUID Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Test Samples:</span>
              {['AB1234', 'MN5678', 'IN2026', 'XY9999'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setHuidInput(s);
                    handleVerifyHuid(s);
                  }}
                  style={{
                    fontSize: '11.5px',
                    padding: '3px 8px',
                    backgroundColor: '#F1F6FD',
                    border: '1px solid #D6E4F8',
                    borderRadius: '4px',
                    color: '#39527B',
                    fontWeight: 700,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Result Card */}
          {verificationResult && (
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderLeft:
                  verificationResult.status === 'VERIFIED'
                    ? '5px solid #166534'
                    : '5px solid #DC2626',
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
                    HUID RECORD LOOKUP
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#2A3C5B' }}>
                    {verificationResult.huid}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <span
                    className={
                      verificationResult.status === 'VERIFIED'
                        ? 'badge badge-verified'
                        : 'badge badge-danger'
                    }
                    style={{ fontSize: '12px', padding: '4px 10px' }}
                  >
                    {verificationResult.status === 'VERIFIED'
                      ? 'OFFICIALLY VERIFIED IN BIS REGISTRY'
                      : verificationResult.status}
                  </span>
                </div>
              </div>

              {verificationResult.status === 'VERIFIED' ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '16px',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Jeweller Licence:</span>
                    <div style={{ fontWeight: 700, color: '#2A3C5B' }}>
                      {verificationResult.jewellerRegNo}
                    </div>
                    <div style={{ color: '#3A74C2' }}>{verificationResult.jewellerName}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Assaying & Hallmarking Centre:</span>
                    <div style={{ fontWeight: 700, color: '#2A3C5B' }}>
                      {verificationResult.ahcCode}
                    </div>
                    <div style={{ color: '#334155' }}>{verificationResult.ahcName}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Article & Purity:</span>
                    <div style={{ fontWeight: 800, color: '#166534', fontSize: '14px' }}>
                      {verificationResult.metalFineness}
                    </div>
                    <div style={{ color: '#64748B' }}>{verificationResult.articleType}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Hallmarking Date & Time:</span>
                    <div style={{ fontWeight: 700, color: '#2A3C5B' }}>
                      {verificationResult.hallmarkingDate}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '11.5px' }}>Central Register ID: 2026-HM-7781</div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: '14px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '6px',
                    color: '#991B1B',
                    fontSize: '13px',
                    marginBottom: '14px',
                  }}
                >
                  <strong>Result:</strong> {verificationResult.disclaimer}
                </div>
              )}

              {/* Crucial Hallucination Guard Disclaimer */}
              <div
                style={{
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: '#92400E',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <ShieldCheck size={16} />
                <span>
                  <strong>Consumer Notice:</strong> HUID verification confirms the stamping record in the BIS CARE registry. It does not independently test physical metal composition. For purity testing, consult a recognized AHC.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB B: Hallmark Image Scanner */}
      {activeTab === 'SCANNER' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B' }}>
                Jewellery Hallmark Image Scanner (F10)
              </h3>
              <span className="badge badge-ai">Computer Vision Assistance</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Upload or photograph the laser hallmark engraving on gold jewellery. The assistant will detect the 3 mandatory marks (BIS Logo, Karat Purity, and 6-digit HUID).
            </p>

            {/* Upload Zone */}
            <div
              style={{
                border: '2px dashed #92BBF8',
                borderRadius: '8px',
                padding: '32px 20px',
                textAlign: 'center',
                backgroundColor: '#F8FAFD',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
              onClick={() => handleRunMockScan('AB1234', '22K (916)')}
            >
              <Upload size={36} color="#3A74C2" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B' }}>
                Click to Upload Hallmark Photo or Drag & Drop
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                Supports JPG, PNG, WEBP up to 10MB
              </div>
            </div>

            {/* Test Sample Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Test Sample Presets:</span>
              <button
                onClick={() => handleRunMockScan('AB1234', '22K (916)')}
                className="btn btn-secondary btn-sm"
              >
                Sample 1: 22K Gold Bangle (AB1234)
              </button>
              <button
                onClick={() => handleRunMockScan('MN5678', '18K (750)')}
                className="btn btn-secondary btn-sm"
              >
                Sample 2: 18K Diamond Ring (MN5678)
              </button>
            </div>
          </div>

          {/* Scanner Analysis Output */}
          {scannerExtracted && (
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
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#2A3C5B' }}>
                  AI Vision Extraction Results
                </div>
                <span className="badge badge-ai">Confidence: {(scannerExtracted.confidence * 100).toFixed(0)}%</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '14px',
                  marginBottom: '18px',
                }}
              >
                <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>1. BIS Standard Logo</span>
                  <div style={{ fontWeight: 700, color: '#166534', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={15} /> Detected (Triangle Mark)
                  </div>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>2. Purity / Fineness Mark</span>
                  <div style={{ fontWeight: 800, color: '#2A3C5B', marginTop: '2px' }}>
                    {scannerExtracted.fineness}
                  </div>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>3. Extracted 6-digit HUID</span>
                  <div style={{ fontWeight: 800, color: '#3A74C2', fontSize: '16px', marginTop: '2px' }}>
                    {scannerExtracted.huid}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  <em>Note: AI-assisted extraction — not proof of physical metal authenticity.</em>
                </div>

                <button
                  onClick={() => {
                    setHuidInput(scannerExtracted.huid);
                    setActiveTab('HUID');
                    handleVerifyHuid(scannerExtracted.huid);
                  }}
                  className="btn btn-primary"
                >
                  Verify Extracted HUID in Central Registry &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB C: Physical Purity Testing & AHC Finder */}
      {activeTab === 'PURITY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '8px' }}>
              Physical Metal Purity Testing (F11)
            </h3>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong>Why physical assaying is necessary:</strong> Software, mobile apps, and optical image analysis cannot reliably determine internal elemental purity of gold alloys. Genuine verification of gold karat fineness requires physical Fire Assay (destructive) or calibrated X-Ray Fluorescence (XRF) testing at an authorized Assaying & Hallmarking Centre.
            </p>

            <div
              style={{
                backgroundColor: '#F1F6FD',
                border: '1px solid #C4DCFA',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <Info size={20} color="#3A74C2" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '12.5px', color: '#2A3C5B' }}>
                Any consumer can get their unhallmarked or hallmarked gold jewellery tested at any recognized AHC on payment of a nominal testing fee (approx ₹45/- per article per BIS guidelines).
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#39527B' }}>
                Filter Recognized AHCs by State:
              </span>
              <select
                value={ahcStateFilter}
                onChange={(e) => setAhcStateFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12.5px',
                  borderRadius: '6px',
                  border: '1px solid #D6E4F8',
                }}
              >
                <option value="ALL">All States</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>
          </div>

          {/* AHC Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {filteredAhcs.map((ahc) => (
              <div
                key={ahc.id}
                className="card"
                style={{
                  padding: '18px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D6E4F8',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="badge badge-sky" style={{ fontSize: '10.5px' }}>{ahc.code}</span>
                  <span className="badge badge-verified" style={{ fontSize: '10.5px' }}>{ahc.status}</span>
                </div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '4px' }}>
                  {ahc.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                  <MapPin size={14} color="#3A74C2" />
                  <span>{ahc.address}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#475569', borderTop: '1px solid #EDF3FB', paddingTop: '8px' }}>
                  <strong>Capability:</strong> {ahc.metalCapability} • Valid till: {ahc.validity}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
