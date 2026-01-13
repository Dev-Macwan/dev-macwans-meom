import { useState, useEffect } from 'react';
import { getMeomData, getTodayEntry, saveTodayEntry, generateMotherReply } from '@/lib/meomStorage';
import { Send } from 'lucide-react';

const TalkToMother = () => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const data = getMeomData();
    if (data) {
      setName(data.name);
    }

    const todayEntry = getTodayEntry();
    if (todayEntry?.dayMessage) {
      setMessage(todayEntry.dayMessage);
      setReply(todayEntry.motherReply);
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = () => {
    if (!message.trim()) return;

    const motherReply = generateMotherReply(message, name);
    setReply(motherReply);
    setIsSubmitted(true);

    saveTodayEntry({
      dayMessage: message,
      motherReply: motherReply,
    });
  };

  return (
    <div className="meom-section">
      <h2 className="meom-section-title">Talk to Mother</h2>
      
      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your day, my child..."
          className="meom-textarea"
          disabled={isSubmitted}
        />

        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="meom-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            Share with Mother
          </button>
        )}

        {reply && (
          <div className="mother-reply animate-fade-in">
            <p className="font-heading text-lg">{reply}</p>
          </div>
        )}

        {isSubmitted && (
          <p className="text-center text-muted-foreground text-sm">
            You've shared with mother today. Rest now.
          </p>
        )}
      </div>
    </div>
  );
};

export default TalkToMother;
