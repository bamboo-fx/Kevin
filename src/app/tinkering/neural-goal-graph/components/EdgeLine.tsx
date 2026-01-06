"use client";

import React from 'react';
import { GoalNode } from '../types';

interface EdgeLineProps {
  id: string;
  source: GoalNode;
  target: GoalNode;
  onContextMenu: (e: React.MouseEvent, id: string, type: 'edge') => void;
}

export const EdgeLine: React.FC<EdgeLineProps> = ({ id, source, target, onContextMenu }) => {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const angle = Math.atan2(dy, dx);

  // Calculate edge points exactly at node boundaries
  const startX = source.x + Math.cos(angle) * source.radius;
  const startY = source.y + Math.sin(angle) * source.radius;
  
  const endX = target.x - Math.cos(angle) * target.radius;
  const endY = target.y - Math.sin(angle) * target.radius;

  // Control points for smooth curve
  const cp1X = startX + (endX - startX) * 0.4;
  const cp1Y = startY;
  const cp2X = startX + (endX - startX) * 0.6;
  const cp2Y = endY;

  const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
  
  // Arrowhead positioned exactly at the edge, pointing into the target node
  const arrowSize = 8;

  return (
    <g 
      className="group opacity-40 hover:opacity-100 transition-opacity duration-500"
      onContextMenu={(e) => onContextMenu(e, id, 'edge')}
    >
      {/* Ghost path for wider hover target and right click detection */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth="15"
        className="pointer-events-auto cursor-default"
      />
      {/* Primary Line */}
      <path
        d={path}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="3"
      />
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      
      {/* Directional Arrowhead - positioned exactly at edge, pointing into target node */}
      <path 
        d={`M 0 0 L ${-arrowSize} ${-arrowSize/2} L ${-arrowSize} ${arrowSize/2} Z`} 
        fill="white" 
        transform={`translate(${endX}, ${endY}) rotate(${(angle * 180) / Math.PI})`} 
        className="opacity-80"
      />
    </g>
  );
};

