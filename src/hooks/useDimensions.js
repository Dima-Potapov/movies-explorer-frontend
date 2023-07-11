import { useState, useEffect } from 'react';

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const getScreenDimensions = () => {
  const { width, height } = window.screen;
  return { width, height };
}

export const useScreenDimensions = () => {
  const [screenDimensions] = useState(getScreenDimensions());
  return screenDimensions;
}

