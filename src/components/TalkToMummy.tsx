import { useState, useEffect, useRef, useMemo } from 'react';
import { getMeomData, getTodayEntry, saveTodayEntry, generateMotherReply, ChatMessage } from '@/lib/meomStorage';
import { Send } from 'lucide-react';
import SimpleTextToolbar, { TextStyle } from './SimpleTextToolbar';

// Day-based background classes for emotional variety
const dayBackgrounds = [
  'mummy-bg-sunday',    // 0 - Sunday
  'mummy-bg-monday',    // 1 - Monday
  'mummy-bg-tuesday',   // 2 - Tuesday
  'mummy-bg-wednesday', // 3 - Wednesday
  'mummy-bg-thursday',  // 4 - Thursday
  'mummy-bg-friday',    // 5 - Friday
  'mummy-bg-saturday',  // 6 - Saturday
];

const TalkToMummy = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [name, setName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [textStyle, setTextStyle] = useState<TextStyle>({
    isBold: false,
    isItalic: false,
    fontSize: 'normal',
    textColor: 'inherit',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const data = getMeomData();
    if (data) {
      setName(data.name);
    }

    const todayEntry = getTodayEntry();
    if (todayEntry?.chatMessages) {
      setMessages(todayEntry.chatMessages);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const motherReply = generateMotherReply(message, name);
      const replyMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: motherReply,
        sender: 'mummy',
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...newMessages, replyMessage];
      setMessages(updatedMessages);
      setIsTyping(false);

      saveTodayEntry({
        chatMessages: updatedMessages,
      });
    }, 800 + Math.random() * 700);

    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Get day-based background class
  const dayBgClass = useMemo(() => {
    const dayOfWeek = new Date().getDay();
    return dayBackgrounds[dayOfWeek];
  }, []);

  return (
    <div className={`meom-section ${dayBgClass}`}>
      <h2 className="meom-section-title">Talk to Mummy</h2>
      
      {/* Chat Container */}
      <div className="bg-muted/20 rounded-2xl border border-border/50 overflow-hidden">
        {/* Messages Area */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground/60 text-sm text-center font-heading italic">
                Tell mummy about your day, beta...
              </p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-accent text-accent-foreground rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${
                  msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-accent text-accent-foreground rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 p-4 bg-background/50">
          <div className="space-y-3">
            <SimpleTextToolbar style={textStyle} onStyleChange={setTextStyle} />
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell mummy everything about your day... how are you feeling? What happened? Write as much as you want, beta..."
              className="w-full resize-none bg-muted/30 border border-border/50 rounded-xl px-4 py-4 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 min-h-[140px]"
              style={{
                fontWeight: textStyle.isBold ? 'bold' : 'normal',
                fontStyle: textStyle.isItalic ? 'italic' : 'normal',
                fontSize: textStyle.fontSize === 'small' ? '0.875rem' : textStyle.fontSize === 'large' ? '1.125rem' : '1rem',
                color: textStyle.textColor,
              }}
              rows={6}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || isTyping}
                className="meom-button !py-2.5 !px-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Send to Mummy</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkToMummy;
