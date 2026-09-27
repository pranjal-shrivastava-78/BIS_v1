import React from 'react';
import { ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #D6E4F8',
        padding: '24px 32px',
        color: '#64748B',
        fontSize: '12px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1520px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Top Disclaimer Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            backgroundColor: '#F7FAFD',
            border: '1px solid #E2EAF5',
            padding: '12px 16px',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2A3C5B' }}>
            <ShieldCheck size={16} color="#3A74C2" />
            <span style={{ fontWeight: 600 }}>
              AI-Powered Assistant for Indian Standards & Conformity Assessment (SIH Problem Statement 26107)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontSize: '11.5px', fontWeight: 600 }}>
            <RefreshCw size={13} />
            <span>Data Synchronized: 26 Sept 2026 18:30 IST • 5 Official BIS Data Feeds Active</span>
          </div>
        </div>

        {/* Links & Attribution */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '8px',
          }}
        >
          <div style={{ maxWidth: '800px', lineHeight: 1.6 }}>
            <p>
              <strong>Statutory Notice:</strong> Information retrieved by this assistant is strictly cited from published Indian Standards (IS), Technical Committee Scopes, Ministry Quality Control Orders (QCO), and BIS Directory Registries. The assistant does not invent regulatory requirements or issue statutory certifications.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontWeight: 600 }}>
            <a
              href="https://www.services.bis.gov.in"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#3A74C2', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              BIS Manak Online <ExternalLink size={12} />
            </a>
            <a
              href="https://lims.bis.gov.in"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#3A74C2', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              BIS LIMS <ExternalLink size={12} />
            </a>
            <a
              href="https://egazette.gov.in"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#3A74C2', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              The Gazette of India <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #EDF3FB',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#94A3B8',
          }}
        >
          <div>
            © 2026 Bureau of Indian Standards & Smart India Hackathon Team. Designed for institutional compliance and citizen accessibility.
          </div>
          <div>All Rights Reserved • Government of India</div>
        </div>
      </div>
    </footer>
  );
};
