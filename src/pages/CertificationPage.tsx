import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  FileText,
  FlaskConical,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building,
  CheckSquare,
  Square,
  AlertCircle,
} from 'lucide-react';
import { NavRoute } from '../types';
import { INDIAN_STANDARDS } from '../data/mockData';

interface CertificationPageProps {
  initialStandardId?: string;
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const CertificationPage: React.FC<CertificationPageProps> = ({
  initialStandardId,
  onNavigate,
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'is-17526'
  );

  const [activeStepIndex, setActiveStepIndex] = useState<number>(2); // 0 to 7

  // Interactive compliance checklist
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Applicable Indian Standard verified and identified (e.g. IS 17526:2021)', completed: true },
    { id: 2, text: 'Required in-house test equipment & calibration instruments procured per STI', completed: true },
    { id: 3, text: 'Type testing sample evaluated at a BIS recognized NABL laboratory', completed: false },
    { id: 4, text: 'Manufacturing facility quality control manual and process flowchart drafted', completed: false },
    { id: 5, text: 'Manak Online portal e-BIS user registration & application submitted', completed: false },
    { id: 6, text: 'Factory inspection audit fee remitted and inspection date scheduled', completed: false },
    { id: 7, text: 'Factory physical assessment passed and independent sample drawn', completed: false },
    { id: 8, text: 'Grant of Certification Licence (CM/L) and ISI Mark usage authorized', completed: false },
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

  const activeStandard =
    INDIAN_STANDARDS.find((s) => s.id === selectedStandardId || s.isNumber.includes(selectedStandardId)) ||
    INDIAN_STANDARDS[0];

  const roadmapSteps = [
    { title: '1. Product Profile', desc: 'Identify product specifications, materials, and end-use.' },
    { title: '2. Standard Identification', desc: `Conformity with ${activeStandard.isNumber}` },
    { title: '3. Certification Route', desc: `${activeStandard.certificationScheme} selected.` },
    { title: '4. Lab Testing', desc: 'In-house test facility setup & recognized lab testing.' },
    { title: '5. Document Dossier', desc: 'Factory layout, machinery list, test certificates.' },
    { title: '6. Manak Application', desc: 'Submit application via Manak Online (e-BIS).' },
    { title: '7. Factory Assessment', desc: 'BIS technical officer verification audit.' },
    { title: '8. Grant of Licence', desc: 'Issuance of 7-digit CM/L and ISI Mark permission.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Award size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            BIS Certification Guidance & Roadmap
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Navigate the complete conformity assessment process from standard identification to grant of licence (CM/L) under the BIS Act, 2016.
        </p>

        {/* Standard Selector */}
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #E2EAF5',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#39527B' }}>
            Select Standard:
          </span>
          <select
            value={activeStandard.id}
            onChange={(e) => setSelectedStandardId(e.target.value)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              border: '1px solid #D6E4F8',
              borderRadius: '6px',
              backgroundColor: '#F8FAFD',
              color: '#2A3C5B',
              fontWeight: 600,
            }}
          >
            {INDIAN_STANDARDS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.isNumber} — {s.title}
              </option>
            ))}
          </select>

          <span className="badge badge-sky" style={{ marginLeft: 'auto' }}>
            {activeStandard.certificationScheme}
          </span>
          {activeStandard.qcoMandatory && (
            <span className="badge badge-danger">Mandatory QCO in Force</span>
          )}
        </div>
      </div>

      {/* Interactive Visual Roadmap Timeline */}
      <div
        className="card"
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '16px' }}>
          Conformity Assessment Roadmap
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '10px',
            position: 'relative',
          }}
        >
          {roadmapSteps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            const isPast = idx < activeStepIndex;

            return (
              <div
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: isSelected ? '#EAF2FE' : isPast ? '#F8FAFD' : '#FFFFFF',
                  border: isSelected
                    ? '2px solid #3A74C2'
                    : isPast
                    ? '1px solid #A7F3D0'
                    : '1px solid #D6E4F8',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '110px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isSelected ? '#3A74C2' : isPast ? '#166534' : '#64748B',
                      marginBottom: '4px',
                    }}
                  >
                    STEP 0{idx + 1}
                  </div>
                  <div
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: '#2A3C5B',
                      lineHeight: 1.25,
                      marginBottom: '4px',
                    }}
                  >
                    {step.title.split('. ')[1]}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.2 }}>
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Detailed Step Requirements vs Compliance Checklist */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Left Column: Requirements for Active Step */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '8px' }}>
            Detailed Requirements for {roadmapSteps[activeStepIndex].title}
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
            Authoritative guidelines published by the Bureau of Indian Standards for {activeStandard.isNumber}.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
              <strong style={{ color: '#2A3C5B' }}>1. Certification Scheme Applicable:</strong>
              <div style={{ color: '#475569', marginTop: '4px' }}>
                {activeStandard.certificationScheme} — requires third-party factory inspection by a BIS certification officer, in-house laboratory testing per the Scheme of Testing and Inspection (STI), and independent testing of drawn samples at a BIS recognized lab.
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
              <strong style={{ color: '#2A3C5B' }}>2. Mandatory Documents to be Uploaded:</strong>
              <ul style={{ color: '#475569', marginTop: '4px', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li>Factory registration proof (MSME Udyam or Factory Licence)</li>
                <li>Manufacturing machinery list and production flowchart</li>
                <li>List of testing equipment with valid NABL calibration certificates</li>
                <li>Raw material test certificates conforming to parent standards</li>
                <li>Authorised signatory letter & appointment of Quality Control in-charge</li>
              </ul>
            </div>

            <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
              <strong style={{ color: '#2A3C5B' }}>3. Official Portal Submission:</strong>
              <div style={{ color: '#475569', marginTop: '4px' }}>
                Apply online through the centralized BIS Manak Online system (e-BIS). Typical statutory processing duration: 30 to 60 days under simplified procedure.
              </div>
              <a
                href="https://www.services.bis.gov.in"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
                style={{ marginTop: '10px', display: 'inline-flex' }}
              >
                Access Manak Online Portal <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Compliance Checklist */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B' }}>
              Interactive Compliance Checklist (F20)
            </h3>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#3A74C2' }}>
              {progressPercent}% Complete
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
            Track verified readiness milestones before submitting your application:
          </p>

          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#E2EAF5',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: '#3A74C2',
                transition: 'width 0.25s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  backgroundColor: item.completed ? '#F0FDF4' : '#F8FAFC',
                  border: item.completed ? '1px solid #BBF7D0' : '1px solid #E2EAF5',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ color: item.completed ? '#166534' : '#94A3B8', marginTop: '2px' }}>
                  {item.completed ? <CheckSquare size={17} /> : <Square size={17} />}
                </div>
                <span
                  style={{
                    fontSize: '12.5px',
                    color: item.completed ? '#166534' : '#334155',
                    fontWeight: item.completed ? 600 : 400,
                    textDecoration: item.completed ? 'none' : 'none',
                    lineHeight: 1.4,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onNavigate('testing-laboratories', { standard: activeStandard.isNumber })}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              <FlaskConical size={14} /> Find Testing Lab
            </button>
            <button
              onClick={() => onNavigate('compliance-gap')}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              <CheckSquare size={14} /> Run Gap Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
