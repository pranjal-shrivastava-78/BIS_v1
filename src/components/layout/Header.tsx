import React, { useState } from 'react';
import {
  Search,
  Bell,
  Globe,
  HelpCircle,
  Menu,
  X,
  User,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { NavRoute, Language } from '../../types';

interface HeaderProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute, payload?: any) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  language,
  onLanguageChange,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim().toLowerCase();
    if (query.includes('huid') || query.includes('gold') || query.includes('hallmark')) {
      onNavigate('hallmarking-jewellery');
    } else if (query.includes('lab') || query.includes('test')) {
      onNavigate('testing-laboratories');
    } else if (query.includes('qco') || query.includes('mandat')) {
      onNavigate('qco-regulations');
    } else if (query.includes('certif') || query.includes('isi')) {
      onNavigate('certification');
    } else if (query.includes('licence') || query.includes('cm/l') || query.includes('crs')) {
      onNavigate('verification-suite');
    } else {
      onNavigate('standards-explorer', query);
    }
    setSearchQuery('');
  };

  return (
    <>
      {/* Top Government Metadata Bar - matching reference aesthetic */}
      <div
        style={{
          backgroundColor: '#2A3C5B',
          color: '#E2EAF5',
          fontSize: '11.5px',
          padding: '5px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>📅 27 Sept 2026 • 07:30 PM IST</span>
          <span style={{ color: '#92BBF8', fontWeight: 600 }}>
            GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={13} color="#92BBF8" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '11.5px',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 600,
              }}
            >
              <option value="en" style={{ color: '#1E293B' }}>English</option>
              <option value="hi" style={{ color: '#1E293B' }}>हिंदी (Hindi)</option>
              <option value="ta" style={{ color: '#1E293B' }}>தமிழ் (Tamil)</option>
              <option value="bn" style={{ color: '#1E293B' }}>বাংলা (Bengali)</option>
              <option value="mr" style={{ color: '#1E293B' }}>मराठी (Marathi)</option>
            </select>
          </div>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: '#92BBF8', fontWeight: 600 }}>National Standards Portal (e-Manak)</span>
        </div>
      </div>

      {/* Main Top Header */}
      <header
        style={{
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #D6E4F8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          boxShadow: '0 1px 4px rgba(57, 82, 123, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'none',
              padding: '6px',
              borderRadius: '6px',
              color: '#39527B',
            }}
            className="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div
            onClick={() => onNavigate('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                backgroundColor: '#39527B',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#92BBF8',
                fontWeight: 800,
                fontSize: '18px',
                border: '1px solid #92BBF8',
              }}
            >
              🏛️
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#2A3C5B',
                    letterSpacing: '-0.02em',
                  }}
                >
                  BIS Intelligent Assistant
                </span>
                <span
                  style={{
                    backgroundColor: '#EAF2FE',
                    color: '#3A74C2',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    border: '1px solid #C4DCFA',
                  }}
                >
                  SIH 26107
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.1 }}>
                Bureau of Indian Standards • Standard & Regulatory Knowledge Engine
              </p>
            </div>
          </div>
        </div>

        {/* Global Fast Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '460px',
            margin: '0 20px',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#3A74C2',
            }}
          />
          <input
            type="text"
            placeholder="Search IS numbers, products, HUID, labs, QCOs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '38px',
              paddingLeft: '38px',
              paddingRight: '12px',
              fontSize: '13px',
              backgroundColor: '#F7FAFD',
              border: '1px solid #D6E4F8',
              borderRadius: '20px',
            }}
          />
        </form>

        {/* Right Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: showNotifications ? '#EAF2FE' : '#F7FAFD',
                border: '1px solid #D6E4F8',
                color: '#39527B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Bell size={17} />
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#3A74C2',
                }}
              />
            </button>

            {showNotifications && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '44px',
                  width: '320px',
                  zIndex: 100,
                  boxShadow: 'var(--shadow-md)',
                  padding: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #E2E8F0',
                    paddingBottom: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <strong style={{ fontSize: '13px', color: '#2A3C5B' }}>
                    Gazette & Regulatory Alerts
                  </strong>
                  <span style={{ fontSize: '11px', color: '#3A74C2', fontWeight: 600 }}>
                    2 New
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('qco-regulations');
                    }}
                    style={{
                      padding: '8px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      borderLeft: '3px solid #3A74C2',
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#1E293B' }}>Potable Water Bottles QCO Enforced</div>
                    <div style={{ color: '#64748B', fontSize: '11px' }}>Mandatory ISI Mark certification under IS 17526.</div>
                  </div>
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('hallmarking-jewellery');
                    }}
                    style={{
                      padding: '8px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      borderLeft: '3px solid #92BBF8',
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#1E293B' }}>HUID 6-digit verification update</div>
                    <div style={{ color: '#64748B', fontSize: '11px' }}>All 24K, 22K, 18K gold articles must carry HUID.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            title="Help Desk"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F7FAFD',
              border: '1px solid #D6E4F8',
              color: '#39527B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HelpCircle size={17} />
          </button>

          {/* User Profile Pill - inspired by the screenshot's user pill */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowProfile(!showProfile)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px 4px 6px',
                backgroundColor: '#F1F6FD',
                border: '1px solid #D6E4F8',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#39527B',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={15} />
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#2A3C5B' }}>
                  pranjal shrivastava
                </div>
                <div style={{ fontSize: '10px', color: '#3A74C2', fontWeight: 600 }}>
                  MSME • IND-48347
                </div>
              </div>
            </div>

            {showProfile && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '44px',
                  width: '260px',
                  zIndex: 100,
                  boxShadow: 'var(--shadow-md)',
                  padding: '14px',
                }}
              >
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#2A3C5B' }}>
                    Pranjal Shrivastava
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>pranjal.s@enterprise.gov.in</div>
                  <div
                    style={{
                      fontSize: '11px',
                      backgroundColor: '#EAF7EE',
                      color: '#166534',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      marginTop: '6px',
                      display: 'inline-block',
                      fontWeight: 600,
                    }}
                  >
                    Verified Industry Entity
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px' }}>
                  <div
                    onClick={() => {
                      setShowProfile(false);
                      onNavigate('verification-suite');
                    }}
                    style={{ padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', color: '#39527B' }}
                  >
                    My Licences & Applications
                  </div>
                  <div
                    onClick={() => {
                      setShowProfile(false);
                      onNavigate('admin-dashboard');
                    }}
                    style={{ padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', color: '#39527B' }}
                  >
                    Admin Telemetry & Health
                  </div>
                  <a
                    href="https://www.services.bis.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '6px 8px',
                      borderRadius: '4px',
                      color: '#3A74C2',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600,
                    }}
                  >
                    Official BIS Manak Online <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {showHelp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(29, 43, 66, 0.65)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowHelp(false);
          }}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: '520px', padding: '24px', backgroundColor: '#FFFFFF' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid #E2E8F0',
                paddingBottom: '10px',
              }}
            >
              <h3 style={{ fontSize: '16px', color: '#2A3C5B', fontWeight: 800 }}>
                BIS Support & Regulatory Helpdesk
              </h3>
              <button onClick={() => setShowHelp(false)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
              <p style={{ marginBottom: '12px' }}>
                For authentic verification or filing complaints regarding misuse of ISI Mark or hallmarking, contact the official Bureau of Indian Standards channels:
              </p>
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #E2EAF5',
                  marginBottom: '14px',
                }}
              >
                <div><strong>National Toll-Free Helpline:</strong> 1800-11-8004</div>
                <div><strong>HQ Address:</strong> Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi - 110002</div>
                <div><strong>e-Mail:</strong> info@bis.gov.in / complaints@bis.gov.in</div>
                <div><strong>Official CARE Mobile App:</strong> BIS CARE (Google Play / App Store)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', backgroundColor: '#FFFBEB', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                <ShieldAlert size={16} />
                <span>
                  <strong>Hallucination Guard:</strong> This assistant provides source-backed citations from official BIS standards and QCOs. AI outputs must not be treated as formal statutory certification decisions.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .mobile-menu-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
};
