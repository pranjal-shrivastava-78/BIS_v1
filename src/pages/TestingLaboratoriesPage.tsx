import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Search,
  MapPin,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  Phone,
  Mail,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { NavRoute, TestingLab } from '../types';
import { laboratoriesService } from '../services/laboratoriesService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
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
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStandard, setSelectedStandard] = useState(initialFilter?.standard || 'ALL');
  const [selectedCapability, setSelectedCapability] = useState('ALL');

  const [labs, setLabs] = useState<TestingLab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLab, setSelectedLab] = useState<TestingLab | null>(null);

  const states = ['ALL', 'Uttar Pradesh', 'Delhi', 'Karnataka', 'Gujarat', 'Haryana', 'Tamil Nadu', 'Telangana'];
  const capabilities = ['ALL', 'Chemical', 'Mechanical', 'Electrical', 'Microbiological', 'Civil & Building Materials', 'Electronics & Battery Testing', 'Precious Metals'];
  const standardsList = ['ALL', 'IS 17526', 'IS 9873', 'IS 14543', 'IS 1293', 'IS 16046', 'IS 269', 'IS 15885'];

  const fetchLabs = async () => {
    setIsLoading(true);
    try {
      const data = await laboratoriesService.getLaboratories({
        query: searchQuery,
        state: selectedState,
        city: selectedCity,
        capability: selectedCapability,
        standard: selectedStandard !== 'ALL' ? selectedStandard : undefined,
      });
      setLabs(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, [searchQuery, selectedState, selectedCity, selectedStandard, selectedCapability]);

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
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Testing Laboratories</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
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
            <FlaskConical size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              BIS Recognized Testing Laboratories
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Locate central, regional, and recognized NABL testing facilities for conformity assessment and pre-audit evaluations.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls (Per Section 9) */}
      <div
        className="card"
        style={{
          padding: '18px 20px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#3A74C2' }} />
          <input
            type="text"
            placeholder="Search laboratory name, city, registration code, or standard (e.g. IS 17526, IS 9873)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '44px',
              paddingRight: '14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: '1px solid #C4DCFA',
              backgroundColor: '#F8FAFD',
              color: '#1D2B42',
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {/* State */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '12px',
                borderRadius: '6px',
                border: '1px solid #D6E4F8',
                backgroundColor: '#FFFFFF',
              }}
            >
              {states.map((s) => (
                <option key={s} value={s}>{s === 'ALL' ? 'All States' : s}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>City:</span>
            <input
              type="text"
              placeholder="Filter city..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '12px',
                borderRadius: '6px',
                border: '1px solid #D6E4F8',
                backgroundColor: '#FFFFFF',
                width: '130px',
              }}
            />
          </div>

          {/* Standard */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Standard:</span>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '12px',
                borderRadius: '6px',
                border: '1px solid #D6E4F8',
                backgroundColor: '#FFFFFF',
              }}
            >
              {standardsList.map((st) => (
                <option key={st} value={st}>{st === 'ALL' ? 'All Standards' : st}</option>
              ))}
            </select>
          </div>

          {/* Capability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Capability:</span>
            <select
              value={selectedCapability}
              onChange={(e) => setSelectedCapability(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '12px',
                borderRadius: '6px',
                border: '1px solid #D6E4F8',
                backgroundColor: '#FFFFFF',
                maxWidth: '220px',
              }}
            >
              {capabilities.map((c) => (
                <option key={c} value={c}>{c === 'ALL' ? 'All Capabilities' : c}</option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '12px', color: '#64748B', marginLeft: 'auto' }}>
            Found <strong>{labs.length}</strong> facilities
          </span>
        </div>
      </div>

      {/* Laboratories Cards Grid */}
      {isLoading ? (
        <LoadingSkeleton type="card" count={3} message="Searching testing laboratories..." />
      ) : labs.length === 0 ? (
        <EmptyState
          icon={FlaskConical}
          title="No testing laboratories match your filters"
          description="Try resetting state, city or capability filters."
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedState('ALL');
            setSelectedCity('');
            setSelectedStandard('ALL');
            setSelectedCapability('ALL');
          }}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
          {labs.map((lab) => (
            <div
              key={lab.id}
              className="card"
              style={{
                padding: '22px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: '0 2px 6px rgba(30, 41, 59, 0.04)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-sky">{lab.code}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: lab.status === 'RECOGNIZED' ? '#DCFCE7' : '#FEF3C7',
                      color: lab.status === 'RECOGNIZED' ? '#166534' : '#92400E',
                    }}
                  >
                    {lab.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
                  {lab.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12.5px', color: '#475569', marginBottom: '8px' }}>
                  <MapPin size={15} style={{ color: '#3A74C2', flexShrink: 0, marginTop: '2px' }} />
                  <span>{lab.address}</span>
                </div>

                {/* Capabilities */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Testing Capabilities:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {lab.capabilities.map((c, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#F1F6FD',
                          color: '#39527B',
                          fontWeight: 500,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Supported Standards */}
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Accredited Standards:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {lab.accreditedStandards.map((st, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D6E4F8',
                          color: '#3A74C2',
                          fontWeight: 600,
                        }}
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Details */}
              <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                  Validity: {lab.validity}
                </span>
                <button
                  onClick={() => setSelectedLab(lab)}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px' }}
                >
                  View Services &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Laboratory Detail Modal (Per Section 9) */}
      {selectedLab && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedLab(null)}
          title={selectedLab.name}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-sky">{selectedLab.code}</span>
              <span className="badge badge-verified">{selectedLab.status}</span>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>LOCATION</div>
              <div style={{ fontSize: '13.5px', color: '#1D2B42', fontWeight: 600, marginTop: '2px' }}>
                {selectedLab.address}
              </div>
              <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '4px' }}>
                City: <strong>{selectedLab.city}</strong> • State: <strong>{selectedLab.state}</strong>
              </div>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>CONTACT INFORMATION</div>
              <div style={{ fontSize: '13px', color: '#1D2B42', marginTop: '4px' }}>
                Phone: <strong>{selectedLab.contact}</strong>
              </div>
              <div style={{ fontSize: '13px', color: '#1D2B42', marginTop: '2px' }}>
                Email: <strong>{selectedLab.email}</strong>
              </div>
            </div>

            {selectedLab.services && (
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                  Laboratory Services Offered
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedLab.services.map((srv, idx) => (
                    <div key={idx} style={{ fontSize: '12.5px', color: '#334155' }}>
                      • {srv}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                Accredited Standards
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedLab.accreditedStandards.map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedLab(null);
                      onNavigate('/standards', st);
                    }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #3A74C2',
                      color: '#3A74C2',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {st} &rarr;
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '10px', fontSize: '11.5px', color: '#64748B' }}>
              Source: <strong>{selectedLab.officialSource}</strong> • Last Verified: {selectedLab.lastVerified}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
