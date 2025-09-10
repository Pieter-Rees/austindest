import { useEffect, useState } from 'react';
import { ANIMATION_DURATION } from '@/lib/constants';

type AnimationType = 'fade-in' | 'slide-up';

interface UseAnimationProps {
  type?: AnimationType;
  delay?: keyof typeof ANIMATION_DURATION;
  initialDelay?: number;
}

export const useAnimation = ({
  type = 'fade-in',
  delay = 'normal',
  initialDelay = 0,
}: UseAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  const animationClass = isVisible ? `animate-${type} duration-${delay}` : 'opacity-0';

  return {
    animationClass,
    isVisible,
  };
};
