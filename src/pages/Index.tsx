import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeomData } from '@/lib/meomStorage';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = getMeomData();
    if (data?.isSetup) {
      if (sessionStorage.getItem('meom_authenticated') === 'true') {
        navigate('/daily-welcome');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default Index;
