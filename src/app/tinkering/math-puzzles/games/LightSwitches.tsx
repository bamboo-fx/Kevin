"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, SkipForward, RotateCcw, Lightbulb } from 'lucide-react';
import { Button } from '../components/Button';
import canvasConfetti from 'canvas-confetti';

interface LightSwitchesProps {
  onBack: () => void;
}

const TOTAL_BULBS = 100;

export const LightSwitches: React.FC<LightSwitchesProps> = ({ onBack }) => {
  // bulbs[i] is true if ON, false if OFF. Index 0 corresponds to Bulb #1.
  const [bulbs, setBulbs] = useState<boolean[]>(Array(TOTAL_BULBS).fill(false));
  const [currentPass, setCurrentPass] = useState(0); // 0 means not started. 1..100 are passes.
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  
  // Ref for the interval so we can clear it easily
  const timerRef = useRef<number | null>(null);
  // Ref to track current pass for the interval (avoids stale closure)
  const currentPassRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    currentPassRef.current = currentPass;
  }, [currentPass]);

  const stopSimulation = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const performPass = useCallback((passNumber: number, prevBulbs: boolean[]): boolean[] => {
    // Pass k toggles every k-th switch
    // Bulb #n is at index n-1
    const next = [...prevBulbs];
    for (let i = passNumber; i <= TOTAL_BULBS; i += passNumber) {
      next[i - 1] = !next[i - 1];
    }
    return next;
  }, []);

  const finishSimulation = useCallback(() => {
    canvasConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FCD34D', '#F59E0B'] // Gold/Yellow colors
    });
  }, []);

  const nextStep = useCallback(() => {
    if (currentPassRef.current >= TOTAL_BULBS) {
      setFinished(true);
      stopSimulation();
      finishSimulation();
      return;
    }

    const nextPass = currentPassRef.current + 1;
    setCurrentPass(nextPass);
    setBulbs(prev => performPass(nextPass, prev));
    
    if (nextPass >= TOTAL_BULBS) {
      setFinished(true);
      stopSimulation();
      finishSimulation();
    }
  }, [stopSimulation, performPass, finishSimulation]);

  const togglePlay = () => {
    if (finished) return;

    if (isRunning) {
      stopSimulation();
    } else {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        const prev = currentPassRef.current;
        if (prev >= TOTAL_BULBS) {
          stopSimulation();
          setFinished(true);
          finishSimulation();
          return;
        }
        
        const next = prev + 1;
        setCurrentPass(next);
        setBulbs(prevBulbs => performPass(next, prevBulbs));
        
        if (next >= TOTAL_BULBS) {
          stopSimulation();
          setFinished(true);
          finishSimulation();
        }
      }, 150); // Speed of simulation
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, stopSimulation, performPass, finishSimulation]);

  const resetGame = () => {
    stopSimulation();
    setBulbs(Array(TOTAL_BULBS).fill(false));
    setCurrentPass(0);
    setFinished(false);
  };

  // Determine which bulbs are "perfect squares" to highlight the pattern at the end
  const isPerfectSquare = (n: number) => {
    const sqrt = Math.sqrt(n);
    return sqrt === Math.floor(sqrt);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-paper p-4 font-sans text-ink">
      <header className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center text-gray-600">
          <ArrowLeft className="w-6 h-6 mr-2" /> <span className="font-medium">Back</span>
        </button>
        <h1 className="text-xl md:text-2xl font-serif font-bold text-brownie-dark">The 100 Lightbulbs</h1>
        <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </Button>
      </header>

      <main className="w-full max-w-5xl flex flex-col gap-8">
        
        {/* Top Section: Controls & Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="font-serif font-bold text-lg mb-4 text-brownie">The Problem</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        There are 100 lightbulbs lined up in a row in a long hallway. They are all initially off.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li className="flex items-start">
                            <span className="font-bold mr-2">Pass 1:</span> Toggle every switch (1, 2, 3...).
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold mr-2">Pass 2:</span> Toggle every 2nd switch (2, 4, 6...).
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold mr-2">Pass 3:</span> Toggle every 3rd switch (3, 6, 9...).
                        </li>
                        <li className="italic ml-4">... continue until Pass 100 ...</li>
                    </ul>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-brownie font-medium">
                        Which lightbulbs remain ON after 100 passes?
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center">
                    <div className="text-4xl font-mono font-bold text-ink mb-2">
                        {currentPass} / 100
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest mb-6">Current Pass</div>
                    
                    <div className="flex gap-2 w-full">
                        <Button 
                            variant="primary" 
                            className="flex-1"
                            onClick={togglePlay}
                            disabled={finished}
                        >
                            {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            {isRunning ? "Pause" : "Run"}
                        </Button>
                        <Button 
                            variant="secondary"
                            onClick={nextStep}
                            disabled={isRunning || finished}
                            title="Next Step"
                        >
                            <SkipForward className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-10 gap-2 md:gap-3 h-full content-center justify-items-center">
                    {bulbs.map((isOn, index) => {
                        const bulbNum = index + 1;
                        // Is this bulb being toggled in the current pass?
                        // It is toggled if bulbNum % currentPass === 0
                        // Only highlight during the active pass (and if not finished)
                        const isActive = !finished && currentPass > 0 && bulbNum % currentPass === 0;

                        return (
                            <div key={index} className="relative flex flex-col items-center">
                                <motion.div
                                    animate={{
                                        backgroundColor: isOn ? '#fbbf24' : '#374151', // amber-400 vs gray-700
                                        scale: isActive ? 1.15 : 1,
                                        boxShadow: isOn 
                                            ? '0 0 15px 2px rgba(251, 191, 36, 0.6)' 
                                            : '0 0 0px 0px rgba(0,0,0,0)'
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`
                                        w-6 h-6 md:w-8 md:h-8 rounded-full border-2 
                                        ${isActive ? 'border-white' : 'border-gray-600'}
                                    `}
                                />
                                <span className={`text-[10px] mt-1 font-mono ${isActive ? 'text-white font-bold' : 'text-gray-500'}`}>
                                    {bulbNum}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Conclusion / Answer Reveal */}
        <AnimatePresence>
            {finished && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-xl shadow-lg border border-amber-200 text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-2xl font-serif font-bold text-brownie mb-4">The Pattern Revealed</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        The lights that remain on are: <strong>1, 4, 9, 16, 25, 36, 49, 64, 81, 100</strong>.
                    </p>
                    <p className="text-gray-600">
                        These are the <strong>perfect squares</strong>. A light toggles for every factor it has. 
                        Most numbers have an even number of factors (pairs), so they flip ON then OFF an equal number of times, ending OFF. 
                        Only perfect squares have an odd number of factors (because the square root is a factor paired with itself), leaving them ON.
                    </p>
                </motion.div>
            )}
        </AnimatePresence>

      </main>
    </div>
  );
};
