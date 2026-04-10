import { useOutletContext } from "react-router-dom";
import type { ProjectOutletContext } from "../Interface/Project";

function PageGraph() {
    const { project } = useOutletContext<ProjectOutletContext>();

    return (
        <div>
            <h2 style={{ fontFamily: "monospace", fontSize: "18px", padding: "16px" }}>
                {project.name} — Page Graph
            </h2>
        </div>
    );
}

export default PageGraph;
