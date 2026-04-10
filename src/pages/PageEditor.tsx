import { useOutletContext } from "react-router-dom";
import type { ProjectOutletContext } from "../Interface/Project";

function PageEditor() {
    const { project } = useOutletContext<ProjectOutletContext>();

    return (
        <div>
            <h2 style={{ fontFamily: "monospace", fontSize: "18px", padding: "16px" }}>
                {project.name} — Page Editor
            </h2>
        </div>
    );
}

export default PageEditor;
