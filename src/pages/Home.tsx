import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeomData } from '@/lib/meomStorage';
import { format } from 'date-fns';
import { LogOut } from 'lucide-react';
import TalkToMother from '@/components/TalkToMother';
import PraySection from '@/components/PraySection';
import BestMemory from '@/components/BestMemory';
import WorstPart from '@/components/WorstPart';
import TaskList from '@/components/TaskList';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d');

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

  const handleLogout = () => {
    sessionStorage.removeItem('meom_authenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl text-foreground">
              Good evening, {name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{formattedDate}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            title="Leave Meom"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <TalkToMother />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <PraySection />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <BestMemory />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <WorstPart />
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <TaskList />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 mb-8">
          <p className="text-muted-foreground/60 text-sm font-heading italic">
            Rest well, my {name}. Tomorrow awaits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
