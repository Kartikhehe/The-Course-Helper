import React, { useEffect } from 'react';

const LottiePlayer = () => {
  useEffect(() => {
    // Dynamically import the DotLottie player module
    import('@dotlottie/player-component');
  }, []);

  return (
    <dotlottie-player
      src="https://lottie.host/e4f5a352-87ab-423e-a3f2-24a53c597665/Wl2s8F36fb.lottie"
      background="transparent"
      speed="1"
      style={{ width: '300px', height: '300px' }}
      loop
      autoplay
    ></dotlottie-player>
  );
};

export default LottiePlayer;
