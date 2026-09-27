import React, { useState } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { NavRoute, ComplianceGapItem } from '../types';
import { MOCK_COMPLIANCE_GAP_DATA } from '../data/mockData';

interface ComplianceGapAnalysisPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const ComplianceGapAnalysisPage: React.FC<ComplianceGapAnalysisPageProps> = ({
  onNavigate,
}) => {
  const [selectedStandard, setSelectedStandard] = useState('IS 17526 : 2021');
  const [items, setItems] = useState<ComplianceGapItem[]>(MOCK_COMPLIANCE_GAP_DATA);

  const compliantCount = items.filter((i) => i.gapStatus === 'COMPLIANT').length;
  const gapCount = items.filter((i) => i.gapStatus === 'GAP_FOUND').length;
  const partialCount = items.filter((i) => i.gapStatus === 'PARTIAL').length;

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
          <CheckSquare size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            Compliance Gap Analysis Engine (F21)
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Automated pre-audit comparison: evaluate factory quality documentation and laboratory test records against verified BIS clause criteria.
        </p>

        {/* Prominent Statutory Disclaimer */}
        <div
          style={{
            marginTop: '16px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '6px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12.5px',
            color: '#92400E',
          }}
        >
          <ShieldAlert size={18} style={{ flexShrink: 0 }} />
          <span>
            <strong>AI-Assisted Pre-Assessment Notice:</strong> This analysis identifies documentary gaps to aid preparation for factory audit. It does not replace or constitute an official BIS statutory assessment.
          </span>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div className="card" style={{ padding: '16px', borderLeft: '4px solid #166534', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>COMPLIANT PARAMETERS</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#166534', marginTop: '2px' }}>
            {compliantCount} / {items.length}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>Verified documentary evidence found</div>
        </div>

        <div className="card" style={{ padding: '16px', borderLeft: '4px solid #DC2626', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CRITICAL GAPS IDENTIFIED</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>
            {gapCount}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>Action required before submitting application</div>
        </div>

        <div className="card" style={{ padding: '16px', borderLeft: '4px solid #D97706', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>PARTIAL / REQUIRES CALIBRATION</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>
            {partialCount}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>In-house test facility refinement needed</div>
        </div>
      </div>

      {/* Gap Analysis Matrix Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Clause & Parameter</th>
              <th>Applicable BIS Requirement</th>
              <th>Documentary Evidence Found</th>
              <th>Gap Status</th>
              <th>Remedial Action Required</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700, color: '#2A3C5B', maxWidth: '200px' }}>
                  <div style={{ color: '#3A74C2', fontSize: '12px' }}>{item.clause}</div>
                  <div>{item.parameter}</div>
                </td>
                <td style={{ fontSize: '12.5px', color: '#334155', maxWidth: '280px' }}>
                  {item.bisRequirement}
                </td>
                <td style={{ fontSize: '12.5px', color: '#475569', maxWidth: '260px' }}>
                  {item.evidenceFound}
                </td>
                <td>
                  {item.gapStatus === 'COMPLIANT' && (
                    <span className="badge badge-verified">COMPLIANT</span>
                  )}
                  {item.gapStatus === 'GAP_FOUND' && (
                    <span className="badge badge-danger">GAP FOUND</span>
                  )}
                  {item.gapStatus === 'PARTIAL' && (
                    <span className="badge badge-warning">PARTIAL</span>
                  )}
                </td>
                <td style={{ fontSize: '12px', color: '#2A3C5B', maxWidth: '260px', fontWeight: 500 }}>
                  {item.remedialAction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Footer */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '13px', color: '#64748B' }}>
          Evaluate additional testing facilities to close overall migration gaps:
        </span>
        <button
          onClick={() => onNavigate('testing-laboratories', { standard: 'IS 17526' })}
          className="btn btn-primary btn-sm"
        >
          Find Recognized Laboratories for Migration Testing &rarr;
        </button>
      </div>
    </div>
  );
};
