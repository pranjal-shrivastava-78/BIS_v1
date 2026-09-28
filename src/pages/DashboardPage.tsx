import React, { useState } from 'react';
import {
  BookOpen,
  Split,
  Award,
  Scale,
  FlaskConical,
  Gem,
  Users,
  FileSearch,
  CheckSquare,
  Server,
  ArrowRight,
  ArrowUp,
  Plus,
  Paperclip,
  Sparkles,
} from 'lucide-react';
import { NavRoute } from '../types';
import { BisLogo } from '../components/common/BisLogo';

interface DashboardPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [heroInput, setHeroInput] = useState('');

  // Critical requirement 4: Homepage chat -> Full screen chat flow
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = heroInput.trim();
    if (!query) return;

    // Navigate to /chat with the exact query as payload
    onNavigate('/chat', query);
  };

  const handleSuggestionClick = (query: string) => {
    onNavigate('/chat', query);
  };

  // Section A: Government Services & Standards
  const govServicesCards = [
    {
      id: 'standards-explorer',
      title: 'Standards Explorer',
      description: 'Search Indian Standards, clauses and technical requirements.',
      route: '/standards' as NavRoute,
      icon: BookOpen,
      code: 'IS Catalogue',
    },
    {
      id: 'product-to-standard',
      title: 'Product → Standard',
      description: 'Find applicable standards for your product.',
      route: '/product-to-standard' as NavRoute,
      icon: Split,
      code: 'Guided Discovery',
    },
    {
      id: 'certification',
      title: 'Certification',
      description: 'Get guidance on certification schemes, process and documents.',
      route: '/certification' as NavRoute,
      icon: Award,
      code: 'Scheme I & II',
    },
    {
      id: 'qco-regulations',
      title: 'QCO & Regulations',
      description: 'Check mandatory requirements and latest gazette notifications.',
      route: '/qco-regulations' as NavRoute,
      icon: Scale,
      code: 'Mandatory Orders',
    },
    {
      id: 'testing-laboratories',
      title: 'Testing Laboratories',
      description: 'Find BIS recognized testing laboratories.',
      route: '/laboratories' as NavRoute,
      icon: FlaskConical,
      code: 'NABL Facilities',
    },
    {
      id: 'hallmarking-jewellery',
      title: 'Hallmarking & Jewellery',
      description: 'HUID verification, AHC search and hallmarking information.',
      route: '/hallmarking' as NavRoute,
      icon: Gem,
      code: 'HUID & AHC',
    },
  ];

  // Section B: Analysis & Consumer Tools
  const analysisToolsCards = [
    {
      id: 'consumer-services',
      title: 'Consumer Services',
      description: 'Citizen guides, FAQs and awareness resources.',
      route: '/consumer-services' as NavRoute,
      icon: Users,
      code: 'Citizen Portal',
    },
    {
      id: 'document-image-lab',
      title: 'Document & Image Lab',
      description: 'Upload documents or images for analysis (e.g., assaying report, OCR).',
      route: '/document-image-lab' as NavRoute,
      icon: FileSearch,
      code: 'OCR & Analysis',
    },
    {
      id: 'compliance-gap',
      title: 'Compliance Gap Analysis',
      description: 'Compare product with regulatory requirements.',
      route: '/compliance-gap' as NavRoute,
      icon: CheckSquare,
      code: 'Pre-Audit Evaluation',
    },
  ];

  // Section C: Administration & Monitoring
  const adminMonitoringCards = [
    {
      id: 'admin',
      title: 'Admin & Telemetry',
      description: 'Monitor data sync, system health and usage analytics.',
      route: '/admin' as NavRoute,
      icon: Server,
      code: 'Telemetry & Sync',
    },
  ];

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '10px 0 40px',
      }}
    >
      {/* ==================================================
          3. HOMEPAGE HERO SECTION
          ================================================== */}
      <section
        style={{
          width: '100%',
          maxWidth: '920px',
          margin: '0 auto',
          background: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%)',
          border: '1px solid #D6E4F8',
          borderRadius: '24px',
          padding: '42px 36px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 4px 20px -2px rgba(58, 116, 194, 0.08)',
        }}
      >
        {/* BIS Official Logo */}
        <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
          <BisLogo size={62} />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '32px',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#1D2B42' }}>BIS</span>
          <span style={{ color: '#3A74C2' }}>Intelligent Assistant</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '15.5px',
            color: '#475569',
            maxWidth: '640px',
            lineHeight: 1.5,
            marginBottom: '28px',
          }}
        >
          Ask about Indian Standards, certification, testing, verification and BIS services.
        </p>

        {/* Large Rounded Chat Input Container */}
        <form
          onSubmit={handleHeroSubmit}
          style={{
            width: '100%',
            maxWidth: '740px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #C4DCFA',
            borderRadius: '9999px',
            padding: '6px 8px 6px 14px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 14px rgba(58, 116, 194, 0.1)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          {/* Attachment button on left */}
          <button
            type="button"
            title="Upload Document or Sample"
            onClick={() => onNavigate('/document-image-lab')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F0F6FE',
              border: '1px solid #D6E4F8',
              color: '#3A74C2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Plus size={18} />
          </button>

          {/* Text input in center */}
          <input
            type="text"
            placeholder="How can I help you today?"
            value={heroInput}
            onChange={(e) => setHeroInput(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '0 16px',
              fontSize: '15px',
              color: '#1E293B',
              backgroundColor: 'transparent',
            }}
          />

          {/* Circular blue send/up-arrow button on right */}
          <button
            type="submit"
            title="Ask BIS Assistant"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: heroInput.trim() ? '#3A74C2' : '#92BBF8',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: heroInput.trim() ? 'pointer' : 'default',
              border: 'none',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(58, 116, 194, 0.3)',
              transition: 'background-color 0.15s ease',
            }}
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
        </form>

        {/* Suggested Queries Chips */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <Sparkles size={13} color="#3A74C2" /> Suggestions:
          </span>
          {[
            'What BIS standard applies to stainless steel water bottles?',
            'How to verify 6-digit HUID code?',
            'Check mandatory QCO orders for toys',
            'Find accredited chemical testing laboratories',
          ].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(prompt)}
              style={{
                fontSize: '12px',
                backgroundColor: '#F8FAFD',
                border: '1px solid #D6E4F8',
                borderRadius: '16px',
                padding: '4px 12px',
                color: '#2A3C5B',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#EAF2FE';
                e.currentTarget.style.borderColor = '#3A74C2';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFD';
                e.currentTarget.style.borderColor = '#D6E4F8';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          6. SECTION A: Government Services & Standards
          ================================================== */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
            Government Services & Standards
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '580px', margin: '0 auto', lineHeight: 1.5 }}>
            Statutory conformity assessment, national standards catalogue, and regulatory frameworks.
          </p>
          <button
            onClick={() => onNavigate('/government-services')}
            className="section-view-all-btn"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#3A74C2',
              cursor: 'pointer',
            }}
          >
            View all &rarr;
          </button>
        </div>

        {/* 3-Column Desktop Grid */}
        <div className="bis-card-grid">
          {govServicesCards.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.route)}
                className="bis-feature-card"
                style={{
                  backgroundColor: '#F8FAFD',
                  border: '1px solid #D6E4F8',
                  borderRadius: '16px',
                  padding: '24px 20px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.18s ease',
                  boxShadow: '0 1px 3px rgba(30, 41, 59, 0.04)',
                  height: '100%',
                }}
              >
                {/* Circular arrow button in upper-right corner without disturbing centered content */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D6E4F8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3A74C2',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <ArrowRight size={14} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: '#EAF2FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3A74C2',
                      border: '1px solid #C4DCFA',
                      marginBottom: '14px',
                    }}
                  >
                    <IconComp size={24} />
                  </div>

                  <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, maxWidth: '280px', margin: '0 auto' }}>
                    {card.description}
                  </p>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#3A74C2',
                      backgroundColor: '#EAF2FE',
                      border: '1px solid #C4DCFA',
                      padding: '3px 12px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      display: 'inline-block',
                    }}
                  >
                    {card.code}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          6. SECTION B: Analysis & Consumer Tools
          ================================================== */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
            Analysis & Consumer Tools
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '580px', margin: '0 auto', lineHeight: 1.5 }}>
            Citizen awareness, multimodal document evaluation, and technical compliance gap audits.
          </p>
          <button
            onClick={() => onNavigate('/analysis-tools')}
            className="section-view-all-btn"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#3A74C2',
              cursor: 'pointer',
            }}
          >
            View all &rarr;
          </button>
        </div>

        {/* 3-Column Desktop Grid */}
        <div className="bis-card-grid">
          {analysisToolsCards.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.route)}
                className="bis-feature-card"
                style={{
                  backgroundColor: '#F8FAFD',
                  border: '1px solid #D6E4F8',
                  borderRadius: '16px',
                  padding: '24px 20px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.18s ease',
                  boxShadow: '0 1px 3px rgba(30, 41, 59, 0.04)',
                  height: '100%',
                }}
              >
                {/* Circular arrow button in upper-right corner without disturbing centered content */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D6E4F8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3A74C2',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <ArrowRight size={14} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: '#EAF2FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3A74C2',
                      border: '1px solid #C4DCFA',
                      marginBottom: '14px',
                    }}
                  >
                    <IconComp size={24} />
                  </div>

                  <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, maxWidth: '280px', margin: '0 auto' }}>
                    {card.description}
                  </p>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#3A74C2',
                      backgroundColor: '#EAF2FE',
                      border: '1px solid #C4DCFA',
                      padding: '3px 12px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      display: 'inline-block',
                    }}
                  >
                    {card.code}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          6. SECTION C: Administration & Monitoring
          ================================================== */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
            Administration & Monitoring
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '580px', margin: '0 auto', lineHeight: 1.5 }}>
            Monitor data synchronization, system health and usage analytics.
          </p>
          <button
            onClick={() => onNavigate('/administration')}
            className="section-view-all-btn"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#3A74C2',
              cursor: 'pointer',
            }}
          >
            View all &rarr;
          </button>
        </div>

        {/* Symmetrical Administration Card */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: '380px' }}>
            {adminMonitoringCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => onNavigate(card.route)}
                  className="bis-feature-card"
                  style={{
                    backgroundColor: '#F8FAFD',
                    border: '1px solid #D6E4F8',
                    borderRadius: '16px',
                    padding: '24px 20px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.18s ease',
                    boxShadow: '0 1px 3px rgba(30, 41, 59, 0.04)',
                    height: '100%',
                  }}
                >
                  {/* Circular arrow button in upper-right corner without disturbing centered content */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D6E4F8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3A74C2',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                    }}
                  >
                    <ArrowRight size={14} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: '#EAF2FE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#3A74C2',
                        border: '1px solid #C4DCFA',
                        marginBottom: '14px',
                      }}
                    >
                      <IconComp size={24} />
                    </div>

                    <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, maxWidth: '280px', margin: '0 auto' }}>
                      {card.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#3A74C2',
                        backgroundColor: '#EAF2FE',
                        border: '1px solid #C4DCFA',
                        padding: '3px 12px',
                        borderRadius: '12px',
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {card.code}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .bis-card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .bis-feature-card:hover {
          transform: translateY(-3px);
          border-color: #3A74C2 !important;
          box-shadow: 0 8px 20px -4px rgba(58, 116, 194, 0.15) !important;
          background-color: #FFFFFF !important;
        }
        @media (max-width: 1024px) {
          .bis-card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .bis-card-grid {
            grid-template-columns: 1fr;
          }
          .section-view-all-btn {
            position: static !important;
            transform: none !important;
            margin-top: 8px;
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};
