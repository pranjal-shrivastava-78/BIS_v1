import React, { useState } from 'react';
import {
  Users,
  HelpCircle,
  ShieldCheck,
  Gem,
  Award,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import { NavRoute } from '../types';

interface ConsumerServicesPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const ConsumerServicesPage: React.FC<ConsumerServicesPageProps> = ({
  onNavigate,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [goldWeight, setGoldWeight] = useState<number>(10);
  const [selectedKarat, setSelectedKarat] = useState<number>(22);

  const faqs = [
    {
      q: 'What is the Bureau of Indian Standards (BIS)?',
      a: 'The Bureau of Indian Standards (BIS) is the National Standard Body of India established under the BIS Act, 2016 for harmonious development of the activities of standardization, marking, and quality certification of goods.',
    },
    {
      q: 'What is the BIS Standard Mark (ISI mark)?',
      a: 'The ISI mark is the official product certification mark of BIS. It certifies that an industrial product conforms to the relevant Indian Standard. It is mandatory for over 650 product categories under Quality Control Orders (QCOs) including drinking water, cement, domestic gas cylinders, and electrical accessories.',
    },
    {
      q: 'What does "916" mean on gold jewellery?',
      a: '"916" represents 22 Karat gold fineness (91.6% pure gold alloyed with 8.4% copper or silver for structural rigidity). Gold fineness is measured in parts per thousand per IS 1417 : 2016.',
    },
    {
      q: 'What is HUID and why is it important?',
      a: 'HUID stands for Hallmark Unique Identification. It is a 6-digit alphanumeric code laser-marked on every individual gold jewellery article by a recognized Assaying & Hallmarking Centre (AHC). It gives the piece a unique identity traceable in the central BIS CARE system.',
    },
    {
      q: 'What 3 marks should I check before purchasing gold jewellery?',
      a: '1. The BIS Standard triangular logo.\n2. Purity in Karat and Fineness (e.g. 22K916, 18K750, 14K585).\n3. The 6-character alphanumeric HUID engraved by the hallmarking centre.',
    },
    {
      q: 'How can a consumer file a complaint for counterfeit ISI or fake hallmark?',
      a: 'Consumers can file complaints directly via the official "BIS CARE" mobile app, by emailing complaints@bis.gov.in, or by calling the toll-free consumer helpline 1800-11-8004. BIS conducts search and seizure operations against unauthorized use.',
    },
  ];

  // Gold purity calculation
  const purityPercents: Record<number, { percent: number; label: string; fineness: string }> = {
    24: { percent: 99.9, label: '24 Karat', fineness: '999' },
    23: { percent: 95.8, label: '23 Karat', fineness: '958' },
    22: { percent: 91.6, label: '22 Karat', fineness: '916' },
    20: { percent: 83.3, label: '20 Karat', fineness: '833' },
    18: { percent: 75.0, label: '18 Karat', fineness: '750' },
    14: { percent: 58.5, label: '14 Karat', fineness: '585' },
    9: { percent: 37.5, label: '9 Karat', fineness: '375' },
  };

  const pureGoldContent = ((goldWeight * purityPercents[selectedKarat].percent) / 100).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <Users size={22} color="#3A74C2" />
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#2A3C5B' }}>
            Consumer Services & Citizen Knowledge Portal
          </h1>
        </div>
        <p style={{ fontSize: '13.5px', color: '#64748B' }}>
          Simplified explanations for citizens and consumers to understand Indian Standards, verify hallmarks, detect counterfeit marks, and protect their rights.
        </p>
      </div>

      {/* Two Column Grid: FAQ Accordion + Gold Purity Calculator */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Left Column: Consumer FAQs */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B', marginBottom: '14px' }}>
            Frequently Asked Consumer Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #E2EAF5',
                    borderRadius: '6px',
                    backgroundColor: isOpen ? '#F8FAFD' : '#FFFFFF',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '13px',
                      color: isOpen ? '#3A74C2' : '#2A3C5B',
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 14px 14px',
                        fontSize: '12.5px',
                        color: '#475569',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                        borderTop: '1px solid #EDF3FB',
                        paddingTop: '10px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Karat & Purity Calculator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Calculator size={18} color="#3A74C2" />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2A3C5B' }}>
                Gold Karat & Purity Calculator (IS 1417)
              </h3>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '16px' }}>
              Calculate exact pure gold content across recognized hallmarking fineness grades:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#39527B', display: 'block', marginBottom: '4px' }}>
                  Gross Jewellery Weight (Grams):
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={goldWeight}
                  onChange={(e) => setGoldWeight(parseFloat(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#39527B', display: 'block', marginBottom: '4px' }}>
                  Hallmarked Karat Grade:
                </label>
                <select
                  value={selectedKarat}
                  onChange={(e) => setSelectedKarat(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                  }}
                >
                  <option value={24}>24 Karat (999 fineness - 99.9% pure)</option>
                  <option value={23}>23 Karat (958 fineness - 95.8% pure)</option>
                  <option value={22}>22 Karat (916 fineness - 91.6% pure)</option>
                  <option value={20}>20 Karat (833 fineness - 83.3% pure)</option>
                  <option value={18}>18 Karat (750 fineness - 75.0% pure)</option>
                  <option value={14}>14 Karat (585 fineness - 58.5% pure)</option>
                  <option value={9}>9 Karat (375 fineness - 37.5% pure)</option>
                </select>
              </div>
            </div>

            {/* Calculated Box */}
            <div
              style={{
                backgroundColor: '#F1F6FD',
                border: '1px solid #C4DCFA',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
                CALCULATED NET PURE GOLD CONTENT
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#3A74C2', margin: '4px 0' }}>
                {pureGoldContent} grams
              </div>
              <div style={{ fontSize: '12px', color: '#2A3C5B' }}>
                Remaining {((goldWeight || 0) - parseFloat(pureGoldContent)).toFixed(2)}g constitutes alloy metal (copper/silver).
              </div>
            </div>
          </div>

          {/* BIS CARE App Card */}
          <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Smartphone size={20} color="#3A74C2" />
              <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#2A3C5B' }}>
                Download Official BIS CARE App
              </h4>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
              Verify ISI marks and HUID numbers on your mobile device or lodge immediate consumer grievances through the official BIS CARE citizen app.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.bis.mobile"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Google Play Store <ExternalLink size={12} />
              </a>
              <a
                href="https://apps.apple.com/in/app/bis-care/id1527319989"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Apple App Store <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
