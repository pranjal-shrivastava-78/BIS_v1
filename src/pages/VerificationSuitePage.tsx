import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Gem,
  Award,
  Cpu,
  Sparkles,
  ChevronLeft,
  Copy,
  Check,
  Building2,
  Calendar,
  MapPin,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import {
  NavRoute,
  HuidVerificationResult,
  LicenceVerificationResult,
  CrsVerificationResult,
} from '../types';
import { verificationService } from '../services/verificationService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { SegmentedControl } from '../components/common/SegmentedControl';

interface VerificationSuitePageProps {
  initialTab?: 'huid' | 'licence' | 'crs';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const VerificationSuitePage: React.FC<VerificationSuitePageProps> = ({
  initialTab = 'huid',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'huid' | 'licence' | 'crs'>(initialTab);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // HUID State
  const [huidInput, setHuidInput] = useState('AB1234');
  const [huidResult, setHuidResult] = useState<HuidVerificationResult | null>(null);
  const [isVerifyingHuid, setIsVerifyingHuid] = useState(false);

  // Licence State
  const [licenceInput, setLicenceInput] = useState('CM/L-7200142981');
  const [licenceResult, setLicenceResult] = useState<LicenceVerificationResult | null>(null);
  const [isVerifyingLicence, setIsVerifyingLicence] = useState(false);

  // CRS State
  const [crsInput, setCrsInput] = useState('R-41001234');
  const [crsResult, setCrsResult] = useState<CrsVerificationResult | null>(null);
  const [isVerifyingCrs, setIsVerifyingCrs] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleVerifyHuid = async (overrideValue?: string) => {
    const val = (overrideValue || huidInput).trim();
    if (!val) return;
    setIsVerifyingHuid(true);
    setHuidResult(null);

    const result = await verificationService.verifyHuid(val);
    setHuidResult(result);
    setIsVerifyingHuid(false);
  };

  const handleVerifyLicence = async (overrideValue?: string) => {
    const val = (overrideValue || licenceInput).trim();
    if (!val) return;
    setIsVerifyingLicence(true);
    setLicenceResult(null);

    const result = await verificationService.verifyLicence(val);
    setLicenceResult(result);
    setIsVerifyingLicence(false);
  };

  const handleVerifyCrs = async (overrideValue?: string) => {
    const val = (overrideValue || crsInput).trim();
    if (!val) return;
    setIsVerifyingCrs(true);
    setCrsResult(null);

    const result = await verificationService.verifyCrs(val);
    setCrsResult(result);
    setIsVerifyingCrs(false);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Breadcrumb Bar */}
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
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Unified Verification Hub</span>
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
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              Unified Verification Hub
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              One-stop authoritative verification for gold HUID hallmarks, manufacturer ISI licences (CM/L), and electronics CRS R-numbers.
            </p>
          </div>
        </div>

        {/* Pill / Segmented Control Bar (Per Section 1 & 2) */}
        <div style={{ marginTop: '16px', borderTop: '1px solid #E2EAF5', paddingTop: '16px' }}>
          <SegmentedControl<'huid' | 'licence' | 'crs'>
            items={[
              {
                id: 'huid',
                label: 'HUID Verification',
                number: 1,
                icon: Gem,
              },
              {
                id: 'licence',
                label: 'BIS Licence Verification',
                number: 2,
                icon: Award,
              },
              {
                id: 'crs',
                label: 'CRS / R-Number Verification',
                number: 3,
                icon: Cpu,
              },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />
        </div>
      </div>

      {/* ==================================================
          TAB 1: HUID VERIFICATION
          ================================================== */}
      {activeTab === 'huid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Input Panel */}
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Gem size={20} color="#3A74C2" />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42' }}>
                Verify 6-Digit Hallmark Unique Identification (HUID)
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Enter the laser-engraved 6-character alphanumeric code found on your certified gold jewellery piece:
            </p>

            <div style={{ display: 'flex', gap: '10px', maxWidth: '580px', marginBottom: '16px' }}>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. AB1234"
                value={huidInput}
                onChange={(e) => setHuidInput(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  height: '46px',
                  padding: '0 16px',
                  fontSize: '16px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #D6E4F8',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFD',
                  color: '#1D2B42',
                }}
              />
              <button
                onClick={() => handleVerifyHuid()}
                disabled={isVerifyingHuid || !huidInput.trim()}
                className="btn btn-primary"
                style={{ height: '46px', padding: '0 24px', fontSize: '14px', borderRadius: '10px' }}
              >
                <Search size={16} />
                {isVerifyingHuid ? 'Verifying...' : 'Verify HUID'}
              </button>
            </div>

            {/* Quick Demo Preloads */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Demo Examples:</span>
              {['AB1234', 'XY9876', '7K2M9P'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setHuidInput(code);
                    handleVerifyHuid(code);
                  }}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F6FD',
                    border: '1px solid #C4DCFA',
                    color: '#3A74C2',
                    cursor: 'pointer',
                  }}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          {isVerifyingHuid ? (
            <LoadingSkeleton type="detail" count={1} message="Querying central BIS hallmarking repository for HUID..." />
          ) : huidResult ? (
            <div
              className="card"
              style={{
                padding: '28px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderRadius: '16px',
                boxShadow: '0 4px 14px rgba(30, 41, 59, 0.05)',
              }}
            >
              {/* Header result row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  borderBottom: '1px solid #E2EAF5',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em' }}>
                    HALLMARK UNIQUE IDENTIFICATION
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#1D2B42', letterSpacing: '0.08em' }}>
                      {huidResult.huid}
                    </span>
                    <button
                      onClick={() => handleCopy(huidResult.huid, 'huid')}
                      title="Copy HUID"
                      style={{
                        padding: '4px',
                        borderRadius: '6px',
                        border: '1px solid #D6E4F8',
                        backgroundColor: '#F8FAFD',
                        color: copiedField === 'huid' ? '#166534' : '#64748B',
                        cursor: 'pointer',
                      }}
                    >
                      {copiedField === 'huid' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      backgroundColor: '#DCFCE7',
                      color: '#166534',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      border: '1px solid #86EFAC',
                    }}
                  >
                    <CheckCircle2 size={15} />
                    {huidResult.status} & AUTHORIZED
                  </span>
                </div>
              </div>

              {/* 7 Required Output Spec Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '18px',
                  marginBottom: '20px',
                }}
              >
                {/* 1. Jewellery Details */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    1. Jewellery Details
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '2px' }}>
                    {huidResult.articleType || 'Gold Jewellery Article'}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475569' }}>
                    Gross / Net Weight: <strong>{huidResult.articleWeight || '8.450 grams'}</strong>
                  </div>
                </div>

                {/* 2. Metal & Purity */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    2. Metal & Purity Fineness
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#B45309', marginBottom: '2px' }}>
                    {huidResult.metalFineness || '22K (916 fineness)'}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475569' }}>
                    Certified Metal: <strong>{huidResult.metal || 'Gold'}</strong> ({huidResult.purityPercent || '91.6% Pure'})
                  </div>
                </div>

                {/* 3. Jeweller Information */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    3. Registered Jeweller
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '2px' }}>
                    {huidResult.jewellerName || 'Licensed Jeweller'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    Reg No: <span style={{ color: '#3A74C2', fontWeight: 700 }}>{huidResult.jewellerRegNo || 'HM/C-7800041239'}</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                    {huidResult.jewellerCity || 'New Delhi'}
                  </div>
                </div>

                {/* 4. Assaying & Hallmarking Centre */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    4. Assaying & Hallmarking Centre (AHC)
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '2px' }}>
                    {huidResult.ahcName || 'Recognized AHC'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    AHC Code: <span style={{ fontWeight: 700, color: '#3A74C2' }}>{huidResult.ahcCode || 'AHC-DL-0012'}</span>
                  </div>
                </div>

                {/* 5. Hallmark Details */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    5. Hallmark Details & Date
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D2B42', marginBottom: '2px' }}>
                    Marking Date: {huidResult.hallmarkingDate || '18 September 2026'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    Marks Verified: BIS Triangle Logo + Karat/Fineness + 6-Digit HUID
                  </div>
                </div>

                {/* 6. Verification Status & Source */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    6. Registry Source & Audit
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#166534', marginBottom: '2px' }}>
                    {huidResult.officialSource}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                    Verified Timestamp: {huidResult.verifiedAt}
                  </div>
                </div>
              </div>

              {/* Informational Disclaimer Box */}
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#0369A1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <BadgeCheck size={18} style={{ flexShrink: 0 }} />
                <span>
                  <strong>Consumer Tip:</strong> Always verify that the 6-digit HUID printed on your purchase bill matches the exact engraving on the jewellery piece.
                </span>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ShieldCheck}
              title="Enter a 6-digit HUID to begin verification"
              description="Click on any of the demo examples above or enter a valid 6-character HUID code from a hallmarked piece."
              actionText="Load Sample AB1234"
              onAction={() => {
                setHuidInput('AB1234');
                handleVerifyHuid('AB1234');
              }}
            />
          )}
        </div>
      )}

      {/* ==================================================
          TAB 2: BIS LICENCE VERIFICATION (CM/L)
          ================================================== */}
      {activeTab === 'licence' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Award size={20} color="#3A74C2" />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42' }}>
                Verify BIS Licence Number (CM/L)
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              The CM/L number is an official 7-digit to 10-digit number printed directly beneath the ISI Mark on certified products:
            </p>

            <div style={{ display: 'flex', gap: '10px', maxWidth: '580px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="e.g. CM/L-7200142981"
                value={licenceInput}
                onChange={(e) => setLicenceInput(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  height: '46px',
                  padding: '0 16px',
                  fontSize: '15px',
                  fontWeight: 700,
                  border: '1.5px solid #D6E4F8',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFD',
                  color: '#1D2B42',
                }}
              />
              <button
                onClick={() => handleVerifyLicence()}
                disabled={isVerifyingLicence || !licenceInput.trim()}
                className="btn btn-primary"
                style={{ height: '46px', padding: '0 24px', fontSize: '14px', borderRadius: '10px' }}
              >
                <Search size={16} />
                {isVerifyingLicence ? 'Checking...' : 'Verify Licence'}
              </button>
            </div>

            {/* Demo Preloads */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Demo Licences:</span>
              {[
                { label: 'Insulated Bottles', code: 'CM/L-7200142981' },
                { label: 'Packaged Water', code: 'CM/L-8400021945' },
                { label: 'Plugs & Sockets', code: 'CM/L-1234567890' },
                { label: 'Cement 53G', code: 'CM/L-5500012345' },
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLicenceInput(item.code);
                    handleVerifyLicence(item.code);
                  }}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F6FD',
                    border: '1px solid #C4DCFA',
                    color: '#3A74C2',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {isVerifyingLicence ? (
            <LoadingSkeleton type="detail" count={1} message="Searching e-Manak central licence repository..." />
          ) : licenceResult ? (
            <div
              className="card"
              style={{
                padding: '28px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderRadius: '16px',
                boxShadow: '0 4px 14px rgba(30, 41, 59, 0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  borderBottom: '1px solid #E2EAF5',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em' }}>
                    BIS LICENCE NUMBER (CM/L)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#1D2B42' }}>
                      {licenceResult.licenceNo}
                    </span>
                    <button
                      onClick={() => handleCopy(licenceResult.licenceNo, 'licence')}
                      title="Copy Licence Number"
                      style={{
                        padding: '4px',
                        borderRadius: '6px',
                        border: '1px solid #D6E4F8',
                        backgroundColor: '#F8FAFD',
                        color: copiedField === 'licence' ? '#166534' : '#64748B',
                        cursor: 'pointer',
                      }}
                    >
                      {copiedField === 'licence' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: licenceResult.status === 'OPERATIVE' ? '#DCFCE7' : '#FEF3C7',
                    color: licenceResult.status === 'OPERATIVE' ? '#166534' : '#92400E',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    border: '1px solid currentColor',
                  }}
                >
                  <CheckCircle2 size={15} />
                  STATUS: {licenceResult.status}
                </span>
              </div>

              {/* Required Outputs Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '18px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Manufacturer / Company
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '4px' }}>
                    {licenceResult.licenseeName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Factory: {licenceResult.factoryAddress}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Product & Brand
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#3A74C2', marginBottom: '4px' }}>
                    {licenceResult.productName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#1E293B', fontWeight: 600 }}>
                    Brand Name: {licenceResult.brand}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Indian Standard (IS)
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '4px' }}>
                    {licenceResult.isNumber}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Scheme: {licenceResult.scheme || 'Scheme I (ISI Mark)'}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Validity & Certification Details
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>
                    Valid Till: {licenceResult.validTill}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    {licenceResult.certificationDetails}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '12px', fontSize: '12px', color: '#64748B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Official Source: <strong>{licenceResult.officialSource}</strong></span>
                <span>Verified: {licenceResult.verifiedAt}</span>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Award}
              title="Enter a CM/L licence number to begin verification"
              description="Check the validity and authorized scope of any ISI marked consumer or industrial product."
              actionText="Load Sample CM/L-7200142981"
              onAction={() => {
                setLicenceInput('CM/L-7200142981');
                handleVerifyLicence('CM/L-7200142981');
              }}
            />
          )}
        </div>
      )}

      {/* ==================================================
          TAB 3: CRS / R-NUMBER VERIFICATION
          ================================================== */}
      {activeTab === 'crs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Cpu size={20} color="#3A74C2" />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42' }}>
                Verify Compulsory Registration (CRS R-Number)
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Electronic devices (power banks, adapters, smartphones, laptops) carry a unique R-number under MeitY compulsory regulations:
            </p>

            <div style={{ display: 'flex', gap: '10px', maxWidth: '580px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="e.g. R-41001234"
                value={crsInput}
                onChange={(e) => setCrsInput(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  height: '46px',
                  padding: '0 16px',
                  fontSize: '15px',
                  fontWeight: 700,
                  border: '1.5px solid #D6E4F8',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFD',
                  color: '#1D2B42',
                }}
              />
              <button
                onClick={() => handleVerifyCrs()}
                disabled={isVerifyingCrs || !crsInput.trim()}
                className="btn btn-primary"
                style={{ height: '46px', padding: '0 24px', fontSize: '14px', borderRadius: '10px' }}
              >
                <Search size={16} />
                {isVerifyingCrs ? 'Checking...' : 'Verify R-Number'}
              </button>
            </div>

            {/* Demo Preloads */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Demo R-Numbers:</span>
              {[
                { label: 'Power Banks', code: 'R-41001234' },
                { label: 'LED Drivers', code: 'R-41029876' },
                { label: 'Smartphones', code: 'R-85002134' },
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setCrsInput(item.code);
                    handleVerifyCrs(item.code);
                  }}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F6FD',
                    border: '1px solid #C4DCFA',
                    color: '#3A74C2',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {isVerifyingCrs ? (
            <LoadingSkeleton type="detail" count={1} message="Checking MeitY-BIS Compulsory Registration Portal..." />
          ) : crsResult ? (
            <div
              className="card"
              style={{
                padding: '28px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderRadius: '16px',
                boxShadow: '0 4px 14px rgba(30, 41, 59, 0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  borderBottom: '1px solid #E2EAF5',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em' }}>
                    COMPULSORY REGISTRATION NUMBER (CRS)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#1D2B42' }}>
                      {crsResult.rNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(crsResult.rNumber, 'crs')}
                      title="Copy R-Number"
                      style={{
                        padding: '4px',
                        borderRadius: '6px',
                        border: '1px solid #D6E4F8',
                        backgroundColor: '#F8FAFD',
                        color: copiedField === 'crs' ? '#166534' : '#64748B',
                        cursor: 'pointer',
                      }}
                    >
                      {copiedField === 'crs' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: crsResult.status === 'ACTIVE' ? '#DCFCE7' : '#FEE2E2',
                    color: crsResult.status === 'ACTIVE' ? '#166534' : '#991B1B',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    border: '1px solid currentColor',
                  }}
                >
                  <CheckCircle2 size={15} />
                  REGISTRATION: {crsResult.status}
                </span>
              </div>

              {/* Required Outputs Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '18px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Manufacturer / Brand Owner
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '4px' }}>
                    {crsResult.companyName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Scope: {crsResult.registrationDetails}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Product Category & Standard
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#3A74C2', marginBottom: '4px' }}>
                    {crsResult.productCategory}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: 600 }}>
                    Standard: {crsResult.isStandard}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Authorized Model Numbers
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {(crsResult.modelNumbers || ['Default Base Model']).map((m, idx) => (
                      <span key={idx} style={{ fontSize: '12.5px', color: '#1D2B42', fontWeight: 600 }}>
                        • {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Validity & Portal Status
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>
                    Valid Till: {crsResult.validTill}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Self-Declaration: "Conforms to {crsResult.isStandard} R-{crsResult.rNumber.replace(/^R-/, '')}"
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '12px', fontSize: '12px', color: '#64748B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Official Source: <strong>{crsResult.officialSource}</strong></span>
                <span>Verified: {crsResult.verifiedAt}</span>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Cpu}
              title="Enter an R-number to begin verification"
              description="Verify electronic and IT equipment registration status under the MeitY-BIS Compulsory Registration Scheme."
              actionText="Load Sample R-41001234"
              onAction={() => {
                setCrsInput('R-41001234');
                handleVerifyCrs('R-41001234');
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
