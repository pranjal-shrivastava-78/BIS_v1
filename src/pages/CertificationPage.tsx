import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckSquare,
  Square,
  FlaskConical,
  ExternalLink,
} from 'lucide-react';
import { NavRoute, IndianStandard } from '../types';
import { standardsService } from '../services/standardsService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

interface CertificationPageProps {
  initialStandardId?: string;
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const CertificationPage: React.FC<CertificationPageProps> = ({
  initialStandardId = 'is-17526',
  onNavigate,
}) => {
  const [standard, setStandard] = useState<IndianStandard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);

  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Applicable Indian Standard verified and identified', completed: true },
    { id: 2, text: 'In-house test equipment & calibration instruments setup per STI', completed: true },
    { id: 3, text: 'Type testing sample evaluated at a BIS recognized NABL laboratory', completed: false },
    { id: 4, text: 'Manufacturing facility quality control manual drafted', completed: false },
    { id: 5, text: 'Manak Online portal e-BIS application submitted', completed: false },
    { id: 6, text: 'Factory inspection audit fee remitted and date scheduled', completed: false },
    { id: 7, text: 'Factory assessment passed and sample drawn', completed: false },
    { id: 8, text: 'Grant of Certification Licence (CM/L) and ISI Mark authorization', completed: false },
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

  const roadmapSteps = [
    { title: '1. Product Profile', desc: 'Identify specifications and intended use.' },
    { title: '2. Standard Identification', desc: standard ? standard.isNumber : 'IS Standard' },
    { title: '3. Certification Route', desc: standard ? standard.certificationScheme : 'Scheme I' },
    { title: '4. Lab Testing', desc: 'In-house setup & independent lab evaluation.' },
    { title: '5. Document Dossier', desc: 'Machinery list, calibrations, test reports.' },
    { title: '6. Manak Application', desc: 'Submit application via Manak Online (e-BIS).' },
    { title: '7. Factory Assessment', desc: 'BIS technical officer verification audit.' },
    { title: '8. Grant of Licence', desc: 'Issuance of CM/L licence & ISI mark authorization.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
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
          Conformity assessment roadmap and compliance checklist under the BIS Act, 2016.
        </p>

        {isLoading ? (
          <div style={{ marginTop: '12px' }}>
            <LoadingSkeleton type="text" count={1} message="Loading standard certification details..." />
          </div>
        ) : standard && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#2A3C5B' }}>
              Standard: {standard.isNumber} — {standard.title}
            </span>
            <span className="badge badge-sky">{standard.certificationScheme}</span>
            {standard.qcoMandatory && <span className="badge badge-danger">Mandatory QCO</span>}
          </div>
        )}
      </div>

      {/* Interactive Visual Roadmap */}
      <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '16px' }}>
          Conformity Assessment Steps
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
          {roadmapSteps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: isSelected ? '#EAF2FE' : '#F8FAFD',
                  border: isSelected ? '2px solid #3A74C2' : '1px solid #D6E4F8',
                  cursor: 'pointer',
                  minHeight: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: isSelected ? '#3A74C2' : '#64748B' }}>
                    STEP 0{idx + 1}
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#2A3C5B' }}>
                    {step.title.split('. ')[1]}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {/* Step Requirements */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '12px' }}>
            Requirements for {roadmapSteps[activeStepIndex].title}
          </h3>
          <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              Conformity with BIS guidelines requires fulfilling statutory inspection schedules, maintaining in-house test records, and submitting applications on the <strong>Manak Online</strong> portal.
            </p>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFD', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
              <strong>Official Application Route:</strong> Apply through Manak Online e-BIS. Typical evaluation period: 30 to 60 days.
            </div>
            <a
              href="https://www.services.bis.gov.in"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
              style={{ alignSelf: 'flex-start' }}
            >
              Access Manak Online Portal <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B' }}>
              Compliance Checklist
            </h3>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#3A74C2' }}>
              {progressPercent}% Complete
            </span>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#E2EAF5', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#3A74C2', transition: 'width 0.2s' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: item.completed ? '#F0FDF4' : '#F8FAFC',
                  border: item.completed ? '1px solid #BBF7D0' : '1px solid #E2EAF5',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: item.completed ? '#166534' : '#334155',
                }}
              >
                {item.completed ? <CheckSquare size={16} color="#166534" /> : <Square size={16} color="#94A3B8" />}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px' }}>
            <button
              onClick={() => onNavigate('testing-laboratories')}
              className="btn btn-secondary btn-sm"
            >
              <FlaskConical size={14} /> Find Testing Laboratory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
