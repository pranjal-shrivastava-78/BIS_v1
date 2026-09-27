import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Search,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  ExternalLink,
  SlidersHorizontal,
  Navigation,
} from 'lucide-react';
import { NavRoute, TestingLab } from '../types';
import { TESTING_LABS } from '../data/mockData';
import { Modal } from '../components/common/Modal';

interface TestingLaboratoriesPageProps {
  initialFilter?: { standard?: string };
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const TestingLaboratoriesPage: React.FC<TestingLaboratoriesPageProps> = ({
  initialFilter,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialFilter?.standard || '');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCapability, setSelectedCapability] = useState('ALL');
  const [selectedLab, setSelectedLab] = useState<TestingLab | null>(null);

  const states = ['ALL', 'Delhi', 'Uttar Pradesh', 'Maharashtra', 'Karnataka'];
  const capabilities = ['ALL', 'Chemical', 'Mechanical', 'Electrical', 'Microbiological', 'Precious Metals'];

  const filteredLabs = useMemo(() => {
    return TESTING_LABS.filter((lab) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lab.name.toLowerCase().includes(q) ||
        lab.code.toLowerCase().includes(q) ||
        lab.city.toLowerCase().includes(q) ||
        lab.accreditedStandards.some((s) => s.toLowerCase().includes(q));

      const matchesState = selectedState === 'ALL' || lab.state === selectedState;
      const matchesCap =
        selectedCapability === 'ALL' || lab.capabilities.includes(selectedCapability);

      return matchesSearch && matchesState && matchesCap;
    });
  }, [searchQuery, selectedState, selectedCapability]);

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
          <FlaskConical size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            BIS Recognized Testing Laboratories (LIMS Directory)
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Locate BIS central, regional, and recognized private testing laboratories authorized to perform conformity testing under the Laboratory Recognition Scheme (LRS).
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
            placeholder="Search laboratory name, city, registration code, or standard (e.g. IS 17526, IS 9873)..."
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
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>State/Territory:</span>
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
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Capability:</span>
            <select
              value={selectedCapability}
              onChange={(e) => setSelectedCapability(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: '1px solid #D6E4F8',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
              }}
            >
              {capabilities.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Capabilities' : c}
                </option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '12px', color: '#64748B', marginLeft: 'auto' }}>
            Source: <strong>BIS LIMS Portal</strong> • Synchronized 26 Sept 2026
          </span>
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '16px' }}>
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="card"
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D6E4F8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-sky" style={{ fontSize: '11px' }}>
                  {lab.code}
                </span>
                <span className="badge badge-verified" style={{ fontSize: '11px' }}>
                  {lab.status}
                </span>
              </div>

              <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                {lab.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12.5px', color: '#64748B', marginBottom: '10px' }}>
                <MapPin size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#3A74C2' }} />
                <span>{lab.address}</span>
              </div>

              {/* Capabilities pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {lab.capabilities.map((cap, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      backgroundColor: '#F1F6FD',
                      color: '#39527B',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid #E2EAF5',
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>

              {/* Accredited Standards */}
              <div style={{ fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
                <strong>Accredited Standards: </strong>
                {lab.accreditedStandards.join(', ')}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #EDF3FB',
                fontSize: '12px',
              }}
            >
              <span style={{ color: '#166534', fontWeight: 600 }}>
                Valid till: {lab.validity}
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedLab(lab)}
                  className="btn btn-primary btn-sm"
                >
                  View Full Scope
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Detail Modal */}
      {selectedLab && (
        <Modal
          isOpen={!!selectedLab}
          onClose={() => setSelectedLab(null)}
          title={selectedLab.name}
          subtitle={`Recognition Code: ${selectedLab.code} • Status: ${selectedLab.status}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
              <div style={{ fontWeight: 700, color: '#2A3C5B', marginBottom: '4px' }}>Address & Location</div>
              <div style={{ color: '#475569' }}>{selectedLab.address}</div>
              <div style={{ marginTop: '8px', display: 'flex', gap: '16px', color: '#39527B' }}>
                <span><strong>Phone:</strong> {selectedLab.contact}</span>
                <span><strong>Email:</strong> {selectedLab.email}</span>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                Accredited Testing Capabilities & Scopes
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedLab.capabilities.map((c, i) => (
                  <span key={i} className="badge badge-sky">{c}</span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                Covered Indian Standards
              </div>
              <ul style={{ paddingLeft: '18px', color: '#475569', lineHeight: 1.6 }}>
                {selectedLab.accreditedStandards.map((std, i) => (
                  <li key={i}>
                    <strong>{std}</strong> — Official conformity and sample audit testing
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '10px', fontSize: '11.5px', color: '#64748B' }}>
              <span>Official Registry: {selectedLab.officialSource} • Last Verified: {selectedLab.lastVerified}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
