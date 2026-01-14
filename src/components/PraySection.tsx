import { useState, useEffect } from 'react';
import { getTodayEntry, saveTodayEntry } from '@/lib/meomStorage';
import SimpleTextToolbar, { TextStyle } from './SimpleTextToolbar';

const PraySection = () => {
  const [prayer, setPrayer] = useState('');
  const [textStyle, setTextStyle] = useState<TextStyle>({
    isBold: false,
    isItalic: false,
    fontSize: 'normal',
    textColor: 'inherit',
  });

  useEffect(() => {
    const todayEntry = getTodayEntry();
    if (todayEntry?.prayer) {
      setPrayer(todayEntry.prayer);
    }
  }, []);

  const handleBlur = () => {
    saveTodayEntry({ prayer });
  };

  return (
    <div className="meom-section pray-section-bg">
      <h2 className="meom-section-title">Pray to Umiya Maa</h2>
      
      <div className="flex items-center gap-3 mb-2">
        <div className="breathing-dot" title="Take a breath..." />
        <SimpleTextToolbar style={textStyle} onStyleChange={setTextStyle} />
      </div>
      <textarea
        value={prayer}
        onChange={(e) => setPrayer(e.target.value)}
        onBlur={handleBlur}
        placeholder="Write your prayer..."
        className="meom-textarea"
        style={{
          fontWeight: textStyle.isBold ? 'bold' : 'normal',
          fontStyle: textStyle.isItalic ? 'italic' : 'normal',
          fontSize: textStyle.fontSize === 'small' ? '0.875rem' : textStyle.fontSize === 'large' ? '1.125rem' : '1rem',
          color: textStyle.textColor,
        }}
      />
    </div>
  );
};

export default PraySection;
