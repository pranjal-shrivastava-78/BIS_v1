import React from 'react';
import {
  LayoutDashboard,
  BotMessageSquare,
  BookOpen,
  Split,
  Award,
  Scale,
  FlaskConical,
  Gem,
  Store,
  ShieldCheck,
  Users,
  FileSearch,
  CheckSquare,
  Server,
  HelpCircle,
  Settings,
  PhoneCall,
} from 'lucide-react';
import { NavRoute } from '../../types';

interface SidebarProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavRoute;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
}) => {
  const coreServices: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      sublabel: 'Overview & Services',
      icon: LayoutDashboard,
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      sublabel: 'Conversational RAG',
      icon: BotMessageSquare,
      badge: 'Core',
    },
    {
      id: 'standards-explorer',
      label: 'Standards Explorer',
      sublabel: 'IS Catalogue & Clauses',
      icon: BookOpen,
    },
    {
      id: 'product-to-standard',
      label: 'Product → Standard',
      sublabel: 'Attributes & Discovery',
      icon: Split,
    },
    {
      id: 'certification',
      label: 'Certification',
      sublabel: 'Roadmap & Checklist',
      icon: Award,
    },
    {
      id: 'qco-regulations',
      label: 'QCO & Regulations',
      sublabel: 'Mandatory Gazette Orders',
      icon: Scale,
      badge: 'QCO',
    },
    {
      id: 'testing-laboratories',
      label: 'Testing Laboratories',
      sublabel: 'BIS Recognized Facilities',
      icon: FlaskConical,
    },
    {
      id: 'hallmarking-jewellery',
      label: 'Hallmarking & Jewellery',
      sublabel: 'HUID, Scanner & AHC',
      icon: Gem,
    },
    {
      id: 'licensed-jewellers',
      label: 'Licensed Jewellers',
      sublabel: 'BIS Published Registry',
      icon: Store,
    },
    {
      id: 'verification-suite',
      label: 'Verification Suite',
      sublabel: 'Licence & CRS R-Number',
      icon: ShieldCheck,
    },
  ];

  const toolsAndAnalysis: NavItem[] = [
    {
      id: 'consumer-services',
      label: 'Consumer Services',
      sublabel: 'Citizen Guides & FAQs',
      icon: Users,
    },
    {
      id: 'documents-analysis',
      label: 'Document & Image Lab',
      sublabel: 'Assay Report & OCR',
      icon: FileSearch,
    },
    {
      id: 'compliance-gap',
      label: 'Compliance Gap Analysis',
      sublabel: 'Product vs Requirement',
      icon: CheckSquare,
    },
  ];

  const adminSection: NavItem[] = [
    {
      id: 'admin-dashboard',
      label: 'Admin & Telemetry',
      sublabel: 'Sync, Health & Review',
      icon: Server,
      badge: 'Admin',
    },
  ];

  const handleItemClick = (route: NavRoute) => {
    onNavigate(route);
    onCloseMobile();
  };

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          fontSize: '10.5px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#92BBF8',
          textTransform: 'uppercase',
          padding: '0 16px',
          marginBottom: '8px',
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {items.map((item) => {
          const isActive = currentRoute === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                textAlign: 'left',
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? '#2A3C5B' : '#E2EAF5',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div
                  style={{
                    color: isActive ? '#3A74C2' : '#92BBF8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: '10.5px',
                      color: isActive ? '#64748B' : 'rgba(226, 234, 245, 0.65)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? '#3A74C2' : '#2A3C5B',
                    color: isActive ? '#FFFFFF' : '#92BBF8',
                    border: '1px solid rgba(146, 187, 248, 0.3)',
                    marginLeft: '6px',
                    flexShrink: 0,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(29, 43, 66, 0.7)',
            backdropFilter: 'blur(3px)',
            zIndex: 95,
          }}
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={`app-sidebar ${isMobileOpen ? 'open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: '#39527B',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid #2A3C5B',
          zIndex: 96,
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* Sidebar Header / Brand */}
        <div
          style={{
            padding: '20px 18px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            }}
          >
            🇮🇳
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}
            >
              BIS Assistant
            </div>
            <div style={{ fontSize: '11px', color: '#92BBF8', fontWeight: 500 }}>
              Manak Bhavan • New Delhi
            </div>
          </div>
        </div>

        {/* Scrollable Nav Items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 12px',
          }}
        >
          {renderNavGroup('GOVERNMENT SERVICES & STANDARDS', coreServices)}
          {renderNavGroup('ANALYSIS & CONSUMER TOOLS', toolsAndAnalysis)}
          {renderNavGroup('ADMINISTRATION & MONITORING', adminSection)}
        </div>

        {/* Sidebar Footer - Matching screenshot's Help/Support block */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#2A3C5B',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'rgba(146, 187, 248, 0.15)',
                color: '#92BBF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneCall size={15} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#92BBF8', fontWeight: 600 }}>
                Help & Support
              </div>
              <div style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: 700 }}>
                1800-11-8004
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: 'rgba(226, 234, 245, 0.7)',
              paddingTop: '6px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
            <span style={{ color: '#92BBF8', fontWeight: 600 }}>v2.4.0</span>
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .app-sidebar {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            transition: transform 0.25s ease-in-out;
            box-shadow: 0 0 25px rgba(0, 0, 0, 0.35);
          }
          .app-sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
