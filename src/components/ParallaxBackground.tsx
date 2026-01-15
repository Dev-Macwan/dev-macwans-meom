import { useEffect, useState } from 'react';

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Layer 1 - Large soft background glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          top: '5%',
          left: '-5%',
          background: 'hsl(var(--primary) / 0.15)',
          transform: `translateY(${scrollY * 0.03}px)`,
        }}
      />
      
      {/* Layer 2 - Right side accent */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          top: '20%',
          right: '-10%',
          background: 'hsl(var(--accent) / 0.25)',
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
      />
      
      {/* Layer 3 - Center warmth */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full blur-2xl"
        style={{
          top: '40%',
          left: '30%',
          background: 'hsl(var(--warmth) / 0.12)',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Layer 4 - Bottom left */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-3xl"
        style={{
          top: '60%',
          left: '-10%',
          background: 'hsl(var(--secondary) / 0.3)',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      
      {/* Layer 5 - Bottom right accent */}
      <div 
        className="absolute w-[380px] h-[380px] rounded-full blur-3xl"
        style={{
          top: '70%',
          right: '5%',
          background: 'hsl(var(--primary) / 0.1)',
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      />

      {/* Layer 6 - Floating mid layer */}
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-2xl"
        style={{
          top: '35%',
          right: '25%',
          background: 'hsl(var(--warmth) / 0.15)',
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      />

      {/* Animated floating orbs - more visible */}
      <div className="parallax-orb parallax-orb-1" />
      <div className="parallax-orb parallax-orb-2" />
      <div className="parallax-orb parallax-orb-3" />
      <div className="parallax-orb parallax-orb-4" />
      <div className="parallax-orb parallax-orb-5" />
    </div>
  );
};

export default ParallaxBackground;
