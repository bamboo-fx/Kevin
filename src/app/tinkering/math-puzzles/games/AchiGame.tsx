"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, HelpCircle, Trophy } from 'lucide-react';
import { Button } from '../components/Button';
import canvasConfetti from 'canvas-confetti';

interface AchiGameProps {
  onBack: () => void;
}

type Player = 'red' | 'blue';
type Cell = Player | null;
type Phase = 'placement' | 'movement';

const CONNECTIONS = [
  [0, 1], [1, 2],
  [3, 4], [4, 5],
  [6, 7], [7, 8],
  [0, 3], [3, 6],
  [1, 4], [4, 7],
  [2, 5], [5, 8],
  [0, 4], [4, 8],
  [2, 4], [4, 6]
];

// Adjacency list for movement validation
const ADJACENCY: Record<number, number[]> = {
  0: [1, 3, 4],
  1: [0, 2, 4],
  2: [1, 5, 4],
  3: [0, 4, 6],
  4: [0, 1, 2, 3, 5, 6, 7, 8],
  5: [2, 4, 8],
  6: [3, 4, 7],
  7: [6, 4, 8],
  8: [4, 5, 7]
};

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diags
];

export const AchiGame: React.FC<AchiGameProps> = ({ onBack }) => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('red'); // Red starts
  const [phase, setPhase] = useState<Phase>('placement');
  const [piecesPlaced, setPiecesPlaced] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [showRules, setShowRules] = useState(true);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('red');
    setPhase('placement');
    setPiecesPlaced(0);
    setSelectedPiece(null);
    setWinner(null);
  };

  const checkWin = (currentBoard: Cell[]): Player | null => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (winner) return;

    // Phase 1: Placement
    if (phase === 'placement') {
      if (board[index] !== null) return;

      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
      
      const newPiecesPlaced = piecesPlaced + 1;
      setPiecesPlaced(newPiecesPlaced);

      const gameWinner = checkWin(newBoard);
      if (gameWinner) {
        handleWin(gameWinner);
        return;
      }

      if (newPiecesPlaced === 8) {
        setPhase('movement');
        setTurn('red'); // Cycle back to Red or whoever's turn is next? 
        // Rules say: "players take turns pushing...". Usually continues turn order.
        // If Red started (0), Blue(1), Red(2), Blue(3), Red(4), Blue(5), Red(6), Blue(7).
        // Next turn would be Red (turn 8).
        // Wait, standard Achi rule: 4 pieces each. Total 8.
        // If 8 placed, the board has 1 empty spot.
        setTurn('red'); // Red moves first in phase 2 usually if they started phase 1
      } else {
        setTurn(turn === 'red' ? 'blue' : 'red');
      }
    } 
    // Phase 2: Movement
    else {
      // Selecting own piece
      if (board[index] === turn) {
        setSelectedPiece(index);
      }
      // Moving to empty spot
      else if (board[index] === null && selectedPiece !== null) {
        // Check adjacency
        if (ADJACENCY[selectedPiece].includes(index)) {
          const newBoard = [...board];
          newBoard[index] = turn;
          newBoard[selectedPiece] = null;
          setBoard(newBoard);
          setSelectedPiece(null);

          const gameWinner = checkWin(newBoard);
          if (gameWinner) {
            handleWin(gameWinner);
          } else {
            setTurn(turn === 'red' ? 'blue' : 'red');
          }
        }
      }
    }
  };

  const handleWin = (player: Player) => {
    setWinner(player);
    canvasConfetti({
      particleCount: 150,
      spread: 70,
      colors: player === 'red' ? ['#ef4444', '#b91c1c'] : ['#3b82f6', '#1d4ed8']
    });
  };

  // Helper to render board lines
  const renderLines = () => {
    // We use percentages to ensure perfect alignment regardless of container size
    // Grid cells are at 1/6 (16.66%), 3/6 (50%), 5/6 (83.33%)
    const getCoord = (i: number) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return {
        x: `${((col * 2 + 1) / 6) * 100}%`,
        y: `${((row * 2 + 1) / 6) * 100}%`
      };
    };

    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {CONNECTIONS.map(([start, end], i) => {
          const s = getCoord(start);
          const e = getCoord(end);
          return (
            <line
              key={i}
              x1={s.x}
              y1={s.y}
              x2={e.x}
              y2={e.y}
              stroke="#e5e7eb"
              strokeWidth="8"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-paper p-4 font-sans text-ink">
       <AnimatePresence>
        {showRules && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="bg-white max-w-md w-full rounded-xl shadow-2xl p-8"
            >
              <h2 className="text-3xl font-serif mb-4 text-brownie-dark">How to Play Achi</h2>
              <div className="space-y-4 text-gray-600 mb-6">
                <div>
                  <h3 className="font-bold text-ink">Phase 1: Placement</h3>
                  <p>Take turns placing 4 pieces each. If you get 3 in a row, you win immediately!</p>
                </div>
                <div>
                  <h3 className="font-bold text-ink">Phase 2: Movement</h3>
                  <p>Once all 8 pieces are placed, take turns sliding your pieces along the lines to the empty spot. First to get 3 in a row wins.</p>
                </div>
              </div>
              <Button onClick={() => setShowRules(false)} className="w-full">Got it!</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center text-gray-600">
          <ArrowLeft className="w-6 h-6 mr-2" /> <span className="font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-serif font-bold text-brownie-dark">Achi</h1>
        <Button variant="secondary" size="sm" onClick={() => setShowRules(true)}>
          <HelpCircle className="w-4 h-4" />
        </Button>
      </header>

      <main className="flex flex-col items-center w-full max-w-md">
        
        {/* Status Bar */}
        <div className="flex items-center justify-between w-full mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className={`flex items-center space-x-2 ${turn === 'red' ? 'opacity-100' : 'opacity-40'}`}>
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm" />
            <span className="font-bold">Red</span>
          </div>
          <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            {winner ? "Game Over" : phase}
          </div>
          <div className={`flex items-center space-x-2 ${turn === 'blue' ? 'opacity-100' : 'opacity-40'}`}>
            <span className="font-bold">Blue</span>
            <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm" />
          </div>
        </div>

        {/* Game Board */}
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]">
          {renderLines()}
          
          <div className="relative z-10 w-full h-full grid grid-cols-3 grid-rows-3">
            {board.map((cell, index) => {
              const isSelectable = !winner && (
                (phase === 'placement' && cell === null) ||
                (phase === 'movement' && (
                  (cell === turn) || 
                  (cell === null && selectedPiece !== null && ADJACENCY[selectedPiece].includes(index))
                ))
              );

              const isSelected = selectedPiece === index;

              return (
                <div key={index} className="flex items-center justify-center">
                  <motion.button
                    whileHover={isSelectable ? { scale: 1.1 } : {}}
                    whileTap={isSelectable ? { scale: 0.95 } : {}}
                    onClick={() => handleCellClick(index)}
                    className={`
                      w-12 h-12 rounded-full shadow-lg border-2 transition-all duration-200
                      ${cell === 'red' ? 'bg-red-500 border-red-600' : 
                        cell === 'blue' ? 'bg-blue-500 border-blue-600' : 
                        'bg-white border-gray-300'}
                      ${isSelected ? 'ring-4 ring-amber-400 ring-offset-2 scale-110' : ''}
                      ${!cell && isSelectable && phase === 'movement' ? 'bg-amber-100/50 border-amber-300 border-dashed' : ''}
                      ${!isSelectable && !cell ? 'cursor-default' : 'cursor-pointer'}
                    `}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {winner && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="mt-8 p-6 bg-white rounded-xl shadow-lg border-2 border-amber-100 text-center"
          >
            <div className="flex justify-center mb-2">
              <Trophy className={`w-8 h-8 ${winner === 'red' ? 'text-red-500' : 'text-blue-500'}`} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {winner === 'red' ? 'Red' : 'Blue'} Wins!
            </h3>
            <Button onClick={resetGame}>Play Again</Button>
          </motion.div>
        )}

      </main>
    </div>
  );
};