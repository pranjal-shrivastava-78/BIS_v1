import React, { useState } from 'react';
import {
  Split,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Award,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Tag,
  RotateCcw,
} from 'lucide-react';
import { NavRoute } from '../types';

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

  // Extracted attributes state
  const [attributes, setAttributes] = useState([
    { key: 'Product Type', value: 'Water Bottle / Flask' },
    { key: 'Material', value: 'Austenitic Stainless Steel (SS 304)' },
    { key: 'Intended Use', value: 'Domestic, potable beverage storage' },
    { key: 'Target Sector', value: 'Consumer Goods / Food Contact' },
    { key: 'Capacity Range', value: '500 ml - 1500 ml' },
    { key: 'Closure Type', value: 'Polypropylene lid with silicone seal' },
  ]);

  // Clarifying questions state
  const [clarifications, setClarifications] = useState({
    isInsulated: 'yes',
    isCarbonated: 'no',
    isForInfants: 'no',
  });

  const sampleProducts = [
    'I manufacture stainless steel water bottles for domestic and gym use.',
    'Wooden educational building blocks and puzzle toys for toddlers under 3 years.',
    'Packaged drinking water in 20-litre sealed poly-carbonate jars.',
    'Rechargeable lithium-ion battery power banks for mobile phones.',
    'Domestic 3-pin 16 Ampere wall plugs and socket outlets.',
  ];

  const handleRunExtraction = () => {
    if (!productDescription.trim()) return;
    setCurrentStep(2);
  };

  const candidateStandards = [
    {
      isNumber: 'IS 17526 : 2021',
      title: 'Stainless Steel Vacuum Flasks / Insulated Domestic Water Bottles',
      confidence: 96,
      matchReason:
        'Direct match for domestic stainless steel insulated bottles and vacuum flasks intended for liquid storage.',
      matchedAttributes: ['Product Type: Water Bottle', 'Material: Stainless Steel', 'Intended Use: Domestic Potable'],
      evidenceClause: 'Clause 4.1 & Clause 5.2 (Food-grade SS 304 and thermal retention requirements)',
      qcoMandatory: true,
      qcoNotice: 'DPIIT Potable Water Bottles (Quality Control) Order S.O. 4112(E)',
      sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/17526',
    },
    {
      isNumber: 'IS 17803 : 2022',
      title: 'Stainless Steel Non-Insulated Water Bottles',
      confidence: 88,
      matchReason:
        'Applicable if the product line includes single-wall, non-vacuum stainless steel water bottles.',
      matchedAttributes: ['Material: Stainless Steel', 'Capacity: 500-1500ml'],
      evidenceClause: 'Clause 3.2 (Body wall thickness and base rigidity)',
      qcoMandatory: true,
      qcoNotice: 'Covered under Potable Water Bottles QCO',
      sourceUrl: 'https://www.services.bis.gov.in',
    },
    {
      isNumber: 'IS 9845 : 1998',
      title: 'Determination of Overall Migration of Constituents of Plastics Materials in Contact with Foodstuffs',
      confidence: 82,
      matchReason:
        'Secondary testing standard required for plastic lid closures and silicone gaskets in contact with beverage.',
      matchedAttributes: ['Closure Type: Polypropylene & Silicone Seal'],
      evidenceClause: 'Overall migration test in 3% acetic acid simulant (< 10 mg/dm²)',
      qcoMandatory: false,
      qcoNotice: 'Referenced auxiliary standard',
      sourceUrl: 'https://www.services.bis.gov.in',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
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
          Map your manufactured or imported product to candidate Indian Standards through AI-assisted attribute extraction and guided clarification.
        </p>

        {/* Stepper Progress Bar */}
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
            { step: 2, label: '2. Attribute Extraction' },
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

      {/* STEP 1: Describe Product */}
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
            placeholder="e.g., I manufacture stainless steel vacuum water bottles for domestic and gym use..."
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

          {/* Quick Preset Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#39527B', display: 'block', marginBottom: '8px' }}>
              Or choose a sample product description to evaluate:
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
                    color: productDescription === p ? '#2A3C5B' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleRunExtraction} className="btn btn-primary" style={{ padding: '10px 22px' }}>
              Extract Attributes & Proceed &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Extracted Product Attributes */}
      {currentStep === 2 && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2A3C5B' }}>
                Step 2: Extracted Technical Attributes
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                The assistant extracted these product attributes from your description. You may adjust them if needed:
              </p>
            </div>
            <span className="badge badge-ai">Extracted via NLP</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            {attributes.map((attr, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#F8FAFD',
                  border: '1px solid #D6E4F8',
                  borderRadius: '6px',
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  {attr.key}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#2A3C5B', marginTop: '2px' }}>
                  {attr.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
              &larr; Back to Description
            </button>
            <button onClick={() => setCurrentStep(3)} className="btn btn-primary">
              Verify Clarifying Questions &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Clarifying Questions */}
      {currentStep === 3 && (
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2A3C5B' }}>
              Step 3: Clarifying Questions (Targeted Scope Refinement)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              To differentiate between vacuum flasks (IS 17526) and single-wall containers (IS 17803), answer only these key questions:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div
              style={{
                backgroundColor: '#F8FAFD',
                border: '1px solid #E2EAF5',
                borderRadius: '8px',
                padding: '14px 18px',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#2A3C5B', marginBottom: '8px' }}>
                1. Is the water bottle double-walled with vacuum insulation to retain temperature?
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="isInsulated"
                    checked={clarifications.isInsulated === 'yes'}
                    onChange={() => setClarifications({ ...clarifications, isInsulated: 'yes' })}
                  />
                  <span>Yes, double-walled vacuum insulated flask (IS 17526 applies)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="isInsulated"
                    checked={clarifications.isInsulated === 'no'}
                    onChange={() => setClarifications({ ...clarifications, isInsulated: 'no' })}
                  />
                  <span>No, single-walled non-insulated bottle (IS 17803 applies)</span>
                </label>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#F8FAFD',
                border: '1px solid #E2EAF5',
                borderRadius: '8px',
                padding: '14px 18px',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#2A3C5B', marginBottom: '8px' }}>
                2. Is the bottle intended for pressurized / carbonated beverages?
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="isCarbonated"
                    checked={clarifications.isCarbonated === 'no'}
                    onChange={() => setClarifications({ ...clarifications, isCarbonated: 'no' })}
                  />
                  <span>No, regular potable water / hot beverages</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="isCarbonated"
                    checked={clarifications.isCarbonated === 'yes'}
                    onChange={() => setClarifications({ ...clarifications, isCarbonated: 'yes' })}
                  />
                  <span>Yes, carbonated / pressurized drinks</span>
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrentStep(2)} className="btn btn-secondary">
              &larr; Back to Attributes
            </button>
            <button onClick={() => setCurrentStep(4)} className="btn btn-primary">
              Find Candidate Standards &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Candidate Standards Results */}
      {currentStep === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            className="card"
            style={{
              padding: '18px 24px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D6E4F8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B' }}>
                Step 4: Candidate Indian Standards
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B' }}>
                Recommendations presented as <em>potentially applicable standards</em> based on published BIS scope evidence.
              </p>
            </div>
            <button onClick={() => setCurrentStep(1)} className="btn btn-secondary btn-sm">
              <RotateCcw size={13} /> Reset Product Query
            </button>
          </div>

          {/* Results List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {candidateStandards.map((cand, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D6E4F8',
                  padding: '20px 24px',
                  borderRadius: '10px',
                  borderLeft: idx === 0 ? '4px solid #3A74C2' : '1px solid #D6E4F8',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '17px', fontWeight: 800, color: '#3A74C2' }}>
                        {cand.isNumber}
                      </span>
                      <span className="badge badge-sky" style={{ fontSize: '11px' }}>
                        Match Confidence: {cand.confidence}%
                      </span>
                      {cand.qcoMandatory && (
                        <span className="badge badge-danger" style={{ fontSize: '11px' }}>
                          Mandatory QCO
                        </span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2A3C5B' }}>
                      {cand.title}
                    </h4>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onNavigate('certification', cand.isNumber)}
                      className="btn btn-primary btn-sm"
                    >
                      <Award size={14} /> Certification Guidance
                    </button>
                    <button
                      onClick={() => onNavigate('standards-explorer', cand.isNumber)}
                      className="btn btn-secondary btn-sm"
                    >
                      <BookOpen size={14} /> Open Standard
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#F8FAFD',
                    border: '1px solid #E2EAF5',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    fontSize: '13px',
                    color: '#334155',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#2A3C5B', marginBottom: '4px' }}>
                    Why this standard potentially applies:
                  </div>
                  <p>{cand.matchReason}</p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#64748B' }}>
                  <div>
                    <strong>Supporting Clause:</strong> {cand.evidenceClause}
                  </div>
                  <div>
                    <strong>Regulatory Note:</strong> {cand.qcoNotice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
