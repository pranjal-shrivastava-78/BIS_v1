import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckSquare,
  Square,
  FlaskConical,
  ExternalLink,
  ChevronLeft,
  ArrowRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { NavRoute, IndianStandard } from '../types';
import { standardsService } from '../services/standardsService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

interface CertificationPageProps {
  initialStandardId?: string;
  initialTab?: 'guidance' | 'roadmap' | 'checklist';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const CertificationPage: React.FC<CertificationPageProps> = ({
  initialStandardId = 'is-17526',
  initialTab = 'guidance',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'guidance' | 'roadmap' | 'checklist'>(initialTab);
  const [standard, setStandard] = useState<IndianStandard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Applicable Indian Standard verified and identified (e.g. IS 17526)', completed: true, stage: 'Standard' },
    { id: 2, text: 'In-house test equipment & calibration instruments setup per STI', completed: true, stage: 'Testing' },
    { id: 3, text: 'Required tests identified per applicable standard specifications', completed: true, stage: 'Testing' },
    { id: 4, text: 'Independent type test report obtained from a BIS recognized NABL laboratory', completed: false, stage: 'Testing' },
    { id: 5, text: 'Quality manual, process flow chart, and manufacturing machinery list drafted', completed: false, stage: 'Documents' },
    { id: 6, text: 'Required statutory documents (incorporation, MSME, NOC) uploaded', completed: false, stage: 'Documents' },
    { id: 7, text: 'Manak Online portal e-BIS formal application completed and fee paid', completed: false, stage: 'Application' },
    { id: 8, text: 'Factory inspection audit by BIS technical officer scheduled & passed', completed: false, stage: 'Assessment' },
    { id: 9, text: 'Grant of Certification Licence (CM/L) and ISI Mark authorization issued', completed: false, stage: 'Licence' },
  ]);

  useEffect(() => {
    setIsLoading(true);
    standardsService.getStandardById(initialStandardId).then((data) => {
      setStandard(data);
      setIsLoading(false);
    });
  }, [initialStandardId]);

  const toggleChecklistItem = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // Exact 8-step roadmap from requirement 12
  const roadmapSteps = [
    { title: '1. Product Profile', desc: 'Identify specifications and intended consumer use.' },
    { title: '2. Applicable Standard', desc: standard ? standard.isNumber : 'IS Standard' },
    { title: '3. Certification Route', desc: standard ? standard.certificationScheme : 'Scheme I (ISI)' },
    { title: '4. Testing', desc: 'In-house setup & independent lab evaluation.' },
    { title: '5. Documents', desc: 'Machinery list, calibrations, test reports & manuals.' },
    { title: '6. Application', desc: 'Submit application via Manak Online (e-BIS).' },
    { title: '7. Assessment', desc: 'Factory inspection audit by BIS technical officer.' },
    { title: '8. Licence / Certification', desc: 'Grant of CM/L licence & ISI mark authorization.' },
  ];

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
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Certification Guidance</span>
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
            <Award size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              BIS Certification Guidance & Roadmap
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>
              Step-by-step guidance on conformity assessment schemes, statutory roadmap and pre-audit compliance checklist.
            </p>
          </div>
        </div>

        {/* Sub-Feature Navigation Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginTop: '20px',
            borderTop: '1px solid #E2EAF5',
            paddingTop: '16px',
          }}
        >
          {[
            { id: 'guidance', title: '1. Certification Guidance', desc: 'Applicable scheme, major steps & documents' },
            { id: 'roadmap', title: '2. Certification Roadmap', desc: 'Visual 8-stage conformity process flow' },
            { id: 'checklist', title: '3. Compliance Checklist', desc: 'Pre-audit milestone & document tracker' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
                  {tab.title}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  {tab.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-Feature 1: Guidance */}
      {activeTab === 'guidance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isLoading ? (
            <LoadingSkeleton type="card" count={1} message="Loading certification details..." />
          ) : standard && (
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderRadius: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#3A74C2' }}>
                      {standard.isNumber}
                    </span>
                    <span className="badge badge-sky">{standard.certificationScheme}</span>
                    {standard.qcoMandatory && <span className="badge badge-danger">Mandatory QCO</span>}
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1D2B42' }}>
                    {standard.title}
                  </h3>
                </div>

                <a
                  href="https://www.services.bis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ gap: '4px' }}
                >
                  Manak Online Application <ExternalLink size={12} />
                </a>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px',
                  marginTop: '20px',
                }}
              >
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <strong style={{ fontSize: '13px', color: '#1D2B42', display: 'block', marginBottom: '8px' }}>
                    📋 Mandatory Certification Scheme
                  </strong>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                    This product falls under <strong>{standard.certificationScheme}</strong>. Manufacturers (domestic or foreign under FMCS) must obtain a licence before selling or importing into India.
                  </p>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '10px', border: '1px solid #E2EAF5' }}>
                  <strong style={{ fontSize: '13px', color: '#1D2B42', display: 'block', marginBottom: '8px' }}>
                    🔬 Testing Requirements
                  </strong>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                    Samples must satisfy thermal insulation, leak tightness, and food-grade stainless steel chemical composition per IS 17526.
                  </p>
                  <button
                    onClick={() => onNavigate('/laboratories')}
                    style={{ color: '#3A74C2', fontSize: '12px', fontWeight: 700, marginTop: '8px', cursor: 'pointer' }}
                  >
                    Find Recognized Testing Labs &rarr;
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '20px', padding: '16px', border: '1px solid #E2EAF5', borderRadius: '10px' }}>
                <strong style={{ fontSize: '13px', color: '#1D2B42', display: 'block', marginBottom: '10px' }}>
                  📁 Required Application Documents
                </strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                  <div>✓ Proof of establishment (Factory Licence / DIC / MSME)</div>
                  <div>✓ List of manufacturing machinery installed</div>
                  <div>✓ List of in-house testing equipment with calibration certificates</div>
                  <div>✓ Flow chart of manufacturing stages</div>
                  <div>✓ Independent NABL test report</div>
                  <div>✓ Agreement & undertaking under Form-V</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Feature 2: Roadmap */}
      {activeTab === 'roadmap' && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6E4F8',
            borderRadius: '16px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
              Standard Certification Roadmap (8 Stages)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Product → Applicable Standard → Certification Route → Testing → Documents → Application → Assessment → Licence
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {roadmapSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  backgroundColor: '#F8FAFD',
                  border: '1px solid #D6E4F8',
                  borderRadius: '12px',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#3A74C2', marginBottom: '4px' }}>
                  STAGE 0{idx + 1}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D2B42', marginBottom: '6px' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Feature 3: Compliance Checklist */}
      {activeTab === 'checklist' && (
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42' }}>
                Conformity Assessment Pre-Audit Checklist
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                Track required readiness criteria before scheduling the physical BIS factory assessment.
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Completed: <strong>{completedCount}</strong> of {checklist.length} ({progressPercent}%)
              </div>
              <div
                style={{
                  width: '160px',
                  height: '8px',
                  backgroundColor: '#E2EAF5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginTop: '4px',
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: progressPercent === 100 ? '#166534' : '#3A74C2',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  backgroundColor: item.completed ? '#F0FDF4' : '#F8FAFD',
                  border: item.completed ? '1px solid #BBF7D0' : '1px solid #E2EAF5',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {item.completed ? (
                  <CheckCircle2 size={20} color="#166534" />
                ) : (
                  <Square size={20} color="#94A3B8" />
                )}
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: '13.5px',
                      color: item.completed ? '#166534' : '#1E293B',
                      fontWeight: item.completed ? 600 : 500,
                      textDecoration: item.completed ? 'none' : 'none',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#64748B',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2EAF5',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
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
