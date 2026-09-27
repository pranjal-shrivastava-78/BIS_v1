import React, { useState, useEffect } from 'react';
import {
  Server,
  RefreshCw,
  Inbox,
} from 'lucide-react';
import { NavRoute, HumanReviewQueueItem, AdminSyncRecord, SourceHealthMetric } from '../types';
import { adminService, DashboardStats } from '../services/adminService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';

interface AdminDashboardPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SYNC' | 'HEALTH' | 'REVIEW'>('OVERVIEW');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [syncLogs, setSyncLogs] = useState<AdminSyncRecord[]>([]);
  const [sourceHealth, setSourceHealth] = useState<SourceHealthMetric[]>([]);
  const [reviewQueue, setReviewQueue] = useState<HumanReviewQueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      adminService.getDashboardStats(),
      adminService.getSyncLogs(),
      adminService.getSourceHealth(),
      adminService.getReviewQueue(),
    ]).then(([s, logs, health, queue]) => {
      setStats(s);
      setSyncLogs(logs);
      setSourceHealth(health);
      setReviewQueue(queue);
      setIsLoading(false);
    });
  }, []);

  const handleResolveReviewItem = async (id: string) => {
    await adminService.resolveReviewItem(id, 'APPROVED');
    setReviewQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'RESOLVED' } : item))
    );
  };

  const handleTriggerManualSync = async () => {
    setIsSyncing(true);
    try {
      await adminService.triggerSync();
    } finally {
      setIsSyncing(false);
    }
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
              Monitor automated BIS public feed synchronization, endpoint health, and human review verification queues.
            </p>
          </div>

          <button
            onClick={handleTriggerManualSync}
            disabled={isSyncing}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <RefreshCw size={14} className={isSyncing ? 'spin' : ''} />
            {isSyncing ? 'Triggering Sync...' : 'Trigger Synchronize'}
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          {[
            { id: 'OVERVIEW', label: '1. Overview' },
            { id: 'SYNC', label: '2. Data Sync Dashboard (F35)' },
            { id: 'HEALTH', label: '3. Source Health (F36)' },
            { id: 'REVIEW', label: `4. Human Review Queue (${reviewQueue.length})` },
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

      {/* TAB 1: OVERVIEW (Rule 11: No fabricated statistics) */}
      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { label: 'TOTAL STANDARDS', val: stats?.totalStandards !== null ? stats?.totalStandards : '—', sub: 'GET /api/standards' },
              { label: 'ACTIVE QCO ORDERS', val: stats?.qcoRecords !== null ? stats?.qcoRecords : '—', sub: 'GET /api/qco' },
              { label: 'RECOGNIZED TEST LABS', val: stats?.laboratories !== null ? stats?.laboratories : '—', sub: 'GET /api/laboratories' },
              { label: 'A&H CENTRES', val: stats?.ahcCentres !== null ? stats?.ahcCentres : '—', sub: 'GET /api/hallmarking-centres' },
              { label: 'LICENSED JEWELLERS', val: stats?.licensedJewellers !== null ? stats?.licensedJewellers : '—', sub: 'GET /api/jewellers' },
              { label: 'SYNC PIPELINE', val: stats?.sourcesActive !== null ? `${stats?.sourcesActive} Feeds` : 'Ready', sub: 'Endpoint: /api/admin/sync' },
            ].map((stat, idx) => (
              <div key={idx} className="card" style={{ padding: '18px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '0.04em' }}>{stat.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#2A3C5B', margin: '4px 0' }}>{stat.val}</div>
                <div style={{ fontSize: '11.5px', color: '#3A74C2' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DATA SYNC */}
      {activeTab === 'SYNC' && (
        syncLogs.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No sync log records found"
            description="Sync batch logs will be displayed here once synchronization jobs are executed via GET /api/admin/sync-logs."
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sync Source</th>
                  <th>Data Category</th>
                  <th>Records Added</th>
                  <th>Records Updated</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {syncLogs.map((item) => (
                  <tr key={item.id}>
                    <td>{item.sourceName}</td>
                    <td>{item.dataType}</td>
                    <td>{item.recordsAdded}</td>
                    <td>{item.recordsUpdated}</td>
                    <td><span className="badge badge-verified">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* TAB 3: HEALTH */}
      {activeTab === 'HEALTH' && (
        sourceHealth.length === 0 ? (
          <EmptyState
            icon={Server}
            title="No source health telemetry available"
            description="API availability and parser metrics will appear here once connected to GET /api/admin/source-health."
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sourceHealth.map((h, i) => (
              <div key={i} className="card" style={{ padding: '14px 18px', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{h.name}</strong>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{h.endpoint}</div>
                </div>
                <span className="badge badge-verified">{h.status}</span>
              </div>
            ))}
          </div>
        )
      )}

      {/* TAB 4: REVIEW QUEUE */}
      {activeTab === 'REVIEW' && (
        reviewQueue.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Human review queue is clear"
            description="No ambiguous mappings or conflicting records require review at this time."
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Issue Description</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviewQueue.map((item) => (
                  <tr key={item.id}>
                    <td>{item.issue}</td>
                    <td><span className="badge badge-sky">{item.type}</span></td>
                    <td><span className="badge badge-warning">{item.priority}</span></td>
                    <td>{item.status}</td>
                    <td>
                      {item.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleResolveReviewItem(item.id)}
                          className="btn btn-primary btn-sm"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};
