import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Filter,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { IndianStandard, NavRoute } from '../types';
import { INDIAN_STANDARDS } from '../data/mockData';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';

interface StandardsExplorerPageProps {
  initialSearch?: string;
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const StandardsExplorerPage: React.FC<StandardsExplorerPageProps> = ({
  initialSearch = '',
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [onlyQcoMandatory, setOnlyQcoMandatory] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<IndianStandard | null>(null);
  const [clauseSearchQuery, setClauseSearchQuery] = useState('');

  const departments = [
    'ALL',
    'Mechanical Engineering (MED 33)',
    'Consumer Products and Medical Instruments (CPMD)',
    'Food and Agriculture Department (FAD 14)',
    'Electrotechnical Department (ETD 11)',
    'Electrotechnical Department (ETD 14)',
    'Metallurgical Engineering (MTD 10)',
  ];

  const filteredStandards = useMemo(() => {
    return INDIAN_STANDARDS.filter((std) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        std.isNumber.toLowerCase().includes(query) ||
        std.title.toLowerCase().includes(query) ||
        std.scope.toLowerCase().includes(query) ||
        std.category.toLowerCase().includes(query);

      const matchesDept =
        selectedDepartment === 'ALL' || std.department === selectedDepartment;

      const matchesQco = !onlyQcoMandatory || std.qcoMandatory;

      return matchesSearch && matchesDept && matchesQco;
    });
  }, [searchQuery, selectedDepartment, onlyQcoMandatory]);

  // Clause search filter inside modal
  const filteredClauses = useMemo(() => {
    if (!selectedStandard) return [];
    if (!clauseSearchQuery.trim()) return selectedStandard.clauses;
    const q = clauseSearchQuery.toLowerCase().trim();
    return selectedStandard.clauses.filter(
      (c) =>
        c.clauseNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.text.toLowerCase().includes(q)
    );
  }, [selectedStandard, clauseSearchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Title & Search Header */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          background: '#FFFFFF',
          border: '1px solid #D6E4F8',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <BookOpen size={20} color="#3A74C2" />
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
              Indian Standards Explorer (IS Catalogue)
            </h1>
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748B' }}>
            Search over 25,000 gazetted Indian Standards. Inspect technical clauses, scope definitions, mandatory Quality Control Orders (QCO), and certification schemes.
          </p>
        </div>

        {/* Big Search Bar */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
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
            placeholder="Search by IS number (e.g., IS 17526), title, product (e.g., water bottle, toys), or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '46px',
              paddingLeft: '44px',
              paddingRight: '16px',
              fontSize: '14px',
              backgroundColor: '#F8FAFD',
              border: '1px solid #D6E4F8',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Filter Pills and Toggles */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#39527B',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <SlidersHorizontal size={14} /> Technical Committee:
            </span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12.5px',
                border: '1px solid #D6E4F8',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                color: '#2A3C5B',
                cursor: 'pointer',
              }}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'ALL' ? 'All Technical Committees' : dept}
                </option>
              ))}
            </select>
          </div>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#2A3C5B',
              cursor: 'pointer',
              backgroundColor: onlyQcoMandatory ? '#FEF2F2' : '#F8FAFC',
              padding: '6px 12px',
              borderRadius: '6px',
              border: onlyQcoMandatory ? '1px solid #FECACA' : '1px solid #D6E4F8',
            }}
          >
            <input
              type="checkbox"
              checked={onlyQcoMandatory}
              onChange={(e) => setOnlyQcoMandatory(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span>Show Only Mandatory QCO Standards</span>
          </label>
        </div>
      </div>

      {/* Result Count and Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '13.5px', color: '#475569' }}>
          Showing <strong>{filteredStandards.length}</strong> Indian Standards matching filters
        </div>
        <button
          onClick={() => onNavigate('product-to-standard')}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '12px' }}
        >
          Unsure of IS number? Use Product Mapping &rarr;
        </button>
      </div>

      {filteredStandards.length === 0 ? (
        <div
          className="card"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            color: '#64748B',
          }}
        >
          <BookOpen size={40} color="#B8D1F2" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2A3C5B' }}>
            No Matching Indian Standards Found
          </h3>
          <p style={{ fontSize: '13px', marginTop: '6px' }}>
            Try broadening your search term or clearing the technical committee filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDepartment('ALL');
              setOnlyQcoMandatory(false);
            }}
            className="btn btn-primary"
            style={{ marginTop: '16px', marginInline: 'auto' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredStandards.map((std) => (
            <div
              key={std.id}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                padding: '20px 24px',
                borderRadius: '10px',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '10px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '17px',
                        fontWeight: 800,
                        color: '#3A74C2',
                      }}
                    >
                      {std.isNumber}
                    </span>
                    <span className="badge badge-verified" style={{ fontSize: '11px' }}>
                      {std.status}
                    </span>
                    {std.qcoMandatory && (
                      <span className="badge badge-danger" style={{ fontSize: '11px' }}>
                        Mandatory QCO
                      </span>
                    )}
                    <span className="badge badge-sky" style={{ fontSize: '11px' }}>
                      {std.certificationScheme}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: '15.5px',
                      fontWeight: 700,
                      color: '#2A3C5B',
                      marginBottom: '4px',
                    }}
                  >
                    {std.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {std.department} • Category: <strong>{std.category}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setSelectedStandard(std);
                      setClauseSearchQuery('');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <BookOpen size={14} /> View Standard Details
                  </button>
                  <button
                    onClick={() => onNavigate('certification', std.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Award size={14} /> Certification Roadmap
                  </button>
                </div>
              </div>

              {/* Scope Snippet */}
              <p
                style={{
                  fontSize: '13px',
                  color: '#475569',
                  lineHeight: 1.5,
                  backgroundColor: '#F8FAFD',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #E2EAF5',
                  marginBottom: '12px',
                }}
              >
                <strong>Scope:</strong> {std.scope}
              </p>

              {/* Clauses Preview and Quick Actions */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontSize: '12px',
                  color: '#64748B',
                  borderTop: '1px solid #EDF3FB',
                  paddingTop: '10px',
                }}
              >
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span>
                    Indexed Clauses: <strong>{std.clauses.length}</strong>
                  </span>
                  <span>
                    Amendments: <strong>{std.amendments.length}</strong>
                  </span>
                  {std.qcoDate && (
                    <span style={{ color: '#B45309', fontWeight: 600 }}>
                      QCO Date: {std.qcoDate}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      setSelectedStandard(std);
                      setClauseSearchQuery('Clause');
                    }}
                    style={{ color: '#3A74C2', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Search Clauses &rarr;
                  </button>
                  <a
                    href={std.bisSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#39527B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    BIS Portal <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Standard Details & Clause Search Modal */}
      {selectedStandard && (
        <Modal
          isOpen={!!selectedStandard}
          onClose={() => setSelectedStandard(null)}
          title={`${selectedStandard.isNumber} : ${selectedStandard.year}`}
          subtitle={selectedStandard.title}
          maxWidth="840px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Metadata badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="badge badge-verified">{selectedStandard.status}</span>
              {selectedStandard.qcoMandatory && (
                <span className="badge badge-danger">QCO Mandatory Scheme</span>
              )}
              <span className="badge badge-sky">{selectedStandard.certificationScheme}</span>
              <span style={{ fontSize: '12px', color: '#64748B', marginLeft: 'auto' }}>
                Department: {selectedStandard.department}
              </span>
            </div>

            {/* Scope */}
            <div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                Full Standard Scope
              </h4>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, backgroundColor: '#F8FAFD', padding: '12px', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
                {selectedStandard.scope}
              </p>
            </div>

            {/* Clause-Level Search Engine (F17 requirement) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#2A3C5B' }}>
                    Clause-Level Retrieval Engine (F17)
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>
                    Inspect exact requirements by clause number or test parameter
                  </p>
                </div>
                <span className="badge badge-source">Authoritative Excerpts</span>
              </div>

              {/* Clause search input */}
              <div style={{ position: 'relative', width: '100%', marginBottom: '12px' }}>
                <Search
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#3A74C2',
                  }}
                />
                <input
                  type="text"
                  placeholder="e.g., 'Clause 5.2' or 'migration' or 'drop test'..."
                  value={clauseSearchQuery}
                  onChange={(e) => setClauseSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '34px',
                    paddingRight: '12px',
                    height: '36px',
                    fontSize: '12.5px',
                    backgroundColor: '#F8FAFD',
                    border: '1px solid #D6E4F8',
                    borderRadius: '6px',
                  }}
                />
              </div>

              {/* Clauses List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                {filteredClauses.map((clause, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '6px',
                      border: '1px solid #E2EAF5',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '13px', color: '#3A74C2' }}>
                        {clause.clauseNumber} — {clause.title}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        {clause.page}
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.5 }}>
                      {clause.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amendments & Related Standards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
                <h5 style={{ fontSize: '12.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                  Gazetted Amendments
                </h5>
                <ul style={{ fontSize: '12px', color: '#475569', paddingLeft: '18px' }}>
                  {selectedStandard.amendments.map((a, idx) => (
                    <li key={idx} style={{ marginBottom: '3px' }}>{a}</li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
                <h5 style={{ fontSize: '12.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                  Referenced / Related Standards
                </h5>
                <ul style={{ fontSize: '12px', color: '#475569', paddingLeft: '18px' }}>
                  {selectedStandard.relatedStandards.map((r, idx) => (
                    <li key={idx} style={{ marginBottom: '3px' }}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Action Bar inside Modal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #E2EAF5',
                paddingTop: '14px',
                marginTop: '6px',
              }}
            >
              <a
                href={selectedStandard.bisSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
              >
                Official BIS Portal Document <ExternalLink size={13} />
              </a>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    const stdId = selectedStandard.id;
                    setSelectedStandard(null);
                    onNavigate('certification', stdId);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Award size={14} /> Open Certification Roadmap
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
