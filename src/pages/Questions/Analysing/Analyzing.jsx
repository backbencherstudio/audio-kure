import React, { useEffect } from 'react';

const Analyzing = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script on component unmount
    };
  }, []);

  return (
    <div className='mx-auto ' style={{ width: '40%' }}>
      <dotlottie-player
        src="https://lottie.host/0123d81d-006d-4b3f-a5d2-fb1e53087da7/234nC2lRkd.json"
        background="transparent"
        speed="1" 
        loop
        autoplay>
      </dotlottie-player>
    </div>
  );
};

export default Analyzing;
