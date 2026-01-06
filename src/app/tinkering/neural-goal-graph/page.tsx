"use client";

import { useState, useEffect } from "react";
import { PageTransition } from "@/components/page-transition";
import App, { Project } from "./App";
import { ProjectSelector } from "./ProjectSelector";
import { GoalNode as IGoalNode } from './types';
import { NODE_RADIUS, THEME_COLORS, INITIAL_GOAL } from './constants';

export default function NeuralGoalGraphPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('neural_projects_v1');
    
    if (savedProjects) {
      const parsedProjects: Project[] = JSON.parse(savedProjects);
      setProjects(parsedProjects);
    } else {
      // Migrate old data if it exists
      const oldNodes = localStorage.getItem('neural_nodes_v4');
      const oldEdges = localStorage.getItem('neural_edges_v4');
      
      if (oldNodes && oldEdges) {
        const migratedProject: Project = {
          id: Math.random().toString(36).substr(2, 9),
          name: "Migrated Project",
          nodes: JSON.parse(oldNodes),
          edges: JSON.parse(oldEdges),
          view: { x: 0, y: 0, zoom: 1 },
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setProjects([migratedProject]);
        localStorage.setItem('neural_projects_v1', JSON.stringify([migratedProject]));
        // Clean up old storage
        localStorage.removeItem('neural_nodes_v4');
        localStorage.removeItem('neural_edges_v4');
      }
    }
    setIsLoading(false);
  }, []);

  const handleCreateProject = (name: string) => {
    const projectId = Math.random().toString(36).substr(2, 9);
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
    
    const newProject: Project = {
      id: projectId,
      name: name || `Project ${projects.length + 1}`,
      nodes: [initialNode],
      edges: [],
      view: { x: 0, y: 0, zoom: 1 },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setSelectedProjectId(projectId);
    localStorage.setItem('neural_projects_v1', JSON.stringify(updatedProjects));
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
    
    localStorage.setItem('neural_projects_v1', JSON.stringify(updatedProjects));
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
  };

  if (isLoading) {
    return null;
  }

  return (
    <PageTransition>
      <div className="fixed inset-0 w-screen h-screen">
        {selectedProjectId ? (
          <App projectId={selectedProjectId} onBack={handleBackToProjects} />
        ) : (
          <ProjectSelector
            projects={projects}
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </div>
    </PageTransition>
  );
}




