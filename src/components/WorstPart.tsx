import { useState, useEffect } from 'react';
import { getTodayEntry, saveTodayEntry } from '@/lib/meomStorage';

const WorstPart = () => {
  const [worstPart, setWorstPart] = useState('');

  useEffect(() => {
    const todayEntry = getTodayEntry();
    if (todayEntry?.worstPart) {
      setWorstPart(todayEntry.worstPart);
    }
  }, []);

  const handleBlur = () => {
    saveTodayEntry({ worstPart });
  };

  return (
    <div className="meom-section">
      <h2 className="meom-section-title">Today's Worst Part</h2>
      
      <textarea
        value={worstPart}
        onChange={(e) => setWorstPart(e.target.value)}
        onBlur={handleBlur}
        placeholder="What was difficult today? Let it out..."
        className="meom-textarea"
      />
    </div>
  );
};

export default WorstPart;
