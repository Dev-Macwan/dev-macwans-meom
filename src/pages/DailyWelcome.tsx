import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeomData } from '@/lib/meomStorage';
import { format } from 'date-fns';

const DailyWelcome = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d, yyyy');

  useEffect(() => {
    if (sessionStorage.getItem('meom_authenticated') !== 'true') {
      navigate('/login');
      return;
    }

    const data = getMeomData();
    if (data) {
      setName(data.name);
    }
  }, [navigate]);

  return (
    <div className="meom-container">
      <div className="meom-card text-center animate-fade-in">
        <div className="mb-2">
          <p className="text-muted-foreground text-sm">{formattedDate}</p>
        </div>
        
        <div className="my-8">
          <h1 className="meom-heading mb-4">
            How was your day, my {name}?
          </h1>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="meom-button mt-8"
        >
          Describe My Day
        </button>
      </div>
    </div>
  );
};

export default DailyWelcome;
