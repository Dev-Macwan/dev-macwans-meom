import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetupName = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (name.trim()) {
      // Store name temporarily in session
      sessionStorage.setItem('meom_temp_name', name.trim());
      navigate('/setup-password');
    }
  };

  return (
    <div className="meom-container">
      <div className="meom-card animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="meom-heading mb-4">What name would you like your mother to call you?</h1>
          <p className="meom-subtext">This is how she will address you</p>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="meom-input text-center text-lg"
            autoFocus
          />

          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className="meom-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupName;
