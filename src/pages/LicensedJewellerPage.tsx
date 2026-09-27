import React, { useState, useEffect } from 'react';
import {
  Store,
  Search,
} from 'lucide-react';
import { NavRoute, LicensedJeweller } from '../types';
import { jewellersService } from '../services/jewellersService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';

interface LicensedJewellerPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const LicensedJewellerPage: React.FC<LicensedJewellerPageProps> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedMetal, setSelectedMetal] = useState('ALL');
  const [jewellers, setJewellers] = useState<LicensedJeweller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const states = ['ALL', 'Delhi', 'Karnataka', 'Telangana', 'Rajasthan', 'Maharashtra'];
  const metals = ['ALL', 'Gold', 'Silver', 'Both'];

  const fetchJewellers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await jewellersService.getJewellers({
        query: searchQuery,
        state: selectedState,
        metal: selectedMetal,
      });
      setJewellers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch licensed jewellers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJewellers();
  }, [searchQuery, selectedState, selectedMetal]);

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
          <Store size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            BIS Licensed Jewellers Registry
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Published directory of jewellers holding valid BIS hallmarking registrations. Powered by <code>GET /api/jewellers</code>.
        </p>

        {/* Search */}
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
            placeholder="Search by jeweller brand name, licence number (HM/C-...), or city..."
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
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: '1px solid #D6E4F8',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
              }}
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'All States' : s}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Category:</span>
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: '1px solid #D6E4F8',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
              }}
            >
              {metals.map((m) => (
                <option key={m} value={m}>
                  {m === 'ALL' ? 'All Metals' : m}
                </option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '12px', color: '#64748B', marginLeft: 'auto' }}>
            Endpoint: <code>GET /api/jewellers</code>
          </span>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <LoadingSkeleton type="table" count={2} message="Loading licensed jewellers from GET /api/jewellers..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchJewellers} apiEndpoint="GET /api/jewellers" />
      ) : jewellers.length === 0 ? (
        <EmptyState
          icon={Store}
          title="No licensed jeweller records found"
          description="Jeweller registration information will appear here once connected to GET /api/jewellers."
          actionText="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedState('ALL');
            setSelectedMetal('ALL');
          }}
        />
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Jeweller Entity Name</th>
                <th>Licence Number</th>
                <th>City / State</th>
                <th>Address</th>
                <th>Metal Category</th>
                <th>Status</th>
                <th>Validity</th>
              </tr>
            </thead>
            <tbody>
              {jewellers.map((j) => (
                <tr key={j.id}>
                  <td style={{ fontWeight: 700, color: '#2A3C5B' }}>{j.jewellerName}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#3A74C2', fontSize: '13px' }}>
                      {j.licenceNo}
                    </span>
                  </td>
                  <td>{j.city}, {j.state}</td>
                  <td style={{ fontSize: '12px', color: '#64748B', maxWidth: '280px' }}>{j.address}</td>
                  <td>
                    <span className="badge badge-sky">{j.metalCategory}</span>
                  </td>
                  <td>
                    <span className="badge badge-verified">{j.status}</span>
                  </td>
                  <td style={{ fontSize: '12.5px', color: '#166534', fontWeight: 600 }}>
                    {j.validTill}
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
