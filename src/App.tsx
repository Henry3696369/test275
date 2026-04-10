import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import type { Project } from "./Interface/Project";
import { PROJECTS } from "./Interface/Project";
import { saveProjects, loadProjects } from "./utils/storage";
import Dashboard from "./pages/dashboard";
import ProjectLayout from "./components/ProjectLayout";
import ProjectOverview from "./pages/ProjectOverview";
import PageGraph from "./pages/PageGraph";
import PageEditor from "./pages/PageEditor";
import StateEditor from "./pages/StateEditor";
import LogicAnnotations from "./pages/LogicAnnotations";
import ExportPage from "./pages/ExportPage";

export function App() {
    const [projects, setProjects] = useState<Project[]>(() => {
        return loadProjects() ?? PROJECTS;
    });

    //const [projects, setProjects] = useState<Project[]>(PROJECTS);

    useEffect(() => {
        saveProjects(projects);
    }, [projects]);

    const handleSetProjects = useCallback((newProjects: Project[]) => {
        setProjects(newProjects);
    }, []);

    const sharedProps = {
        projects,
        setProjects: handleSetProjects,
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard {...sharedProps} />} />
                <Route
                    path="/project/:id"
                    element={<ProjectLayout {...sharedProps} />}
                >
                    <Route index element={<ProjectOverview />} />
                    <Route path="page-graph" element={<PageGraph />} />
                    <Route path="page-editor" element={<PageEditor />} />
                    <Route path="state-editor" element={<StateEditor />} />
                    <Route path="logic" element={<LogicAnnotations />} />
                    <Route path="export" element={<ExportPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
