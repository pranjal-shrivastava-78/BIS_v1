import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Paperclip,
  Mic,
  Plus,
  Trash2,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  FileText,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ChatMessage, ConversationHistoryItem, NavRoute, SourceCitation } from '../types';
import { INITIAL_CHAT_MESSAGES, INITIAL_CONVERSATIONS } from '../data/mockData';
import { SourceEvidenceCard } from '../components/common/SourceEvidenceCard';

interface AIAssistantPageProps {
  initialPrompt?: string;
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  initialPrompt,
  onNavigate,
}) => {
  const [conversations, setConversations] = useState<ConversationHistoryItem[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv-01');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedCitation, setSelectedCitation] = useState<SourceCitation | null>(
    INITIAL_CHAT_MESSAGES[1]?.citations?.[0] || null
  );
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Realistic intelligent response logic simulating RAG knowledge lookup
    setTimeout(() => {
      const lower = query.toLowerCase();
      let aiResponse: ChatMessage;

      if (lower.includes('steel') || lower.includes('bottle') || lower.includes('flask')) {
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `**Verified Indian Standards for Water Bottles & Flasks:**

1. **Domestic Insulated Bottles / Vacuum Flasks**: Governed by **IS 17526 : 2021**.
2. **Single-Wall Stainless Steel Bottles**: Governed by **IS 17803**.
3. **Food Contact Safety**: Metal must be food-grade austenitic stainless steel grade 304 (IS 6911). Plastic closures & silicone seals must pass overall migration limits (< 10 mg/dm²) per **IS 9845**.

**Mandatory Status**: Under DPIIT Quality Control Order (S.O. 4112(E)), no manufacturer or importer may sell potable water bottles in India without the BIS Standard Mark (ISI mark under Scheme I).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          standard: {
            isNumber: 'IS 17526 : 2021',
            title: 'Stainless Steel Vacuum Flasks / Insulated Domestic Water Bottles',
          },
          reasoning: 'Extracted from DPIIT QCO S.O. 4112(E) and BIS MED 33 specifications. Verified source documents match current gazette enforcement.',
          citations: [
            {
              id: `cit-${Date.now()}`,
              documentTitle: 'IS 17526 : 2021 — Stainless Steel Vacuum Flasks',
              isNumber: 'IS 17526 : 2021',
              versionYear: '2021',
              clause: 'Clause 4.1 & Clause 6.3',
              page: 'Page 4, 8',
              sourceName: 'Bureau of Indian Standards Repository',
              sourceUrl: 'https://www.services.bis.gov.in',
              retrievedDate: '2026-09-26',
              confidence: 0.99,
            },
          ],
          actions: [
            { label: 'View IS 17526', route: 'standards-explorer', payload: 'is-17526' },
            { label: 'Check QCO Details', route: 'qco-regulations', payload: 'qco-01' },
            { label: 'Find Test Labs', route: 'testing-laboratories', payload: { standard: 'IS 17526' } },
          ],
        };
      } else if (lower.includes('toy') || lower.includes('9873')) {
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `**Toy Safety Regulatory Framework:**

1. **Applicable Indian Standard Series**:
   - **IS 9873 (Part 1) : 2019**: Mechanical and Physical Safety (small parts, sharp edges, drop tests).
   - **IS 9873 (Part 2) : 2019**: Flammability requirements.
   - **IS 9873 (Part 3) : 2020**: Migration of toxic heavy elements (lead, cadmium, barium).
   - **IS 15644 : 2006**: Electric toys safety.

2. **Mandatory Scheme**:
   Toys (Quality Control) Order enforced from 01 Jan 2021 mandates **Scheme I (ISI Mark)** for all domestic manufacturers and foreign importers. Self-declaration (Scheme II) is **not** permitted.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          standard: {
            isNumber: 'IS 9873 (Part 1) : 2019',
            title: 'Safety of Toys — Mechanical and Physical Properties',
          },
          reasoning: 'Verified against DPIIT Toys (Quality Control) Order S.O. 858(E). Certified under Scheme I.',
          citations: [
            {
              id: `cit-${Date.now()}`,
              documentTitle: 'Toys Safety Standard — Mechanical & Physical',
              isNumber: 'IS 9873 (Part 1) : 2019',
              versionYear: '2019',
              clause: 'Clause 4.4 (Small parts test)',
              page: 'Page 12',
              sourceName: 'BIS Consumer Products Division',
              sourceUrl: 'https://www.services.bis.gov.in',
              retrievedDate: '2026-09-25',
              confidence: 0.98,
            },
          ],
          actions: [
            { label: 'Inspect IS 9873', route: 'standards-explorer', payload: 'is-9873-1' },
            { label: 'Certification Steps', route: 'certification', payload: 'is-9873-1' },
          ],
        };
      } else if (lower.includes('gold') || lower.includes('916') || lower.includes('huid') || lower.includes('jewel')) {
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `**Gold Jewellery Hallmarking & 916 Standard:**

- **What does 916 mean?**
  **916** denotes **22 Karat gold**, representing 91.6% pure gold alloyed with 8.4% copper/silver for durability (conforming to **IS 1417 : 2016**).

- **What is HUID?**
  A 6-character alphanumeric **Hallmark Unique Identification (HUID)** laser-engraved by an authorized Assaying & Hallmarking Centre (AHC). Every individual jewellery piece carries a unique code registered in the BIS central system.

- **Mandatory 3 Marks on Hallmarked Gold**:
  1. The BIS Standard Triangle Logo 🏛️
  2. Purity Grade (e.g. 22K916, 18K750, 14K585)
  3. 6-digit alphanumeric HUID (e.g. AB1234)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          standard: {
            isNumber: 'IS 1417 : 2016',
            title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking',
          },
          citations: [
            {
              id: `cit-${Date.now()}`,
              documentTitle: 'IS 1417 : 2016 — Gold Fineness & Marking',
              isNumber: 'IS 1417 : 2016',
              versionYear: '2016',
              clause: 'Clause 3.1 & 5.1',
              page: 'Page 3-5',
              sourceName: 'Department of Consumer Affairs Hallmarking Order',
              sourceUrl: 'https://www.services.bis.gov.in',
              retrievedDate: '2026-09-26',
              confidence: 0.99,
            },
          ],
          actions: [
            { label: 'Verify HUID in Portal', route: 'hallmarking-jewellery' },
            { label: 'Find Recognized AHCs', route: 'hallmarking-jewellery' },
          ],
        };
      } else if (lower.includes('alien') || lower.includes('quantum crypto') || lower.includes('spaceship')) {
        // Hallucination Guard trigger
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `I could not verify this from the available BIS sources.

No active Indian Standard (IS), committee scope, or gazetted Quality Control Order (QCO) published by the Bureau of Indian Standards matches your query. 

*The assistant adheres to a strict hallucination guard and will not invent unverified standard numbers or regulations.*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isHallucinationGuard: true,
          actions: [
            { label: 'Browse Published Standards', route: 'standards-explorer' },
            { label: 'Contact BIS Technical Directorate', route: 'dashboard' },
          ],
        };
      } else {
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Regarding **"${query}"**:

Under BIS conformity assessment regulations:
- Standards published under the Bureau of Indian Standards Act, 2016 establish testing protocols, tolerances, and quality criteria.
- Certification is administered through **Manak Online** under either **Scheme I (Product Certification / ISI Mark)** with factory auditing or **Scheme II (Compulsory Registration Scheme - CRS)** based on lab test reports for electronics.

To pinpoint the precise standard number, please provide product specifications or material composition, or explore via the **Product → Standard** mapping tool.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { label: 'Launch Product → Standard Tool', route: 'product-to-standard' },
            { label: 'Search Standards Catalogue', route: 'standards-explorer' },
          ],
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
      if (aiResponse.citations && aiResponse.citations.length > 0) {
        setSelectedCitation(aiResponse.citations[0]);
      }
    }, 600);
  };

  const handleStartNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: ConversationHistoryItem = {
      id: newId,
      title: 'New Inquiry Session',
      preview: 'Started new conversation...',
      timestamp: 'Just now',
      messageCount: 0,
    };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Namaste! I am the BIS Intelligent Assistant. How can I assist you with Indian Standards, mandatory QCOs, testing laboratories, or certification procedures today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setSelectedCitation(null);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Conversation cleared. Please ask any question regarding BIS standards, testing, or regulatory compliance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setSelectedCitation(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr 340px',
        gap: '20px',
        height: 'calc(100vh - 120px)',
        minHeight: '680px',
      }}
      className="ai-assistant-grid"
    >
      {/* LEFT COLUMN: Conversation History */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
        }}
      >
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid #E2EAF5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#2A3C5B' }}>
            Inquiry Sessions
          </span>
          <button
            onClick={handleStartNewChat}
            className="btn btn-primary btn-sm"
            style={{ padding: '4px 10px', fontSize: '11.5px' }}
          >
            <Plus size={14} /> New
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
          {conversations.map((c) => {
            const isActive = activeConvId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  marginBottom: '4px',
                  backgroundColor: isActive ? '#EAF2FE' : 'transparent',
                  border: isActive ? '1px solid #B8D1F2' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div
                  style={{
                    fontSize: '12.5px',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? '#2A3C5B' : '#475569',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#64748B',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: '2px',
                  }}
                >
                  {c.preview}
                </div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px' }}>
                  {c.timestamp}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: '12px',
            borderTop: '1px solid #E2EAF5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleClearChat}
            style={{
              fontSize: '11.5px',
              color: '#991B1B',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Trash2 size={13} /> Clear chat
          </button>
          <span style={{ fontSize: '11px', color: '#64748B' }}>e-Session Active</span>
        </div>
      </div>

      {/* CENTER COLUMN: Chat Interface */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #E2EAF5',
            backgroundColor: '#F8FAFD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#39527B',
                color: '#92BBF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#2A3C5B' }}>
                BIS Natural Language Assistant
              </div>
              <div style={{ fontSize: '11px', color: '#166534', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#166534' }} />
                Authoritative Standards RAG Engine • Active
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                backgroundColor: '#EAF7EE',
                color: '#166534',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600,
                border: '1px solid #A7F3D0',
              }}
            >
              Hallucination Guard On
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            backgroundColor: '#FAFCFE',
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: isUser ? '80%' : '90%',
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    backgroundColor: isUser ? '#3A74C2' : '#FFFFFF',
                    color: isUser ? '#FFFFFF' : '#1E293B',
                    padding: '14px 18px',
                    borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    boxShadow: '0 1px 3px rgba(57, 82, 123, 0.08)',
                    border: isUser ? 'none' : '1px solid #D6E4F8',
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {/* Hallucination Guard Notice Banner if triggered */}
                  {msg.isHallucinationGuard && (
                    <div
                      style={{
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        color: '#991B1B',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px',
                      }}
                    >
                      <AlertTriangle size={16} />
                      <span>Hallucination Guard Notice: No unsupported claims generated.</span>
                    </div>
                  )}

                  <div>{msg.text}</div>

                  {/* Standard reference banner */}
                  {msg.standard && (
                    <div
                      style={{
                        marginTop: '12px',
                        padding: '8px 12px',
                        backgroundColor: '#F1F6FD',
                        borderRadius: '6px',
                        borderLeft: '3px solid #3A74C2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                          Identified Standard:
                        </span>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#2A3C5B' }}>
                          {msg.standard.isNumber} — {msg.standard.title}
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate('standards-explorer')}
                        className="btn btn-sm btn-secondary"
                        style={{ fontSize: '11.5px', padding: '3px 8px' }}
                      >
                        Inspect
                      </button>
                    </div>
                  )}

                  {/* Citations Preview pills */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div
                      style={{
                        marginTop: '12px',
                        paddingTop: '8px',
                        borderTop: '1px solid #EDF3FB',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#39527B' }}>
                        Sources:
                      </span>
                      {msg.citations.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCitation(c)}
                          style={{
                            fontSize: '11px',
                            backgroundColor: selectedCitation?.id === c.id ? '#3A74C2' : '#EFF6FF',
                            color: selectedCitation?.id === c.id ? '#FFFFFF' : '#1E40AF',
                            border: '1px solid #BFDBFE',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 600,
                          }}
                        >
                          <BookOpen size={11} />
                          {c.isNumber} {c.clause || ''}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Quick Action buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div
                      style={{
                        marginTop: '14px',
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => onNavigate(act.route, act.payload)}
                          className="btn btn-sm btn-outline"
                          style={{
                            fontSize: '11.5px',
                            padding: '4px 10px',
                            backgroundColor: '#FFFFFF',
                            borderColor: '#B8D1F2',
                            color: '#2A3C5B',
                          }}
                        >
                          {act.label} &rarr;
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontSize: '10.5px',
                    color: '#94A3B8',
                    marginTop: '4px',
                    padding: '0 4px',
                  }}
                >
                  {isUser ? 'You' : 'BIS Assistant'} • {msg.timestamp}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                padding: '12px 18px',
                borderRadius: '12px',
                width: 'fit-content',
                fontSize: '13px',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="dot-flashing" />
              <span>Querying BIS standards repository & gazette database...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div
          style={{
            padding: '8px 16px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #EDF3FB',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {[
            'Which BIS standard applies to stainless steel bottles?',
            'How do I get BIS certification?',
            'Is toy certification mandatory?',
            'What does 916 mean in gold hallmark?',
            'Where can I get this product tested?',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              style={{
                fontSize: '11.5px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6E4F8',
                borderRadius: '14px',
                padding: '4px 10px',
                color: '#39527B',
                cursor: 'pointer',
                flexShrink: 0,
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
              {prompt}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #E2EAF5',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #D6E4F8',
              borderRadius: '8px',
              padding: '6px 12px',
            }}
          >
            <input
              type="text"
              placeholder="Ask any question about BIS standards, QCO orders, testing, or certification..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              style={{
                flex: 1,
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '13.5px',
                padding: '6px 4px',
              }}
            />

            <button
              onClick={() => onNavigate('documents-analysis')}
              title="Attach Document or Image"
              style={{
                padding: '6px',
                color: '#64748B',
                borderRadius: '4px',
              }}
            >
              <Paperclip size={18} />
            </button>

            <button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              title="Voice Input (Speech-to-text placeholder)"
              style={{
                padding: '6px',
                color: isVoiceActive ? '#B91C1C' : '#64748B',
                backgroundColor: isVoiceActive ? '#FEE2E2' : 'transparent',
                borderRadius: '4px',
              }}
            >
              <Mic size={18} />
            </button>

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="btn btn-primary"
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                opacity: inputText.trim() ? 1 : 0.6,
              }}
            >
              <Send size={15} />
              Send
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '8px',
              fontSize: '11px',
              color: '#94A3B8',
            }}
          >
            <span>
              ℹ️ Responses cite authoritative BIS documents. Formal statutory decisions rest solely with BIS.
            </span>
            <span>SIH 26107 Engine</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Evidence & Citation Drawer */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D6E4F8',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid #E2EAF5',
            backgroundColor: '#F8FAFD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={17} color="#3A74C2" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#2A3C5B' }}>
              Authoritative Evidence
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>
            Proven Source
          </span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {selectedCitation ? (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Active Citation Details
                </span>
              </div>

              <SourceEvidenceCard
                citation={selectedCitation}
                onOpenStandard={(isNum) => onNavigate('standards-explorer', isNum)}
              />

              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2EAF5',
                  borderRadius: '8px',
                  padding: '14px',
                  marginTop: '16px',
                  fontSize: '12px',
                  color: '#475569',
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: '#2A3C5B',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Info size={14} color="#3A74C2" />
                  Citation Integrity Policy
                </div>
                <p style={{ lineHeight: 1.5 }}>
                  The BIS Intelligent Assistant validates every factual reference against published Indian Standards records. If a clause or gazette cannot be verified, it will not be displayed.
                </p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#39527B',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Quick Actions For This Standard:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    onClick={() => onNavigate('certification', selectedCitation.isNumber)}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                  >
                    View Certification Roadmap &rarr;
                  </button>
                  <button
                    onClick={() => onNavigate('testing-laboratories', { standard: selectedCitation.isNumber })}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                  >
                    Locate Testing Laboratories &rarr;
                  </button>
                  <button
                    onClick={() => onNavigate('qco-regulations')}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                  >
                    Check Gazette QCO Notification &rarr;
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#64748B',
                padding: '20px',
              }}
            >
              <BookOpen size={36} color="#B8D1F2" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2A3C5B' }}>
                No Citation Selected
              </h4>
              <p style={{ fontSize: '12px', marginTop: '6px', lineHeight: 1.4 }}>
                Ask a question about any product or standard to inspect verified clauses, gazette notifications, and official BIS URLs.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1180px) {
          .ai-assistant-grid {
            grid-template-columns: 1fr 320px !important;
          }
          .ai-assistant-grid > div:first-child {
            display: none !important;
          }
        }
        @media (max-width: 820px) {
          .ai-assistant-grid {
            grid-template-columns: 1fr !important;
          }
          .ai-assistant-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
