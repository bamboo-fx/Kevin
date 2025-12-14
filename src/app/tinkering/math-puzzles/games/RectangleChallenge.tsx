"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from '../components/Button';
import canvasConfetti from 'canvas-confetti';

interface RectangleChallengeProps {
  onBack: () => void;
}

// Container dimensions for the visualization
const VIS_WIDTH = 520;
const VIS_HEIGHT = 420;
const PADDING = 20;
const GAP = 24; // Gap between rectangles

// Slider range - must support the integer solution: 1×33 and 6×11
const SLIDER_MIN = 1;
const SLIDER_MAX = 40;
const SLIDER_STEP = 1;

export const RectangleChallenge: React.FC<RectangleChallengeProps> = ({ onBack }) => {
  // Rect 1 State - start with thin rectangle as hint toward solution
  const [w1, setW1] = useState(2);
  const [h1, setH1] = useState(20);
  
  // Rect 2 State - start closer to the solution shape
  const [w2, setW2] = useState(6);
  const [h2, setH2] = useState(8);

  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const p1 = 2 * (w1 + h1);
  const a1 = w1 * h1;
  const p2 = 2 * (w2 + h2);
  const a2 = w2 * h2;

  // Constraints:
  // 1. Rect 1 has TWICE the perimeter of Rect 2. (P1 = 2 * P2)
  // 2. Rect 2 has TWICE the area of Rect 1. (A2 = 2 * A1)
  // Integer solution: 1×33 and 6×11

  // Calculate dynamic scale to fit both rectangles without overlap
  const { scale, rect1Pos, rect2Pos } = useMemo(() => {
    // Available space
    const availableWidth = VIS_WIDTH - PADDING * 2;
    const availableHeight = VIS_HEIGHT - PADDING * 2;
    
    // Total dimensions needed (side by side with gap)
    const totalWidthUnits = w1 + w2;
    const maxHeightUnits = Math.max(h1, h2);
    
    // Calculate scale to fit both dimensions
    // Account for gap in pixel space
    const scaleX = (availableWidth - GAP) / totalWidthUnits;
    const scaleY = availableHeight / maxHeightUnits;
    
    // Use the smaller scale to ensure everything fits
    // Min scale of 3px/unit so very small rectangles are still visible
    // Max scale of 12px/unit so we don't blow up tiny shapes
    const s = Math.max(3, Math.min(scaleX, scaleY, 12));
    
    // Position rectangles side by side, centered in container
    const rect1PixelWidth = w1 * s;
    const rect2PixelWidth = w2 * s;
    const totalPixelWidth = rect1PixelWidth + GAP + rect2PixelWidth;
    const startX = (VIS_WIDTH - totalPixelWidth) / 2;
    
    const rect1X = startX;
    const rect1Y = (VIS_HEIGHT - h1 * s) / 2;
    
    const rect2X = startX + rect1PixelWidth + GAP;
    const rect2Y = (VIS_HEIGHT - h2 * s) / 2;
    
    return {
      scale: s,
      rect1Pos: { x: rect1X, y: rect1Y },
      rect2Pos: { x: rect2X, y: rect2Y }
    };
  }, [w1, h1, w2, h2]);

  useEffect(() => {
    // Check solution - integer solutions should match exactly
    const isPCorrect = p1 === 2 * p2;
    const isACorrect = a2 === 2 * a1;

    if (isPCorrect && isACorrect && !solved) {
      setSolved(true);
      canvasConfetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    } else if ((!isPCorrect || !isACorrect) && solved) {
      setSolved(false);
    }
  }, [p1, p2, a1, a2, solved]);

  const Slider = ({ label, value, onChange }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
  }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 font-medium text-gray-600">
        <label>{label}</label>
        <span className="font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        step={SLIDER_STEP}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ink"
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-paper p-4 font-sans text-ink">
      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center text-gray-600">
          <ArrowLeft className="w-6 h-6 mr-2" /> <span className="font-medium">Back</span>
        </button>
        <h1 className="text-xl md:text-2xl font-serif font-bold text-brownie-dark">The Impossible Rectangles?</h1>
        <Button variant="secondary" size="sm" onClick={() => setShowHint(!showHint)}>
          <Lightbulb className="w-4 h-4 mr-1" /> Hint
        </Button>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Controls Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 order-2 lg:order-1">
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h3 className="font-serif font-bold text-lg mb-2 text-brownie">The Challenge</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Rectangle 1 must have <strong>double the perimeter</strong> of Rectangle 2.</li>
              <li>Rectangle 2 must have <strong>double the area</strong> of Rectangle 1.</li>
            </ul>
          </div>

          <AnimatePresence>
            {showHint && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 overflow-hidden"
              >
                <p className="text-sm text-blue-800">
                  <strong>💡 Hint:</strong> Think about efficiency! A thin rectangle (like 1×N) has a high perimeter relative to its area. 
                  A more square-like shape packs more area into less perimeter. Try making Rectangle 1 <em>very</em> thin and tall, 
                  and Rectangle 2 closer to a square shape. There's a clean integer solution!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-8">
            {/* Rect 1 Controls */}
            <div className="p-4 border border-blue-100 rounded-lg bg-blue-50/30">
              <h4 className="font-bold text-blue-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2" /> Rectangle 1 (The Long One?)
              </h4>
              <Slider label="Width" value={w1} onChange={setW1} />
              <Slider label="Height" value={h1} onChange={setH1} />
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-blue-900/70">
                <div>Perimeter: <strong>{p1.toFixed(1)}</strong></div>
                <div>Area: <strong>{a1.toFixed(1)}</strong></div>
              </div>
            </div>

            {/* Rect 2 Controls */}
            <div className="p-4 border border-red-100 rounded-lg bg-red-50/30">
              <h4 className="font-bold text-red-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-sm mr-2" /> Rectangle 2 (The Big One?)
              </h4>
              <Slider label="Width" value={w2} onChange={setW2} />
              <Slider label="Height" value={h2} onChange={setH2} />
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-red-900/70">
                <div>Perimeter: <strong>{p2.toFixed(1)}</strong></div>
                <div>Area: <strong>{a2.toFixed(1)}</strong></div>
              </div>
            </div>
          </div>

          {/* Solution Status */}
          <div className="mt-8 space-y-3">
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium">Perimeter Goal (P1 = 2 × P2)</span>
                <div className="flex items-center">
                    <span className={`font-mono font-bold ${p1 === 2 * p2 ? 'text-green-600' : 'text-gray-500'}`}>
                        {p1} = 2 × {p2} = {2 * p2}
                    </span>
                    {p1 === 2 * p2 && <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />}
                </div>
             </div>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium">Area Goal (A2 = 2 × A1)</span>
                 <div className="flex items-center">
                    <span className={`font-mono font-bold ${a2 === 2 * a1 ? 'text-green-600' : 'text-gray-500'}`}>
                        {a2} = 2 × {a1} = {2 * a1}
                    </span>
                    {a2 === 2 * a1 && <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />}
                </div>
             </div>
          </div>

          <AnimatePresence>
            {solved && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="mt-6 p-4 bg-green-100 text-green-900 rounded-lg text-center font-bold border border-green-200"
              >
                🎉 Solution Found! You balanced the impossible.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visualization Section */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-center order-1 lg:order-2">
           <div 
             className="relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
             style={{ width: VIS_WIDTH, height: VIS_HEIGHT, maxWidth: '100%', margin: '0 auto' }}
           >
             {/* Grid background */}
             <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
               <defs>
                 <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                   <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9ca3af" strokeWidth="0.5"/>
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid)" />
             </svg>
             
             {/* Rectangle 1 (Blue) */}
             <motion.div
                className="absolute bg-blue-500/80 border-2 border-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg"
                animate={{ 
                  width: Math.max(w1 * scale, 4), // Minimum 4px width for visibility
                  height: Math.max(h1 * scale, 4),
                  x: rect1Pos.x,
                  y: rect1Pos.y
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
             >
                <span className="bg-blue-600 px-1.5 py-0.5 rounded text-xs">1</span>
             </motion.div>

             {/* Rectangle 2 (Red) */}
             <motion.div
                className="absolute bg-red-500/80 border-2 border-red-600 flex items-center justify-center text-white text-sm font-bold shadow-lg"
                animate={{ 
                  width: Math.max(w2 * scale, 4),
                  height: Math.max(h2 * scale, 4),
                  x: rect2Pos.x,
                  y: rect2Pos.y
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
             >
                <span className="bg-red-600 px-1.5 py-0.5 rounded text-xs">2</span>
             </motion.div>

             {/* Scale indicator */}
             <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                Scale: {scale.toFixed(1)}px/unit
             </div>
           </div>
           
           {/* Dimensions display */}
           <div className="flex justify-center gap-8 mt-4 text-xs text-gray-500">
             <div className="flex items-center gap-1">
               <div className="w-3 h-3 bg-blue-500 rounded-sm" />
               <span>{w1} × {h1}</span>
             </div>
             <div className="flex items-center gap-1">
               <div className="w-3 h-3 bg-red-500 rounded-sm" />
               <span>{w2} × {h2}</span>
             </div>
           </div>
        </div>

      </main>
    </div>
  );
};