import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeomData, verifyPassword } from '@/lib/meomStorage';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = getMeomData();
    if (!data?.isSetup) {
      navigate('/');
      return;
    }
    setName(data.name);

    // Check if already authenticated this session
    if (sessionStorage.getItem('meom_authenticated') === 'true') {
      navigate('/daily-welcome');
    }
  }, [navigate]);

  const handleLogin = () => {
    setError('');

    if (verifyPassword(password)) {
      sessionStorage.setItem('meom_authenticated', 'true');
      navigate('/daily-welcome');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="meom-container">
      <div className="meom-card animate-fade-in text-center">
        <div className="mb-8">
          <h1 className="meom-heading mb-4">Welcome back, {name}</h1>
          <p className="meom-subtext">Enter your password to continue</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Password"
              className="meom-input pr-12 text-center"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={!password}
            className="meom-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enter Meom
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
