import { useState, useEffect } from 'react';
import { getTodayEntry, saveTodayEntry } from '@/lib/meomStorage';

const BestMemory = () => {
  const [memory, setMemory] = useState('');

  useEffect(() => {
    const todayEntry = getTodayEntry();
    if (todayEntry?.bestMemory) {
      setMemory(todayEntry.bestMemory);
    }
  }, []);

  const handleBlur = () => {
    saveTodayEntry({ bestMemory: memory });
  };

  return (
    <div className="meom-section">
      <h2 className="meom-section-title">Today's Best Memory</h2>
      
      <textarea
        value={memory}
        onChange={(e) => setMemory(e.target.value)}
        onBlur={handleBlur}
        placeholder="What was the best part of today?"
        className="meom-textarea"
      />
    </div>
  );
};

export default BestMemory;
