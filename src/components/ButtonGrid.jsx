import React, { useEffect } from 'react';
import { animate, stagger } from 'motion';

const buttons = [
  { label: 'Steam', onClick: () => window.open('https://steamcommunity.com/id/phoenix_owo', '_blank') },
  { label: 'Twitter/X', onClick: () => window.open('https://twitter.com/HotaruBlaze', '_blank') },
  { label: 'Github', onClick: () => window.open('https://github.com/HotaruBlaze', '_blank') },
  { label: 'Gitlab', onClick: () => window.open('https://gitlab.com/HotaruBlaze', '_blank') },
  { label: 'Email', onClick: () => window.location.href = 'mailto:hotarublaze@gmail.com' },
];

export default function ButtonGrid() {
  useEffect(() => {
    animate(
      ".btn-row button",
      { opacity: [0, 1] },
      { delay: stagger(0.1, { startDelay: 0.2 }), easing: [0.68, -0.55, 0.265, 1.55], duration: 0.6 }
    );
  }, []);

  return (
    <div className="btn-row max-w-md mx-auto mt-8 flex flex-wrap justify-center gap-4">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={btn.onClick}
          className="opacity-0 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-6 rounded transition"
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

