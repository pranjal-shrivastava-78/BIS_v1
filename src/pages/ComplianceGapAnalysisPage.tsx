import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  ShieldAlert,
} from 'lucide-react';
import { NavRoute, ComplianceGapItem } from '../types';
import { standardsService } from '../services/standardsService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';

interface ComplianceGapAnalysisPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const ComplianceGapAnalysisPage: React.FC<ComplianceGapAnalysisPageProps> = ({
  onNavigate,
}) => {
  const [items, setItems] = useState<ComplianceGapItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    standardsService.getComplianceGapItems().then((data) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  const compliantCount = items.filter((i) => i.gapStatus === 'COMPLIANT').length;
  const gapCount = items.filter((i) => i.gapStatus === 'GAP_FOUND').length;

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
          Pre-audit comparison: evaluate factory documentation against verified BIS clause criteria. Powered by <code>GET /api/compliance/gap-analysis</code>.
        </p>

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
            <strong>AI-Assisted Pre-Assessment Notice:</strong> This analysis identifies documentary gaps to aid preparation for factory audit. It does not replace an official BIS statutory assessment.
          </span>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton type="table" count={2} message="Loading compliance gap criteria from API..." />
      ) : items.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No gap analysis criteria available"
          description="Compliance gap data will appear here once connected to GET /api/compliance/gap-analysis."
        />
      ) : (
        <>
          {/* Metric Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div className="card" style={{ padding: '16px', borderLeft: '4px solid #166534', backgroundColor: '#FFFFFF' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>COMPLIANT PARAMETERS</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#166534', marginTop: '2px' }}>
                {compliantCount} / {items.length}
              </div>
            </div>

            <div className="card" style={{ padding: '16px', borderLeft: '4px solid #DC2626', backgroundColor: '#FFFFFF' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CRITICAL GAPS IDENTIFIED</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#DC2626', marginTop: '2px' }}>
                {gapCount}
              </div>
            </div>
          </div>

          {/* Matrix Table */}
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
                    </td>
                    <td style={{ fontSize: '12px', color: '#2A3C5B', maxWidth: '260px' }}>
                      {item.remedialAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
