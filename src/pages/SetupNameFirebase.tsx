import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { createUserProfile } from '@/lib/firestoreService';
import { Copy, Check } from 'lucide-react';

const SetupNameFirebase = () => {
  const [name, setName] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, userProfile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
      } else if (userProfile) {
        navigate('/home');
      }
    }
  }, [user, userProfile, loading, navigate]);

  const handleSubmit = async () => {
    if (!name.trim() || !user) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const key = await createUserProfile(user.uid, name.trim());
      setRecoveryKey(key);
      await refreshProfile();
    } catch (err) {
      setError('Failed to save your name. Please try again.');
      console.error('Error creating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyRecoveryKey = () => {
    navigator.clipboard.writeText(recoveryKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="meom-container">
        <div className="meom-card animate-fade-in text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show recovery key after name is saved
  if (recoveryKey) {
    return (
      <div className="meom-container">
        <div className="meom-card animate-fade-in text-center">
          <div className="mb-8">
            <h1 className="meom-heading mb-4">Save Your Recovery Key</h1>
            <p className="meom-subtext">Keep this safe. You'll need it if you forget your password.</p>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="font-mono text-lg tracking-wider text-foreground break-all">
              {recoveryKey}
            </p>
          </div>

          <button
            onClick={copyRecoveryKey}
            className="flex items-center justify-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy to clipboard'}
          </button>

          <button
            onClick={() => navigate('/home')}
            className="meom-button"
          >
            Continue to Meom
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="meom-container">
      <div className="meom-card animate-fade-in text-center">
        <div className="mb-8">
          <h1 className="meom-heading mb-4">What should Mummy call you?</h1>
          <p className="meom-subtext">This name will be used throughout Meom</p>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="meom-input text-center"
            autoFocus
          />

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!name.trim() || isLoading}
            className="meom-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupNameFirebase;
