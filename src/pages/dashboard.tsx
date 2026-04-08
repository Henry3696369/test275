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

export const DeleteButton = ({
    id,
    ondelete,
}: {
    id: number;
    ondelete: (n: number) => void;
}) => {
    return (
        <div>
            <Button
                onClick={() => ondelete(id)}
                variant="outline-danger"
                size="sm"
            >
                Delete
            </Button>
        </div>
    );
};
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

    const handleLoadDemo = () => {
        console.log("Load Demo clicked");
    };

    const handleImport = () => {
        console.log("Import JSON clicked");
    };

    const creatProject = (name: string) => {
        const newProject: Project = {
            id: Date.now(),
            name: name,
            lastModified: new Date().toISOString().split("T")[0],
        };
        setProjects([...projects, newProject]);
    };

    return (
        <Container fluid className="p-0">
            <div
                className="position-relative d-flex align-items-center bg-light border-bottom"
                style={{ height: "60px" }}
            >
                <h1 className="h4 m-0 fw-bold position-absolute start-50 translate-middle-x">
                    Drafter Drafter
                </h1>

                <div className="ms-auto px-3">
                    <Stack direction="horizontal" gap={2}>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleLoadDemo}
                        >
                            Load
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleImport}
                        >
                            Import
                        </Button>
                    </Stack>
                </div>
            </div>

            <div className="text-center mt-5">
                <h4 className="h4 fw-bold">My Project</h4>
            </div>
            <CreateProjectForm onAdd={creatProject}></CreateProjectForm>
            <hr className="my-5 border-secondary border-top opacity-25" />
            <Row className="g-4 px-3 ">
                {projects.map((project) => (
                    <Col key={project.id} xs={12} md={4}>
                        <Card>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-muted small">
                                    # {project.id}
                                </Card.Title>
                                <Card.Text className="fw-bold fs-5">
                                    {project.name}
                                </Card.Text>
                                <div
                                    className="text-muted"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Last modified: {project.lastModified}
                                </div>
                                <div className="d-flex ms-auto gap-1">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => openProject(project.id)}
                                    >
                                        Open
                                    </Button>
                                    <DeleteButton
                                        id={project.id}
                                        ondelete={deleteProject}
                                    ></DeleteButton>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <p> Nico Fiasco</p>
            <p> Heng Luo</p>
            <p> Vibav Tandel </p>
        </Container>
    );
};

export default Dashboard;
