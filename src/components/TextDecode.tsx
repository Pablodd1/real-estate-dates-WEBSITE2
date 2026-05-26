import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

interface TextDecodeProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TextDecode({ text, className = '', delay = 0, speed = 30 }: TextDecodeProps) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let iteration = 0;
    const totalIterations = text.length * 3;

    const animate = () => {
      const progress = iteration / totalIterations;
      const revealedCount = Math.floor(progress * text.length);

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < revealedCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);
      iteration++;

      if (iteration <= totalIterations) {
        frameRef.current = setTimeout(() => requestAnimationFrame(animate), speed);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = setTimeout(() => requestAnimationFrame(animate), 0);

    return () => clearTimeout(frameRef.current);
  }, [started, text, speed]);

  return <span className={className}>{displayText || text.split('').map(() => '\u00A0').join('')}</span>;
}
