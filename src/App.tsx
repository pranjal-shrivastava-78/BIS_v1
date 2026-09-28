import React, { useState, useEffect } from 'react';
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
import { CategoryPage } from './pages/CategoryPage';

export const App: React.FC = () => {
  // Map current path from browser URL to NavRoute
  const getRouteFromPath = (path: string): NavRoute => {
    const clean = path.replace(/\/$/, '') || '/';
    if (clean === '/' || clean === '/dashboard') return '/';
    if (clean === '/chat' || clean === '/ai-assistant') return '/chat';
    if (clean.startsWith('/standards')) return clean as NavRoute;
    if (clean === '/product-to-standard') return '/product-to-standard';
    if (clean.startsWith('/certification')) return clean as NavRoute;
    if (clean === '/qco-regulations') return '/qco-regulations';
    if (clean === '/laboratories' || clean === '/testing-laboratories') return '/laboratories';
    if (clean.startsWith('/hallmarking')) return clean as NavRoute;
    if (clean === '/licensed-jewellers') return 'licensed-jewellers';
    if (clean === '/verification-suite') return 'verification-suite';
    if (clean === '/consumer-services') return '/consumer-services';
    if (clean === '/document-image-lab' || clean === '/documents-analysis' || clean === '/document-analysis' || clean === '/image-analysis') {
      return clean as NavRoute;
    }
    if (clean === '/compliance-gap') return '/compliance-gap';
    if (clean === '/admin' || clean === '/admin-dashboard') return '/admin';
    if (clean === '/government-services') return '/government-services';
    if (clean === '/analysis-tools') return '/analysis-tools';
    if (clean === '/administration') return '/administration';
    return '/';
  };

  const getPathFromRoute = (route: NavRoute): string => {
    switch (route) {
      case 'dashboard':
      case '/':
        return '/';
      case 'ai-assistant':
      case 'chat':
      case '/chat':
        return '/chat';
      case 'standards-explorer':
      case 'standards':
      case '/standards':
        return '/standards';
      case '/standards/search':
        return '/standards/search';
      case '/standards/:id':
        return '/standards';
      case '/standards/:id/clauses':
        return '/standards';
      case 'product-to-standard':
      case '/product-to-standard':
        return '/product-to-standard';
      case 'certification':
      case '/certification':
        return '/certification';
      case '/certification/roadmap':
        return '/certification/roadmap';
      case '/certification/checklist':
        return '/certification/checklist';
      case 'qco-regulations':
      case '/qco-regulations':
        return '/qco-regulations';
      case 'testing-laboratories':
      case 'laboratories':
      case '/laboratories':
        return '/laboratories';
      case 'hallmarking-jewellery':
      case 'hallmarking':
      case '/hallmarking':
        return '/hallmarking';
      case '/hallmarking/huid':
        return '/hallmarking/huid';
      case '/hallmarking/scanner':
        return '/hallmarking/scanner';
      case '/hallmarking/purity':
        return '/hallmarking/purity';
      case '/hallmarking/assay':
        return '/hallmarking/assay';
      case '/hallmarking/jewellers':
        return '/hallmarking/jewellers';
      case 'licensed-jewellers':
        return '/licensed-jewellers';
      case 'verification-suite':
        return '/verification-suite';
      case 'consumer-services':
      case '/consumer-services':
        return '/consumer-services';
      case 'documents-analysis':
      case 'document-image-lab':
      case '/document-image-lab':
        return '/document-image-lab';
      case '/document-analysis':
        return '/document-analysis';
      case '/image-analysis':
        return '/image-analysis';
      case 'compliance-gap':
      case '/compliance-gap':
        return '/compliance-gap';
      case 'admin-dashboard':
      case 'admin':
      case '/admin':
        return '/admin';
      case 'government-services':
      case '/government-services':
        return '/government-services';
      case 'analysis-tools':
      case '/analysis-tools':
        return '/analysis-tools';
      case 'administration':
      case '/administration':
        return '/administration';
      default: {
        const str = String(route);
        return str.startsWith('/') ? str : '/';
      }
    }
  };

  const [currentRoute, setCurrentRoute] = useState<NavRoute>(() => {
    return getRouteFromPath(window.location.pathname);
  });
  const [routePayload, setRoutePayload] = useState<any>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync with browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteFromPath(window.location.pathname);
      setCurrentRoute(route);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: NavRoute, payload?: any) => {
    const targetPath = getPathFromRoute(route);
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setCurrentRoute(route);
    setRoutePayload(payload || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentRoute === '/' || currentRoute === 'dashboard';

  const renderActivePage = () => {
    switch (currentRoute) {
      case 'dashboard':
      case '/':
        return <DashboardPage onNavigate={handleNavigate} />;

      case 'ai-assistant':
      case 'chat':
      case '/chat':
        return (
          <AIAssistantPage
            initialPrompt={typeof routePayload === 'string' ? routePayload : undefined}
            onNavigate={handleNavigate}
          />
        );

      case 'standards-explorer':
      case 'standards':
      case '/standards':
      case '/standards/search':
      case '/standards/:id':
      case '/standards/:id/clauses':
        return (
          <StandardsExplorerPage
            initialSearch={typeof routePayload === 'string' ? routePayload : ''}
            subRoute={
              currentRoute === '/standards/:id/clauses'
                ? 'clauses'
                : currentRoute === '/standards/:id'
                ? 'detail'
                : 'search'
            }
            onNavigate={handleNavigate}
          />
        );

      case 'product-to-standard':
      case '/product-to-standard':
        return <ProductToStandardPage onNavigate={handleNavigate} />;

      case 'certification':
      case '/certification':
        return (
          <CertificationPage
            initialStandardId={typeof routePayload === 'string' ? routePayload : undefined}
            initialTab="guidance"
            onNavigate={handleNavigate}
          />
        );
      case '/certification/roadmap':
        return <CertificationPage initialTab="roadmap" onNavigate={handleNavigate} />;
      case '/certification/checklist':
        return <CertificationPage initialTab="checklist" onNavigate={handleNavigate} />;

      case 'qco-regulations':
      case '/qco-regulations':
        return <QcoRegulationsPage onNavigate={handleNavigate} />;

      case 'testing-laboratories':
      case 'laboratories':
      case '/laboratories':
        return (
          <TestingLaboratoriesPage
            initialFilter={typeof routePayload === 'object' ? routePayload : undefined}
            onNavigate={handleNavigate}
          />
        );

      case 'hallmarking-jewellery':
      case 'hallmarking':
      case '/hallmarking':
        return <HallmarkingJewelleryPage initialSubFeature="huid" onNavigate={handleNavigate} />;
      case '/hallmarking/huid':
        return <HallmarkingJewelleryPage initialSubFeature="huid" onNavigate={handleNavigate} />;
      case '/hallmarking/scanner':
        return <HallmarkingJewelleryPage initialSubFeature="scanner" onNavigate={handleNavigate} />;
      case '/hallmarking/purity':
        return <HallmarkingJewelleryPage initialSubFeature="purity" onNavigate={handleNavigate} />;
      case '/hallmarking/assay':
        return <HallmarkingJewelleryPage initialSubFeature="assay" onNavigate={handleNavigate} />;
      case '/hallmarking/jewellers':
      case 'licensed-jewellers':
        return <HallmarkingJewelleryPage initialSubFeature="jewellers" onNavigate={handleNavigate} />;

      case 'verification-suite':
        return <VerificationSuitePage onNavigate={handleNavigate} />;

      case 'consumer-services':
      case '/consumer-services':
        return <ConsumerServicesPage onNavigate={handleNavigate} />;

      case 'documents-analysis':
      case 'document-image-lab':
      case '/document-image-lab':
        return <DocumentImageAnalysisPage initialTab="document" onNavigate={handleNavigate} />;
      case '/document-analysis':
        return <DocumentImageAnalysisPage initialTab="document" onNavigate={handleNavigate} />;
      case '/image-analysis':
        return <DocumentImageAnalysisPage initialTab="image" onNavigate={handleNavigate} />;

      case 'compliance-gap':
      case '/compliance-gap':
        return <ComplianceGapAnalysisPage onNavigate={handleNavigate} />;

      case 'admin-dashboard':
      case 'admin':
      case '/admin':
        return <AdminDashboardPage onNavigate={handleNavigate} />;

      case 'government-services':
      case '/government-services':
        return <CategoryPage category="government-services" onNavigate={handleNavigate} />;

      case 'analysis-tools':
      case '/analysis-tools':
        return <CategoryPage category="analysis-tools" onNavigate={handleNavigate} />;

      case 'administration':
      case '/administration':
        return <CategoryPage category="administration" onNavigate={handleNavigate} />;

      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Slide-out Navigation Drawer for Quick Section Jump */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Full-Width Portal Wrapper */}
      <div className="main-wrapper">
        <Header
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          language={language}
          onLanguageChange={setLanguage}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Dynamic Page Container */}
        <main
          className="page-container"
          style={{
            padding: isHome ? '16px 28px 40px' : '20px 28px 40px',
          }}
        >
          {renderActivePage()}
        </main>

        {/* Official Institutional Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
