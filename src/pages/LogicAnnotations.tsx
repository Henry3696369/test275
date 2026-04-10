import { useOutletContext } from "react-router-dom";
import type { ProjectOutletContext } from "../Interface/Project";

function LogicAnnotations() {
    const { project } = useOutletContext<ProjectOutletContext>();

    return (
        <div>
            <h2 style={{ fontFamily: "monospace", fontSize: "18px", padding: "16px" }}>
                {project.name} — Logic Annotations
            </h2>
        </div>
    );
}

export default LogicAnnotations;
