import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const contextRef = useRef<gsap.Context | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    return () => {
      // Clean up only this component's triggers
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      
      // Revert the context
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, []);

  const createContext = (scope: Element | string | undefined, animationFn: () => void) => {
    contextRef.current = gsap.context(animationFn, scope);
    return contextRef.current;
  };

  const addTrigger = (trigger: ScrollTrigger) => {
    triggersRef.current.push(trigger);
  };

  return { createContext, addTrigger, gsap, ScrollTrigger };
};

export default useGSAP;
