import React, { useState, useMemo } from 'react';
import {
  Store,
  Search,
  MapPin,
  ShieldCheck,
  Calendar,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import { NavRoute, LicensedJeweller } from '../types';
import { LICENSED_JEWELLERS } from '../data/mockData';

interface LicensedJewellerPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const LicensedJewellerPage: React.FC<LicensedJewellerPageProps> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedMetal, setSelectedMetal] = useState('ALL');

  const states = ['ALL', 'Delhi', 'Karnataka', 'Telangana', 'Rajasthan'];
  const metals = ['ALL', 'Gold', 'Silver', 'Both'];

  const filteredJewellers = useMemo(() => {
    return LICENSED_JEWELLERS.filter((j) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        j.jewellerName.toLowerCase().includes(q) ||
        j.licenceNo.toLowerCase().includes(q) ||
        j.city.toLowerCase().includes(q) ||
        j.address.toLowerCase().includes(q);

      const matchesState = selectedState === 'ALL' || j.state === selectedState;
      const matchesMetal = selectedMetal === 'ALL' || j.metalCategory === selectedMetal;

      return matchesSearch && matchesState && matchesMetal;
    });
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
          Search officially published BIS licensed jewellers registered to sell hallmarked gold and silver artefacts in conformity with the BIS Act, 2016.
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
            placeholder="Search by jeweller brand name, licence number (e.g., HM/C-...), city or address..."
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
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Metal Category:</span>
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
                  {m === 'ALL' ? 'All Metals (Gold & Silver)' : m}
                </option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '12px', color: '#64748B', marginLeft: 'auto' }}>
            Last Synchronized: <strong>26 Sept 2026</strong> • BIS Central Hallmarking Portal
          </span>
        </div>
      </div>

      {/* Results Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Jeweller Entity Name</th>
              <th>Licence / Registration No</th>
              <th>City / State</th>
              <th>Address</th>
              <th>Metal Category</th>
              <th>Status</th>
              <th>Validity</th>
            </tr>
          </thead>
          <tbody>
            {filteredJewellers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
                  No licensed jewellers found matching your search.
                </td>
              </tr>
            ) : (
              filteredJewellers.map((j) => (
                <tr key={j.id}>
                  <td style={{ fontWeight: 700, color: '#2A3C5B' }}>{j.jewellerName}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#3A74C2', fontSize: '13px' }}>
                      {j.licenceNo}
                    </span>
                  </td>
                  <td>
                    {j.city}, {j.state}
                  </td>
                  <td style={{ fontSize: '12px', color: '#64748B', maxWidth: '280px' }}>
                    {j.address}
                  </td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
