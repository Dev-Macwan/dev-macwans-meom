import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { LogOut } from 'lucide-react';
import PhotoFrames from '@/components/PhotoFrames';
import TalkToMummy from '@/components/TalkToMummy';
import PraySection from '@/components/PraySection';
import BestMemory from '@/components/BestMemory';
import WorstPart from '@/components/WorstPart';
import TaskList from '@/components/TaskList';

const HomeFirebase = () => {
  const { user, userProfile, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Hello');

  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d');

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
      } else if (!userProfile) {
        navigate('/setup-name');
      }
    }
  }, [user, userProfile, loading, navigate]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  if (loading || !userProfile) {
    return (
      <div className="meom-container">
        <div className="meom-card animate-fade-in text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl text-foreground">
              {greeting}, {userProfile.chosenName}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{formattedDate}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            title="Sign out"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <PhotoFrames />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <TalkToMummy />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <PraySection />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <BestMemory />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <WorstPart />
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <TaskList />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 mb-8">
          <p className="text-muted-foreground/60 text-sm font-heading italic">
            Rest well, my {userProfile.chosenName}. Tomorrow awaits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeFirebase;
