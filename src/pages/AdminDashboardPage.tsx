import React, { useState } from 'react';
import {
  Server,
  RefreshCw,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { NavRoute, HumanReviewQueueItem } from '../types';
import {
  MOCK_ADMIN_SYNC_DATA,
  MOCK_SOURCE_HEALTH,
  MOCK_HUMAN_REVIEW_QUEUE,
} from '../data/mockData';

interface AdminDashboardPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SYNC' | 'HEALTH' | 'REVIEW'>('OVERVIEW');
  const [reviewQueue, setReviewQueue] = useState<HumanReviewQueueItem[]>(MOCK_HUMAN_REVIEW_QUEUE);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleResolveReviewItem = (id: string) => {
    setReviewQueue(
      reviewQueue.map((item) =>
        item.id === id ? { ...item, status: 'RESOLVED' } : item
      )
    );
  };

  const handleTriggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '4px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Server size={22} color="#3A74C2" />
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
                Admin Operations & System Health Telemetry
              </h1>
            </div>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>
              Monitor automated BIS public feed synchronization, endpoint health, parser pipelines, and human review verification queues.
            </p>
          </div>

          <button
            onClick={handleTriggerManualSync}
            disabled={isSyncing}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <RefreshCw size={14} className={isSyncing ? 'spin' : ''} />
            {isSyncing ? 'Syncing Feeds...' : 'Trigger Synchronize'}
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          {[
            { id: 'OVERVIEW', label: '1. Operations Overview' },
            { id: 'SYNC', label: '2. Data Sync Dashboard (F35)' },
            { id: 'HEALTH', label: '3. Source Health Telemetry (F36)' },
            { id: 'REVIEW', label: `4. Human Review Queue (${reviewQueue.filter((r) => r.status !== 'RESOLVED').length})` },
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

      {/* TAB 1: OVERVIEW METRIC CARDS */}
      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              { label: 'TOTAL INDEXED STANDARDS', val: '25,482', sub: 'MED, ETD, FAD, CPMD, MTD' },
              { label: 'ACTIVE QCO ORDERS', val: '675', sub: 'Mandatory Gazette Notifications' },
              { label: 'RECOGNIZED TEST LABS', val: '284', sub: 'LIMS Accredited Facilities' },
              { label: 'A&H HALLMARKING CENTRES', val: '1,420', sub: 'Active Gold/Silver AHCs' },
              { label: 'LICENSED JEWELLERS', val: '18,940', sub: 'BIS Published Directory' },
              { label: 'SOURCES POLLED', val: '5 / 5', sub: 'Uptime 99.4% past 30 days' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '18px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D6E4F8',
                }}
              >
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '0.04em' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#2A3C5B', margin: '4px 0' }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: '11.5px', color: '#3A74C2' }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
            }}
          >
            {/* Quick Sync Summary */}
            <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#2A3C5B', marginBottom: '12px' }}>
                Latest Synchronization Batches
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {MOCK_ADMIN_SYNC_DATA.slice(0, 3).map((s) => (
                  <div
                    key={s.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      backgroundColor: '#F8FAFD',
                      borderRadius: '6px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#2A3C5B' }}>
                        {s.sourceName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        +{s.recordsAdded} added, {s.recordsUpdated} updated
                      </div>
                    </div>
                    <span className="badge badge-verified" style={{ fontSize: '10px' }}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Health Summary */}
            <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#2A3C5B', marginBottom: '12px' }}>
                BIS API Endpoint Health Status
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {MOCK_SOURCE_HEALTH.slice(0, 3).map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      backgroundColor: '#F8FAFD',
                      borderRadius: '6px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#2A3C5B' }}>
                        {h.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        Latency: {h.latencyMs}ms • Uptime: {h.uptimePercentage}%
                      </div>
                    </div>
                    <span
                      className={h.status === 'HEALTHY' ? 'badge badge-verified' : 'badge badge-warning'}
                      style={{ fontSize: '10px' }}
                    >
                      {h.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DATA SYNC DASHBOARD */}
      {activeTab === 'SYNC' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Sync Source</th>
                <th>Data Category</th>
                <th>Records Added</th>
                <th>Records Updated</th>
                <th>Deactivated</th>
                <th>Duration</th>
                <th>Last Run</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ADMIN_SYNC_DATA.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 700, color: '#2A3C5B' }}>{item.sourceName}</td>
                  <td>{item.dataType}</td>
                  <td style={{ color: '#166534', fontWeight: 700 }}>+{item.recordsAdded}</td>
                  <td style={{ color: '#3A74C2', fontWeight: 700 }}>{item.recordsUpdated}</td>
                  <td style={{ color: '#DC2626' }}>{item.recordsRemoved}</td>
                  <td>{(item.durationMs / 1000).toFixed(1)}s</td>
                  <td style={{ fontSize: '12px' }}>{item.lastRun}</td>
                  <td>
                    <span
                      className={item.status === 'SUCCESS' ? 'badge badge-verified' : 'badge badge-warning'}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: SOURCE HEALTH */}
      {activeTab === 'HEALTH' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {MOCK_SOURCE_HEALTH.map((metric, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '16px 20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2A3C5B' }}>
                    {metric.name}
                  </h4>
                  <span
                    className={metric.status === 'HEALTHY' ? 'badge badge-verified' : 'badge badge-warning'}
                  >
                    {metric.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', fontFamily: 'monospace' }}>
                  {metric.endpoint}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', fontSize: '12.5px', color: '#475569' }}>
                <div>
                  Uptime: <strong style={{ color: '#166534' }}>{metric.uptimePercentage}%</strong>
                </div>
                <div>
                  Response: <strong>{metric.latencyMs} ms</strong>
                </div>
                <div>
                  Last Polled: <strong>{metric.lastChecked}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: HUMAN REVIEW QUEUE */}
      {activeTab === 'REVIEW' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Issue Description</th>
                <th>Classification Type</th>
                <th>Source Origin</th>
                <th>Created</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviewQueue.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#2A3C5B', maxWidth: '300px' }}>
                    {item.issue}
                  </td>
                  <td>
                    <span className="badge badge-sky" style={{ fontSize: '11px' }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: '#64748B' }}>{item.source}</td>
                  <td style={{ fontSize: '11.5px' }}>{item.created}</td>
                  <td>
                    <span
                      className={
                        item.priority === 'HIGH'
                          ? 'badge badge-danger'
                          : item.priority === 'MEDIUM'
                          ? 'badge badge-warning'
                          : 'badge badge-sky'
                      }
                      style={{ fontSize: '10.5px' }}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={item.status === 'RESOLVED' ? 'badge badge-verified' : 'badge badge-warning'}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => handleResolveReviewItem(item.id)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '11.5px' }}
                      >
                        Approve & Verify
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>
                        ✓ Resolved
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
