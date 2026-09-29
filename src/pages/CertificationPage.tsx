import React, { useState } from 'react';
import {
  Award,
  CheckSquare,
  Square,
  ChevronLeft,
  ArrowRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  BookOpen,
  Filter,
} from 'lucide-react';
import { NavRoute, CertificationScheme, ProductCertificationMapping } from '../types';
import { MOCK_CERTIFICATION_SCHEMES, MOCK_PRODUCT_MAPPINGS } from '../data/certification';
import { SegmentedControl } from '../components/common/SegmentedControl';

interface CertificationPageProps {
  initialStandardId?: string;
  initialTab?: 'schemes' | 'mapping' | 'roadmap' | 'checklist' | 'guidance';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const CertificationPage: React.FC<CertificationPageProps> = ({
  initialTab = 'schemes',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'schemes' | 'mapping' | 'roadmap' | 'checklist'>(
    initialTab === 'checklist' ? 'checklist' : initialTab === 'roadmap' ? 'roadmap' : initialTab === 'mapping' ? 'mapping' : 'schemes'
  );

  // Selected scheme modal/detail
  const [selectedScheme, setSelectedScheme] = useState<CertificationScheme | null>(MOCK_CERTIFICATION_SCHEMES[0]);

  // Product mapping state
  const [selectedMapping, setSelectedMapping] = useState<ProductCertificationMapping>(MOCK_PRODUCT_MAPPINGS[0]);
  const [mappingSearch, setMappingSearch] = useState('');

  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Applicable Indian Standard verified and identified (e.g. IS 17526, IS 14543)', completed: true, stage: 'Standard' },
    { id: 2, text: 'In-house test equipment & calibration instruments setup per Scheme of Testing and Inspection (STI)', completed: true, stage: 'Testing' },
    { id: 3, text: 'Quality manual, process flow chart, and manufacturing machinery list drafted', completed: true, stage: 'Documents' },
    { id: 4, text: 'Independent type test report obtained from a BIS recognized NABL laboratory', completed: false, stage: 'Testing' },
    { id: 5, text: 'Required statutory documents (incorporation, MSME, NOC, factory lease) uploaded', completed: false, stage: 'Documents' },
    { id: 6, text: 'Manak Online portal e-BIS formal application completed and fee paid', completed: false, stage: 'Application' },
    { id: 7, text: 'Factory inspection audit by BIS technical officer scheduled & passed', completed: false, stage: 'Assessment' },
    { id: 8, text: 'Grant of Certification Licence (CM/L) and ISI Mark authorization issued', completed: false, stage: 'Licence' },
  ]);

  const toggleChecklistItem = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const filteredMappings = MOCK_PRODUCT_MAPPINGS.filter((m) =>
    m.productName.toLowerCase().includes(mappingSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(mappingSearch.toLowerCase()) ||
    m.applicableStandard.toLowerCase().includes(mappingSearch.toLowerCase())
  );

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
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>BIS Certification</span>
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
            <Award size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              BIS Parakh — Certification Schemes & Mapping
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Explore BIS conformity certification schemes, map products to certification routes, and track audit checklists.
            </p>
          </div>
        </div>

        {/* Pill / Segmented Control Bar (Per Section 1 & 2) */}
        <div style={{ marginTop: '16px', borderTop: '1px solid #E2EAF5', paddingTop: '16px' }}>
          <SegmentedControl<'schemes' | 'mapping' | 'roadmap' | 'checklist'>
            items={[
              {
                id: 'schemes',
                label: 'Certification Schemes',
                number: 1,
                icon: Award,
              },
              {
                id: 'mapping',
                label: 'Product Certification Mapping',
                number: 2,
                icon: Layers,
              },
              {
                id: 'roadmap',
                label: 'Certification Roadmap',
                number: 3,
                icon: ArrowRight,
              },
              {
                id: 'checklist',
                label: 'Compliance Checklist',
                number: 4,
                icon: CheckSquare,
              },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />
        </div>
      </div>

      {/* ==================================================
          TAB 1: CERTIFICATION SCHEMES (Per Section 6)
          ================================================== */}
      {activeTab === 'schemes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
            {MOCK_CERTIFICATION_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className="card"
                style={{
                  padding: '22px',
                  backgroundColor: '#FFFFFF',
                  border: selectedScheme?.id === scheme.id ? '2px solid #3A74C2' : '1px solid #D6E4F8',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '12px',
                        backgroundColor: '#EAF2FE',
                        color: '#3A74C2',
                        fontSize: '11px',
                        fontWeight: 700,
                        border: '1px solid #BFDBFE',
                      }}
                    >
                      {scheme.badge}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{scheme.code}</span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
                    {scheme.name}
                  </h3>

                  <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
                    {scheme.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', color: '#3A74C2', fontWeight: 700 }}>
                    {scheme.applicableProducts.length} Product Categories
                  </span>
                  <span style={{ fontSize: '12px', color: '#3A74C2', fontWeight: 700 }}>
                    View Scheme Details &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scheme Detailed View Box */}
          {selectedScheme && (
            <div
              className="card"
              style={{
                padding: '28px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #3A74C2',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(58, 116, 194, 0.08)',
              }}
            >
              <div style={{ borderBottom: '1px solid #E2EAF5', paddingBottom: '14px', marginBottom: '18px' }}>
                <span className="badge badge-sky" style={{ marginBottom: '6px' }}>{selectedScheme.badge}</span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1D2B42' }}>
                  {selectedScheme.name}
                </h2>
                <p style={{ fontSize: '13.5px', color: '#475569', marginTop: '4px' }}>
                  {selectedScheme.description}
                </p>
              </div>

              {/* 5 Required Details: Eligibility, Applicable Products, Basic Procedure, Required Documents, Important Steps */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                {/* Eligibility & Applicable Products */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
                      Eligibility Criteria
                    </h4>
                    <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                      {selectedScheme.eligibility}
                    </p>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
                      Applicable Products Under Scheme
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {selectedScheme.applicableProducts.map((p, idx) => (
                        <div key={idx} style={{ fontSize: '12.5px', color: '#334155' }}>
                          • {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Required Documents */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                    Mandatory Required Documents
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedScheme.requiredDocuments.map((doc, idx) => (
                      <div key={idx} style={{ fontSize: '12.5px', color: '#334155' }}>
                        <span style={{ color: '#3A74C2', fontWeight: 700 }}>✓</span> {doc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Basic Procedure & Important Steps */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginTop: '18px' }}>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                    Basic Regulatory Procedure
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedScheme.basicProcedure.map((proc, idx) => (
                      <div key={idx} style={{ fontSize: '12.5px', color: '#334155' }}>
                        <strong>{idx + 1}.</strong> {proc}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                    Important Implementation Steps
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedScheme.importantSteps.map((step, idx) => (
                      <div key={idx} style={{ fontSize: '12.5px', color: '#334155' }}>
                        • {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          TAB 2: PRODUCT CERTIFICATION MAPPING (Per Section 6)
          ================================================== */}
      {activeTab === 'mapping' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
              Product Certification Scheme & Standard Mapping
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Select or search a manufactured product to view its designated certification scheme, standard, required documents, and procedure:
            </p>

            {/* Product Search & Select Bar */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Filter products..."
                value={mappingSearch}
                onChange={(e) => setMappingSearch(e.target.value)}
                style={{
                  height: '40px',
                  padding: '0 14px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: '1px solid #D6E4F8',
                  width: '280px',
                  backgroundColor: '#F8FAFD',
                }}
              />

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {filteredMappings.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMapping(m)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      backgroundColor: selectedMapping.id === m.id ? '#3A74C2' : '#F1F6FD',
                      color: selectedMapping.id === m.id ? '#FFFFFF' : '#39527B',
                      border: selectedMapping.id === m.id ? '1px solid #2F62A8' : '1px solid #D6E4F8',
                    }}
                  >
                    {m.productName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mapping Details Result */}
          {selectedMapping && (
            <div
              className="card"
              style={{
                padding: '28px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #3A74C2',
                borderRadius: '16px',
                boxShadow: '0 4px 14px rgba(58, 116, 194, 0.08)',
              }}
            >
              <div style={{ borderBottom: '1px solid #E2EAF5', paddingBottom: '16px', marginBottom: '20px' }}>
                <span className="badge badge-sky">{selectedMapping.category}</span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1D2B42', marginTop: '6px' }}>
                  {selectedMapping.productName}
                </h2>
              </div>

              {/* 4 Required Mapping Outputs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                {/* 1. Applicable Certification Scheme */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    1. Applicable Certification Scheme
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#3A74C2' }}>
                    {selectedMapping.applicableScheme}
                  </div>
                </div>

                {/* 2. Applicable Standard */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    2. Applicable Standard (IS)
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '2px' }}>
                    {selectedMapping.applicableStandard}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {selectedMapping.standardTitle}
                  </div>
                </div>

                {/* 3. Required Documents */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    3. Required Documents
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {selectedMapping.requiredDocuments.map((doc, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: '#334155' }}>
                        • {doc}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Basic Certification Process */}
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    4. Basic Certification Process
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {selectedMapping.basicProcess.map((step, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: '#334155' }}>
                        <strong>{idx + 1}.</strong> {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          TAB 3: CERTIFICATION ROADMAP
          ================================================== */}
      {activeTab === 'roadmap' && (
        <div className="card" style={{ padding: '28px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
            8-Stage BIS Certification Roadmap (Scheme I)
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '24px' }}>
            A structured path from product conception to grant of official CM/L licence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { step: '1', title: 'Product Profile', desc: 'Define technical specs and identify whether product falls under mandatory QCO.' },
              { step: '2', title: 'Applicable Standard', desc: 'Identify IS standard number and obtain latest Scheme of Testing and Inspection (STI).' },
              { step: '3', title: 'Certification Route', desc: 'Determine Scheme I (ISI) or Scheme II (CRS) conformity evaluation route.' },
              { step: '4', title: 'In-House Testing', desc: 'Install and calibrate testing machinery matching STI specifications.' },
              { step: '5', title: 'Documentation', desc: 'Compile quality manual, machinery list, test certificates, and plant layouts.' },
              { step: '6', title: 'e-BIS Application', desc: 'Submit application on Manak Online portal and remit initial statutory fee.' },
              { step: '7', title: 'Factory Assessment', desc: 'BIS auditing officer conducts on-site audit and draws independent verification samples.' },
              { step: '8', title: 'Grant of Licence', desc: 'Receive CM/L licence and authorization to print the ISI mark on retail packages.' },
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  padding: '18px',
                  backgroundColor: '#F8FAFD',
                  borderRadius: '12px',
                  border: '1px solid #E2EAF5',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#3A74C2',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 800,
                    marginBottom: '10px',
                  }}
                >
                  {st.step}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42', marginBottom: '4px' }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 4: COMPLIANCE CHECKLIST
          ================================================== */}
      {activeTab === 'checklist' && (
        <div className="card" style={{ padding: '28px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
                Pre-Audit Readiness Checklist
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                Ensure all documentation and technical parameters are completed prior to factory inspection.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#3A74C2' }}>
                {completedCount} of {checklist.length} Completed ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: '#E2EAF5', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#166534', transition: 'width 0.2s ease' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '10px',
                  backgroundColor: item.completed ? '#F0FDF4' : '#F8FAFD',
                  border: item.completed ? '1px solid #BBF7D0' : '1px solid #E2EAF5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.15s ease',
                }}
              >
                {item.completed ? (
                  <CheckSquare size={18} color="#166534" />
                ) : (
                  <Square size={18} color="#94A3B8" />
                )}
                <span
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: item.completed ? '#166534' : '#2A3C5B',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    flex: 1,
                  }}
                >
                  {item.text}
                </span>
                <span className="badge badge-sky" style={{ fontSize: '10.5px' }}>
                  {item.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
