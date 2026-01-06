"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { GoalNode as IGoalNode, GoalEdge, ViewState } from './types';
import { GoalNode } from './components/GoalNode';
import { EdgeLine } from './components/EdgeLine';
import { 
  NODE_RADIUS, 
  THEME_COLORS,
  INITIAL_GOAL
} from './constants';
import './styles.css';

interface ContextMenuState {
  x: number;
  y: number;
  type: 'node' | 'edge';
  targetId: string;
}

export interface Project {
  id: string;
  name: string;
  nodes: IGoalNode[];
  edges: GoalEdge[];
  view: ViewState;
  createdAt: number;
  updatedAt: number;
}

interface AppProps {
  projectId: string;
  onBack: () => void;
}

const App: React.FC<AppProps> = ({ projectId, onBack }) => {
  const [nodes, setNodes] = useState<IGoalNode[]>([]);
  const [edges, setEdges] = useState<GoalEdge[]>([]);
  const [view, setView] = useState<ViewState>({ x: 0, y: 0, zoom: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectedId, setInspectedId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  
  const [drawingEdge, setDrawingEdge] = useState<{ fromId: string, toX: number, toY: number } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const isPanning = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const pinchDistance = useRef<number | null>(null);
  const pinchCenter = useRef<{ x: number; y: number } | null>(null);


  const resetGraph = useCallback(() => {
    const initialNode: IGoalNode = {
      id: '1',
      index: 1,
      title: "CORE OBJECTIVE",
      text: INITIAL_GOAL,
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
      radius: NODE_RADIUS,
      color: THEME_COLORS[0],
    };
    setNodes([initialNode]);
    setEdges([]);
    setSelectedId(null);
    setInspectedId(null);
    setContextMenu(null);
    setView({ x: 0, y: 0, zoom: 1 });
  }, []);

  const exportAsPNG = useCallback(async () => {
    if (!canvasRef.current) return;
    
    try {
      // Hide UI elements temporarily
      const buttons = document.querySelectorAll('[data-export-hide]');
      buttons.forEach(btn => {
        (btn as HTMLElement).style.visibility = 'hidden';
      });
      
      // Get project name from localStorage
      const savedProjects = localStorage.getItem('neural_projects_v1');
      let projectName = 'neural-graph';
      if (savedProjects) {
        const parsedProjects: Project[] = JSON.parse(savedProjects);
        const project = parsedProjects.find(p => p.id === projectId);
        if (project) {
          projectName = project.name;
        }
      }
      
      // Capture the canvas area
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#050505',
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
      });
      
      // Show UI elements again
      buttons.forEach(btn => {
        (btn as HTMLElement).style.visibility = 'visible';
      });
      
      // Create download link
      const link = document.createElement('a');
      const sanitizedName = projectName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      link.download = `${sanitizedName}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting graph:', error);
      alert('Failed to export graph. Please try again.');
    }
  }, [canvasRef, projectId]);

  // Load project on mount or when projectId changes
  useEffect(() => {
    const savedProjects = localStorage.getItem('neural_projects_v1');
    if (savedProjects) {
      const parsedProjects: Project[] = JSON.parse(savedProjects);
      const project = parsedProjects.find(p => p.id === projectId);
      if (project) {
        setNodes(project.nodes);
        setEdges(project.edges);
        setView(project.view);
      }
    }
  }, [projectId]);

  // Save current project when nodes/edges/view change
  useEffect(() => {
    const savedProjects = localStorage.getItem('neural_projects_v1');
    if (savedProjects) {
      const parsedProjects: Project[] = JSON.parse(savedProjects);
      const currentProject = parsedProjects.find(p => p.id === projectId);
      if (currentProject) {
        // Only save if data actually changed
        const nodesChanged = JSON.stringify(currentProject.nodes) !== JSON.stringify(nodes);
        const edgesChanged = JSON.stringify(currentProject.edges) !== JSON.stringify(edges);
        const viewChanged = JSON.stringify(currentProject.view) !== JSON.stringify(view);
        
        if (nodesChanged || edgesChanged || viewChanged) {
          const updatedProjects = parsedProjects.map(p => 
            p.id === projectId 
              ? { ...p, nodes, edges, view, updatedAt: Date.now() }
              : p
          );
          localStorage.setItem('neural_projects_v1', JSON.stringify(updatedProjects));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, view, projectId]);

  const handleNodeDrag = useCallback((id: string, dx: number, dy: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x: n.x + dx, y: n.y + dy } : n));
  }, []);

  const handleAddNode = useCallback((x?: number, y?: number) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const finalX = x !== undefined ? x : (typeof window !== 'undefined' ? (window.innerWidth / 2 - view.x) / view.zoom : 400);
    const finalY = y !== undefined ? y : (typeof window !== 'undefined' ? (window.innerHeight / 2 - view.y) / view.zoom : 400);

    const newNode: IGoalNode = {
      id: newId,
      index: nodes.length + 1,
      title: `Node ${nodes.length + 1}`,
      text: "",
      x: finalX,
      y: finalY,
      radius: NODE_RADIUS,
      color: THEME_COLORS[nodes.length % THEME_COLORS.length],
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedId(newId);
  }, [nodes.length, view]);

  const handleCanvasDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('grid-bg') || target === e.currentTarget) {
      const gx = (e.clientX - view.x) / view.zoom;
      const gy = (e.clientY - view.y) / view.zoom;
      handleAddNode(gx, gy);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, id: string, type: 'node' | 'edge') => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, type, targetId: id });
  };

  const handleDeleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.sourceId !== id && e.targetId !== id));
    if (selectedId === id) setSelectedId(null);
    if (inspectedId === id) setInspectedId(null);
  }, [selectedId, inspectedId]);

  const handleDeleteItem = useCallback(() => {
    if (!contextMenu) return;
    const { type, targetId } = contextMenu;
    
    if (type === 'node') {
      handleDeleteNode(targetId);
    } else {
      setEdges(prev => prev.filter(e => e.id !== targetId));
    }
    setContextMenu(null);
  }, [contextMenu, handleDeleteNode]);

  const handleStartEdge = (fromId: string, e: React.MouseEvent) => {
    setDrawingEdge({ fromId, toX: (e.clientX - view.x) / view.zoom, toY: (e.clientY - view.y) / view.zoom });
  };

  const handleMouseMoveGlobal = (e: React.MouseEvent) => {
    // Only pan if middle mouse button or spacebar is held, or if explicitly started panning
    if (isPanning.current && (e.buttons === 1 || e.buttons === 4)) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      setView(v => ({ ...v, x: v.x + dx, y: v.y + dy }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }

    if (drawingEdge) {
      setDrawingEdge(prev => prev ? { 
        ...prev, 
        toX: (e.clientX - view.x) / view.zoom, 
        toY: (e.clientY - view.y) / view.zoom 
      } : null);
    }
  };

  const handleMouseUpGlobal = (e: React.MouseEvent) => {
    if (drawingEdge) {
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      const nodeElement = targetElement?.closest('[data-node-id]');
      const targetId = nodeElement?.getAttribute('data-node-id');

      if (targetId && targetId !== drawingEdge.fromId) {
        const edgeId = `e-${drawingEdge.fromId}-${targetId}`;
        if (!edges.find(edge => edge.id === edgeId)) {
          setEdges(prev => [...prev, { id: edgeId, sourceId: drawingEdge.fromId, targetId }]);
        }
      }
      setDrawingEdge(null);
    }
    isPanning.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleFactor = 0.0008;
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(view.zoom * zoomFactor, 0.1), 5);
    
    // Zoom towards mouse position
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const worldX = (mouseX - view.x) / view.zoom;
    const worldY = (mouseY - view.y) / view.zoom;
    
    const newX = mouseX - worldX * newZoom;
    const newY = mouseY - worldY * newZoom;
    
    setView({ x: newX, y: newY, zoom: newZoom });
  };

  const inspectedNode = nodes.find(n => n.id === inspectedId);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-[#050505] text-slate-100 font-sans grid-bg select-none"
      onWheel={handleWheel}
      onMouseMove={handleMouseMoveGlobal}
      onMouseUp={handleMouseUpGlobal}
      onDoubleClick={handleCanvasDoubleClick}
      onMouseDown={(e) => {
        if (contextMenu) setContextMenu(null);
        // Only start panning if clicking on background (not on a node or edge)
        const target = e.target as HTMLElement;
        if ((e.button === 0 || e.button === 1) && 
            !target.closest('[data-node-id]') && 
            !target.closest('path') &&
            target.classList.contains('grid-bg')) {
          isPanning.current = true;
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        } else if (e.button === 1) {
          // Middle mouse button always pans
          isPanning.current = true;
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
      }}
      onTouchStart={(e) => {
        if (e.touches.length === 2) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
          pinchDistance.current = distance;
          pinchCenter.current = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2,
          };
        } else if (e.touches.length === 1) {
          isPanning.current = true;
          lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length === 2 && pinchDistance.current && pinchCenter.current) {
          e.preventDefault();
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
          const scale = distance / pinchDistance.current;
          
          const newZoom = Math.min(Math.max(view.zoom * scale, 0.1), 5);
          
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = pinchCenter.current.x - rect.left;
          const centerY = pinchCenter.current.y - rect.top;
          
          const worldX = (centerX - view.x) / view.zoom;
          const worldY = (centerY - view.y) / view.zoom;
          
          const newX = centerX - worldX * newZoom;
          const newY = centerY - worldY * newZoom;
          
          setView({ x: newX, y: newY, zoom: newZoom });
          pinchDistance.current = distance;
        } else if (e.touches.length === 1 && isPanning.current) {
          const touch = e.touches[0];
          const dx = touch.clientX - lastMousePos.current.x;
          const dy = touch.clientY - lastMousePos.current.y;
          setView(v => ({ ...v, x: v.x + dx, y: v.y + dy }));
          lastMousePos.current = { x: touch.clientX, y: touch.clientY };
        }
      }}
      onTouchEnd={(e) => {
        if (e.touches.length < 2) {
          pinchDistance.current = null;
          pinchCenter.current = null;
        }
        if (e.touches.length === 0) {
          isPanning.current = false;
        }
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-start gap-4" data-export-hide>
        <div>
          <h1 className="text-sm font-black tracking-[0.4em] text-white uppercase leading-none mb-1">
            NEURAL SYSTEM
          </h1>
          <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-medium">
            Strategic Mapping Interface
          </p>
        </div>
      </div>

      {/* Back to Projects Button */}
      <div className="absolute top-10 right-10 z-50 pointer-events-auto">
        <button
          onClick={onBack}
          data-export-hide
          className="h-12 px-6 glass text-white rounded-full flex items-center gap-3 hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-xl"
        >
          ← Projects
        </button>
      </div>

      <div className="absolute bottom-10 right-10 z-50 flex items-center gap-4">
        <button 
          onClick={() => handleAddNode()}
          data-export-hide
          className="h-14 px-8 glass text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-2xl"
        >
          Add Goal
        </button>
        <button 
          onClick={exportAsPNG}
          data-export-hide
          className="h-14 px-8 glass text-white/60 border border-white/10 rounded-full flex items-center justify-center hover:text-white hover:bg-white/10 hover:border-white/30 transition-all text-xs font-bold uppercase tracking-widest"
        >
          Export PNG
        </button>
        <button 
          onClick={resetGraph}
          data-export-hide
          className="h-14 px-8 glass text-white/40 border border-white/5 rounded-full flex items-center justify-center hover:text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all text-xs font-bold uppercase tracking-widest"
        >
          Reset
        </button>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="absolute z-[200] p-1 rounded-xl glass shadow-2xl animate-in fade-in zoom-in-95 duration-200 min-w-[140px]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleDeleteItem}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <span className="text-lg">✕</span>
            Delete {contextMenu.type}
          </button>
        </div>
      )}

      {inspectedNode && (
        <div className="absolute right-10 top-10 w-96 z-[100] p-8 rounded-[40px] glass shadow-2xl animate-in fade-in slide-in-from-right-10 duration-500 pointer-events-auto flex flex-col" data-export-hide>
          <div className="flex justify-between items-start mb-8">
             <div className="mono text-4xl font-light text-white opacity-40">
              {inspectedNode.index.toString().padStart(2, '0')}
            </div>
            <button 
              onClick={() => setInspectedId(null)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          <label className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold mb-2">Title</label>
          <input 
            className="bg-transparent border-none outline-none text-white font-bold text-2xl w-full mb-8 focus:text-cyan-400 transition-colors"
            value={inspectedNode.title}
            autoFocus
            onChange={(e) => setNodes(prev => prev.map(n => n.id === inspectedId ? { ...n, title: e.target.value } : n))}
            placeholder="Enter goal title..."
          />
          
          <label className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold mb-2">Detailed Notes</label>
          <textarea
            className="flex-1 bg-white/[0.03] rounded-3xl p-6 text-sm text-white/70 outline-none border border-white/5 focus:border-white/20 transition-all resize-none min-h-[300px] leading-relaxed"
            value={inspectedNode.text}
            onChange={(e) => setNodes(prev => prev.map(n => n.id === inspectedId ? { ...n, text: e.target.value } : n))}
            placeholder="Document implementation steps, risks, or key metrics..."
          />

          <button
            onClick={() => setInspectedId(null)}
            className="mt-8 h-14 w-full bg-white text-black rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all shadow-lg"
          >
            Save Changes
          </button>
        </div>
      )}

      <div 
        ref={canvasRef}
        style={{
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%',
        }}
        className="absolute inset-0 pointer-events-none overflow-visible"
      >
        <svg 
          className="absolute pointer-events-none"
          style={{ 
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible'
          }}
        >
          {edges.map(edge => {
            const source = nodes.find(n => n.id === edge.sourceId);
            const target = nodes.find(n => n.id === edge.targetId);
            if (!source || !target) return null;
            return (
              <EdgeLine 
                key={edge.id} 
                id={edge.id} 
                source={source} 
                target={target} 
                onContextMenu={handleContextMenu}
              />
            );
          })}
          
          {drawingEdge && (() => {
            const sourceNode = nodes.find(n => n.id === drawingEdge.fromId);
            if (!sourceNode) return null;
            
            const dx = drawingEdge.toX - sourceNode.x;
            const dy = drawingEdge.toY - sourceNode.y;
            const angle = Math.atan2(dy, dx);
            
            const startX = sourceNode.x + Math.cos(angle) * sourceNode.radius;
            const startY = sourceNode.y + Math.sin(angle) * sourceNode.radius;
            
            return (
              <line 
                x1={startX}
                y1={startY}
                x2={drawingEdge.toX}
                y2={drawingEdge.toY}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="8,8"
              />
            );
          })()}
        </svg>

        <div className="absolute inset-0 pointer-events-none">
          {nodes.map(node => (
            <GoalNode
              key={node.id}
              node={node}
              isSelected={selectedId === node.id}
              zoom={view.zoom}
              onDrag={handleNodeDrag}
              onSelect={setSelectedId}
              onInspect={setInspectedId}
              onStartEdge={handleStartEdge}
              onDelete={handleDeleteNode}
              onContextMenu={handleContextMenu}
            />
          ))}
        </div>
      </div>

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="text-center">
             <div className="text-4xl font-thin tracking-[1em] uppercase mb-4">Neural</div>
             <div className="text-[10px] tracking-widest uppercase">Double Click to Begin...</div>
          </div>
        </div>
      )}

      <div className="absolute bottom-10 left-10 z-50 pointer-events-none flex gap-8 items-center text-[9px] font-bold uppercase tracking-[0.3em] text-white/20" data-export-hide>
        <div className="flex flex-col">
          <span>Active Nodes</span>
          <span className="text-white/40 text-xs mt-1 mono">{nodes.length}</span>
        </div>
        <div className="flex flex-col">
          <span>Connections</span>
          <span className="text-white/40 text-xs mt-1 mono">{edges.length}</span>
        </div>
        <div className="flex flex-col">
          <span>Focal Length</span>
          <span className="text-white/40 text-xs mt-1 mono">{Math.round(view.zoom * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default App;

