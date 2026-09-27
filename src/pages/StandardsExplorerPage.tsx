import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  SlidersHorizontal,
  ExternalLink,
  Award,
} from 'lucide-react';
import { IndianStandard, NavRoute } from '../types';
import { standardsService } from '../services/standardsService';
import { Modal } from '../components/common/Modal';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';

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
  const [standards, setStandards] = useState<IndianStandard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchStandards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await standardsService.getStandards({
        query: searchQuery,
        department: selectedDepartment,
        qcoOnly: onlyQcoMandatory,
      });
      setStandards(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load standards');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, [searchQuery, selectedDepartment, onlyQcoMandatory]);

  const filteredClauses = selectedStandard
    ? selectedStandard.clauses.filter((c) => {
        if (!clauseSearchQuery.trim()) return true;
        const q = clauseSearchQuery.toLowerCase().trim();
        return (
          c.clauseNumber.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.text.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Search Header */}
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
            Browse gazetted Indian Standards. Powered by <code>GET /api/standards</code>.
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
            placeholder="Search by IS number (e.g., IS 17526), title, product, or keyword..."
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

        {/* Filters */}
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
              <SlidersHorizontal size={14} /> Committee:
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
            />
            <span>Show Only Mandatory QCO Standards</span>
          </label>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <LoadingSkeleton type="card" count={2} message="Loading Indian Standards from GET /api/standards..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchStandards} apiEndpoint="GET /api/standards" />
      ) : standards.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No standards found"
          description="Search for an Indian Standard, product, or keyword to explore applicable specifications."
          actionText="Clear Search Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedDepartment('ALL');
            setOnlyQcoMandatory(false);
          }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '13px', color: '#64748B' }}>
            Found <strong>{standards.length}</strong> Indian Standards from API service
          </div>

          {standards.map((std) => (
            <div
              key={std.id}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                padding: '20px 24px',
                borderRadius: '10px',
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
                  <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '4px' }}>
                    {std.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {std.department} • Category: <strong>{std.category}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
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

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#64748B',
                  borderTop: '1px solid #EDF3FB',
                  paddingTop: '10px',
                }}
              >
                <div>Clauses Indexed: <strong>{std.clauses.length}</strong></div>
                <a
                  href={std.bisSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#3A74C2', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Official BIS Portal <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Standard Detail Modal */}
      {selectedStandard && (
        <Modal
          isOpen={!!selectedStandard}
          onClose={() => setSelectedStandard(null)}
          title={`${selectedStandard.isNumber} : ${selectedStandard.year}`}
          subtitle={selectedStandard.title}
          maxWidth="840px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="badge badge-verified">{selectedStandard.status}</span>
              {selectedStandard.qcoMandatory && (
                <span className="badge badge-danger">QCO Mandatory Scheme</span>
              )}
              <span className="badge badge-sky">{selectedStandard.certificationScheme}</span>
            </div>

            <div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                Standard Scope
              </h4>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, backgroundColor: '#F8FAFD', padding: '12px', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
                {selectedStandard.scope}
              </p>
            </div>

            {/* Clause Explorer */}
            <div style={{ border: '1px solid #D6E4F8', borderRadius: '8px', padding: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B', marginBottom: '8px' }}>
                Indexed Clauses
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredClauses.map((clause, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <div style={{ fontWeight: 700, color: '#3A74C2', fontSize: '13px' }}>
                      {clause.clauseNumber} — {clause.title} ({clause.page})
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#334155', marginTop: '2px' }}>
                      {clause.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #E2EAF5', paddingTop: '12px' }}>
              <button
                onClick={() => {
                  const id = selectedStandard.id;
                  setSelectedStandard(null);
                  onNavigate('certification', id);
                }}
                className="btn btn-primary btn-sm"
              >
                Certification Guidance &rarr;
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
