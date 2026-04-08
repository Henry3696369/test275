export interface Project {
    id: number;
    name: string;
    lastModified: string;
}

export interface ProjectsProps {
    projects: Project[];
    setProjects: (p: Project[]) => void;
}
export const PROJECTS = [
    { id: 1, name: "Final Project: Web App", lastModified: "2026-04-07" },
    { id: 2, name: "Chemistry Lab Planner", lastModified: "2026-04-01" },
    { id: 3, name: "History Site Draft", lastModified: "2026-03-25" },
];
