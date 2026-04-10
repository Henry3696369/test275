import type { Project } from "../Interface/Project";

const STORAGE_KEY = "drafter-drafter-projects";

export function saveProjects(projects: Project[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects(): Project[] | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    try {
        return JSON.parse(data) as Project[];
    } catch {
        return null;
    }
}
