import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'motion';

export default function Typewriter({ texts = [], speed = 100, pause = 1000, onDone }) {
  // your existing state
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const charIndex = useRef(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const textRef = useRef(null);

  const glitchColors = ['#ff00c8', '#00fff7', '#fffc00', '#ff0066', '#00ff94', '#ff3c00'];

  function getRandomColor() {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  }

  function runGlitchAnimation() {
    if (!textRef.current) return;

    textRef.current.style.transform = 'none';
    textRef.current.style.color = '#fff';

    animate(
      textRef.current,
      {
        x: [0, -5, 5, -5, 5, 0],
        y: [0, 3, -3, 3, -3, 0],
        skew: ['0deg', '2deg', '-5deg', '5deg', '-5deg', '0deg'],
        color: [getRandomColor(), '#fff'],
      },
      {
        duration: speed / 400,
        easing: 'ease-in-out',
      }
    );
  }

  useEffect(() => {
    if (!texts.length) return;

    let timeoutId;

    function type() {
      const currentText = texts[index];

      runGlitchAnimation();

      if (!isDeleting) {
        if (charIndex.current < currentText.length) {
          setDisplayed(currentText.substring(0, charIndex.current + 1));
          charIndex.current += 1;
          timeoutId = setTimeout(type, speed);
        } else {
          if (index === texts.length - 1) {
            setDoneTyping(true);
            if (onDone) onDone(); // 🔥 call when final string is finished
          } else {
            timeoutId = setTimeout(() => {
              setIsDeleting(true);
            }, pause);
          }
        }
      } else {
        if (charIndex.current > 0) {
          setDisplayed(currentText.substring(0, charIndex.current - 1));
          charIndex.current -= 1;
          timeoutId = setTimeout(type, speed / 2);
        } else {
          setIsDeleting(false);
          setIndex((prev) => prev + 1);
          timeoutId = setTimeout(type, speed);
        }
      }
    }

    type();

    return () => clearTimeout(timeoutId);
  }, [texts, index, isDeleting, speed, pause, onDone]);

  return (
    <>
      <p
        ref={textRef}
        className="text-center text-3xl font-mono whitespace-pre-wrap"
        style={{ color: '#fff', display: 'inline-block' }}
      >
        {displayed}
        {!doneTyping && <span className="animate-blink">|</span>}
      </p>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </>
  );
}
