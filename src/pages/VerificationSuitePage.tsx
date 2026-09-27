import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Building,
  Award,
  ExternalLink,
  Cpu,
  Calendar,
  Layers,
} from 'lucide-react';
import { NavRoute, LicenceVerificationResult, CrsVerificationResult } from '../types';
import { MOCK_LICENCE_DATABASE, MOCK_CRS_DATABASE } from '../data/mockData';

interface VerificationSuitePageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const VerificationSuitePage: React.FC<VerificationSuitePageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'LICENCE' | 'CRS'>('LICENCE');

  // Licence state
  const [licenceInput, setLicenceInput] = useState('CM/L-7200142981');
  const [licenceResult, setLicenceResult] = useState<LicenceVerificationResult | null>(
    MOCK_LICENCE_DATABASE['CM/L-7200142981']
  );
  const [isVerifyingLicence, setIsVerifyingLicence] = useState(false);

  // CRS state
  const [crsInput, setCrsInput] = useState('R-41001234');
  const [crsResult, setCrsResult] = useState<CrsVerificationResult | null>(
    MOCK_CRS_DATABASE['R-41001234']
  );
  const [isVerifyingCrs, setIsVerifyingCrs] = useState(false);

  const handleVerifyLicence = (query?: string) => {
    const q = (query || licenceInput).trim();
    if (!q) return;
    setIsVerifyingLicence(true);
    setLicenceResult(null);

    setTimeout(() => {
      setIsVerifyingLicence(false);
      if (MOCK_LICENCE_DATABASE[q]) {
        setLicenceResult(MOCK_LICENCE_DATABASE[q]);
      } else {
        setLicenceResult({
          licenceNo: q,
          status: 'NOT_FOUND',
          officialSource: 'BIS Manak Online Portal (e-BIS)',
          verifiedAt: new Date().toLocaleTimeString(),
        });
      }
    }, 450);
  };

  const handleVerifyCrs = (query?: string) => {
    const q = (query || crsInput).trim();
    if (!q) return;
    setIsVerifyingCrs(true);
    setCrsResult(null);

    setTimeout(() => {
      setIsVerifyingCrs(false);
      if (MOCK_CRS_DATABASE[q]) {
        setCrsResult(MOCK_CRS_DATABASE[q]);
      } else {
        setCrsResult({
          rNumber: q,
          status: 'INVALID',
          officialSource: 'MeitY-BIS Compulsory Registration Scheme (CRS Portal)',
          verifiedAt: new Date().toLocaleTimeString(),
        });
      }
    }, 450);
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
          <ShieldCheck size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            BIS Licence & CRS Verification Gateway
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Verify the operative status and scope of BIS Product Certification Licences (CM/L numbers) and Compulsory Registration Scheme (CRS R-numbers) for electronic products.
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
          <button
            onClick={() => setActiveTab('LICENCE')}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '6px',
              backgroundColor: activeTab === 'LICENCE' ? '#39527B' : '#F1F6FD',
              color: activeTab === 'LICENCE' ? '#FFFFFF' : '#39527B',
            }}
          >
            1. BIS Licence Verification (CM/L)
          </button>
          <button
            onClick={() => setActiveTab('CRS')}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '6px',
              backgroundColor: activeTab === 'CRS' ? '#39527B' : '#F1F6FD',
              color: activeTab === 'CRS' ? '#FFFFFF' : '#39527B',
            }}
          >
            2. Compulsory Registration (CRS R-Number)
          </button>
        </div>
      </div>

      {/* TAB 1: BIS Licence Verification (CM/L) */}
      {activeTab === 'LICENCE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '6px' }}>
              Enter BIS Licence Number (CM/L - 7 or 8 digits)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
              The CM/L number is printed beneath the official ISI mark on consumer products and packaging:
            </p>

            <div style={{ display: 'flex', gap: '10px', maxWidth: '560px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="e.g. CM/L-7200142981"
                value={licenceInput}
                onChange={(e) => setLicenceInput(e.target.value)}
                style={{
                  flex: 1,
                  height: '42px',
                  padding: '0 14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: '1px solid #D6E4F8',
                  borderRadius: '6px',
                }}
              />
              <button
                onClick={() => handleVerifyLicence()}
                disabled={isVerifyingLicence}
                className="btn btn-primary"
              >
                {isVerifyingLicence ? 'Querying...' : 'Verify Licence'}
              </button>
            </div>

            {/* Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Demo Records:</span>
              <button
                onClick={() => {
                  setLicenceInput('CM/L-7200142981');
                  handleVerifyLicence('CM/L-7200142981');
                }}
                className="btn btn-secondary btn-sm"
              >
                Milton Bottles (CM/L-7200142981 - Operative)
              </button>
              <button
                onClick={() => {
                  setLicenceInput('CM/L-8400031195');
                  handleVerifyLicence('CM/L-8400031195');
                }}
                className="btn btn-secondary btn-sm"
              >
                Bisleri Water (CM/L-8400031195 - Operative)
              </button>
              <button
                onClick={() => {
                  setLicenceInput('CM/L-1122334455');
                  handleVerifyLicence('CM/L-1122334455');
                }}
                className="btn btn-secondary btn-sm"
              >
                Expired Example (CM/L-1122334455)
              </button>
            </div>
          </div>

          {/* Result Card */}
          {licenceResult && (
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderLeft:
                  licenceResult.status === 'OPERATIVE'
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
                  paddingBottom: '10px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                    LICENCE VERIFICATION RESULT
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2A3C5B' }}>
                    {licenceResult.licenceNo}
                  </div>
                </div>

                <span
                  className={
                    licenceResult.status === 'OPERATIVE'
                      ? 'badge badge-verified'
                      : 'badge badge-danger'
                  }
                  style={{ fontSize: '12px' }}
                >
                  {licenceResult.status === 'OPERATIVE'
                    ? 'OPERATIVE (GENUINE ISI LICENCE)'
                    : licenceResult.status}
                </span>
              </div>

              {licenceResult.status === 'OPERATIVE' || licenceResult.status === 'EXPIRED' ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '16px',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Licensee Name:</span>
                    <div style={{ fontWeight: 800, color: '#2A3C5B', fontSize: '14px' }}>
                      {licenceResult.licenseeName}
                    </div>
                    <div style={{ color: '#3A74C2', fontWeight: 600 }}>Brand: {licenceResult.brand}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Factory Location:</span>
                    <div style={{ color: '#334155' }}>{licenceResult.factoryAddress}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Product & Standard:</span>
                    <div style={{ fontWeight: 700, color: '#2A3C5B' }}>{licenceResult.productName}</div>
                    <div style={{ color: '#3A74C2', fontWeight: 700 }}>{licenceResult.isNumber}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Validity & Scheme:</span>
                    <div style={{ fontWeight: 700, color: licenceResult.status === 'OPERATIVE' ? '#166534' : '#DC2626' }}>
                      Valid Till: {licenceResult.validTill}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>{licenceResult.scheme}</div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '12px', backgroundColor: '#FEF2F2', color: '#991B1B', borderRadius: '6px', fontSize: '13px' }}>
                  No active or past BIS licence record found matching "{licenceResult.licenceNo}". Verify that the number is entered correctly without typographical errors.
                </div>
              )}

              <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '10px', fontSize: '11.5px', color: '#64748B' }}>
                Verified via {licenceResult.officialSource} at {licenceResult.verifiedAt}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CRS R-Number Verification */}
      {activeTab === 'CRS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '6px' }}>
              Verify CRS R-Number (Compulsory Registration Scheme for Electronics & IT Goods)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
              Electronics items (batteries, laptops, adapters, LED lights) carry an R-number under MeitY-BIS Scheme II:
            </p>

            <div style={{ display: 'flex', gap: '10px', maxWidth: '560px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="e.g. R-41001234"
                value={crsInput}
                onChange={(e) => setCrsInput(e.target.value)}
                style={{
                  flex: 1,
                  height: '42px',
                  padding: '0 14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: '1px solid #D6E4F8',
                  borderRadius: '6px',
                }}
              />
              <button
                onClick={() => handleVerifyCrs()}
                disabled={isVerifyingCrs}
                className="btn btn-primary"
              >
                {isVerifyingCrs ? 'Querying...' : 'Verify R-Number'}
              </button>
            </div>

            {/* Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Demo Records:</span>
              <button
                onClick={() => {
                  setCrsInput('R-41001234');
                  handleVerifyCrs('R-41001234');
                }}
                className="btn btn-secondary btn-sm"
              >
                Samsung Batteries (R-41001234 - Active)
              </button>
              <button
                onClick={() => {
                  setCrsInput('R-41123456');
                  handleVerifyCrs('R-41123456');
                }}
                className="btn btn-secondary btn-sm"
              >
                HP Power Adapters (R-41123456 - Active)
              </button>
            </div>
          </div>

          {/* CRS Result */}
          {crsResult && (
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderLeft: crsResult.status === 'ACTIVE' ? '5px solid #166534' : '5px solid #DC2626',
              }}
            >
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
                    CRS VERIFICATION RESULT
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2A3C5B' }}>
                    {crsResult.rNumber}
                  </div>
                </div>

                <span
                  className={crsResult.status === 'ACTIVE' ? 'badge badge-verified' : 'badge badge-danger'}
                  style={{ fontSize: '12px' }}
                >
                  {crsResult.status === 'ACTIVE' ? 'ACTIVE REGISTRATION (VALID CRS)' : crsResult.status}
                </span>
              </div>

              {crsResult.status === 'ACTIVE' && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '16px',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Registered Brand Owner:</span>
                    <div style={{ fontWeight: 800, color: '#2A3C5B', fontSize: '14px' }}>
                      {crsResult.companyName}
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Product Category:</span>
                    <div style={{ color: '#334155' }}>{crsResult.productCategory}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Indian Standard:</span>
                    <div style={{ fontWeight: 700, color: '#3A74C2' }}>{crsResult.isStandard}</div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>Covered Model Numbers:</span>
                    <div style={{ color: '#2A3C5B', fontWeight: 600 }}>
                      {crsResult.modelNumbers?.join(', ')}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '10px', fontSize: '11.5px', color: '#64748B' }}>
                Verified via {crsResult.officialSource} • Timestamp: {crsResult.verifiedAt}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
