import { Navigate, Outlet, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import type { ProjectsProps, ProjectOutletContext } from "../Interface/Project";

function ProjectLayout({ projects, setProjects }: ProjectsProps) {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === Number(id));

    if (!project) {
        return <Navigate to="/" replace />;
    }

    const context: ProjectOutletContext = { project, projects, setProjects };

    return (
        <>
            <NavBar currentProject={project} />
            <Outlet context={context} />
        </>
    );
}

export default ProjectLayout;
