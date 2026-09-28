import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Paperclip,
  Plus,
  Trash2,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  Info,
  Clock,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { ChatMessage, ConversationHistoryItem, NavRoute, SourceCitation } from '../types';
import { chatService } from '../services/chatService';
import { SourceEvidenceCard } from '../components/common/SourceEvidenceCard';
import { MarkdownView } from '../components/common/MarkdownView';
import { BisLogo } from '../components/common/BisLogo';

interface AIAssistantPageProps {
  initialPrompt?: string;
  onNavigate: (route: NavRoute, payload?: any) => void;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  initialPrompt,
  onNavigate,
}) => {
  const [conversations, setConversations] = useState<ConversationHistoryItem[]>([
    {
      id: 'conv-01',
      title: 'Active Standards Inquiry',
      preview: 'BIS Knowledge Engine...',
      timestamp: 'Today',
      messageCount: 1,
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv-01');
  const [showHistorySidebar, setShowHistorySidebar] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-initial',
      sender: 'assistant',
      text: `Namaste! I am the **BIS Intelligent Assistant**.

Ask any question regarding **Indian Standards (IS)**, mandatory **Quality Control Orders (QCOs)**, testing laboratories, conformity assessment procedures, or gold hallmarking. Responses are synthesized directly from authoritative Bureau of Indian Standards repositories.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedCitation, setSelectedCitation] = useState<SourceCitation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedPromptRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle incoming initial prompt from Homepage Hero chat (Requirement 4)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() && processedPromptRef.current !== initialPrompt) {
      processedPromptRef.current = initialPrompt;
      handleSendMessage(initialPrompt.trim());
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    setErrorMessage(null);

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
    } catch (err: any) {
      const fallbackErr = err.message || 'Unable to connect to BIS RAG Backend at POST /api/chat.';
      setErrorMessage(fallbackErr);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `⚠️ **Service Notice:**\n\nCould not reach the live BIS Assistant knowledge endpoint. Please verify server status for \`POST /api/chat\`.\n\n*Error details:* \`${fallbackErr}\``,
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
        title: 'New Inquiry Session',
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
        text: 'Session reset. What product, standard, or regulatory query can I help you explore?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setSelectedCitation(null);
    setErrorMessage(null);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Conversation history cleared. Type your question below to consult the BIS knowledge base.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setSelectedCitation(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSendMessage(`[Uploaded Document: ${file.name}] Please examine this file against relevant BIS standards.`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 110px)',
        minHeight: '640px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #D6E4F8',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(30, 41, 59, 0.05)',
      }}
    >
      {/* Top Chat Sub-Header */}
      <div
        style={{
          padding: '12px 24px',
          backgroundColor: '#F8FAFD',
          borderBottom: '1px solid #D6E4F8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => onNavigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#3A74C2',
              fontWeight: 600,
              fontSize: '13px',
              padding: '4px 8px',
              borderRadius: '6px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D6E4F8',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={16} /> Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BisLogo size={32} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '15px', fontWeight: 800, color: '#1D2B42' }}>
                  BIS Intelligent Assistant — Full-Screen Chat
                </h1>
                <span
                  style={{
                    backgroundColor: '#EAF7EE',
                    color: '#166534',
                    border: '1px solid #A7F3D0',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '1px 7px',
                    borderRadius: '4px',
                  }}
                >
                  RAG Live
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                Converse with authoritative Indian Standards, QCOs, testing scopes & hallmarking rules
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowHistorySidebar(!showHistorySidebar)}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#39527B',
              backgroundColor: showHistorySidebar ? '#EAF2FE' : '#FFFFFF',
              border: '1px solid #D6E4F8',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={14} /> Sessions
          </button>

          <button
            onClick={handleStartNewChat}
            className="btn btn-primary btn-sm"
            style={{ borderRadius: '8px', fontSize: '12px', padding: '6px 12px' }}
          >
            <Plus size={14} /> New Chat
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, position: 'relative' }}>
        {/* Optional Collapsible History Sidebar */}
        {showHistorySidebar && (
          <aside
            style={{
              width: '260px',
              borderRight: '1px solid #D6E4F8',
              backgroundColor: '#F8FAFD',
              display: 'flex',
              flexDirection: 'column',
              padding: '14px',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#1D2B42' }}>
                Inquiry Sessions
              </span>
              <button
                onClick={handleClearChat}
                title="Clear current chat"
                style={{ color: '#991B1B', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}
              >
                <Trash2 size={12} /> Clear
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {conversations.map((c) => {
                const isActive = activeConvId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveConvId(c.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? '#EAF2FE' : '#FFFFFF',
                      border: isActive ? '1px solid #3A74C2' : '1px solid #E2EAF5',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1D2B42' }}>{c.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{c.timestamp}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid #E2EAF5', paddingTop: '10px', fontSize: '11px', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={13} color="#166534" />
                <span>Hallucination Guard active</span>
              </div>
            </div>
          </aside>
        )}

        {/* Center Conversation Stream */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: '#FAFCFE',
          }}
        >
          {/* Scrollable Message List */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ maxWidth: '860px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isUser ? 'flex-end' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: isUser ? '78%' : '88%',
                        backgroundColor: isUser ? '#3A74C2' : '#FFFFFF',
                        color: isUser ? '#FFFFFF' : '#1E293B',
                        padding: '16px 20px',
                        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        boxShadow: '0 2px 8px rgba(30, 41, 59, 0.05)',
                        border: isUser ? 'none' : '1px solid #D6E4F8',
                        fontSize: '14px',
                        lineHeight: 1.6,
                      }}
                    >
                      {/* Hallucination guard pill for assistant */}
                      {!isUser && msg.isHallucinationGuard && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: '#FEF2F2',
                            color: '#991B1B',
                            border: '1px solid #FECACA',
                            borderRadius: '6px',
                            padding: '3px 8px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            marginBottom: '10px',
                          }}
                        >
                          <AlertTriangle size={13} />
                          <span>Hallucination Guard: Verified Sources Required</span>
                        </div>
                      )}

                      {/* Message Content: Rich Markdown for Assistant, text for User */}
                      {isUser ? (
                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                      ) : (
                        <MarkdownView content={msg.text} />
                      )}

                      {/* Identified Standard pill */}
                      {msg.standard && (
                        <div
                          style={{
                            marginTop: '12px',
                            padding: '10px 14px',
                            backgroundColor: '#F1F6FD',
                            borderRadius: '8px',
                            borderLeft: '4px solid #3A74C2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                              Identified Standard
                            </div>
                            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1D2B42' }}>
                              {msg.standard.isNumber} — {msg.standard.title}
                            </div>
                          </div>
                          <button
                            onClick={() => onNavigate('/standards', msg.standard?.isNumber)}
                            className="btn btn-sm btn-secondary"
                            style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px' }}
                          >
                            Inspect Standard &rarr;
                          </button>
                        </div>
                      )}

                      {/* Source Citations */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div
                          style={{
                            marginTop: '14px',
                            paddingTop: '10px',
                            borderTop: '1px solid #E2EAF5',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#1D2B42' }}>
                            Authoritative Sources:
                          </span>
                          {msg.citations.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedCitation(c)}
                              style={{
                                fontSize: '11.5px',
                                backgroundColor: selectedCitation?.id === c.id ? '#3A74C2' : '#EFF6FF',
                                color: selectedCitation?.id === c.id ? '#FFFFFF' : '#1E40AF',
                                border: '1px solid #BFDBFE',
                                padding: '3px 9px',
                                borderRadius: '6px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              <BookOpen size={12} />
                              {c.isNumber} {c.clause ? `(${c.clause})` : ''}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Action buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {msg.actions.map((act, idx) => (
                            <button
                              key={idx}
                              onClick={() => onNavigate(act.route, act.payload)}
                              style={{
                                fontSize: '12px',
                                padding: '5px 12px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #C4DCFA',
                                borderRadius: '6px',
                                color: '#1D2B42',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {act.label} &rarr;
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', padding: '0 6px' }}>
                      {isUser ? 'You' : 'BIS Assistant'} • {msg.timestamp}
                    </div>
                  </div>
                );
              })}

              {/* Typing / Loading indicator */}
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
                    gap: '10px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
                  <span>Retrieving verified answer from BIS RAG Knowledge Base...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Question Suggestion Pills */}
          <div
            style={{
              padding: '8px 20px',
              backgroundColor: '#F8FAFD',
              borderTop: '1px solid #EDF3FB',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              justifyContent: 'center',
            }}
          >
            {[
              'What BIS standard applies to stainless steel water bottles?',
              'How to verify 6-digit HUID code?',
              'What are mandatory QCOs for toys?',
              'Explain Scheme I ISI certification process',
              'Find recognized mechanical testing labs',
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                style={{
                  fontSize: '11.5px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D6E4F8',
                  borderRadius: '14px',
                  padding: '4px 12px',
                  color: '#39527B',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#EAF2FE';
                  e.currentTarget.style.borderColor = '#3A74C2';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#D6E4F8';
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* FIXED BOTTOM CHAT COMPOSER (Requirement 5) */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #D6E4F8',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#F8FAFD',
                  border: '1.5px solid #C4DCFA',
                  borderRadius: '9999px',
                  padding: '6px 8px 6px 14px',
                  boxShadow: '0 2px 8px rgba(58, 116, 194, 0.08)',
                }}
              >
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />

                {/* "+" Attachment Button on Left */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach Document or Image"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D6E4F8',
                    color: '#3A74C2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Plus size={18} />
                </button>

                {/* Text input in center */}
                <input
                  type="text"
                  placeholder="Ask any question about Indian Standards, QCOs, testing, or certification..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isTyping}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '14.5px',
                    color: '#1E293B',
                    padding: '0 10px',
                  }}
                />

                {/* Send Button on Right */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  title="Send Question"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: inputText.trim() && !isTyping ? '#3A74C2' : '#CBD5E1',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputText.trim() && !isTyping ? 'pointer' : 'default',
                    border: 'none',
                    flexShrink: 0,
                    boxShadow: inputText.trim() ? '0 2px 6px rgba(58, 116, 194, 0.3)' : 'none',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <Send size={16} />
                </button>
              </form>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                  fontSize: '11px',
                  color: '#94A3B8',
                  padding: '0 10px',
                }}
              >
                <span>
                  Official Bureau of Indian Standards Assistant • Source citations linked per response
                </span>
                <span style={{ color: '#166534', fontWeight: 600 }}>
                  Endpoint: POST /api/chat
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Citation Details Drawer (if citation is clicked) */}
        {selectedCitation && (
          <aside
            style={{
              width: '340px',
              borderLeft: '1px solid #D6E4F8',
              backgroundColor: '#FFFFFF',
              padding: '16px',
              overflowY: 'auto',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={16} color="#3A74C2" />
                <strong style={{ fontSize: '13.5px', color: '#1D2B42' }}>Source Evidence</strong>
              </div>
              <button
                onClick={() => setSelectedCitation(null)}
                style={{ fontSize: '12px', color: '#64748B', cursor: 'pointer' }}
              >
                Close ✕
              </button>
            </div>

            <SourceEvidenceCard citation={selectedCitation} />
          </aside>
        )}
      </div>
    </div>
  );
};

export const ChatPage = AIAssistantPage;
