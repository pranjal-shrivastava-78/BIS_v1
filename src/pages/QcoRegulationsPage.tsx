import React, { useState, useMemo } from 'react';
import {
  Scale,
  Search,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Building,
  RefreshCw,
  SlidersHorizontal,
  Clock,
} from 'lucide-react';
import { NavRoute, QcoRecord } from '../types';
import { QCO_RECORDS } from '../data/mockData';

interface QcoRegulationsPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const QcoRegulationsPage: React.FC<QcoRegulationsPageProps> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const ministries = [
    'ALL',
    'Ministry of Commerce and Industry (DPIIT)',
    'Ministry of Consumer Affairs, Food & Public Distribution',
    'Ministry of Power / DPIIT',
    'Ministry of New and Renewable Energy (MNRE)',
  ];

  const filteredQco = useMemo(() => {
    return QCO_RECORDS.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.product.toLowerCase().includes(q) ||
        item.isNumber.toLowerCase().includes(q) ||
        item.notificationNo.toLowerCase().includes(q) ||
        item.ministry.toLowerCase().includes(q);

      const matchesMinistry =
        selectedMinistry === 'ALL' || item.ministry === selectedMinistry;

      const matchesStatus =
        selectedStatus === 'ALL' || item.status === selectedStatus;

      return matchesSearch && matchesMinistry && matchesStatus;
    });
  }, [searchQuery, selectedMinistry, selectedStatus]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
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
            marginBottom: '8px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Scale size={22} color="#3A74C2" />
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
                Quality Control Orders (QCO) & Regulatory Status
              </h1>
            </div>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>
              Structured, gazetted regulatory database indexing central government notifications that mandate BIS certification.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#F1F6FD',
              border: '1px solid #C4DCFA',
              borderRadius: '6px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11.5px',
              color: '#39527B',
            }}
          >
            <RefreshCw size={14} color="#3A74C2" />
            <span>
              <strong>Last Synchronized:</strong> 26 Sept 2026 18:30 IST (Gazette Feed)
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', marginTop: '16px', marginBottom: '14px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#3A74C2',
            }}
          />
          <input
            type="text"
            placeholder="Search QCO by product name, IS standard number, ministry, or Gazette S.O. notification number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '44px',
              paddingRight: '16px',
              fontSize: '13.5px',
              backgroundColor: '#F8FAFD',
              border: '1px solid #D6E4F8',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Ministry:</span>
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: '1px solid #D6E4F8',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
              }}
            >
              {ministries.map((m) => (
                <option key={m} value={m}>
                  {m === 'ALL' ? 'All Ministries / Departments' : m}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Enforcement:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: '1px solid #D6E4F8',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="ENFORCED">Enforced (Active)</option>
              <option value="UPCOMING">Upcoming Deadline</option>
              <option value="EXTENDED">Deadline Extended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product / Description</th>
              <th>Applicable IS Standard</th>
              <th>Issuing Ministry</th>
              <th>Gazette Notification</th>
              <th>Enforcement Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQco.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
                  No Quality Control Orders found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredQco.map((qco) => (
                <tr key={qco.id}>
                  <td style={{ fontWeight: 700, color: '#2A3C5B', maxWidth: '280px' }}>
                    {qco.product}
                  </td>
                  <td>
                    <span
                      onClick={() => onNavigate('standards-explorer', qco.isNumber)}
                      style={{
                        fontWeight: 700,
                        color: '#3A74C2',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      {qco.isNumber}
                    </span>
                  </td>
                  <td style={{ fontSize: '12.5px', color: '#475569' }}>{qco.ministry}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#2A3C5B', fontSize: '12.5px' }}>
                      {qco.notificationNo}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Dated: {qco.notificationDate}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                      <Calendar size={13} color="#3A74C2" />
                      <strong>{qco.effectiveDate}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-verified">{qco.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => onNavigate('certification', qco.isNumber)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '11.5px' }}
                      >
                        Certification
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Statutory Guidance Note */}
      <div
        style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: '8px',
          padding: '14px 18px',
          fontSize: '12.5px',
          color: '#92400E',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <Scale size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Statutory Effect of Quality Control Orders:</strong> Once a QCO takes effect, sub-standard or non-certified goods cannot be manufactured, imported, stored, sold, or distributed in India without the BIS Standard Mark (ISI mark or CRS registration). Violations are punishable under the BIS Act, 2016.
        </div>
      </div>
    </div>
  );
};
