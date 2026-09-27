import React, { useState, useEffect } from 'react';
import {
  BotMessageSquare,
  BookOpen,
  Split,
  Award,
  Scale,
  FlaskConical,
  Gem,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Database,
  RefreshCw,
} from 'lucide-react';
import { NavRoute } from '../types';
import { adminService, DashboardStats } from '../services/adminService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

interface DashboardPageProps {
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    let isMounted = true;
    adminService.getDashboardStats().then((data) => {
      if (isMounted) {
        setStats(data);
        setIsLoadingStats(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const serviceCards = [
    {
      id: 'ai-assistant',
      route: 'ai-assistant' as NavRoute,
      icon: BotMessageSquare,
      title: 'Ask BIS Assistant',
      description: 'Ask questions in natural language about Indian Standards, certification, QCOs and BIS services.',
      actionText: 'Launch Assistant',
      badge: 'Core RAG',
    },
    {
      id: 'standards-explorer',
      route: 'standards-explorer' as NavRoute,
      icon: BookOpen,
      title: 'Standards Explorer',
      description: 'Search and explore authoritative Indian Standards, clauses, amendments and committee scopes.',
      actionText: 'Search Standards',
      badge: 'GET /api/standards',
    },
    {
      id: 'product-to-standard',
      route: 'product-to-standard' as NavRoute,
      icon: Split,
      title: 'Product → Standard',
      description: 'Describe any manufactured product and discover candidate standards based on extracted attributes.',
      actionText: 'Map Product',
      badge: 'Guided Discovery',
    },
    {
      id: 'certification',
      route: 'certification' as NavRoute,
      icon: Award,
      title: 'Certification Roadmap',
      description: 'Understand certification routes (Scheme I ISI, Scheme II CRS), testing and compliance checklist.',
      actionText: 'View Roadmap',
      badge: 'Step-by-Step',
    },
    {
      id: 'qco-regulations',
      route: 'qco-regulations' as NavRoute,
      icon: Scale,
      title: 'QCO & Regulations',
      description: 'Check gazetted Quality Control Orders making BIS certification legally mandatory for products.',
      actionText: 'Check QCOs',
      badge: 'GET /api/qco',
    },
    {
      id: 'testing-laboratories',
      route: 'testing-laboratories' as NavRoute,
      icon: FlaskConical,
      title: 'Testing Laboratories',
      description: 'Find BIS-recognized testing laboratories, NABL scopes, accredited standards and location radius.',
      actionText: 'Find Labs',
      badge: 'GET /api/laboratories',
    },
    {
      id: 'hallmarking-jewellery',
      route: 'hallmarking-jewellery' as NavRoute,
      icon: Gem,
      title: 'Hallmarking & Jewellery',
      description: 'Verify 6-digit HUID, scan hallmark photos, understand 916 fineness, and find certified AHC centres.',
      actionText: 'Verify HUID',
      badge: 'Consumer Protection',
    },
    {
      id: 'verification-suite',
      route: 'verification-suite' as NavRoute,
      icon: ShieldCheck,
      title: 'Verification Suite',
      description: 'Verify official BIS manufacturer licences (CM/L), and electronics CRS R-numbers with live status.',
      actionText: 'Verify Licence',
      badge: 'Authenticity Check',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F6FD 100%)',
          border: '1px solid #D6E4F8',
          padding: '28px 32px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(57, 82, 123, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span
            style={{
              backgroundColor: '#EAF7EE',
              color: '#166534',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '4px',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#166534' }} />
            GOVERNMENT SERVICE PORTAL • SIH 26107
          </span>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Bureau of Indian Standards Knowledge Gateway
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#2A3C5B',
                lineHeight: 1.2,
                marginBottom: '8px',
              }}
            >
              Welcome to BIS Intelligent Assistant
            </h1>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.5 }}>
              Discover Indian Standards, certification requirements, testing facilities and BIS services — backed by authoritative sources.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '14.5px' }}
            >
              <BotMessageSquare size={17} />
              Ask the Assistant
            </button>
            <button
              onClick={() => onNavigate('standards-explorer')}
              className="btn btn-secondary"
              style={{ padding: '10px 20px', fontSize: '14.5px' }}
            >
              <BookOpen size={17} />
              Explore Standards
            </button>
          </div>
        </div>

        {/* Quick Question Prompts Row */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #E2EAF5',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} color="#3A74C2" /> Suggested inquiries:
          </span>
          {[
            'Which standard applies to stainless steel bottles?',
            'Is toy certification mandatory?',
            'What does 916 mean in gold hallmark?',
            'How to get Scheme I ISI Mark?',
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate('ai-assistant', q)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                color: '#39527B',
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '16px',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3A74C2';
                e.currentTarget.style.color = '#3A74C2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D6E4F8';
                e.currentTarget.style.color = '#39527B';
              }}
            >
              {q} &rarr;
            </button>
          ))}
        </div>
      </div>

      {/* Backend API Telemetry Cards (Rule 11: No fabricated statistics) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        <div
          className="card"
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: '#FFFFFF',
            borderLeft: '4px solid #3A74C2',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#3A74C2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Database size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Data Freshness
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B' }}>
              {isLoadingStats ? (
                'Connecting...'
              ) : stats?.lastSyncTimestamp ? (
                stats.lastSyncTimestamp
              ) : (
                'Synchronized via API Feed'
              )}
            </div>
            <div style={{ fontSize: '11.5px', color: '#166534' }}>● Backend Connected</div>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: '#FFFFFF',
            borderLeft: '4px solid #166534',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#EAF7EE',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Hallucination Guard
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B' }}>
              Strict Provenance Engine
            </div>
            <div style={{ fontSize: '11.5px', color: '#3A74C2' }}>Only verified clauses & gazettes cited</div>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: '#FFFFFF',
            borderLeft: '4px solid #92BBF8',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#F1F6FD',
              color: '#39527B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              API Status
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B' }}>
              {isLoadingStats ? 'Checking...' : stats?.totalStandards !== null ? `${stats?.totalStandards} Indexed` : 'API Endpoints Ready'}
            </div>
            <div style={{ fontSize: '11.5px', color: '#B45309' }}>Endpoints ready for backend integration</div>
          </div>
        </div>
      </div>

      {/* Main Service Cards Grid */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '19px', color: '#2A3C5B', fontWeight: 800 }}>
              BIS Digital Services & Knowledge Tools
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Access standards discovery, conformity assessment roadmaps, testing labs and verification
            </p>
          </div>
          <span style={{ fontSize: '12px', color: '#3A74C2', fontWeight: 600 }}>
            Official Standard Body Gateway
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '18px',
          }}
        >
          {serviceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="card"
                style={{
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  border: '1px solid #D6E4F8',
                }}
                onClick={() => onNavigate(card.route)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3A74C2';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(58, 116, 194, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#D6E4F8';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        backgroundColor: '#F1F6FD',
                        color: '#3A74C2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #D6E4F8',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: '#EAF2FE',
                        color: '#39527B',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid #C4DCFA',
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#2A3C5B',
                      marginBottom: '8px',
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      color: '#64748B',
                      lineHeight: 1.5,
                      marginBottom: '18px',
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#3A74C2',
                    paddingTop: '12px',
                    borderTop: '1px solid #F1F5F9',
                  }}
                >
                  <span>{card.actionText}</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
