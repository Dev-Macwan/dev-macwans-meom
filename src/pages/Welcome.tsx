import { useNavigate } from 'react-router-dom';
import { getMeomData } from '@/lib/meomStorage';
import { useEffect } from 'react';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = getMeomData();
    if (data?.isSetup) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="meom-container">
      <div className="meom-card text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="meom-heading mb-4">Welcome to Meom</h1>
          <p className="meom-subtext">A private space only for you</p>
        </div>
        
        <div className="mt-12">
          <button
            onClick={() => navigate('/setup-name')}
            className="meom-button"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
