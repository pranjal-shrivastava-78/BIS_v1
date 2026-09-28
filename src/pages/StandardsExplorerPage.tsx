import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  SlidersHorizontal,
  ExternalLink,
  Award,
  ChevronLeft,
  FileText,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { IndianStandard, NavRoute } from '../types';
import { standardsService } from '../services/standardsService';
import { Modal } from '../components/common/Modal';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';

interface StandardsExplorerPageProps {
  initialSearch?: string;
  subRoute?: string;
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const StandardsExplorerPage: React.FC<StandardsExplorerPageProps> = ({
  initialSearch = '',
  subRoute = 'search',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'detail' | 'clauses' | 'related'>(
    subRoute === 'clauses' ? 'clauses' : subRoute === 'detail' ? 'detail' : 'search'
  );

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
      if (data.length > 0 && !selectedStandard) {
        setSelectedStandard(data[0]);
      }
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
        <button
          onClick={() => onNavigate('/government-services')}
          style={{ color: '#3A74C2', fontWeight: 600, cursor: 'pointer' }}
        >
          Government Services
        </button>
        <span>/</span>
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Standards Explorer</span>
      </div>

      {/* Header Container */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          background: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%)',
          border: '1px solid #D6E4F8',
          borderRadius: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#EAF2FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3A74C2',
            }}
          >
            <BookOpen size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              Standards Explorer
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>
              Search Indian Standards, explore technical requirements and retrieve clause-level information.
            </p>
          </div>
        </div>

        {/* Sub-Feature Navigation Cards / Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginTop: '20px',
            borderTop: '1px solid #E2EAF5',
            paddingTop: '16px',
          }}
        >
          {[
            {
              id: 'search',
              title: '1. Standard Search',
              desc: 'By IS number, title, keyword or department',
            },
            {
              id: 'detail',
              title: '2. Standard Detail',
              desc: 'Scope, year, amendments & certification',
            },
            {
              id: 'clauses',
              title: '3. Clause Retrieval',
              desc: 'Specific clauses, text & page numbers',
            },
            {
              id: 'related',
              title: '4. Related Standards',
              desc: 'Superseded versions & test methods',
            },
          ].map((sub) => {
            const isActive = activeTab === sub.id;
            return (
              <div
                key={sub.id}
                onClick={() => setActiveTab(sub.id as any)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? '#EAF2FE' : '#FFFFFF',
                  border: isActive ? '1.5px solid #3A74C2' : '1px solid #D6E4F8',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: isActive ? '#1D2B42' : '#39527B' }}>
                  {sub.title}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  {sub.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area based on Sub-Feature */}
      {activeTab === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search Controls */}
          <div
            className="card"
            style={{
              padding: '16px 20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D6E4F8',
              borderRadius: '12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#3A74C2' }} />
                <input
                  type="text"
                  placeholder="Search by IS Number (e.g. IS 17526, IS 9873), title, product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '38px',
                    paddingRight: '12px',
                    fontSize: '13.5px',
                    borderRadius: '8px',
                    border: '1px solid #C4DCFA',
                    backgroundColor: '#F8FAFD',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: '1px solid #D6E4F8',
                  backgroundColor: '#FFFFFF',
                  color: '#1E293B',
                }}
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d === 'ALL' ? 'All Technical Departments' : d}
                  </option>
                ))}
              </select>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  color: '#1D2B42',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: '#F8FAFD',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D6E4F8',
                }}
              >
                <input
                  type="checkbox"
                  checked={onlyQcoMandatory}
                  onChange={(e) => setOnlyQcoMandatory(e.target.checked)}
                />
                <span>Mandatory QCO Only</span>
              </label>
            </div>
          </div>

          {/* Standards Results List */}
          {isLoading ? (
            <LoadingSkeleton type="card" count={3} />
          ) : error ? (
            <ErrorState title="Standards Unavailable" message={error} onRetry={fetchStandards} />
          ) : standards.length === 0 ? (
            <EmptyState
              title="No Indian Standards Found"
              description={`No records matched "${searchQuery}". Try searching by standard number or broader product keyword.`}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
              {standards.map((s) => (
                <div
                  key={s.id}
                  className="card bis-feature-card"
                  style={{
                    padding: '20px',
                    borderRadius: '14px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 800,
                          color: '#3A74C2',
                          backgroundColor: '#EAF2FE',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid #BFDBFE',
                        }}
                      >
                        {s.isNumber}
                      </span>
                      {s.qcoMandatory && (
                        <span className="badge badge-danger">Mandatory QCO</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1D2B42', marginBottom: '8px', lineHeight: 1.4 }}>
                      {s.title}
                    </h3>

                    <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
                      {s.scope.length > 140 ? `${s.scope.slice(0, 140)}...` : s.scope}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      Scheme: {s.certificationScheme}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedStandard(s);
                        setActiveTab('detail');
                      }}
                      className="btn btn-sm btn-primary"
                      style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px' }}
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 2: Standard Detail */}
      {activeTab === 'detail' && selectedStandard && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#3A74C2' }}>
                  {selectedStandard.isNumber}
                </span>
                <span className="badge badge-sky">{selectedStandard.year}</span>
                <span className="badge badge-verified">Status: {selectedStandard.status}</span>
                {selectedStandard.qcoMandatory && <span className="badge badge-danger">Mandatory QCO</span>}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1D2B42' }}>
                {selectedStandard.title}
              </h2>
              <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px' }}>
                Technical Committee: {selectedStandard.department} • Last Updated: {selectedStandard.lastUpdated}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('clauses')}
                className="btn btn-secondary btn-sm"
              >
                Inspect Clauses ({selectedStandard.clauses.length})
              </button>
              <a
                href={selectedStandard.bisSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
                style={{ gap: '4px' }}
              >
                Official BIS Document <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <div style={{ backgroundColor: '#F8FAFD', padding: '16px', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1D2B42', marginBottom: '6px' }}>
              Scope of the Standard
            </h4>
            <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
              {selectedStandard.scope}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ border: '1px solid #E2EAF5', borderRadius: '10px', padding: '16px' }}>
              <strong style={{ fontSize: '13px', color: '#1D2B42', display: 'block', marginBottom: '8px' }}>
                Certification Scheme & Route
              </strong>
              <div style={{ fontSize: '13px', color: '#475569' }}>
                <strong>Applicable Scheme:</strong> {selectedStandard.certificationScheme}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                Requires factory conformity audit & testing per Scheme of Testing and Inspection (STI).
              </div>
              <button
                onClick={() => onNavigate('/certification', selectedStandard.id)}
                style={{ marginTop: '10px', color: '#3A74C2', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                View Certification Roadmap &rarr;
              </button>
            </div>

            <div style={{ border: '1px solid #E2EAF5', borderRadius: '10px', padding: '16px' }}>
              <strong style={{ fontSize: '13px', color: '#1D2B42', display: 'block', marginBottom: '8px' }}>
                Amendments & Gazette Revisions
              </strong>
              {selectedStandard.amendments.length > 0 ? (
                <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: '#475569' }}>
                  {selectedStandard.amendments.map((am, i) => (
                    <li key={i}>{am}</li>
                  ))}
                </ul>
              ) : (
                <span style={{ fontSize: '12px', color: '#64748B' }}>No active amendments published.</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Feature 3: Clause-Level Retrieval */}
      {activeTab === 'clauses' && selectedStandard && (
        <div
          className="card"
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
                Clause-Level Retrieval: {selectedStandard.isNumber}
              </h2>
              <p style={{ fontSize: '12.5px', color: '#64748B' }}>
                Directly retrieve specific requirements, test thresholds, and sampling provisions.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('detail')}
              style={{ fontSize: '12px', color: '#3A74C2', fontWeight: 600, cursor: 'pointer' }}
            >
              &larr; Back to Detail
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#3A74C2' }} />
            <input
              type="text"
              placeholder="Search clause by title, number (e.g. 4.1), or requirement text..."
              value={clauseSearchQuery}
              onChange={(e) => setClauseSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '38px',
                paddingRight: '12px',
                fontSize: '13px',
                borderRadius: '8px',
                border: '1px solid #C4DCFA',
                backgroundColor: '#F8FAFD',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredClauses.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#F8FAFD',
                  borderRadius: '10px',
                  border: '1px solid #E2EAF5',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#3A74C2' }}>
                    Clause {c.clauseNumber}: {c.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #E2EAF5' }}>
                    Page {c.page}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Feature 4: Related Standards */}
      {activeTab === 'related' && selectedStandard && (
        <div
          className="card"
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
            Related & Referenced Standards for {selectedStandard.isNumber}
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
            Standards cross-referenced for material testing, food contact compliance, and quality control.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {selectedStandard.relatedStandards.map((rel, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8FAFD',
                  border: '1px solid #D6E4F8',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1D2B42' }}>{rel}</span>
                <button
                  onClick={() => {
                    setSearchQuery(rel);
                    setActiveTab('search');
                  }}
                  style={{ color: '#3A74C2', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Inspect &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
