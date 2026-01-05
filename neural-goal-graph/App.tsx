
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoalNode as IGoalNode, GoalEdge, ViewState } from './types';
import { GoalNode } from './components/GoalNode';
import { EdgeLine } from './components/EdgeLine';
import { 
  NODE_RADIUS, 
  THEME_COLORS,
  INITIAL_GOAL
} from './constants';

interface ContextMenuState {
  x: number;
  y: number;
  type: 'node' | 'edge';
  targetId: string;
}

const App: React.FC = () => {
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

  const resetGraph = useCallback(() => {
    const initialNode: IGoalNode = {
      id: '1',
      index: 1,
      title: "CORE OBJECTIVE",
      text: INITIAL_GOAL,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
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

  useEffect(() => {
    const savedNodes = localStorage.getItem('neural_nodes_v4');
    const savedEdges = localStorage.getItem('neural_edges_v4');
    
    if (savedNodes && savedEdges) {
      setNodes(JSON.parse(savedNodes));
      setEdges(JSON.parse(savedEdges));
    } else {
      resetGraph();
    }
  }, [resetGraph]);

  useEffect(() => {
    if (nodes.length > 0) {
      localStorage.setItem('neural_nodes_v4', JSON.stringify(nodes));
      localStorage.setItem('neural_edges_v4', JSON.stringify(edges));
    }
  }, [nodes, edges]);

  const handleNodeDrag = useCallback((id: string, dx: number, dy: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x: n.x + dx, y: n.y + dy } : n));
  }, []);

  const handleAddNode = useCallback((x?: number, y?: number) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const finalX = x !== undefined ? x : (window.innerWidth / 2 - view.x) / view.zoom;
    const finalY = y !== undefined ? y : (window.innerHeight / 2 - view.y) / view.zoom;

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
    // Removed setInspectedId(newId) so it doesn't open the tab immediately on creation
  }, [nodes.length, view]);

  const handleCanvasDoubleClick = (e: React.MouseEvent) => {
    // Only trigger if double clicking the background
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
    if (isPanning.current) {
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
    const scaleFactor = 0.001;
    const newZoom = Math.min(Math.max(view.zoom - e.deltaY * scaleFactor, 0.1), 3);
    setView(v => ({ ...v, zoom: newZoom }));
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
        if (e.button === 0 || e.button === 1) {
          isPanning.current = true;
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute top-10 left-10 z-50 pointer-events-none flex items-center gap-4">
        <div>
          <h1 className="text-sm font-black tracking-[0.4em] text-white uppercase leading-none mb-1">
            NEURAL SYSTEM
          </h1>
          <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-medium">
            Strategic Mapping Interface
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 z-50 flex items-center gap-4">
        <button 
          onClick={() => handleAddNode()}
          className="h-14 px-8 glass text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-2xl"
        >
          Add Goal
        </button>
        <button 
          onClick={resetGraph}
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
        <div className="absolute right-10 top-10 w-96 z-[100] p-8 rounded-[40px] glass shadow-2xl animate-in fade-in slide-in-from-right-10 duration-500 pointer-events-auto flex flex-col">
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
        style={{
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%',
        }}
        className="absolute inset-0 transition-transform duration-75 ease-out pointer-events-none"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
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

      <div className="absolute bottom-10 left-10 z-50 pointer-events-none flex gap-8 items-center text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
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
