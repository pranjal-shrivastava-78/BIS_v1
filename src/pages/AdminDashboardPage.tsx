import React, { useState, useEffect } from 'react';
import {
  Server,
  RefreshCw,
  Inbox,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  ChevronLeft,
  Check,
  X,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import {
  NavRoute,
  HumanReviewQueueItem,
  AdminSyncRecord,
  SourceHealthMetric,
  SyncErrorRecord,
} from '../types';
import { adminService, DashboardStats } from '../services/adminService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { SegmentedControl } from '../components/common/SegmentedControl';

interface AdminDashboardPageProps {
  initialTab?: 'OVERVIEW' | 'HEALTH' | 'SYNC' | 'ERRORS' | 'REVIEW';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  initialTab = 'OVERVIEW',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'HEALTH' | 'SYNC' | 'ERRORS' | 'REVIEW'>(initialTab);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [syncLogs, setSyncLogs] = useState<AdminSyncRecord[]>([]);
  const [sourceHealth, setSourceHealth] = useState<SourceHealthMetric[]>([]);
  const [syncErrors, setSyncErrors] = useState<SyncErrorRecord[]>([]);
  const [reviewQueue, setReviewQueue] = useState<HumanReviewQueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Manual Sync UI demo state (Per Section 16)
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      adminService.getDashboardStats(),
      adminService.getSyncLogs(),
      adminService.getSourceHealth(),
      adminService.getSyncErrors(),
      adminService.getReviewQueue(),
    ]).then(([s, logs, health, errors, queue]) => {
      setStats(s);
      setSyncLogs(logs);
      setSourceHealth(health);
      setSyncErrors(errors);
      setReviewQueue(queue);
      setIsLoading(false);
    });
  }, []);

  const handleResolveReviewItem = async (id: string, action: string) => {
    await adminService.resolveReviewItem(id, action);
    setReviewQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'RESOLVED' } : item))
    );
  };

  const handleTriggerManualSync = async () => {
    setIsSyncing(true);
    setSyncSuccessMsg(null);
    try {
      const res = await adminService.triggerSync();
      setSyncSuccessMsg(res.message);
      setTimeout(() => setSyncSuccessMsg(null), 4000);
    } finally {
      setIsSyncing(false);
    }
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
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Admin & Telemetry Dashboard</span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              <Server size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
                Admin Operations & System Health Telemetry
              </h1>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                Monitor public BIS registry feeds, synchronization logs, source endpoints, and human review queues.
              </p>
            </div>
          </div>

          {/* Manual Sync UI (Per Section 16: "Sync started" -> loading -> mock success) */}
          <button
            onClick={handleTriggerManualSync}
            disabled={isSyncing}
            className="btn btn-primary"
            style={{ padding: '9px 18px', fontSize: '13px', borderRadius: '10px' }}
          >
            <RefreshCw size={15} className={isSyncing ? 'spin' : ''} />
            {isSyncing ? 'Syncing Feeds...' : 'Manual Sync Feeds'}
          </button>
        </div>

        {/* Sync Success Notification Banner */}
        {syncSuccessMsg && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              backgroundColor: '#DCFCE7',
              border: '1px solid #86EFAC',
              borderRadius: '10px',
              fontSize: '13px',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CheckCircle2 size={16} />
            <strong>Sync Success:</strong> {syncSuccessMsg}
          </div>
        )}

        {/* Pill / Segmented Control Bar (Per Section 1 & 2) */}
        <div style={{ marginTop: '16px', borderTop: '1px solid #E2EAF5', paddingTop: '16px' }}>
          <SegmentedControl<'OVERVIEW' | 'HEALTH' | 'SYNC' | 'ERRORS' | 'REVIEW'>
            items={[
              {
                id: 'OVERVIEW',
                label: 'Overview',
                number: 1,
                icon: Database,
              },
              {
                id: 'HEALTH',
                label: 'Source Health',
                number: 2,
                icon: Activity,
              },
              {
                id: 'SYNC',
                label: 'Sync Runs',
                number: 3,
                icon: RefreshCw,
              },
              {
                id: 'ERRORS',
                label: 'Sync Errors',
                number: 4,
                icon: AlertTriangle,
                badge: syncErrors.length,
              },
              {
                id: 'REVIEW',
                label: 'Review Queue',
                number: 5,
                icon: Inbox,
                badge: reviewQueue.filter((r) => r.status === 'PENDING').length,
              },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />
        </div>
      </div>

      {/* ==================================================
          TAB 1: OVERVIEW METRICS (Per Section 16)
          ================================================== */}
      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isLoading ? (
            <LoadingSkeleton type="card" count={4} message="Aggregating registry statistics..." />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {[
                { label: 'Total Indian Standards', val: stats?.totalStandards?.toLocaleString() || '21,480', sub: 'IS Catalogue', color: '#3A74C2' },
                { label: 'Mandatory QCO Orders', val: stats?.totalQcos?.toLocaleString() || '672', sub: 'Gazetted Orders', color: '#DC2626' },
                { label: 'Certification Schemes', val: stats?.certificationSchemes || '6', sub: 'Active Frameworks', color: '#0369A1' },
                { label: 'Recognized Laboratories', val: stats?.laboratories?.toLocaleString() || '840', sub: 'LIMS Facilities', color: '#166534' },
                { label: 'Hallmarking Centres', val: stats?.hallmarkingCentres?.toLocaleString() || '1,520', sub: 'AHC Registry', color: '#B45309' },
                { label: 'Licensed Jewellers', val: stats?.jewellers?.toLocaleString() || '18,450', sub: 'Registered Jewellers', color: '#7C3AED' },
                { label: 'Verification Requests', val: stats?.verificationRequests?.toLocaleString() || '142,390', sub: 'HUID & Licence Queries', color: '#0F766E' },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D6E4F8',
                    borderRadius: '14px',
                    borderLeft: `4px solid ${m.color}`,
                  }}
                >
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#1D2B42', margin: '4px 0 2px' }}>
                    {m.val}
                  </div>
                  <div style={{ fontSize: '11px', color: m.color, fontWeight: 700 }}>
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          TAB 2: SOURCE HEALTH (Per Section 16)
          ================================================== */}
      {activeTab === 'HEALTH' && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '16px' }}>
            External Source Endpoint Health & Availability
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Source Feed Name</th>
                  <th>Status</th>
                  <th>Last Sync Time</th>
                  <th>Records Managed</th>
                  <th>Health / Latency</th>
                </tr>
              </thead>
              <tbody>
                {sourceHealth.map((sh, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#1D2B42' }}>{sh.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{sh.endpoint}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: 800,
                          backgroundColor: sh.status === 'HEALTHY' ? '#DCFCE7' : '#FEF3C7',
                          color: sh.status === 'HEALTHY' ? '#166534' : '#92400E',
                        }}
                      >
                        {sh.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '12.5px', color: '#475569' }}>{sh.lastSuccessSync}</td>
                    <td style={{ fontWeight: 700, color: '#1D2B42' }}>
                      {sh.records ? sh.records.toLocaleString() : 'N/A'}
                    </td>
                    <td>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>
                        {sh.uptimePercentage}% Uptime
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{sh.latencyMs}ms response</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 3: SYNC RUNS (Per Section 16)
          ================================================== */}
      {activeTab === 'SYNC' && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '16px' }}>
            Data Ingestion & Synchronisation Run History
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Dataset / Source</th>
                  <th>Status</th>
                  <th>Started</th>
                  <th>Completed</th>
                  <th>Records Processed</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Errors</th>
                </tr>
              </thead>
              <tbody>
                {syncLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#1D2B42' }}>{log.sourceName}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{log.dataType}</div>
                    </td>
                    <td>
                      <span className={`badge ${log.status === 'SUCCESS' ? 'badge-verified' : 'badge-warning'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#475569' }}>{log.lastRun}</td>
                    <td style={{ fontSize: '12px', color: '#475569' }}>{log.completedAt || 'N/A'}</td>
                    <td style={{ fontWeight: 700 }}>{log.recordsProcessed || 120}</td>
                    <td style={{ color: '#166534', fontWeight: 700 }}>+{log.recordsAdded}</td>
                    <td style={{ color: '#3A74C2', fontWeight: 700 }}>{log.recordsUpdated}</td>
                    <td style={{ color: log.errorsCount ? '#DC2626' : '#64748B', fontWeight: 700 }}>
                      {log.errorsCount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 4: SYNC ERRORS (Per Section 16)
          ================================================== */}
      {activeTab === 'ERRORS' && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '16px' }}>
            Data Pipeline Sync Errors & Warnings Log
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Dataset</th>
                  <th>Error Type</th>
                  <th>Message / Trace</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {syncErrors.map((err) => (
                  <tr key={err.id}>
                    <td style={{ fontWeight: 800, color: '#1D2B42' }}>{err.dataset}</td>
                    <td>
                      <span className="badge badge-danger">{err.errorType}</span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#334155', maxWidth: '380px' }}>
                      {err.message}
                    </td>
                    <td style={{ fontSize: '12px', color: '#64748B' }}>{err.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 5: REVIEW QUEUE (Per Section 16)
          ================================================== */}
      {activeTab === 'REVIEW' && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '16px' }}>
            Human-in-the-Loop Review Queue
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item / Issue Description</th>
                  <th>Dataset</th>
                  <th>Type & Confidence</th>
                  <th>Status</th>
                  <th>Action Buttons</th>
                </tr>
              </thead>
              <tbody>
                {reviewQueue.map((item) => (
                  <tr key={item.id}>
                    <td style={{ maxWidth: '320px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1D2B42' }}>
                        {item.issue}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        Source: {item.source} • Created: {item.created}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-sky">{item.dataset || 'Registry'}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>{item.type}</div>
                      <div style={{ fontSize: '11px', color: '#166534' }}>{Math.round(item.confidenceScore * 100)}% Confidence</div>
                    </td>
                    <td>
                      <span className={`badge ${item.status === 'RESOLVED' ? 'badge-verified' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status !== 'RESOLVED' ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => handleResolveReviewItem(item.id, 'APPROVED')}
                            className="btn btn-sm btn-primary"
                            style={{ fontSize: '11px', padding: '3px 8px' }}
                          >
                            <Check size={12} /> Approve
                          </button>
                          <button
                            onClick={() => handleResolveReviewItem(item.id, 'DISMISSED')}
                            className="btn btn-sm btn-secondary"
                            style={{ fontSize: '11px', padding: '3px 8px' }}
                          >
                            <X size={12} /> Dismiss
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11.5px', color: '#166534', fontWeight: 700 }}>
                          Resolved ✓
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
