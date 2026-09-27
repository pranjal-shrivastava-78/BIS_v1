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
  Info,
} from 'lucide-react';
import { ChatMessage, ConversationHistoryItem, NavRoute, SourceCitation } from '../types';
import { chatService } from '../services/chatService';
import { SourceEvidenceCard } from '../components/common/SourceEvidenceCard';

interface AIAssistantPageProps {
  initialPrompt?: string;
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  initialPrompt,
  onNavigate,
}) => {
  // Minimal seed conversation list to show UI layout
  const [conversations, setConversations] = useState<ConversationHistoryItem[]>([
    {
      id: 'conv-01',
      title: 'Current Session',
      preview: 'Standards inquiry...',
      timestamp: 'Today',
      messageCount: 1,
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv-01');

  // Minimal single greeting message to demonstrate layout without hardcoded fictional chats
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-initial',
      sender: 'assistant',
      text: 'Namaste! I am the BIS Intelligent Assistant.\n\nAsk any question regarding Indian Standards (IS), mandatory Quality Control Orders (QCOs), testing laboratories, or certification procedures. Responses will be retrieved and cited directly from authoritative BIS sources.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedCitation, setSelectedCitation] = useState<SourceCitation | null>(null);
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

  const handleSendMessage = async (textToSend?: string) => {
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

    try {
      const historyContext = messages.map((m) => ({ sender: m.sender, text: m.text }));
      const aiResponse = await chatService.sendMessage(query, historyContext);

      setMessages((prev) => [...prev, aiResponse]);
      if (aiResponse.citations && aiResponse.citations.length > 0) {
        setSelectedCitation(aiResponse.citations[0]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: 'An error occurred while connecting to the BIS AI Assistant API (POST /api/chat). Please verify backend connectivity.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isHallucinationGuard: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStartNewChat = () => {
    const newId = `conv-${Date.now()}`;
    setConversations([
      {
        id: newId,
        title: 'New Session',
        preview: 'New inquiry...',
        timestamp: 'Just now',
        messageCount: 0,
      },
      ...conversations,
    ]);
    setActiveConvId(newId);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Session started. How can I assist you with Indian Standards or BIS certification today?',
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
        text: 'Conversation cleared. Enter your product or standard inquiry below.',
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
          <span style={{ fontSize: '11px', color: '#64748B' }}>POST /api/chat</span>
        </div>
      </div>

      {/* CENTER COLUMN: Chat Stream */}
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
                RAG Knowledge Pipeline • API-Driven
              </div>
            </div>
          </div>

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

                  {msg.actions && msg.actions.length > 0 && (
                    <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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

                <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '4px', padding: '0 4px' }}>
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
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3A74C2',
                  animation: 'pulse 1s infinite',
                }}
              />
              <span>Connecting to RAG service at POST /api/chat...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div
          style={{
            padding: '8px 16px',
            backgroundColor: '#F8FAFD',
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
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid #E2EAF5', backgroundColor: '#FFFFFF' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFD',
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
              style={{ padding: '6px', color: '#64748B' }}
            >
              <Paperclip size={18} />
            </button>

            <button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              title="Voice Input Placeholder"
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
            <span>Responses cite authoritative BIS documents. Formal statutory decisions rest solely with BIS.</span>
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
            Source Drawer
          </span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {selectedCitation ? (
            <div>
              <SourceEvidenceCard
                citation={selectedCitation}
                onOpenStandard={(isNum) => onNavigate('standards-explorer', isNum)}
              />

              <div
                style={{
                  backgroundColor: '#F8FAFD',
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
                  The BIS Intelligent Assistant validates factual references against published Indian Standards records.
                </p>
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
                No Active Citation
              </h4>
              <p style={{ fontSize: '12px', marginTop: '6px', lineHeight: 1.4 }}>
                Ask a question about any product or standard to inspect verified clauses, gazette notifications, and official BIS URLs from the backend RAG pipeline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
