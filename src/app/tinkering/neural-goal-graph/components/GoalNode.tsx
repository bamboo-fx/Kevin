"use client";

import React, { useRef } from 'react';
import { GoalNode as IGoalNode } from '../types';

interface GoalNodeProps {
  node: IGoalNode;
  isSelected: boolean;
  onDrag: (id: string, dx: number, dy: number) => void;
  onSelect: (id: string) => void;
  onInspect: (id: string) => void;
  onStartEdge: (id: string, e: React.MouseEvent) => void;
  onDelete: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string, type: 'node') => void;
  zoom: number;
}

export const GoalNode: React.FC<GoalNodeProps> = ({
  node,
  isSelected,
  onDrag,
  onSelect,
  onInspect,
  onStartEdge,
  onDelete,
  onContextMenu,
  zoom
}) => {
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) return; // Ignore right clicks for dragging
    e.stopPropagation();
    onSelect(node.id);
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - lastMousePos.current.x) / zoom;
    const dy = (e.clientY - lastMousePos.current.y) / zoom;
    onDrag(node.id, dx, dy);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const glowColor = node.color || '#ffffff';
  const borderColor = isSelected ? 'border-white scale-110' : 'border-white/10 hover:border-white/40';

  return (
    <div
      data-node-id={node.id}
      style={{
        transform: `translate(${node.x - node.radius}px, ${node.y - node.radius}px)`,
        width: node.radius * 2,
        height: node.radius * 2,
        position: 'absolute',
      }}
      className={`group flex items-center justify-center rounded-full glass border-2 node-transition cursor-grab active:cursor-grabbing select-none pointer-events-auto ${borderColor}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onInspect(node.id);
      }}
      onContextMenu={(e) => onContextMenu(e, node.id, 'node')}
    >
      <div className={`absolute inset-0 rounded-full border border-white/5 pointer-events-none ${isSelected ? 'animate-ring' : ''}`} />

      <span className="mono text-2xl font-light tracking-tighter text-white/90">
        {node.index.toString().padStart(2, '0')}
      </span>

      <div
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full cursor-crosshair opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-125"
        onMouseDown={(e) => {
          e.stopPropagation();
          onStartEdge(node.id, e);
        }}
      >
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
      </div>

      <div 
        className="absolute inset-0 rounded-full pointer-events-none opacity-[0.05]"
        style={{ boxShadow: `inset 0 0 30px ${glowColor}, 0 0 40px ${glowColor}` }}
      />
    </div>
  );
};


