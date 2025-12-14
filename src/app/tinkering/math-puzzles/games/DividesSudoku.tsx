"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Lightbulb, Check, Eraser, Eye } from 'lucide-react';
import { Button } from '../components/Button';
import { generateSudoku, createPuzzle } from '../utils/sudoku';
import canvasConfetti from 'canvas-confetti';

interface DividesSudokuProps {
  onBack: () => void;
}

export const DividesSudoku: React.FC<DividesSudokuProps> = ({ onBack }) => {
  const [solution, setSolution] = useState<number[]>([]);
  const [initialGrid, setInitialGrid] = useState<number[]>([]); // Immutable starting clues
  const [grid, setGrid] = useState<number[]>([]); // User's grid. 0 = empty
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [blinkingCell, setBlinkingCell] = useState<number | null>(null);
  const [won, setWon] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newSolution = generateSudoku();
    const newPuzzle = createPuzzle(newSolution, 35); // Keep ~35 numbers as clues
    
    setSolution(newSolution);
    setInitialGrid([...newPuzzle]);
    setGrid([...newPuzzle]);
    setMistakes([]);
    setBlinkingCell(null);
    setWon(false);
    setRevealed(false);
    setSelectedCell(null);
  };

  const revealAnswer = () => {
    setGrid([...solution]);
    setRevealed(true);
    setMistakes([]);
    setBlinkingCell(null);
  };

  const handleNumberInput = useCallback((num: number) => {
    if (selectedCell === null || won || revealed || blinkingCell === selectedCell) return;
    
    // Prevent editing initial clues
    if (initialGrid[selectedCell] !== 0) return;

    const newGrid = [...grid];
    newGrid[selectedCell] = num;
    setGrid(newGrid);

    // Check for win
    if (!newGrid.includes(0)) {
      const isCorrect = newGrid.every((val, idx) => val === solution[idx]);
      if (isCorrect) {
        setWon(true);
        canvasConfetti({ particleCount: 150, spread: 70 });
      }
    }
  }, [selectedCell, won, revealed, blinkingCell, initialGrid, grid, solution]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (won || revealed) return;
    if (e.key >= '1' && e.key <= '9') {
      handleNumberInput(parseInt(e.key));
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (selectedCell !== null && initialGrid[selectedCell] === 0) {
        setGrid(prev => {
          const newGrid = [...prev];
          newGrid[selectedCell] = 0;
          return newGrid;
        });
      }
    } else if (e.key === 'ArrowRight') {
        setSelectedCell(prev => (prev === null || prev === 80) ? 0 : prev + 1);
    } else if (e.key === 'ArrowLeft') {
        setSelectedCell(prev => (prev === null || prev === 0) ? 80 : prev - 1);
    } else if (e.key === 'ArrowUp') {
        setSelectedCell(prev => (prev === null || prev < 9) ? prev : prev - 9);
    } else if (e.key === 'ArrowDown') {
        setSelectedCell(prev => (prev === null || prev > 71) ? prev : prev + 9);
    }
  }, [won, revealed, handleNumberInput, selectedCell, initialGrid]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const checkMistakes = () => {
    if (won || revealed) return;
    
    const newMistakes: number[] = [];
    grid.forEach((val, idx) => {
      // Don't mark empty cells as mistakes, only filled ones that are wrong
      if (val !== 0 && val !== solution[idx]) {
        newMistakes.push(idx);
      }
    });
    setMistakes(newMistakes);
    
    // Auto clear mistakes styling after 2 seconds
    setTimeout(() => setMistakes([]), 2000);
  };

  const giveHint = () => {
    if (won || revealed) return;
    if (selectedCell === null) return;
    
    // If it's a fixed initial cell, do nothing
    if (initialGrid[selectedCell] !== 0) return;

    const correctVal = solution[selectedCell];
    const currentVal = grid[selectedCell];

    if (currentVal !== correctVal) {
        setBlinkingCell(selectedCell);
        
        setTimeout(() => {
            setBlinkingCell(null);
            setGrid(prevGrid => {
              const newGrid = [...prevGrid];
              newGrid[selectedCell] = correctVal;
              
              // Check for win after update
              if (!newGrid.includes(0) && newGrid.every((v, i) => v === solution[i])) {
                  setWon(true);
                  canvasConfetti({ particleCount: 150, spread: 70 });
              }
              
              return newGrid;
            });
        }, 1500); // Reduced from 3000ms to 1500ms for better UX
    }
  };

  // Render Constraints - shows divisibility relationship between adjacent cells
  // The chevron points to the DIVISOR (the smaller number that divides the larger)
  const renderConstraint = (val1: number, val2: number, type: 'horizontal' | 'vertical') => {
    // Skip if either value is 0 (empty cell) or if values are equal
    if (val1 === 0 || val2 === 0 || val1 === val2) return null;

    let rotation = 0;
    
    // Base shape is a chevron pointing LEFT (<)
    // We point to the divisor (the smaller number that divides the larger)
    
    if (val2 % val1 === 0 && val1 < val2) {
      // val1 divides val2, and val1 is smaller. Point to val1.
      // Horizontal: val1 is left, point Left (0deg)
      // Vertical: val1 is top, point Up (90deg)
      rotation = type === 'horizontal' ? 0 : 90;
    } else if (val1 % val2 === 0 && val2 < val1) {
      // val2 divides val1, and val2 is smaller. Point to val2.
      // Horizontal: val2 is right, point Right (180deg)
      // Vertical: val2 is bottom, point Down (270deg)
      rotation = type === 'horizontal' ? 180 : 270;
    } else {
      // No divisibility relationship (neither divides the other cleanly)
      return null;
    }

    return (
      <div 
        className="absolute flex items-center justify-center pointer-events-none z-40"
        style={{
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          width: '20px',
          height: '20px',
        }}
      >
        <div className="bg-paper rounded-full flex items-center justify-center w-5 h-5 shadow-sm border border-gray-100/50">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
                <path d="M15 18l-6-6 6-6" />
            </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-paper p-4 font-sans text-ink">
       <header className="w-full max-w-lg flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center text-gray-600">
          <ArrowLeft className="w-6 h-6 mr-2" /> <span className="font-medium">Back</span>
        </button>
        <h1 className="text-xl font-serif font-bold text-brownie-dark">"Divides" Sudoku</h1>
        <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={startNewGame}><RefreshCw className="w-4 h-4" /></Button>
        </div>
      </header>

      <div className="max-w-lg w-full bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-6 text-sm text-gray-600">
        <p className="mb-2"><strong className="text-brownie">Rules:</strong> Normal Sudoku rules apply.</p>
        <p className="flex items-center gap-2">
          A <span className="font-bold font-mono">{'<'}</span> symbol between cells means one number divides the other. It points to the smaller number (the divisor).
        </p>
      </div>

      <main className="flex flex-col items-center">
        
        {/* Sudoku Grid */}
        <div className="relative bg-ink p-1 rounded select-none shadow-2xl">
           <div className="grid grid-cols-9 bg-gray-300 gap-[1px] border-2 border-ink">
              {grid.map((cellValue, idx) => {
                const row = Math.floor(idx / 9);
                const col = idx % 9;
                
                const isSelected = selectedCell === idx;
                const isMistake = mistakes.includes(idx);
                const isBlinking = blinkingCell === idx;
                const isInitial = initialGrid[idx] !== 0;
                
                // Borders for 3x3 boxes
                const borderRight = (col + 1) % 3 === 0 && col !== 8 ? 'border-r-2 border-r-ink' : '';
                const borderBottom = (row + 1) % 3 === 0 && row !== 8 ? 'border-b-2 border-b-ink' : '';

                return (
                  <div 
                    key={idx}
                    className={`
                        relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                        flex items-center justify-center text-lg sm:text-xl 
                        cursor-pointer transition-colors duration-100
                        ${borderRight} ${borderBottom}
                        ${isInitial ? 'bg-gray-100 font-bold text-ink' : 'bg-white font-medium text-blue-600'}
                        ${isSelected ? 'z-30' : ''}
                        ${isMistake ? '!bg-red-100 !text-red-600' : ''}
                        ${isBlinking ? 'animate-blink-red' : ''}
                    `}
                    onClick={() => setSelectedCell(idx)}
                  >
                     {/* Outline for Selection - Done as absolute to sit on top of borders */}
                     {isSelected && (
                        <div className="absolute inset-0 ring-4 ring-blue-500 pointer-events-none z-30"></div>
                     )}

                    {cellValue !== 0 && cellValue}
                    
                    {/* Constraints */}
                    {col < 8 && (
                        <div className="absolute right-0 top-1/2 translate-x-1/2 w-0 h-0 z-40">
                            {renderConstraint(solution[idx], solution[idx + 1], 'horizontal')}
                        </div>
                    )}
                    {row < 8 && (
                        <div className="absolute bottom-0 left-1/2 translate-y-1/2 w-0 h-0 z-40">
                            {renderConstraint(solution[idx], solution[idx + 9], 'vertical')}
                        </div>
                    )}
                  </div>
                );
              })}
           </div>
        </div>

        {/* Number Pad */}
        <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                    key={num}
                    className="w-12 h-12 bg-white border border-gray-200 shadow-sm rounded-lg text-xl font-bold text-ink hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all"
                    onClick={() => handleNumberInput(num)}
                >
                    {num}
                </button>
            ))}
             <button
                className="w-12 h-12 bg-red-50 border border-red-100 shadow-sm rounded-lg flex items-center justify-center text-red-600 hover:bg-red-100 active:scale-95 transition-all"
                onClick={() => {
                     if (selectedCell !== null && initialGrid[selectedCell] === 0) {
                        const newGrid = [...grid];
                        newGrid[selectedCell] = 0;
                        setGrid(newGrid);
                     }
                }}
            >
                <Eraser className="w-5 h-5" />
            </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
             <Button variant="secondary" onClick={checkMistakes} disabled={won || revealed}>
                <Check className="w-4 h-4 mr-2" /> Check
             </Button>
             <Button 
                variant="outline" 
                onClick={giveHint}
                disabled={selectedCell === null || initialGrid[selectedCell] !== 0 || won || revealed}
                title={selectedCell === null ? "Select a cell first" : "Fix this cell"}
            >
                <Lightbulb className="w-4 h-4 mr-2" /> Hint
             </Button>
             <Button 
                variant="outline" 
                onClick={revealAnswer}
                disabled={won || revealed}
                title="Reveal the complete solution"
            >
                <Eye className="w-4 h-4 mr-2" /> Reveal
             </Button>
        </div>

        <AnimatePresence>
          {won && (
              <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="mt-6 p-4 bg-green-100 text-green-900 rounded-lg font-bold border border-green-200 shadow-lg"
              >
                  🎉 Puzzle Solved!
              </motion.div>
          )}
          {revealed && !won && (
              <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="mt-6 p-4 bg-amber-100 text-amber-900 rounded-lg font-bold border border-amber-200 shadow-lg"
              >
                  Solution Revealed — Try a new puzzle!
              </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};