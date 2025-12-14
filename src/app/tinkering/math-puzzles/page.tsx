"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Scissors, Lightbulb, Grid3X3, BoxSelect, Droplets, Layers, DivideCircle, User, Users, ArrowLeft } from 'lucide-react';
import { Screen, GameMetadata } from './types';
import { BrownieSplit } from './games/BrownieSplit';
import { AchiGame } from './games/AchiGame';
import { RectangleChallenge } from './games/RectangleChallenge';
import { LightSwitches } from './games/LightSwitches';
import { DividesSudoku } from './games/DividesSudoku';
import { CardTrick } from './games/CardTrick';
import { WaterWine } from './games/WaterWine';
import './puzzle-styles.css';

const GAMES: GameMetadata[] = [
  {
    id: 'game-brownie',
    title: 'Dividing Brownies',
    description: 'Find the single straight cut that divides a rectangular brownie with a missing piece into two equal areas.',
    players: '1 Player',
    icon: 'scissors'
  },
  {
    id: 'game-switches',
    title: 'The 100 Lightbulbs',
    description: '100 lightbulbs, 100 passes. Which lights remain on at the end?',
    players: '1 Player',
    icon: 'lightbulb'
  },
  {
    id: 'game-achi',
    title: 'Achi',
    description: 'A classic strategy game from Ghana. Be the first to align three pieces in a row on the 9-point board.',
    players: '2 Players',
    icon: 'grid'
  },
  {
    id: 'game-sudoku',
    title: '"Divides" Sudoku',
    description: 'A "Naked Sudoku" where clues are given only by divisibility relationships between neighbors.',
    players: '1 Player',
    icon: 'divide'
  },
  {
    id: 'game-rectangles',
    title: 'Rectangles',
    description: 'Create two rectangles such that the first has twice the perimeter of the second, and the second has twice the area of the first.',
    players: '1 Player',
    icon: 'box'
  },
  {
    id: 'game-cards',
    title: 'Red-Black Cards',
    description: 'A logic puzzle masquerading as a magic trick involving shuffled piles.',
    players: '1 Player',
    icon: 'layers'
  },
  {
    id: 'game-waterwine',
    title: 'Water & Wine',
    description: 'Mixing liquids back and forth. Which glass is more contaminated?',
    players: '1 Player',
    icon: 'droplet'
  }
];

export default function MathPuzzlesPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'game-brownie':
        return <BrownieSplit onBack={() => setCurrentScreen('home')} />;
      case 'game-achi':
        return <AchiGame onBack={() => setCurrentScreen('home')} />;
      case 'game-rectangles':
        return <RectangleChallenge onBack={() => setCurrentScreen('home')} />;
      case 'game-switches':
        return <LightSwitches onBack={() => setCurrentScreen('home')} />;
      case 'game-sudoku':
        return <DividesSudoku onBack={() => setCurrentScreen('home')} />;
      case 'game-cards':
        return <CardTrick onBack={() => setCurrentScreen('home')} />;
      case 'game-waterwine':
        return <WaterWine onBack={() => setCurrentScreen('home')} />;
      case 'home':
      default:
        return (
          <div className="min-h-screen bg-puzzle-paper text-puzzle-ink font-sans selection:bg-amber-200">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-puzzle-paper/80 backdrop-blur-md border-b border-gray-200/50">
              <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link
                  href="/tinkering"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-puzzle-brownie transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm">Back</span>
                </Link>
                <h1 className="text-lg font-serif font-semibold text-puzzle-ink">Math Puzzles</h1>
                <div className="w-16" />
              </div>
            </header>

            {/* Hero Section */}
            <div className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="inline-flex items-center justify-center p-3 bg-puzzle-ink text-puzzle-paper rounded-xl mb-5 shadow-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 tracking-tight">
                  Choose a Puzzle
                </h2>
                <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
                  Problems from{' '}
                  <a 
                    href="https://www.amazon.com/Mathematics-Human-Flourishing-Francis/dp/0300258518" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-puzzle-brownie hover:underline"
                  >
                    Mathematics for Human Flourishing
                  </a>
                </p>
              </motion.div>
            </div>

            {/* Games Grid */}
            <div className="max-w-5xl mx-auto px-6 pb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GAMES.map((game, index) => (
                  <motion.button
                    key={game.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentScreen(game.id as Screen)}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-puzzle-brownie/20 transition-all text-left group"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`p-2.5 rounded-lg flex-shrink-0
                        ${game.id === 'game-brownie' ? 'bg-amber-50 text-amber-700' : 
                          game.id === 'game-achi' ? 'bg-blue-50 text-blue-700' :
                          game.id === 'game-rectangles' ? 'bg-green-50 text-green-700' :
                          game.id === 'game-switches' ? 'bg-yellow-50 text-yellow-700' :
                          game.id === 'game-sudoku' ? 'bg-purple-50 text-purple-700' :
                          game.id === 'game-cards' ? 'bg-red-50 text-red-700' :
                          'bg-cyan-50 text-cyan-700'}`}>
                        {game.icon === 'scissors' && <Scissors className="w-5 h-5" />}
                        {game.icon === 'lightbulb' && <Lightbulb className="w-5 h-5" />}
                        {game.icon === 'grid' && <Grid3X3 className="w-5 h-5" />}
                        {game.icon === 'box' && <BoxSelect className="w-5 h-5" />}
                        {game.icon === 'divide' && <DivideCircle className="w-5 h-5" />}
                        {game.icon === 'layers' && <Layers className="w-5 h-5" />}
                        {game.icon === 'droplet' && <Droplets className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-lg text-puzzle-ink group-hover:text-puzzle-brownie transition-colors truncate">
                          {game.title}
                        </h3>
                        <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          {game.players.includes('2') ? <Users className="w-3 h-3"/> : <User className="w-3 h-3"/>}
                          {game.players}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {game.description}
                    </p>
                  </motion.button>
                ))}
                
                {/* More Coming Soon Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: GAMES.length * 0.05 }}
                  className="bg-gray-50/50 rounded-xl p-5 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[180px] text-center"
                >
                  <h3 className="font-serif font-semibold text-lg text-gray-400 mb-1">
                    More Coming Soon
                  </h3>
                  <p className="text-xs text-gray-400">
                    New puzzles on the way
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main>
        {renderScreen()}
    </main>
  );
}

