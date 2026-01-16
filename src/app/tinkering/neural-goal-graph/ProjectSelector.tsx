"use client";

import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Project } from './App';

interface ProjectSelectorProps {
  onSelectProject: (projectId: string) => void;
  onCreateProject: (name: string) => void;
  onDeleteProject: (projectId: string) => void;
  projects: Project[];
}

export function ProjectSelector({ onSelectProject, onCreateProject, onDeleteProject, projects }: ProjectSelectorProps) {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<Project | null>(null);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName("");
      setShowNewProjectDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a0a0a] via-[#050505] to-[#050505] pointer-events-none" />
      
      <div className="absolute top-6 left-6 z-[300]">
        <Link
          href="/tinkering"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group glass px-4 py-2 rounded-full"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm tracking-wide">Back to tinkering</span>
        </Link>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black tracking-[0.4em] text-white uppercase leading-none mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              NEURAL SYSTEM
            </h1>
            <p className="text-sm text-white/40 uppercase tracking-[0.3em] font-medium">
              Strategic Mapping Interface
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="glass rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/30 group w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate flex-1">
                    {project.name}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmProject(project);
                    }}
                    className="ml-2 p-1 hover:bg-red-500/20 rounded text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-2 text-xs text-white/40">
                  <div className="flex items-center gap-4">
                    <span>{project.nodes.length} nodes</span>
                    <span>{project.edges.length} connections</span>
                  </div>
                  <div className="text-[10px] text-white/30">
                    Updated {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}

            {/* New Project Card */}
            <div
              onClick={() => setShowNewProjectDialog(true)}
              className="glass rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 border-2 border-dashed border-white/20 hover:border-white/40 flex flex-col items-center justify-center min-h-[180px] group w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
            >
              <div className="text-4xl mb-3 text-white/40 group-hover:text-white transition-colors">+</div>
              <div className="text-sm font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">
                New Project
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Project Dialog */}
      {showNewProjectDialog && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass rounded-[40px] p-8 shadow-2xl w-96 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-widest">New Project</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateProject();
                } else if (e.key === 'Escape') {
                  setShowNewProjectDialog(false);
                  setNewProjectName("");
                }
              }}
              placeholder="Project name..."
              autoFocus
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15 transition-all mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreateProject}
                className="flex-1 h-12 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewProjectDialog(false);
                  setNewProjectName("");
                }}
                className="flex-1 h-12 bg-white/10 text-white border border-white/20 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass rounded-[40px] p-8 shadow-2xl w-96 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-widest">Delete Project</h2>
            <p className="text-white/70 mb-6">
              Are you sure you want to delete <span className="font-bold text-white">"{deleteConfirmProject.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onDeleteProject(deleteConfirmProject.id);
                  setDeleteConfirmProject(null);
                }}
                className="flex-1 h-12 bg-red-500/20 text-red-400 border border-red-500/40 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-500/30 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmProject(null)}
                className="flex-1 h-12 bg-white/10 text-white border border-white/20 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

