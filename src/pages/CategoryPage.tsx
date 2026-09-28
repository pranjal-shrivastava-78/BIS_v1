import React from 'react';
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
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { NavRoute } from '../types';

interface CategoryPageProps {
  category: 'government-services' | 'analysis-tools' | 'administration';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onNavigate }) => {
  const getCategoryDetails = () => {
    switch (category) {
      case 'government-services':
        return {
          title: 'Government Services & Standards',
          subtitle: 'Authoritative conformity assessment, Indian Standards catalogue, Quality Control Orders, testing facilities and national hallmarking services.',
          badge: 'National Portal Services',
          cards: [
            {
              id: 'standards-explorer',
              title: 'Standards Explorer',
              desc: 'Search Indian Standards, clauses and technical requirements.',
              route: '/standards' as NavRoute,
              icon: BookOpen,
              subItems: ['Standard Search', 'Standard Detail', 'Clause-Level Retrieval', 'Related Standards'],
            },
            {
              id: 'product-to-standard',
              title: 'Product → Standard',
              desc: 'Find applicable standards for your product based on extracted attributes.',
              route: '/product-to-standard' as NavRoute,
              icon: Split,
              subItems: ['Product Attribute Extraction', 'Clarifying Questions', 'Candidate Standards Discovery', 'BIS Evidence'],
            },
            {
              id: 'certification',
              title: 'Certification',
              desc: 'Get guidance on certification schemes, process and documents.',
              route: '/certification' as NavRoute,
              icon: Award,
              subItems: ['Certification Guidance', 'Certification Roadmap', 'Compliance Checklist', 'Scheme I & II Routes'],
            },
            {
              id: 'qco-regulations',
              title: 'QCO & Regulations',
              desc: 'Check mandatory requirements and latest gazette notifications.',
              route: '/qco-regulations' as NavRoute,
              icon: Scale,
              subItems: ['Enforced QCO Orders', 'Upcoming Notifications', 'Ministry Cross-Reference', 'Gazette Source Links'],
            },
            {
              id: 'testing-laboratories',
              title: 'Testing Laboratories',
              desc: 'Find BIS recognized testing laboratories.',
              route: '/laboratories' as NavRoute,
              icon: FlaskConical,
              subItems: ['Accredited Lab Search', 'Location & District Radius', 'Test Capabilities', 'Validity Status'],
            },
            {
              id: 'hallmarking-jewellery',
              title: 'Hallmarking & Jewellery',
              desc: 'HUID verification, AHC search and hallmarking information.',
              route: '/hallmarking' as NavRoute,
              icon: Gem,
              subItems: ['HUID Verification', 'Hallmark Scanner', 'Physical Purity Testing', 'Assay Explainer', 'Jeweller Search'],
            },
          ],
        };
      case 'analysis-tools':
        return {
          title: 'Analysis & Consumer Tools',
          subtitle: 'Citizen empowerment, consumer protection, multimedia assay report explanations, and pre-audit conformity comparisons.',
          badge: 'Technical & Citizen Tools',
          cards: [
            {
              id: 'consumer-services',
              title: 'Consumer Services',
              desc: 'Citizen guides, FAQs and awareness resources.',
              route: '/consumer-services' as NavRoute,
              icon: Users,
              subItems: ['Consumer BIS Questions', 'BIS Mark / Label Scanner', 'Nearby Service Discovery', 'Multilingual Chat'],
            },
            {
              id: 'document-image-lab',
              title: 'Document & Image Lab',
              desc: 'Upload documents or images for analysis (e.g., assaying report, OCR).',
              route: '/document-image-lab' as NavRoute,
              icon: FileSearch,
              subItems: ['Document Analysis', 'Image Analysis', 'Jewellery Scanner', 'Assay Explainer', 'Label Scanner'],
            },
            {
              id: 'compliance-gap',
              title: 'Compliance Gap Analysis',
              desc: 'Compare product with regulatory requirements.',
              route: '/compliance-gap' as NavRoute,
              icon: CheckSquare,
              subItems: ['Product & Document Input', 'Applicable BIS Criteria', 'Evidence vs Gap Comparison', 'Remedial Actions'],
            },
          ],
        };
      case 'administration':
      default:
        return {
          title: 'Administration & Monitoring',
          subtitle: 'System-wide telemetry, provenance monitoring, automated BIS synchronisation and human-in-the-loop review queues.',
          badge: 'Operations & Audit',
          cards: [
            {
              id: 'admin',
              title: 'Admin & Telemetry',
              desc: 'Monitor data sync, system health and usage analytics.',
              route: '/admin' as NavRoute,
              icon: Server,
              subItems: ['Data Synchronization', 'Data Provenance', 'Change Detection', 'Freshness Indicators', 'Hallucination Guard', 'Source Health', 'Human Review Queue'],
            },
          ],
        };
    }
  };

  const details = getCategoryDetails();

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Breadcrumb Bar */}
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
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>{details.title}</span>
      </div>

      {/* Header Banner */}
      <div
        className="card"
        style={{
          padding: '28px 32px',
          background: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%)',
          border: '1px solid #D6E4F8',
          borderRadius: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EAF2FE', color: '#1E40AF', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, border: '1px solid #BFDBFE', marginBottom: '12px' }}>
          <Sparkles size={13} />
          {details.badge}
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
          {details.title}
        </h1>
        <p style={{ fontSize: '14px', color: '#475569', maxWidth: '800px', lineHeight: 1.5 }}>
          {details.subtitle}
        </p>
      </div>

      {/* 3-Column Grid matching homepage card design */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px',
        }}
      >
        {details.cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onNavigate(card.route)}
              className="bis-feature-card"
              style={{
                backgroundColor: '#F8FAFD',
                border: '1px solid #D6E4F8',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(30, 41, 59, 0.04)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: '#EAF2FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3A74C2',
                      border: '1px solid #C4DCFA',
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D6E4F8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3A74C2',
                    }}
                  >
                    <ArrowRight size={15} />
                  </div>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42', marginBottom: '8px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                  {card.desc}
                </p>
              </div>

              {card.subItems && (
                <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                    Available Sub-Features
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {card.subItems.map((sub, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E2EAF5',
                          borderRadius: '4px',
                          padding: '2px 7px',
                          color: '#39527B',
                          fontWeight: 500,
                        }}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
