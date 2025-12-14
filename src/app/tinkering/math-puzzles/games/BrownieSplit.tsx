"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, HelpCircle, Check, Info } from 'lucide-react';
import { Button } from '../components/Button';
import { Point, Rect, Line } from '../types';
import { perpendicularDistanceToLine, generateRandomHole } from '../utils/geometry';
import canvasConfetti from 'canvas-confetti';

interface BrownieSplitProps {
  onBack: () => void;
}

const PAN_WIDTH = 600;
const PAN_HEIGHT = 400;

export const BrownieSplit: React.FC<BrownieSplitProps> = ({ onBack }) => {
  const [hole, setHole] = useState<Rect>({ x: 0, y: 0, width: 0, height: 0, rotation: 0 });
  const [cutLine, setCutLine] = useState<Line | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point | null>(null);
  const [dragCurrent, setDragCurrent] = useState<Point | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const svgRef = useRef<SVGSVGElement>(null);

  // Initialize game
  const resetGame = useCallback(() => {
    setHole(generateRandomHole(PAN_WIDTH, PAN_HEIGHT));
    setCutLine(null);
    setGameState('playing');
    setShowHint(false);
    setShowSolution(false);
    setIsDragging(false);
    setDragStart(null);
    setDragCurrent(null);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const getSVGPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    
    // Handle both mouse and touch events
    const clientX = 'touches' in e ? (e as unknown as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as unknown as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;

    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (gameState !== 'playing') return;
    const point = getSVGPoint(e);
    setIsDragging(true);
    setDragStart(point);
    setDragCurrent(point);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !dragStart) return;
    const point = getSVGPoint(e);
    setDragCurrent(point);
  };

  const handleEnd = () => {
    if (!isDragging || !dragStart || !dragCurrent) return;
    
    // Minimum line length to prevent accidental clicks
    const dist = Math.sqrt(Math.pow(dragCurrent.x - dragStart.x, 2) + Math.pow(dragCurrent.y - dragStart.y, 2));
    
    if (dist > 20) {
      const newLine = { start: dragStart, end: dragCurrent };
      setCutLine(newLine);
      checkWin(newLine);
    } else {
        setCutLine(null);
    }
    
    setIsDragging(false);
    setDragStart(null);
    setDragCurrent(null);
  };

  const checkWin = (line: Line) => {
    const panCenter = { x: PAN_WIDTH / 2, y: PAN_HEIGHT / 2 };
    const holeCenter = { x: hole.x, y: hole.y };

    const distToPanCenter = perpendicularDistanceToLine(panCenter, line);
    const distToHoleCenter = perpendicularDistanceToLine(holeCenter, line);

    // Tolerance in pixels. 
    // The line must pass relatively close to both centers to be mathematically "equal area"
    const tolerance = 15; 

    if (distToPanCenter < tolerance && distToHoleCenter < tolerance) {
      setGameState('won');
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      // Don't set lost immediately, let them retry unless we want strict mode.
      // For a relaxing puzzle book vibe, just let them readjust.
      // But we can play a subtle error sound or shake effect if we wanted.
    }
  };

  // Calculate the "Perfect" line extension for visualization
  const getPerfectLine = () => {
    const p1 = { x: PAN_WIDTH / 2, y: PAN_HEIGHT / 2 };
    const p2 = { x: hole.x, y: hole.y };
    
    // Extend the line to the edges of the SVG for drawing purposes
    // Vector
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    
    // Just make it very long
    const scale = 1000;
    return {
      start: { x: p1.x - dx * scale, y: p1.y - dy * scale },
      end: { x: p1.x + dx * scale, y: p1.y + dy * scale }
    };
  };

  const perfectLine = getPerfectLine();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-paper p-4 font-sans text-ink">
      
      {/* Introduction Modal */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white max-w-lg w-full rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-3xl font-serif mb-4 text-brownie-dark">Dividing Brownies</h2>
                <div className="prose text-gray-600 mb-6 leading-relaxed">
                  <p className="mb-2">A father bakes brownies in a rectangular pan. Before his daughters get home, his wife removes a rectangular piece from somewhere in the middle.</p>
                  <p className="font-medium text-ink">Your Challenge:</p>
                  <p>Make a single straight cut that divides the remaining brownie exactly in half, so both daughters get the same amount.</p>
                </div>
                <Button onClick={() => setShowIntro(false)} className="w-full">Start Baking</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center text-gray-600"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          <span className="font-medium">Back to Book</span>
        </button>
        <h1 className="text-2xl font-serif text-brownie-dark hidden md:block">Dividing Brownies</h1>
        <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowIntro(true)}>
                <Info className="w-4 h-4 mr-2" />
                Rules
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
            </Button>
        </div>
      </header>

      <main className="relative flex flex-col items-center">
        
        {/* Game Board */}
        <div className="relative p-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <svg
            ref={svgRef}
            width={PAN_WIDTH}
            height={PAN_HEIGHT}
            viewBox={`0 0 ${PAN_WIDTH} ${PAN_HEIGHT}`}
            className="cursor-crosshair touch-none select-none bg-gray-50 rounded"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            {/* The Pan (Brownie) */}
            <rect 
              x={0} 
              y={0} 
              width={PAN_WIDTH} 
              height={PAN_HEIGHT} 
              fill="#5D4037" 
              rx="4"
            />
            
            {/* Texture/Noise for brownie effect (optional subtle detail) */}
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1" pointerEvents="none"/>

            {/* The Hole (Missing piece) */}
            <g transform={`rotate(${hole.rotation}, ${hole.x}, ${hole.y})`}>
              <rect
                x={hole.x - hole.width / 2}
                y={hole.y - hole.height / 2}
                width={hole.width}
                height={hole.height}
                fill="#fdf6e3" // Matches paper background
                stroke="#d1d1d1"
                strokeWidth="2"
              />
              {/* Crumb debris around hole for effect */}
              <circle cx={hole.x - hole.width/2 - 5} cy={hole.y} r="2" fill="#3E2723" opacity="0.5" />
              <circle cx={hole.x + hole.width/2 + 3} cy={hole.y + 10} r="3" fill="#3E2723" opacity="0.5" />
            </g>

            {/* Visualizing Centers (Hint) */}
            <AnimatePresence>
              {(showHint || gameState === 'won') && (
                <>
                  <motion.circle 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    cx={PAN_WIDTH / 2} cy={PAN_HEIGHT / 2} r="6" fill="#3B82F6" stroke="white" strokeWidth="2"
                  />
                  <motion.circle 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    cx={hole.x} cy={hole.y} r="6" fill="#3B82F6" stroke="white" strokeWidth="2"
                  />
                  {/* Dashed lines to axes to explain symmetry */}
                  {showHint && !gameState && (
                      <text x={PAN_WIDTH/2} y={PAN_HEIGHT/2 - 15} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Pan Center</text>
                  )}
                  {showHint && !gameState && (
                      <text x={hole.x} y={hole.y - 15} textAnchor="middle" fill="#5D4037" fontSize="12" fontWeight="bold">Hole Center</text>
                  )}
                </>
              )}
            </AnimatePresence>

            {/* Solution Line */}
            <AnimatePresence>
                {(showSolution || gameState === 'won') && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        x1={perfectLine.start.x}
                        y1={perfectLine.start.y}
                        x2={perfectLine.end.x}
                        y2={perfectLine.end.y}
                        stroke="#10B981" // Green
                        strokeWidth="4"
                        strokeDasharray="10, 5"
                        strokeLinecap="round"
                    />
                )}
            </AnimatePresence>

            {/* User Dragging Line */}
            {isDragging && dragStart && dragCurrent && (
              <line
                x1={dragStart.x}
                y1={dragStart.y}
                x2={dragCurrent.x}
                y2={dragCurrent.y}
                stroke="white"
                strokeWidth="2"
                strokeDasharray="5, 5"
              />
            )}

            {/* Final User Line */}
            {cutLine && !isDragging && (
              <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x1={cutLine.start.x}
                y1={cutLine.start.y}
                x2={cutLine.end.x}
                y2={cutLine.end.y}
                stroke={gameState === 'won' ? '#10B981' : 'white'}
                strokeWidth="4"
                strokeLinecap="round"
              />
            )}
          </svg>

            {/* Feedback Overlay */}
            <div className="absolute top-4 left-0 w-full flex justify-center pointer-events-none">
                <AnimatePresence>
                    {gameState === 'won' && (
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-md border border-green-200 flex items-center"
                        >
                            <Check className="w-5 h-5 mr-2" />
                            Perfect Cut! Equal Area Achieved.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex gap-4">
          <Button 
            variant="secondary" 
            onClick={() => setShowHint(!showHint)}
            disabled={gameState === 'won'}
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            {showHint ? "Hide Centers" : "Show Centers"}
          </Button>
          
          <Button 
            variant={gameState === 'won' ? 'primary' : 'outline'}
            onClick={() => {
                if(gameState === 'won') {
                    resetGame();
                } else {
                    setShowSolution(!showSolution);
                }
            }}
          >
            {gameState === 'won' ? "Next Brownie" : (showSolution ? "Hide Solution" : "Reveal Solution")}
          </Button>
        </div>

        <div className="mt-8 max-w-lg text-center text-gray-500 italic text-sm">
            "Mathematical exploration begins with questions."
        </div>

      </main>
    </div>
  );
};