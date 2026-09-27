import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  ExternalLink,
} from 'lucide-react';
import { NavRoute, LicenceVerificationResult, CrsVerificationResult } from '../types';
import { verificationService } from '../services/verificationService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';

interface VerificationSuitePageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const VerificationSuitePage: React.FC<VerificationSuitePageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'LICENCE' | 'CRS'>('LICENCE');

  // Licence state
  const [licenceInput, setLicenceInput] = useState('');
  const [licenceResult, setLicenceResult] = useState<LicenceVerificationResult | null>(null);
  const [isVerifyingLicence, setIsVerifyingLicence] = useState(false);

  // CRS state
  const [crsInput, setCrsInput] = useState('');
  const [crsResult, setCrsResult] = useState<CrsVerificationResult | null>(null);
  const [isVerifyingCrs, setIsVerifyingCrs] = useState(false);

  const handleVerifyLicence = async () => {
    const raw = licenceInput.trim();
    if (!raw) return;
    setIsVerifyingLicence(true);
    setLicenceResult(null);

    const result = await verificationService.verifyLicence(raw);
    setLicenceResult(result);
    setIsVerifyingLicence(false);
  };

  const handleVerifyCrs = async () => {
    const raw = crsInput.trim();
    if (!raw) return;
    setIsVerifyingCrs(true);
    setCrsResult(null);

    const result = await verificationService.verifyCrs(raw);
    setCrsResult(result);
    setIsVerifyingCrs(false);
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
          Connects to official BIS backend endpoints: <code>POST /api/verification/licence</code> and <code>POST /api/verification/crs</code>.
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
              Enter BIS Licence Number (CM/L)
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
                onClick={handleVerifyLicence}
                disabled={isVerifyingLicence || !licenceInput.trim()}
                className="btn btn-primary"
              >
                {isVerifyingLicence ? 'Checking...' : 'Verify Licence'}
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Endpoint: <code>POST /api/verification/licence</code>
            </div>
          </div>

          {/* Result or Empty State */}
          {isVerifyingLicence ? (
            <LoadingSkeleton type="detail" count={1} message="Querying BIS e-Manak licence directory..." />
          ) : licenceResult ? (
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderLeft: '5px solid #D97706',
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
                    QUERY IDENTIFIER
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2A3C5B' }}>
                    {licenceResult.licenceNo}
                  </div>
                </div>

                <span className="badge badge-warning" style={{ fontSize: '12px' }}>
                  {licenceResult.status}
                </span>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#FFFBEB', color: '#92400E', borderRadius: '6px', fontSize: '13px', marginBottom: '14px' }}>
                No active or past BIS licence record confirmed by backend service. Backend verification endpoint: <code>{licenceResult.officialSource}</code>.
              </div>

              <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '10px', fontSize: '11.5px', color: '#64748B' }}>
                Query executed at {licenceResult.verifiedAt}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ShieldCheck}
              title="No verification result"
              description="Enter a CM/L licence number to begin verification against the BIS database."
            />
          )}
        </div>
      )}

      {/* TAB 2: CRS R-Number Verification */}
      {activeTab === 'CRS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '6px' }}>
              Verify CRS R-Number
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
              Electronics items carry an R-number under the Compulsory Registration Scheme (CRS):
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
                onClick={handleVerifyCrs}
                disabled={isVerifyingCrs || !crsInput.trim()}
                className="btn btn-primary"
              >
                {isVerifyingCrs ? 'Checking...' : 'Verify R-Number'}
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Endpoint: <code>POST /api/verification/crs</code>
            </div>
          </div>

          {isVerifyingCrs ? (
            <LoadingSkeleton type="detail" count={1} message="Checking MeitY-BIS CRS Portal..." />
          ) : crsResult ? (
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderLeft: '5px solid #D97706',
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
                    CRS QUERY STATUS
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2A3C5B' }}>
                    {crsResult.rNumber}
                  </div>
                </div>

                <span className="badge badge-warning" style={{ fontSize: '12px' }}>
                  {crsResult.status}
                </span>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#FFFBEB', color: '#92400E', borderRadius: '6px', fontSize: '13px' }}>
                Service response: Registration details pending backend service integration at <code>{crsResult.officialSource}</code>.
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ShieldCheck}
              title="No verification result"
              description="Enter an R-number to begin verification."
            />
          )}
        </div>
      )}
    </div>
  );
};
