"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import { Button } from '../components/Button';

interface CardTrickProps {
  onBack: () => void;
}

interface Card {
  id: number;
  color: 'red' | 'black';
}

export const CardTrick: React.FC<CardTrickProps> = ({ onBack }) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [pile1, setPile1] = useState<Card[]>([]);
  const [pile2, setPile2] = useState<Card[]>([]);
  const [stage, setStage] = useState<'init' | 'shuffling' | 'split' | 'reveal'>('init');

  const initializeDeck = () => {
    const newDeck: Card[] = [];
    for (let i = 0; i < 52; i++) {
      newDeck.push({
        id: i,
        color: i < 26 ? 'red' : 'black'
      });
    }
    // Shuffle
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    setDeck(newDeck);
    setPile1([]);
    setPile2([]);
    setStage('shuffling');
    
    setTimeout(() => {
        setStage('split');
        // Split deck
        setPile1(newDeck.slice(0, 26));
        setPile2(newDeck.slice(26, 52));
    }, 1500);
  };

  const reveal = () => {
    setStage('reveal');
  };

  const getCounts = (pile: Card[]) => {
    return {
        red: pile.filter(c => c.color === 'red').length,
        black: pile.filter(c => c.color === 'black').length
    };
  };

  const p1Counts = getCounts(pile1);
  const p2Counts = getCounts(pile2);

  return (
    <div className="flex flex-col items-center min-h-screen bg-paper p-4 font-sans text-ink">
      <header className="w-full max-w-2xl flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center text-gray-600">
          <ArrowLeft className="w-6 h-6 mr-2" /> <span className="font-medium">Back</span>
        </button>
        <h1 className="text-xl font-serif font-bold text-brownie-dark">Red-Black Card Trick</h1>
        <Button variant="outline" size="sm" onClick={() => setStage('init')}><RefreshCw className="w-4 h-4 mr-2" /> Reset</Button>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center">
        
        {stage === 'init' && (
             <div className="text-center py-12">
                <Layers className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="mb-6 text-lg text-gray-600">
                    We have a standard deck of 52 cards (26 Red, 26 Black).
                    <br />We will shuffle them and split them into two equal piles of 26.
                </p>
                <Button size="lg" onClick={initializeDeck}>Shuffle & Split</Button>
             </div>
        )}

        {stage === 'shuffling' && (
            <div className="flex flex-col items-center justify-center py-20">
                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="w-24 h-32 bg-indigo-900 rounded-lg border-4 border-white shadow-xl mb-4"
                />
                <p className="font-serif italic text-gray-500">Shuffling...</p>
            </div>
        )}

        {(stage === 'split' || stage === 'reveal') && (
            <div className="w-full grid grid-cols-2 gap-8 mb-8">
                {/* Pile 1 */}
                <div className="flex flex-col items-center">
                    <h3 className="font-bold mb-4 text-lg">Pile 1</h3>
                    <div className="relative w-32 h-44">
                        {pile1.map((card, i) => (
                            <motion.div
                                key={card.id}
                                initial={{ y: -200, opacity: 0 }}
                                animate={{ y: i * 0.5, opacity: 1, rotate: Math.random() * 4 - 2 }}
                                transition={{ delay: i * 0.02 }}
                                className="absolute w-full h-full bg-white rounded-lg border border-gray-300 shadow-sm flex items-center justify-center"
                                style={{ zIndex: i }}
                            >
                                {stage === 'reveal' && (
                                    <div className={`font-bold text-2xl ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                                        {card.color === 'red' ? '♥' : '♠'}
                                    </div>
                                )}
                                {stage === 'split' && (
                                    <div className="w-full h-full bg-indigo-900 rounded-lg border-2 border-white" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <AnimatePresence>
                        {stage === 'reveal' && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center w-full"
                            >
                                <div className="text-red-600 font-bold text-xl">{p1Counts.red} Red</div>
                                <div className="text-gray-400 text-sm">{p1Counts.black} Black</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pile 2 */}
                <div className="flex flex-col items-center">
                    <h3 className="font-bold mb-4 text-lg">Pile 2</h3>
                    <div className="relative w-32 h-44">
                        {pile2.map((card, i) => (
                            <motion.div
                                key={card.id}
                                initial={{ y: -200, opacity: 0 }}
                                animate={{ y: i * 0.5, opacity: 1, rotate: Math.random() * 4 - 2 }}
                                transition={{ delay: 0.5 + i * 0.02 }}
                                className="absolute w-full h-full bg-white rounded-lg border border-gray-300 shadow-sm flex items-center justify-center"
                                style={{ zIndex: i }}
                            >
                                {stage === 'reveal' && (
                                    <div className={`font-bold text-2xl ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                                        {card.color === 'red' ? '♥' : '♠'}
                                    </div>
                                )}
                                {stage === 'split' && (
                                    <div className="w-full h-full bg-indigo-900 rounded-lg border-2 border-white" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <AnimatePresence>
                        {stage === 'reveal' && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center w-full"
                            >
                                <div className="text-gray-400 text-sm">{p2Counts.red} Red</div>
                                <div className="text-black font-bold text-xl">{p2Counts.black} Black</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        )}

        {stage === 'split' && (
            <div className="text-center mt-8">
                <p className="text-xl font-serif italic mb-6">
                    "The number of Red cards in Pile 1 is exactly equal to the number of Black cards in Pile 2."
                </p>
                <Button size="lg" onClick={reveal}>Reveal & Verify</Button>
            </div>
        )}

        {stage === 'reveal' && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100 max-w-lg"
            >
                <h4 className="font-bold text-brownie mb-4 text-lg">The Explanation</h4>
                <div className="text-gray-700 text-base leading-relaxed space-y-4">
                    <p>
                        <strong>1. Pile 1 has 26 cards.</strong><br/>
                        It contains some Red cards (R<sub>1</sub>) and some Black cards (B<sub>1</sub>).<br/>
                        <span className="font-mono text-sm bg-gray-100 px-1 rounded">R<sub>1</sub> + B<sub>1</sub> = 26</span> &nbsp;→&nbsp; <strong>R<sub>1</sub> = 26 - B<sub>1</sub></strong>
                    </p>
                    <p>
                        <strong>2. The full deck has 26 Black cards.</strong><br/>
                        These are distributed between Pile 1 (B<sub>1</sub>) and Pile 2 (B<sub>2</sub>).<br/>
                        <span className="font-mono text-sm bg-gray-100 px-1 rounded">B<sub>1</sub> + B<sub>2</sub> = 26</span> &nbsp;→&nbsp; <strong>B<sub>2</sub> = 26 - B<sub>1</sub></strong>
                    </p>
                    <div className="font-medium text-brownie bg-amber-100/50 p-3 rounded-lg border border-amber-200">
                        Since both R<sub>1</sub> and B<sub>2</sub> are equal to <span className="font-mono text-sm">(26 - B<sub>1</sub>)</span>, they must be equal to each other.<br/>
                        <div className="text-center mt-2 text-xl font-bold">R<sub>1</sub> = B<sub>2</sub></div>
                    </div>
                </div>
            </motion.div>
        )}

      </main>
    </div>
  );
};