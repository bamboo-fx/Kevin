"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, FlaskConical } from 'lucide-react';
import { Button } from '../components/Button';

interface WaterWineProps {
  onBack: () => void;
}

export const WaterWine: React.FC<WaterWineProps> = ({ onBack }) => {
  // Volume in ml. Assume glass size 100ml.
  // Composition: { wine: number, water: number }
  const [glassA, setGlassA] = useState({ wine: 100, water: 0 }); // Wine Glass
  const [glassB, setGlassB] = useState({ wine: 0, water: 100 }); // Water Glass
  const [step, setStep] = useState(0); // 0: Start, 1: A->B, 2: B->A (Mixed)

  const SPOON_SIZE = 20;

  const reset = () => {
    setGlassA({ wine: 100, water: 0 });
    setGlassB({ wine: 0, water: 100 });
    setStep(0);
  };

  const transferAtoB = () => {
    // Take spoonful from A. A is 100% wine initially, but let's do math properly for generalized case
    const totalVolA = glassA.wine + glassA.water;
    const fractionWine = glassA.wine / totalVolA;
    const fractionWater = glassA.water / totalVolA;

    const transferWine = SPOON_SIZE * fractionWine;
    const transferWater = SPOON_SIZE * fractionWater;

    setGlassA({
        wine: glassA.wine - transferWine,
        water: glassA.water - transferWater
    });

    setGlassB({
        wine: glassB.wine + transferWine,
        water: glassB.water + transferWater
    });
    setStep(1);
  };

  const transferBtoA = () => {
    // Take spoonful from B (mixed) back to A.
    const totalVolB = glassB.wine + glassB.water;
    const fractionWine = glassB.wine / totalVolB;
    const fractionWater = glassB.water / totalVolB;

    const transferWine = SPOON_SIZE * fractionWine;
    const transferWater = SPOON_SIZE * fractionWater;

    setGlassB({
        wine: glassB.wine - transferWine,
        water: glassB.water - transferWater
    });

    setGlassA({
        wine: glassA.wine + transferWine,
        water: glassA.water + transferWater
    });
    setStep(2);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-paper p-4 font-sans text-ink">
      <header className="w-full max-w-2xl flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center text-gray-600">
          <ArrowLeft className="w-6 h-6 mr-2" /> <span className="font-medium">Back</span>
        </button>
        <h1 className="text-xl font-serif font-bold text-brownie-dark">Water & Wine</h1>
        <Button variant="outline" size="sm" onClick={reset}><RefreshCw className="w-4 h-4 mr-2" /> Reset</Button>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center">
        
        <div className="grid grid-cols-2 gap-12 mb-12 w-full max-w-md">
            {/* Glass A (Starts as Wine) */}
            <div className="flex flex-col items-center">
                <div className="relative w-24 h-32 border-b-4 border-l-2 border-r-2 border-gray-400 rounded-b-xl overflow-hidden bg-gray-50">
                    {/* Liquid */}
                    <motion.div 
                        className="absolute bottom-0 left-0 w-full bg-red-800/90"
                        animate={{ height: `${(glassA.wine + glassA.water)}%` }}
                    >
                         {/* Visual approximation of mixing: simply opacity or color blend? 
                            Let's use a water overlay for simplicity of CSS
                         */}
                         <div 
                            className="absolute inset-0 bg-blue-400"
                            style={{ opacity: glassA.water / (glassA.wine + glassA.water || 1) }}
                         />
                    </motion.div>
                </div>
                <h3 className="mt-4 font-bold text-lg">Wine Glass</h3>
                <div className="text-xs text-gray-500 mt-1 space-y-1">
                    <div>Wine: {glassA.wine.toFixed(1)}</div>
                    <div>Water: {glassA.water.toFixed(1)}</div>
                </div>
            </div>

            {/* Glass B (Starts as Water) */}
            <div className="flex flex-col items-center">
                <div className="relative w-24 h-32 border-b-4 border-l-2 border-r-2 border-gray-400 rounded-b-xl overflow-hidden bg-gray-50">
                     <motion.div 
                        className="absolute bottom-0 left-0 w-full bg-blue-400"
                        animate={{ height: `${(glassB.wine + glassB.water)}%` }}
                    >
                         <div 
                            className="absolute inset-0 bg-red-800"
                            style={{ opacity: glassB.wine / (glassB.wine + glassB.water || 1) }}
                         />
                    </motion.div>
                </div>
                <h3 className="mt-4 font-bold text-lg">Water Glass</h3>
                <div className="text-xs text-gray-500 mt-1 space-y-1">
                    <div>Wine: {glassB.wine.toFixed(1)}</div>
                    <div>Water: {glassB.water.toFixed(1)}</div>
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-4">
            {step === 0 && (
                <>
                <p className="text-gray-600 text-center max-w-md mb-4">
                    Step 1: Take a spoon of Wine ({SPOON_SIZE}ml) and put it into the Water glass.
                </p>
                <Button onClick={transferAtoB}>Transfer Wine → Water</Button>
                </>
            )}
            {step === 1 && (
                <>
                <p className="text-gray-600 text-center max-w-md mb-4">
                    Step 2: Mix perfectly. Take a spoon of the mixture ({SPOON_SIZE}ml) and put it back into the Wine glass.
                </p>
                <Button onClick={transferBtoA}>Transfer Mix → Wine</Button>
                </>
            )}
            {step === 2 && (
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-center animate-fade-in">
                    <h4 className="font-bold text-brownie text-xl mb-4">Result</h4>
                    <p className="mb-4 text-gray-800">
                        Is there more water in the wine glass, or wine in the water glass?
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm font-mono mb-6">
                        <div className="p-2 bg-white rounded border">
                            Water in Wine Glass: <br/>
                            <strong className="text-blue-600 text-lg">{glassA.water.toFixed(2)}</strong>
                        </div>
                        <div className="p-2 bg-white rounded border">
                            Wine in Water Glass: <br/>
                            <strong className="text-red-700 text-lg">{glassB.wine.toFixed(2)}</strong>
                        </div>
                    </div>
                    <p className="text-gray-600 italic">
                        They are exactly equal! Since the volumes of liquid in both glasses returned to the start (100ml), 
                        any missing Wine from Glass A must have been replaced by an equal amount of Water.
                    </p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
};