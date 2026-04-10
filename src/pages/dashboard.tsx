import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
    Button,
    Form,
    Container,
    Row,
    Col,
    Card,
    Stack,
} from "react-bootstrap";
import type { Project, ProjectsProps } from "../Interface/Project";
import { saveProjects, loadProjects } from "../utils/storage";
import NavBar from "../components/NavBar";
import { DeleteButton } from "../components/DeleteButton";

export const CreateProjectForm = ({
    onAdd,
}: {
    onAdd: (s: string) => void;
}) => {
    const [name, setName] = useState<string>("");

    const handleBtnClick = () => {
        if (name.trim() === "") return;
        onAdd(name);
        setName("");
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    return (
        <div style={{ maxWidth: "450px" }} className="mx-auto mt-4">
            <Stack direction="horizontal" gap={2} className="mb-3">
                <Form.Control
                    placeholder="New Project Name"
                    value={name}
                    onChange={handleChange}
                />
                <Button
                    variant="success"
                    onClick={handleBtnClick}
                    className="text-nowrap"
                >
                    + Create
                </Button>
            </Stack>
        </div>
    );
};

export const Dashboard = ({ projects, setProjects }: ProjectsProps) => {
    const navigate = useNavigate();

    const deleteProject = (id: number) => {
        setProjects(projects.filter((p) => p.id !== id));
    };

    const openProject = (id: number) => {
        void navigate(`/project/${id}`);
    };

    const handleSave = () => {
        saveProjects(projects);
    };

    const handleLoad = () => {
        const saved = loadProjects();
        if (saved) {
            setProjects(saved);
        }
    };

    const creatProject = (name: string) => {
        const newProject: Project = {
            id: Date.now(),
            name: name,
            lastModified: new Date().toISOString().split("T")[0],
            pages: [],
            routes: [],
            stateModel: {
                stateName: "test",
                attributes: [],
                customClasses: [],
            },
            description: "",
        };
        setProjects([...projects, newProject]);
    };

    return (
        <Container fluid className="p-0">
            <NavBar />

            <Container style={{ maxWidth: "900px" }} className="mt-4">
                <h1
                    style={{
                        fontSize: "20px",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "8px",
                        fontFamily: "monospace",
                    }}
                >
                    My Projects
                </h1>

                {/* Toolbar */}
                <div
                    className="d-flex gap-2 mb-4 p-3"
                    style={{ border: "1px dashed #aaa", background: "#fafafa" }}
                >
                    <CreateProjectForm onAdd={creatProject} />
                </div>

                {/* Project List */}
                <Row className="g-3">
                    {projects.map((project) => (
                        <Col key={project.id} xs={12}>
                            <Card
                                className="border-2"
                                style={{ borderColor: "#333" }}
                            >
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title
                                            className="fw-bold"
                                            style={{
                                                fontSize: "16px",
                                                fontFamily: "monospace",
                                            }}
                                        >
                                            {project.name}
                                        </Card.Title>
                                        <div
                                            className="text-muted"
                                            style={{ fontSize: "12px" }}
                                        >
                                            Last modified:{" "}
                                            {project.lastModified}
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            onClick={() =>
                                                openProject(project.id)
                                            }
                                            style={{ fontFamily: "monospace" }}
                                        >
                                            Open
                                        </Button>
                                        <DeleteButton
                                            id={project.id}
                                            ondelete={deleteProject}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Demo Projects */}
                <div
                    className="mt-4 p-3"
                    style={{ border: "2px dashed #666", background: "#fafafa" }}
                >
                    <h2
                        style={{
                            fontSize: "16px",
                            fontFamily: "monospace",
                            marginBottom: "10px",
                        }}
                    >
                        Demo Projects
                    </h2>
                    <p
                        className="text-muted"
                        style={{ fontSize: "11px", fontStyle: "italic" }}
                    >
                        Load pre-built demo projects to see the tool in action
                        (US 1.4)
                    </p>
                    <div className="d-flex gap-2 mt-2">
                        <Button
                            variant="outline-dark"
                            size="sm"
                            style={{ fontFamily: "monospace" }}
                        >
                            Load &quot;Todo List&quot; Demo
                        </Button>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            style={{ fontFamily: "monospace" }}
                        >
                            Load &quot;Quiz App&quot; Demo
                        </Button>
                    </div>
                </div>

                {/* Save & Load */}
                <div className="mt-4 p-3 mb-4 border">
                    <h2
                        style={{
                            fontSize: "16px",
                            fontFamily: "monospace",
                            marginBottom: "10px",
                        }}
                    >
                        Save &amp; Load
                    </h2>
                    <p
                        className="text-muted"
                        style={{ fontSize: "11px", fontStyle: "italic" }}
                    >
                        Projects auto-save to localStorage. Import/export as
                        JSON for backup or sharing (US 1.3, US 8.1, US 8.2)
                    </p>
                    <div className="d-flex gap-2 mt-2">
                        <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={handleSave}
                            style={{ fontFamily: "monospace" }}
                        >
                            Save All to localStorage
                        </Button>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={handleLoad}
                            style={{ fontFamily: "monospace" }}
                        >
                            Load from localStorage
                        </Button>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            style={{ fontFamily: "monospace" }}
                        >
                            Import Project (JSON)
                        </Button>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            style={{ fontFamily: "monospace" }}
                        >
                            Export Project (JSON)
                        </Button>
                    </div>
                </div>
            </Container>
            <p> Nico Fiasco</p>
            <p> Heng Luo</p>
            <p> Vibav Tandel </p>
        </Container>
    );
};

export default Dashboard;
