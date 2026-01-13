import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Welcome = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user && userProfile) {
        navigate('/home');
      } else if (user && !userProfile) {
        navigate('/setup-name');
      }
    }
  }, [user, userProfile, loading, navigate]);

  if (loading) {
    return (
      <div className="meom-container">
        <div className="meom-card animate-fade-in text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meom-container">
      <div className="meom-card text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="meom-heading mb-4">Welcome to Meom</h1>
          <p className="meom-subtext">A private space only for you</p>
        </div>
        
        <div className="mt-12">
          <button
            onClick={() => navigate('/auth')}
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
