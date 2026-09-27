import React, { useState } from 'react';
import { NavRoute, Language } from './types';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { StandardsExplorerPage } from './pages/StandardsExplorerPage';
import { ProductToStandardPage } from './pages/ProductToStandardPage';
import { CertificationPage } from './pages/CertificationPage';
import { QcoRegulationsPage } from './pages/QcoRegulationsPage';
import { TestingLaboratoriesPage } from './pages/TestingLaboratoriesPage';
import { HallmarkingJewelleryPage } from './pages/HallmarkingJewelleryPage';
import { LicensedJewellerPage } from './pages/LicensedJewellerPage';
import { VerificationSuitePage } from './pages/VerificationSuitePage';
import { ConsumerServicesPage } from './pages/ConsumerServicesPage';
import { DocumentImageAnalysisPage } from './pages/DocumentImageAnalysisPage';
import { ComplianceGapAnalysisPage } from './pages/ComplianceGapAnalysisPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<NavRoute>('dashboard');
  const [routePayload, setRoutePayload] = useState<any>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (route: NavRoute, payload?: any) => {
    setCurrentRoute(route);
    setRoutePayload(payload || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRouteTitle = (route: NavRoute): string => {
    switch (route) {
      case 'dashboard':
        return 'Dashboard';
      case 'ai-assistant':
        return 'AI Assistant';
      case 'standards-explorer':
        return 'Standards Explorer';
      case 'product-to-standard':
        return 'Product → Standard';
      case 'certification':
        return 'Certification Roadmap';
      case 'qco-regulations':
        return 'QCO & Regulations';
      case 'testing-laboratories':
        return 'Testing Laboratories';
      case 'hallmarking-jewellery':
        return 'Hallmarking & Jewellery';
      case 'licensed-jewellers':
        return 'Licensed Jewellers';
      case 'verification-suite':
        return 'Verification Suite';
      case 'consumer-services':
        return 'Consumer Services';
      case 'documents-analysis':
        return 'Document & Image Lab';
      case 'compliance-gap':
        return 'Compliance Gap Analysis';
      case 'admin-dashboard':
        return 'Admin & Telemetry';
      default:
        return 'Dashboard';
    }
  };

  const renderActivePage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'ai-assistant':
        return (
          <AIAssistantPage
            initialPrompt={typeof routePayload === 'string' ? routePayload : undefined}
            onNavigate={handleNavigate}
          />
        );
      case 'standards-explorer':
        return (
          <StandardsExplorerPage
            initialSearch={typeof routePayload === 'string' ? routePayload : ''}
            onNavigate={handleNavigate}
          />
        );
      case 'product-to-standard':
        return <ProductToStandardPage onNavigate={handleNavigate} />;
      case 'certification':
        return (
          <CertificationPage
            initialStandardId={typeof routePayload === 'string' ? routePayload : undefined}
            onNavigate={handleNavigate}
          />
        );
      case 'qco-regulations':
        return <QcoRegulationsPage onNavigate={handleNavigate} />;
      case 'testing-laboratories':
        return (
          <TestingLaboratoriesPage
            initialFilter={typeof routePayload === 'object' ? routePayload : undefined}
            onNavigate={handleNavigate}
          />
        );
      case 'hallmarking-jewellery':
        return <HallmarkingJewelleryPage onNavigate={handleNavigate} />;
      case 'licensed-jewellers':
        return <LicensedJewellerPage onNavigate={handleNavigate} />;
      case 'verification-suite':
        return <VerificationSuitePage onNavigate={handleNavigate} />;
      case 'consumer-services':
        return <ConsumerServicesPage onNavigate={handleNavigate} />;
      case 'documents-analysis':
        return <DocumentImageAnalysisPage onNavigate={handleNavigate} />;
      case 'compliance-gap':
        return <ComplianceGapAnalysisPage onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        <Header
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          language={language}
          onLanguageChange={setLanguage}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Breadcrumb Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2EAF5',
            padding: '10px 32px',
            fontSize: '12.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              onClick={() => handleNavigate('dashboard')}
              style={{ color: '#3A74C2', cursor: 'pointer', fontWeight: 600 }}
            >
              🏛️ Home
            </span>
            <span style={{ color: '#94A3B8' }}>/</span>
            <span style={{ color: '#2A3C5B', fontWeight: 700 }}>
              {getRouteTitle(currentRoute)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#64748B' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#166534' }} />
            <span>BIS National Service Online</span>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <main className="page-container">{renderActivePage()}</main>

        {/* Global Institutional Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
