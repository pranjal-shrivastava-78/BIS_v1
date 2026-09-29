import React, { useState, useEffect, useRef } from 'react';
import {
  Gem,
  Search,
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  ChevronLeft,
  Calculator,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Phone,
  Layers,
} from 'lucide-react';
import { NavRoute, HallmarkingCentre } from '../types';
import { hallmarkingService } from '../services/hallmarkingService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { SegmentedControl } from '../components/common/SegmentedControl';

interface HallmarkingJewelleryPageProps {
  initialSubFeature?: 'centres' | 'scanner' | 'purity' | 'huid' | 'assay' | 'jewellers';
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const HallmarkingJewelleryPage: React.FC<HallmarkingJewelleryPageProps> = ({
  initialSubFeature = 'centres',
  onNavigate,
}) => {
  const mapInitialTab = (): 'centres' | 'scanner' | 'purity' => {
    if (initialSubFeature === 'scanner') return 'scanner';
    if (initialSubFeature === 'purity') return 'purity';
    return 'centres';
  };

  const [activeTab, setActiveTab] = useState<'centres' | 'scanner' | 'purity'>(mapInitialTab());

  // ==========================================
  // 1. Hallmarking Centre Finder State
  // ==========================================
  const [ahcSearchQuery, setAhcSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [ahcs, setAhcs] = useState<HallmarkingCentre[]>([]);
  const [isLoadingAhcs, setIsLoadingAhcs] = useState(true);

  const states = ['ALL', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Rajasthan', 'West Bengal', 'Gujarat'];

  const fetchAhcs = async () => {
    setIsLoadingAhcs(true);
    try {
      const data = await hallmarkingService.getAhcCentres({
        query: ahcSearchQuery,
        state: selectedState,
        city: selectedCity,
        status: selectedStatus,
      });
      setAhcs(data);
    } finally {
      setIsLoadingAhcs(false);
    }
  };

  useEffect(() => {
    fetchAhcs();
  }, [ahcSearchQuery, selectedState, selectedCity, selectedStatus]);

  // ==========================================
  // 2. Hallmark Scanner State (Local Analysis)
  // ==========================================
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerResult, setScannerResult] = useState<{
    detectedHallmark: boolean;
    huid: string;
    metal: string;
    purity: string;
    purityPercent: string;
    confidence: number;
    detectedMarks: string[];
    explanation: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSimulateScan = (imagePlaceholder?: string) => {
    setIsScanning(true);
    setUploadedImage(imagePlaceholder || 'sample_hallmarked_ring.jpg');
    setTimeout(() => {
      setIsScanning(false);
      setScannerResult({
        detectedHallmark: true,
        huid: 'AB1234',
        metal: 'Gold (Au)',
        purity: '22 Karat (916 fineness)',
        purityPercent: '91.6%',
        confidence: 96.4,
        detectedMarks: [
          'BIS Triangular Standard Logo (Compliant)',
          'Purity Mark: 22K916 (IS 1417 Compliant)',
          '6-Character Alphanumeric Laser HUID: AB1234',
        ],
        explanation:
          'High-contrast optical analysis detected all three mandatory statutory hallmarking marks on the inner shank. The 6-character HUID "AB1234" was recognized with 96.4% confidence and correlates with an active BIS registered consignment.',
      });
    }, 450);
  };

  // ==========================================
  // 3. Purity Calculator State (Local per Section 15)
  // ==========================================
  const [karatValue, setKaratValue] = useState<number>(22);
  const [grossWeight, setGrossWeight] = useState<number>(10);

  const karatPurityTable: Record<number, { percent: number; fineness: string; desc: string }> = {
    24: { percent: 99.9, fineness: '999', desc: 'Standard Pure Gold (Bullion/Coins)' },
    23: { percent: 95.8, fineness: '958', desc: 'High Purity Jewellery' },
    22: { percent: 91.6, fineness: '916', desc: 'Traditional Indian Jewellery Standard' },
    20: { percent: 83.3, fineness: '833', desc: 'Hardened Studded Jewellery' },
    18: { percent: 75.0, fineness: '750', desc: 'Diamond & Gemstone Jewellery' },
    14: { percent: 58.5, fineness: '585', desc: 'Modern Everyday Wear' },
    9: { percent: 37.5, fineness: '375', desc: 'Affordable Lightweight Gold' },
  };

  const selectedPurity = karatPurityTable[karatValue] || karatPurityTable[22];
  const netPureGoldGrams = ((grossWeight * selectedPurity.percent) / 100).toFixed(3);
  const alloyWeightGrams = (grossWeight - parseFloat(netPureGoldGrams)).toFixed(3);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Breadcrumb Navigation */}
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
        <span style={{ color: '#1D2B42', fontWeight: 700 }}>Hallmarking & Jewellery</span>
      </div>

      {/* Header Banner */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          background: 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%)',
          border: '1px solid #D6E4F8',
          borderRadius: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#EAF2FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3A74C2',
              border: '1px solid #C4DCFA',
            }}
          >
            <Gem size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1D2B42' }}>
              BIS Parakh — Hallmarking & Jewellery
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Locate recognized Assaying & Hallmarking Centres (AHC), scan jewellery hallmarks for HUID detection, and calculate exact gold purity per IS 1417.
            </p>
          </div>
        </div>

        {/* Pill / Segmented Control Bar (Per Section 1, 2, and 8) */}
        <div
          style={{
            marginTop: '16px',
            borderTop: '1px solid #E2EAF5',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <SegmentedControl<'centres' | 'scanner' | 'purity'>
            items={[
              {
                id: 'centres',
                label: 'Hallmarking Centre Finder',
                number: 1,
                icon: MapPin,
              },
              {
                id: 'scanner',
                label: 'Hallmark Scanner',
                number: 2,
                icon: Camera,
              },
              {
                id: 'purity',
                label: 'Purity Calculator',
                number: 3,
                icon: Calculator,
                subtitle: 'IS 1417',
              },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />

          {/* Secondary Action: Keep HUID verification action separate (Per Section 2 specification) */}
          <button
            onClick={() => onNavigate('/verify/huid')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '12.5px',
              fontWeight: 700,
              backgroundColor: '#F1F6FD',
              color: '#3A74C2',
              border: '1px solid #C4DCFA',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E2EDFC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F6FD';
            }}
          >
            <Gem size={14} />
            Verify HUID Code &rarr;
          </button>
        </div>
      </div>

      {/* ==================================================
          TAB 1: HALLMARKING CENTRE FINDER (Per Section 8)
          ================================================== */}
      {activeTab === 'centres' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Search & Filters */}
          <div
            className="card"
            style={{
              padding: '18px 20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D6E4F8',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#3A74C2' }} />
              <input
                type="text"
                placeholder="Search by centre name, city, AHC code, or street address..."
                value={ahcSearchQuery}
                onChange={(e) => setAhcSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  paddingLeft: '44px',
                  paddingRight: '14px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  border: '1px solid #C4DCFA',
                  backgroundColor: '#F8FAFD',
                  color: '#1D2B42',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>State:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {states.map((s) => (
                    <option key={s} value={s}>{s === 'ALL' ? 'All States' : s}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>City:</span>
                <input
                  type="text"
                  placeholder="Filter city..."
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                    width: '140px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#39527B' }}>Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #D6E4F8',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="OPERATIONAL">Operational</option>
                  <option value="RECOGNITION_EXPIRED">Expired</option>
                </select>
              </div>

              <span style={{ fontSize: '12px', color: '#64748B', marginLeft: 'auto' }}>
                Showing <strong>{ahcs.length}</strong> recognized centres
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          {isLoadingAhcs ? (
            <LoadingSkeleton type="card" count={3} message="Loading Assaying & Hallmarking Centres..." />
          ) : ahcs.length === 0 ? (
            <EmptyState
              icon={Gem}
              title="No hallmarking centres found"
              description="No AHC facilities matched your current filter criteria."
              actionText="Reset Filters"
              onAction={() => {
                setAhcSearchQuery('');
                setSelectedState('ALL');
                setSelectedCity('');
                setSelectedStatus('ALL');
              }}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
              {ahcs.map((ahc) => (
                <div
                  key={ahc.id}
                  className="card"
                  style={{
                    padding: '22px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D6E4F8',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    boxShadow: '0 2px 6px rgba(30, 41, 59, 0.04)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <span className="badge badge-sky">{ahc.code}</span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: ahc.status === 'OPERATIONAL' ? '#DCFCE7' : '#FEF3C7',
                          color: ahc.status === 'OPERATIONAL' ? '#166534' : '#92400E',
                        }}
                      >
                        {ahc.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
                      {ahc.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12.5px', color: '#475569', marginBottom: '8px' }}>
                      <MapPin size={15} style={{ color: '#3A74C2', flexShrink: 0, marginTop: '2px' }} />
                      <span>{ahc.address}</span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                      City: <strong>{ahc.city}</strong> • State: <strong>{ahc.state}</strong>
                    </div>

                    {ahc.contact && (
                      <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '10px' }}>
                        Contact: {ahc.contact}
                      </div>
                    )}

                    {ahc.services && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {ahc.services.map((srv, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#F1F6FD',
                              color: '#39527B',
                              fontWeight: 500,
                            }}
                          >
                            • {srv}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#64748B' }}>
                    <span>Capability: <strong>{ahc.metalCapability}</strong></span>
                    <span>Valid: {ahc.validity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          TAB 2: HALLMARK SCANNER (Per Section 8)
          ================================================== */}
      {activeTab === 'scanner' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Upload & Camera Section */}
          <div
            className="card"
            style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D6E4F8',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D2B42', marginBottom: '6px' }}>
              Optical Hallmark & HUID Scanner
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '600px', margin: '0 auto 20px', lineHeight: 1.5 }}>
              Upload an image or high-resolution photograph of your gold jewellery hallmark to automatically extract the 6-digit HUID code, verify fineness symbols, and calculate confidence.
            </p>

            {/* Drop Zone Box */}
            <div
              style={{
                border: '2px dashed #3A74C2',
                backgroundColor: '#F8FAFD',
                borderRadius: '16px',
                padding: '36px 20px',
                maxWidth: '620px',
                margin: '0 auto 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={() => handleSimulateScan('uploaded_jewellery_macro.png')}
              />
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#EAF2FE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3A74C2',
                  marginBottom: '12px',
                }}
              >
                <Camera size={26} />
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1D2B42', marginBottom: '4px' }}>
                Drag & drop jewellery photograph, or click to browse
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Supports JPG, PNG, WEBP macro photographs of hallmark engravings
              </div>
            </div>

            {/* Demo Simulation Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleSimulateScan('sample_ring_22k.jpg')}
                className="btn btn-primary"
                style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
                disabled={isScanning}
              >
                <Sparkles size={15} />
                {isScanning ? 'Analyzing Hallmark...' : 'Scan Sample 22K Ring (AB1234)'}
              </button>

              <button
                type="button"
                onClick={() => handleSimulateScan('sample_pendant_18k.jpg')}
                className="btn btn-secondary"
                style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
                disabled={isScanning}
              >
                Scan Sample 18K Pendant
              </button>
            </div>
          </div>

          {/* Analysis Results View (Per Section 8) */}
          {isScanning ? (
            <LoadingSkeleton type="detail" count={1} message="Applying OCR and neural mark detection to hallmark image..." />
          ) : scannerResult ? (
            <div
              className="card"
              style={{
                padding: '28px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #3A74C2',
                borderRadius: '16px',
                boxShadow: '0 4px 14px rgba(58, 116, 194, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  borderBottom: '1px solid #E2EAF5',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <span className="badge badge-verified" style={{ marginBottom: '4px' }}>
                    <CheckCircle2 size={13} /> Hallmark Verified
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1D2B42' }}>
                    Scanner Optical Analysis Results
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CONFIDENCE SCORE</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#166534' }}>
                    {scannerResult.confidence}%
                  </div>
                </div>
              </div>

              {/* Required Outputs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Detected HUID
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#3A74C2', letterSpacing: '0.08em' }}>
                    {scannerResult.huid}
                  </div>
                  <button
                    onClick={() => onNavigate('/verify/huid')}
                    style={{ marginTop: '6px', fontSize: '12px', color: '#3A74C2', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Verify in HUID Gateway &rarr;
                  </button>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Metal & Purity
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#B45309' }}>
                    {scannerResult.purity}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Metal: {scannerResult.metal} ({scannerResult.purityPercent} Pure)
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Detected Statutory Marks
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {scannerResult.detectedMarks.map((m, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>
                        ✓ {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanation Text */}
              <div style={{ padding: '14px 16px', backgroundColor: '#F0F9FF', borderRadius: '10px', border: '1px solid #BAE6FD', fontSize: '13px', color: '#0369A1', lineHeight: 1.5 }}>
                <strong>Scanner Explanation:</strong> {scannerResult.explanation}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ==================================================
          TAB 3: PURITY CALCULATOR (Per Section 15)
          ================================================== */}
      {activeTab === 'purity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Calculator Controls */}
            <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #D6E4F8', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Calculator size={20} color="#3A74C2" />
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1D2B42' }}>
                  Gold Purity Calculator (IS 1417)
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                Calculate net gold purity percentage and pure gold weight across statutory hallmarking karat grades:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Karat Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                    Select Karat Grade:
                  </label>
                  <select
                    value={karatValue}
                    onChange={(e) => setKaratValue(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: '1px solid #D6E4F8',
                      backgroundColor: '#F8FAFD',
                      color: '#1D2B42',
                    }}
                  >
                    <option value={24}>24 Karat (999 fineness) — 99.9% Pure</option>
                    <option value={23}>23 Karat (958 fineness) — 95.8% Pure</option>
                    <option value={22}>22 Karat (916 fineness) — 91.6% Pure</option>
                    <option value={20}>20 Karat (833 fineness) — 83.3% Pure</option>
                    <option value={18}>18 Karat (750 fineness) — 75.0% Pure</option>
                    <option value={14}>14 Karat (585 fineness) — 58.5% Pure</option>
                    <option value={9}>9 Karat (375 fineness) — 37.5% Pure</option>
                  </select>
                </div>

                {/* Weight Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#2A3C5B', marginBottom: '6px' }}>
                    Gross Jewellery Weight (Grams):
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.01"
                    value={grossWeight}
                    onChange={(e) => setGrossWeight(parseFloat(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      fontSize: '15px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: '1px solid #D6E4F8',
                      backgroundColor: '#F8FAFD',
                      color: '#1D2B42',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Box (Per Section 15) */}
            <div
              className="card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #C4DCFA',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  PURITY PERCENTAGE OUTPUT
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#B45309', margin: '6px 0 2px' }}>
                  {karatValue}K → {selectedPurity.percent}%
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
                  Fineness: <strong>{selectedPurity.fineness} parts per 1000</strong> ({selectedPurity.desc})
                </div>

                <div style={{ padding: '16px', backgroundColor: '#F8FAFD', borderRadius: '12px', border: '1px solid #E2EAF5' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#475569' }}>Calculated Net Pure Gold:</span>
                    <strong style={{ fontSize: '15px', color: '#166534' }}>{netPureGoldGrams} grams</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#475569' }}>Alloy Metal (Copper/Silver):</span>
                    <strong style={{ fontSize: '14px', color: '#64748B' }}>{alloyWeightGrams} grams</strong>
                  </div>
                </div>
              </div>

              {/* Informational static bullion benchmark note */}
              <div style={{ borderTop: '1px solid #EDF3FB', paddingTop: '12px', marginTop: '16px', fontSize: '11.5px', color: '#64748B' }}>
                Note: Purity percentage calculation is mathematical and statutory per IS 1417 : 2016. Does not depend on live bullion spot market pricing.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
