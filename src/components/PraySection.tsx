import { useState, useEffect } from 'react';
import { getTodayEntry, saveTodayEntry } from '@/lib/meomStorage';

const PraySection = () => {
  const [prayer, setPrayer] = useState('');

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
    <div className="meom-section">
      <h2 className="meom-section-title">Pray to Umiya Maa</h2>
      
      <textarea
        value={prayer}
        onChange={(e) => setPrayer(e.target.value)}
        onBlur={handleBlur}
        placeholder="Write your prayer..."
        className="meom-textarea"
      />
    </div>
  );
};

export default PraySection;
