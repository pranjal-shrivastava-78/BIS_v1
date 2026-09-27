import React, { useState } from 'react';
import {
  Split,
  CheckCircle2,
  BookOpen,
  Award,
  RotateCcw,
} from 'lucide-react';
import { NavRoute } from '../types';
import { standardsService } from '../services/standardsService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';

interface ProductToStandardPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const ProductToStandardPage: React.FC<ProductToStandardPageProps> = ({
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [productDescription, setProductDescription] = useState<string>(
    'I manufacture stainless steel water bottles for domestic and gym use.'
  );

  const [attributes, setAttributes] = useState([
    { key: 'Product Type', value: 'Water Bottle / Flask' },
    { key: 'Material', value: 'Stainless Steel (SS 304)' },
    { key: 'Intended Use', value: 'Domestic potable beverage storage' },
    { key: 'Target Sector', value: 'Consumer Goods / Food Contact' },
  ]);

  const [clarifications, setClarifications] = useState({
    isInsulated: 'yes',
    isCarbonated: 'no',
  });

  const [candidateStandards, setCandidateStandards] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const sampleProducts = [
    'I manufacture stainless steel water bottles for domestic and gym use.',
    'Wooden educational building blocks and puzzle toys for toddlers under 3 years.',
    'Packaged drinking water in 20-litre sealed jars.',
    'Rechargeable lithium-ion battery power banks for mobile phones.',
  ];

  const handleRunExtraction = async () => {
    if (!productDescription.trim()) return;
    setIsMatching(true);
    setCurrentStep(2);
    try {
      const results = await standardsService.matchProductToStandards(productDescription);
      setCandidateStandards(results);
    } finally {
      setIsMatching(false);
    }
  };

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
          <Split size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            Product → Standard Discovery Engine
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Map manufactured or imported products to candidate Indian Standards. Powered by <code>POST /api/standards/match-product</code>.
        </p>

        {/* Stepper */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '24px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '40px',
              right: '40px',
              height: '2px',
              backgroundColor: '#E2EAF5',
              zIndex: 1,
            }}
          />
          {[
            { step: 1, label: '1. Describe Product' },
            { step: 2, label: '2. Attributes' },
            { step: 3, label: '3. Clarifications' },
            { step: 4, label: '4. Candidate Standards' },
          ].map((item) => {
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            return (
              <div
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF',
                  padding: '0 8px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isCurrent ? '#3A74C2' : isCompleted ? '#EAF7EE' : '#F1F5F9',
                    color: isCurrent ? '#FFFFFF' : isCompleted ? '#166534' : '#64748B',
                    border: isCurrent
                      ? '2px solid #3A74C2'
                      : isCompleted
                      ? '2px solid #A7F3D0'
                      : '2px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    marginBottom: '4px',
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : item.step}
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? '#2A3C5B' : '#64748B',
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1 */}
      {currentStep === 1 && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2A3C5B', marginBottom: '8px' }}>
            Step 1: Enter Product Description
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
            Describe the product in normal language, including its materials, intended end-use, and key functions:
          </p>

          <textarea
            rows={4}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '13.5px',
              borderRadius: '8px',
              border: '1px solid #D6E4F8',
              backgroundColor: '#F8FAFD',
              marginBottom: '16px',
            }}
          />

          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#39527B', display: 'block', marginBottom: '8px' }}>
              Sample product prompts:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {sampleProducts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setProductDescription(p)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    borderRadius: '6px',
                    backgroundColor: productDescription === p ? '#EAF2FE' : '#F8FAFC',
                    border: productDescription === p ? '1px solid #3A74C2' : '1px solid #E2EAF5',
                    color: '#2A3C5B',
                  }}
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleRunExtraction} className="btn btn-primary">
              Extract Attributes & Proceed &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2A3C5B', marginBottom: '8px' }}>
            Step 2: Extracted Technical Attributes
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
            Extracted attributes parsed from product description:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            {attributes.map((attr, idx) => (
              <div key={idx} style={{ backgroundColor: '#F8FAFD', border: '1px solid #D6E4F8', borderRadius: '6px', padding: '10px 14px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>{attr.key}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#2A3C5B' }}>{attr.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
              &larr; Back
            </button>
            <button onClick={() => setCurrentStep(3)} className="btn btn-primary">
              Verify Clarifications &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2A3C5B', marginBottom: '8px' }}>
            Step 3: Clarifying Questions
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
            Targeted scope questions to distinguish between standard variants:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#F8FAFD', padding: '12px', borderRadius: '6px', border: '1px solid #E2EAF5' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#2A3C5B', marginBottom: '6px' }}>
                Is the water bottle double-walled with vacuum insulation?
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <input
                  type="radio"
                  name="insulated"
                  checked={clarifications.isInsulated === 'yes'}
                  onChange={() => setClarifications({ ...clarifications, isInsulated: 'yes' })}
                />
                <span>Yes, vacuum insulated (IS 17526 candidate)</span>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setCurrentStep(2)} className="btn btn-secondary">
              &larr; Back
            </button>
            <button onClick={() => setCurrentStep(4)} className="btn btn-primary">
              View Candidate Standards &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {currentStep === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '18px 24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B' }}>
                Candidate Indian Standards (API Match Results)
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B' }}>
                Wording: <em>Potentially applicable standards</em> based on published BIS scope definitions.
              </p>
            </div>
            <button onClick={() => setCurrentStep(1)} className="btn btn-secondary btn-sm">
              <RotateCcw size={13} /> Reset
            </button>
          </div>

          {candidateStandards.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No candidate standards matched"
              description="No Indian Standards were returned by the discovery API for this product description."
              actionText="Refine Description"
              onAction={() => setCurrentStep(1)}
            />
          ) : (
            candidateStandards.map((cand, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D6E4F8',
                  padding: '20px 24px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #3A74C2',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '17px', fontWeight: 800, color: '#3A74C2' }}>
                        {cand.isNumber}
                      </span>
                      <span className="badge badge-sky">Match: {cand.confidence}%</span>
                      {cand.qcoMandatory && <span className="badge badge-danger">QCO Mandatory</span>}
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2A3C5B' }}>
                      {cand.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => onNavigate('certification', cand.isNumber)}
                    className="btn btn-primary btn-sm"
                  >
                    <Award size={14} /> Certification Roadmap
                  </button>
                </div>

                <p style={{ fontSize: '13px', color: '#475569', backgroundColor: '#F8FAFD', padding: '10px 12px', borderRadius: '6px' }}>
                  <strong>Why it may apply:</strong> {cand.matchReason}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
