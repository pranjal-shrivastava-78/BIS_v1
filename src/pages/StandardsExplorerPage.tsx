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
  Scale,
  Calendar,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { IndianStandard, NavRoute } from '../types';
import { standardsService } from '../services/standardsService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { SegmentedControl } from '../components/common/SegmentedControl';

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
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [onlyQcoMandatory, setOnlyQcoMandatory] = useState(false);

  const [standards, setStandards] = useState<IndianStandard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStandard, setSelectedStandard] = useState<IndianStandard | null>(null);
  const [clauseSearchQuery, setClauseSearchQuery] = useState('');

  const departments = [
    'ALL',
    'Mechanical Engineering (MED 33)',
    'Consumer Products and Medical Instruments (CPMD)',
    'Food and Agriculture Department (FAD 14)',
    'Metallurgical Engineering (MTD 10)',
    'Electrotechnical Department (ETD 14)',
    'Electrotechnical Department (ETD 11)',
    'Civil Engineering (CED 2)',
  ];

  const categories = [
    'ALL',
    'Consumer Utensils',
    'Child Safety & Toys',
    'Food & Beverages',
    'Precious Metals & Hallmarking',
    'Electrical Accessories',
    'Electronics & IT Goods',
    'Construction & Civil',
    'Metals & Metallurgy',
    'Cables & Conductors',
  ];

  const years = ['ALL', '2024', '2021', '2019', '2018', '2017', '2016', '2015', '2012', '1988'];
  const statuses = ['ALL', 'ACTIVE', 'UNDER_REVISION', 'WITHDRAWN'];

  const fetchStandards = async () => {
    setIsLoading(true);
    try {
      const data = await standardsService.getStandards({
        query: searchQuery,
        department: selectedDepartment,
        category: selectedCategory,
        year: selectedYear,
        status: selectedStatus,
        qcoOnly: onlyQcoMandatory,
      });
      setStandards(data);
      if (data.length > 0 && !selectedStandard) {
        setSelectedStandard(data[0]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, [searchQuery, selectedDepartment, selectedCategory, selectedYear, selectedStatus, onlyQcoMandatory]);

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
            <BookOpen size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              Standards Explorer
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>
              Search Indian Standards by IS number, title, keyword or category, inspect clauses, amendments, and regulatory mandates.
            </p>
          </div>
        </div>

        {/* Pill / Segmented Control Bar (Per Section 1) */}
        <div style={{ marginTop: '16px', borderTop: '1px solid #E2EAF5', paddingTop: '16px' }}>
          <SegmentedControl<'search' | 'detail' | 'clauses' | 'related'>
            items={[
              {
                id: 'search',
                label: 'Search & Filter',
                number: 1,
                icon: Search,
              },
              {
                id: 'detail',
                label: 'Standard Details',
                number: 2,
                icon: FileText,
                subtitle: selectedStandard ? selectedStandard.isNumber : undefined,
              },
              {
                id: 'clauses',
                label: 'Clause Inspection',
                number: 3,
                icon: BookOpen,
                subtitle: selectedStandard ? `${selectedStandard.clauses.length} Clauses` : undefined,
              },
              {
                id: 'related',
                label: 'Related & Amendments',
                number: 4,
                icon: Layers,
              },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />
        </div>
      </div>

      {/* ==================================================
          TAB 1: SEARCH & FILTERS
          ================================================== */}
      {activeTab === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search Controls & Filters */}
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
            {/* Top Search Input */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#3A74C2' }} />
              <input
                type="text"
                placeholder="Search by IS number (e.g. IS 17526, IS 1417), title, keyword, or product (e.g. water bottle, toys, cement)..."
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

            {/* Filter Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              {/* Category */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c}</option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Department:</span>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d === 'ALL' ? 'All Departments' : d}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y === 'ALL' ? 'All Years' : y}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s}</option>
                  ))}
                </select>
              </div>

              {/* QCO Only Toggle */}
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: onlyQcoMandatory ? '#DC2626' : '#64748B',
                  cursor: 'pointer',
                  backgroundColor: onlyQcoMandatory ? '#FEF2F2' : '#F8FAFD',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: onlyQcoMandatory ? '1px solid #FECACA' : '1px solid #E2EAF5',
                  marginLeft: 'auto',
                }}
              >
                <input
                  type="checkbox"
                  checked={onlyQcoMandatory}
                  onChange={(e) => setOnlyQcoMandatory(e.target.checked)}
                />
                Mandatory QCO Only
              </label>
            </div>
          </div>

          {/* Results List */}
          {isLoading ? (
            <LoadingSkeleton type="card" count={3} message="Filtering Indian Standards catalogue..." />
          ) : standards.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No standards found"
              description="No Indian Standards matched your current search filters. Try adjusting keywords or category."
              actionText="Reset All Filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedDepartment('ALL');
                setSelectedCategory('ALL');
                setSelectedYear('ALL');
                setSelectedStatus('ALL');
                setOnlyQcoMandatory(false);
              }}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
              {standards.map((s) => (
                <div
                  key={s.id}
                  className="card"
                  style={{
                    padding: '20px',
                    backgroundColor: '#FFFFFF',
                    border: selectedStandard?.id === s.id ? '2px solid #3A74C2' : '1px solid #D6E4F8',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#3A74C2' }}>
                        {s.isNumber}
                      </span>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        <span className="badge badge-sky">{s.year}</span>
                        {s.qcoMandatory && <span className="badge badge-danger">QCO</span>}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px', lineHeight: 1.35 }}>
                      {s.title}
                    </h3>

                    <div style={{ fontSize: '11.5px', color: '#64748B', marginBottom: '8px' }}>
                      Category: <strong style={{ color: '#39527B' }}>{s.category}</strong>
                    </div>

                    <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
                      {s.scope.length > 130 ? `${s.scope.slice(0, 130)}...` : s.scope}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      {s.clauses.length} Clauses • {s.certificationScheme}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedStandard(s);
                        setActiveTab('detail');
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px' }}
                    >
                      Open Standard &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          TAB 2: STANDARD DETAIL PAGE (Per Section 3)
          ================================================== */}
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
            gap: '22px',
          }}
        >
          {/* Top Detail Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '20px', fontWeight: 900, color: '#3A74C2' }}>
                  {selectedStandard.isNumber}
                </span>
                <span className="badge badge-sky">Year: {selectedStandard.year}</span>
                <span className="badge badge-verified">Status: {selectedStandard.status}</span>
                {selectedStandard.qcoMandatory && <span className="badge badge-danger">Mandatory QCO Enforced</span>}
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42', lineHeight: 1.3, marginBottom: '6px' }}>
                {selectedStandard.title}
              </h2>

              <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                Category: <strong>{selectedStandard.category}</strong> • Technical Committee: <strong>{selectedStandard.department}</strong> • Updated: {selectedStandard.lastUpdated}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('clauses')}
                className="btn btn-secondary btn-sm"
              >
                Inspect Clauses ({selectedStandard.clauses.length})
              </button>
              <button
                onClick={() => onNavigate('/product-to-standard')}
                className="btn btn-secondary btn-sm"
              >
                Product Discovery
              </button>
              <a
                href={selectedStandard.bisSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Official BIS Portal <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Description & Scope */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#F8FAFD', padding: '18px', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1D2B42', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Description
              </h4>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
                {selectedStandard.description || selectedStandard.scope}
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFD', padding: '18px', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1D2B42', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Scope of Standard
              </h4>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
                {selectedStandard.scope}
              </p>
            </div>
          </div>

          {/* Applicable Products */}
          {selectedStandard.applicableProducts && (
            <div style={{ border: '1px solid #E2EAF5', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1D2B42', marginBottom: '8px' }}>
                Applicable Products / Category Items
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedStandard.applicableProducts.map((p, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '16px',
                      backgroundColor: '#F1F6FD',
                      border: '1px solid #C4DCFA',
                      color: '#2A3C5B',
                      fontSize: '12.5px',
                      fontWeight: 600,
                    }}
                  >
                    • {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related QCO & Certification Info Side-by-Side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {/* Related QCO Info */}
            <div style={{ border: '1px solid #E2EAF5', borderRadius: '12px', padding: '18px', backgroundColor: selectedStandard.qcoMandatory ? '#FEF2F2' : '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Scale size={18} color={selectedStandard.qcoMandatory ? '#DC2626' : '#3A74C2'} />
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1D2B42' }}>
                  Related Quality Control Order (QCO)
                </h4>
              </div>
              {selectedStandard.qcoInfo ? (
                <div style={{ fontSize: '12.5px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>QCO Order:</strong> {selectedStandard.qcoInfo.orderTitle}</div>
                  <div><strong>Notifying Ministry:</strong> {selectedStandard.qcoInfo.ministry}</div>
                  <div><strong>Enforcement Date:</strong> {selectedStandard.qcoInfo.effectiveDate}</div>
                  <div><strong>Notification No:</strong> {selectedStandard.qcoInfo.notificationNo}</div>
                  <button
                    onClick={() => onNavigate('/qco-regulations', selectedStandard.isNumber)}
                    style={{ marginTop: '8px', color: '#DC2626', fontWeight: 700, fontSize: '12px', textAlign: 'left', cursor: 'pointer' }}
                  >
                    View in QCO Explorer &rarr;
                  </button>
                </div>
              ) : (
                <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                  Voluntary Standard (No mandatory QCO currently gazetted for this item).
                </div>
              )}
            </div>

            {/* Certification Information */}
            <div style={{ border: '1px solid #E2EAF5', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Award size={18} color="#3A74C2" />
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1D2B42' }}>
                  Certification Information
                </h4>
              </div>
              <div style={{ fontSize: '12.5px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>Certification Scheme:</strong> {selectedStandard.certificationScheme}</div>
                <div><strong>Mark / Symbol:</strong> {selectedStandard.certificationInfo?.mark || 'Standard ISI Mark'}</div>
                <div><strong>Procedure:</strong> {selectedStandard.certificationInfo?.procedure || 'Factory quality audit and lab evaluation per STI.'}</div>
                <button
                  onClick={() => onNavigate('/certification', selectedStandard.id)}
                  style={{ marginTop: '8px', color: '#3A74C2', fontWeight: 700, fontSize: '12px', textAlign: 'left', cursor: 'pointer' }}
                >
                  View Certification Roadmap &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Important Clauses Preview */}
          <div style={{ border: '1px solid #E2EAF5', borderRadius: '12px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1D2B42' }}>
                Important Clauses ({selectedStandard.clauses.length})
              </h4>
              <button
                onClick={() => setActiveTab('clauses')}
                style={{ fontSize: '12px', color: '#3A74C2', fontWeight: 700, cursor: 'pointer' }}
              >
                Inspect All Clauses &rarr;
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedStandard.clauses.slice(0, 3).map((c, idx) => (
                <div key={idx} style={{ padding: '10px 14px', backgroundColor: '#F8FAFD', borderRadius: '8px', border: '1px solid #E2EAF5' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#3A74C2', marginBottom: '2px' }}>
                    <span>{c.clauseNumber}: {c.title}</span>
                    <span style={{ color: '#64748B', fontWeight: 500 }}>{c.page}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475569' }}>{c.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Amendments & Related Standards & Source Reference */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ border: '1px solid #E2EAF5', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1D2B42', marginBottom: '6px' }}>
                Amendments & Revisions
              </h4>
              {selectedStandard.amendments.map((a, idx) => (
                <div key={idx} style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>
                  • {a}
                </div>
              ))}
            </div>

            <div style={{ border: '1px solid #E2EAF5', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1D2B42', marginBottom: '6px' }}>
                Related Standards
              </h4>
              {selectedStandard.relatedStandards.map((r, idx) => (
                <div key={idx} style={{ fontSize: '12px', color: '#3A74C2', fontWeight: 600, marginBottom: '4px' }}>
                  • {r}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '12px', fontSize: '12px', color: '#64748B' }}>
            Source & Reference: <strong>{selectedStandard.sourceReference || 'Bureau of Indian Standards Official Publication'}</strong>
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 3: CLAUSE INSPECTION
          ================================================== */}
      {activeTab === 'clauses' && selectedStandard && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#3A74C2' }}>{selectedStandard.isNumber}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>Clause Retrieval & Verification</h3>
            </div>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Filter clauses..."
                value={clauseSearchQuery}
                onChange={(e) => setClauseSearchQuery(e.target.value)}
                style={{ width: '100%', height: '36px', paddingLeft: '32px', paddingRight: '10px', fontSize: '12.5px', border: '1px solid #D6E4F8', borderRadius: '8px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredClauses.map((c, idx) => (
              <div key={idx} style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#1D2B42' }}>
                    {c.clauseNumber} — {c.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{c.page}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 4: RELATED & AMENDMENTS
          ================================================== */}
      {activeTab === 'related' && selectedStandard && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '16px' }}>
            Related Indian Standards & Historical Amendments: {selectedStandard.isNumber}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '18px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1D2B42', marginBottom: '10px' }}>
                Cross-Referenced Standards
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedStandard.relatedStandards.map((r, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2EAF5', fontSize: '13px', color: '#3A74C2', fontWeight: 600 }}>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '18px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1D2B42', marginBottom: '10px' }}>
                Gazetted Amendments
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedStandard.amendments.map((a, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2EAF5', fontSize: '12.5px', color: '#475569' }}>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
