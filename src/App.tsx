import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import type { Project } from "./Interface/Project";
import { PROJECTS } from "./Interface/Project";

import "./App.css";
import Dashboard from "./pages/dashboard";
//import ProjectView from "./pages/ProjectView";
export function App() {
    const [projects, setProjects] = useState<Project[]>(PROJECTS);
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Dashboard
                            projects={projects}
                            setProjects={setProjects}
                        />
                    }
                />
                {/* <Route
                    path="/project/:id"
                    element={
                        <ProjectView
                            projects={projects}
                            setProjects={setProjects}
                        />
                    }
                /> */}
            </Routes>
        </Router>
    );
}

export default App;
