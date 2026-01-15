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
      {/* Layer 1 - Slowest, furthest back */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        style={{
          top: '10%',
          left: '5%',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      
      {/* Layer 2 */}
      <div 
        className="absolute w-80 h-80 rounded-full bg-accent/10 blur-3xl"
        style={{
          top: '30%',
          right: '10%',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Layer 3 - Medium speed */}
      <div 
        className="absolute w-64 h-64 rounded-full bg-warmth/8 blur-2xl"
        style={{
          top: '60%',
          left: '15%',
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />
      
      {/* Layer 4 */}
      <div 
        className="absolute w-72 h-72 rounded-full bg-secondary/20 blur-3xl"
        style={{
          top: '80%',
          right: '20%',
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      />
      
      {/* Layer 5 - Faster, closer */}
      <div 
        className="absolute w-48 h-48 rounded-full bg-primary/3 blur-2xl"
        style={{
          top: '45%',
          left: '50%',
          transform: `translate(-50%, ${scrollY * 0.2}px)`,
        }}
      />

      {/* Subtle floating orbs with CSS animation */}
      <div className="parallax-orb parallax-orb-1" />
      <div className="parallax-orb parallax-orb-2" />
      <div className="parallax-orb parallax-orb-3" />
    </div>
  );
};

export default ParallaxBackground;
