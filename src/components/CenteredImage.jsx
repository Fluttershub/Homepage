import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function PeelImage({ frontSrc, backSrc, alt }) {
  const [peeled, setPeeled] = useState(false);

  // Single motion values for x and y
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Peel progress calculation based on x and y
  const peelProgress = useTransform(
    [x, y],
    ([currentX, currentY]) => {
      const xProgress = Math.min(Math.max(-currentX / 150, 0), 1);
      const yProgress = Math.min(Math.max(currentY / 150, 0), 1);
      return Math.min((xProgress + yProgress) / 2, 1);
    }
  );

  useEffect(() => {
    const unsubscribe = peelProgress.onChange((progress) => {
      if (progress > 0.2 && !peeled) {
        setPeeled(true);

        // Animate y from current position to 1000px down
        animate(y, 1000, { duration: 1.2, ease: "easeIn" });
      }
    });
    return () => unsubscribe();
  }, [peeled, peelProgress, y]);

  // Rotation and scaleX transform based on peel progress
  const rotate = useTransform(peelProgress, [0, 1], [0, -60]);
  const scaleX = useTransform(peelProgress, [0, 1], [1, 0.8]);

  return (
    <div className="relative w-64 h-64 cursor-grab select-none">
      {/* Back image */}
      <img
        src={backSrc}
        alt={`Back: ${alt}`}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        draggable={false}
      />

      {/* Front image */}
      <motion.img
        src={frontSrc}
        alt={`Front: ${alt}`}
        className="absolute top-0 right-0 w-full h-full object-cover rounded-lg shadow-lg origin-top-right"
        style={{
          x,
          y,
          rotate,
          scaleX,
          originX: 1,
          originY: 0,
          pointerEvents: peeled ? "none" : "auto",
        }}
        drag={!peeled}
        dragConstraints={{ left: -150, right: 0, top: 0, bottom: 150 }}
        dragElastic={0.3}
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onDragEnd={() => {
          if (!peeled) {
            // Reset position if peel incomplete
            x.set(0);
            y.set(0);
          }
        }}
      />
    </div>
  );
}
