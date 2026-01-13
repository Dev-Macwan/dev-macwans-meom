import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMeomData } from '@/lib/meomStorage';
import { Eye, EyeOff } from 'lucide-react';

const SetupPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const name = sessionStorage.getItem('meom_temp_name');

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

  const handleSubmit = () => {
    setError('');

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (name) {
      initMeomData(name, password);
      sessionStorage.removeItem('meom_temp_name');
      sessionStorage.setItem('meom_authenticated', 'true');
      navigate('/daily-welcome');
    }
  };

  return (
    <div className="meom-container">
      <div className="meom-card animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="meom-heading mb-4">This space is private</h1>
          <p className="meom-subtext">Set a password to keep your thoughts safe</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="meom-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="meom-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!password || !confirmPassword}
            className="meom-button disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Enter Meom
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPassword;
