import { useState, type KeyboardEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { ProjectOutletContext } from "../Interface/Project";

function ProjectOverview() {
    const navigate = useNavigate();
    const { project, projects, setProjects } =
        useOutletContext<ProjectOutletContext>();

    const [isEditingName, setIsEditingName] = useState(false);
    const [draftName, setDraftName] = useState(project.name);
    const [draftDescription, setDraftDescription] = useState(
        project.description ?? "",
    );
    const [saved, setSaved] = useState(false);

    function handleSaveMetadata() {
        const trimmedName = draftName.trim();
        if (!trimmedName) return;

        const updated = projects.map((p) =>
            p.id === project.id ?
                {
                    ...p,
                    name: trimmedName,
                    description: draftDescription,
                    lastModified: new Date().toISOString().split("T")[0],
                }
            :   p,
        );

        setProjects(updated);
        setIsEditingName(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function handleNameKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            setIsEditingName(false);
        } else if (e.key === "Escape") {
            setDraftName(project.name);
            setIsEditingName(false);
        }
    }

    const hasChanges =
        draftName.trim() !== project.name ||
        draftDescription !== (project.description ?? "");

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--color-background-tertiary)",
            }}
        >
            <main
                style={{
                    maxWidth: "760px",
                    margin: "0 auto",
                    padding: "2.5rem 1.5rem",
                }}
            >
                <button
                    onClick={() => void navigate("/")}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--color-text-secondary)",
                        fontSize: "13px",
                        padding: "0",
                        marginBottom: "1.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M9 11L5 7L9 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Back to projects
                </button>

                <div
                    style={{
                        background: "var(--color-background-primary)",
                        border: "0.5px solid var(--color-border-tertiary)",
                        borderRadius: "var(--border-radius-lg)",
                        padding: "1.75rem 2rem",
                        marginBottom: "1rem",
                    }}
                >
                    {/* Section label */}
                    <p
                        style={{
                            fontSize: "11px",
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-text-tertiary)",
                            margin: "0 0 1.25rem",
                        }}
                    >
                        Project metadata
                    </p>

                    {/* Project name field */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            htmlFor="project-name"
                            style={{
                                display: "block",
                                fontSize: "13px",
                                color: "var(--color-text-secondary)",
                                marginBottom: "6px",
                            }}
                        >
                            Project name
                        </label>

                        {isEditingName ?
                            <input
                                id="project-name"
                                type="text"
                                value={draftName}
                                onChange={(e) => setDraftName(e.target.value)}
                                onBlur={() => setIsEditingName(false)}
                                onKeyDown={handleNameKeyDown}
                                autoFocus
                                style={{
                                    width: "100%",
                                    fontSize: "22px",
                                    fontWeight: 500,
                                    background:
                                        "var(--color-background-secondary)",
                                    border: "0.5px solid var(--color-border-secondary)",
                                    borderRadius: "var(--border-radius-md)",
                                    padding: "6px 10px",
                                    color: "var(--color-text-primary)",
                                    boxSizing: "border-box",
                                }}
                            />
                        :   <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    cursor: "text",
                                }}
                                onClick={() => setIsEditingName(true)}
                            >
                                <span
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: 500,
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    {draftName}
                                </span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditingName(true);
                                    }}
                                    title="Edit name"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "var(--color-text-tertiary)",
                                        padding: "2px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z"
                                            stroke="currentColor"
                                            strokeWidth="1.3"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>

                    <div
                        style={{
                            borderTop:
                                "0.5px solid var(--color-border-tertiary)",
                            marginBottom: "1.5rem",
                        }}
                    />

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            htmlFor="project-description"
                            style={{
                                display: "block",
                                fontSize: "13px",
                                color: "var(--color-text-secondary)",
                                marginBottom: "6px",
                            }}
                        >
                            Description
                        </label>

                        <textarea
                            id="project-description"
                            value={draftDescription}
                            onChange={(e) =>
                                setDraftDescription(e.target.value)
                            }
                            rows={4}
                            placeholder="What is the purpose of this project?"
                            style={{
                                width: "100%",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                resize: "vertical",
                                boxSizing: "border-box",
                                background: "var(--color-background-secondary)",
                                border: "0.5px solid var(--color-border-secondary)",
                                borderRadius: "var(--border-radius-md)",
                                padding: "10px 12px",
                                color: "var(--color-text-primary)",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "12px",
                                color: "var(--color-text-tertiary)",
                            }}
                        >
                            Last modified: {project.lastModified}
                        </span>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            {saved && (
                                <span
                                    style={{
                                        fontSize: "13px",
                                        color: "var(--color-text-success)",
                                    }}
                                >
                                    Saved
                                </span>
                            )}

                            <button
                                onClick={handleSaveMetadata}
                                disabled={!hasChanges || !draftName.trim()}
                                style={{
                                    fontSize: "13px",
                                    padding: "7px 18px",
                                    borderRadius: "var(--border-radius-md)",
                                    cursor:
                                        hasChanges && draftName.trim() ?
                                            "pointer"
                                        :   "not-allowed",
                                    opacity:
                                        hasChanges && draftName.trim() ?
                                            1
                                        :   0.4,
                                    background:
                                        "var(--color-background-primary)",
                                    border: "0.5px solid var(--color-border-secondary)",
                                    color: "var(--color-text-primary)",
                                    transition: "opacity 0.15s",
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "12px",
                    }}
                >
                    {[
                        { label: "Pages", value: project.pages.length },
                        { label: "Routes", value: project.routes.length },
                    ].map(({ label, value }) => (
                        <div
                            key={label}
                            style={{
                                background: "var(--color-background-secondary)",
                                borderRadius: "var(--border-radius-md)",
                                padding: "1rem",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "13px",
                                    color: "var(--color-text-secondary)",
                                    margin: "0 0 4px",
                                }}
                            >
                                {label}
                            </p>
                            <p
                                style={{
                                    fontSize: "24px",
                                    fontWeight: 500,
                                    margin: 0,
                                    color: "var(--color-text-primary)",
                                }}
                            >
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProjectOverview;
