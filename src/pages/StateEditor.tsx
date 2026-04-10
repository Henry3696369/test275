import type { DataClass } from "../Interface/Project";
import { Button, Card, Container, Form, Modal, Stack } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { DeleteButton } from "../components/DeleteButton";
import { EditButton } from "../components/EditButton";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { ProjectOutletContext } from "../Interface/Project";

// focus on project.stateModel
function StateEditor() {
    const { project, projects, setProjects } =
        useOutletContext<ProjectOutletContext>();
    const projectID = project.id;
    const custom = project.stateModel.customClasses;
    const [modalType, setType] = useState(0);
    const [editID, setEditID] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        updatedBy: "",
    });
    const [shortForm, setShort] = useState({
        name: "",
        type: "",
        description: "",
    });
    const [editID2, setEditID2] = useState(0);
    const [dataclassName, setName] = useState("");
    const [DCID, setDCID] = useState(0);
    const handleClose = () => {
        setEditID(0);
        setType(0);
        setShowModal(false);
    };
    const handleShow1 = () => {
        setType(1);
        setShowModal(true);
    }; // To add a new attribute of main
    const handleShow2 = (id: number) => {
        const targetAttr = project.stateModel.attributes.find(
            (a) => a.id === id,
        )!;
        setEditID(id);
        setFormData({
            name: targetAttr.name,
            type: targetAttr.type,
            description: targetAttr.description,
            updatedBy: targetAttr.updatedBy,
        });
        setType(2);
        setShowModal(true);
    }; // To edit an attribute of main

    const handleSave = () => {
        setProjects(
            projects.map((p) => {
                if (p.id !== projectID) return p;

                let updatedAttributes;

                if (modalType === 2) {
                    updatedAttributes = p.stateModel.attributes.map((a) =>
                        a.id === editID ? { ...a, ...formData } : a,
                    );
                } else {
                    const newAttribute = {
                        id: Date.now(),
                        ...formData,
                    };
                    updatedAttributes = [
                        ...p.stateModel.attributes,
                        newAttribute,
                    ];
                }

                return {
                    ...p,
                    stateModel: {
                        ...p.stateModel,
                        attributes: updatedAttributes,
                    },
                };
            }),
        );

        setFormData({
            name: "",
            type: "",
            description: "",
            updatedBy: "",
        });
        handleClose();
    };

    const handleShow3 = () => {
        setType(3);
        setShowModal(true);
    };
    // To add a new dataclass
    const handleDCSave = () => {
        setProjects(
            projects.map((p) => {
                if (p.id !== projectID) return p;
                const newDC: DataClass = {
                    id: Date.now(),
                    className: dataclassName,
                    attributes: [],
                };
                return {
                    ...p,
                    stateModel: {
                        ...p.stateModel,
                        customClasses: [...p.stateModel.customClasses, newDC],
                    },
                };
            }),
        );
        setName("");
        handleClose();
    };
    const handleDCDelete = (id: number) => {
        setProjects(
            projects.map((p) => {
                if (p.id !== projectID) return p;
                return {
                    ...p,
                    stateModel: {
                        ...p.stateModel,
                        customClasses: p.stateModel.customClasses.filter(
                            (pp) => pp.id !== id,
                        ),
                    },
                };
            }),
        );
    };

    // to add a new
    const handleShow4 = (id: number) => {
        setType(4);
        setShowModal(true);
        setDCID(id);
    };
    // To add a new dataclass attribure

    const handleDCAttriSave = () => {
        setProjects(
            projects.map((p) => {
                if (p.id !== projectID) return p;
                const newAttribute = {
                    id: Date.now(),
                    ...shortForm,
                    updatedBy: "",
                };
                return {
                    ...p,
                    stateModel: {
                        ...p.stateModel,
                        customClasses: p.stateModel.customClasses.map((pp) => {
                            if (pp.id !== DCID) return pp;
                            return {
                                ...pp,
                                attributes: [...pp.attributes, newAttribute],
                            };
                        }),
                    },
                };
            }),
        );
        setShort({
            name: "",
            type: "",
            description: "",
        });
        handleClose();
    };

    const handleDCAttriDelete = (dcid: number, attriid: number) => {
        setProjects(
            projects.map((p) => {
                if (p.id !== projectID) return p;
                return {
                    ...p,
                    stateModel: {
                        ...p.stateModel,
                        customClasses: p.stateModel.customClasses.map((pp) => {
                            if (pp.id !== dcid) return pp;
                            return {
                                ...pp,
                                attributes: pp.attributes.filter(
                                    (ppp) => ppp.id !== attriid,
                                ),
                            };
                        }),
                    },
                };
            }),
        );
    };

    // edit attribute
    const handleShow5 = (dcid: number, attriid: number) => {
        const targetDC = project.stateModel.customClasses.find(
            (a) => a.id === dcid,
        );
        const targetAttr = targetDC!.attributes.find((a) => a.id === attriid)!;
        setShort({
            name: targetAttr.name,
            type: targetAttr.type,
            description: targetAttr.description,
        });
        setEditID2(attriid);
        setDCID(dcid);
        setType(5);
        setShowModal(true);
    };

    const deleteAttribute = (id: number) => {
        const newAttr = project.stateModel.attributes.filter(
            (a) => a.id !== id,
        );
        setProjects(
            projects.map((p) =>
                p.id === projectID ?
                    {
                        ...p,
                        stateModel: { ...p.stateModel, attributes: newAttr },
                    }
                :   p,
            ),
        );
    };

    const handleDCAttriEdit = () => {
        setProjects(
            projects.map((p) => {
                if (p.id !== projectID) return p;
                return {
                    ...p,
                    stateModel: {
                        ...p.stateModel,
                        customClasses: p.stateModel.customClasses.map((pp) => {
                            if (pp.id !== DCID) return pp;
                            return {
                                ...pp,
                                attributes: pp.attributes.map((ppp) => {
                                    if (ppp.id !== editID2) return ppp;
                                    return { ...ppp, ...shortForm };
                                }),
                            };
                        }),
                    },
                };
            }),
        );
        setShort({
            name: "",
            type: "",
            description: "",
        });
        handleClose();
    };
    return (
        <div>
            {" "}
            <Container className="mt-5 mb-4">
                <div className="mb-2 pb-2">
                    <h4 className="fw-bold text-dark">Main State: </h4>
                    <p className="text-secondary mb-0">
                        <span className="text-muted">State Name: </span>
                        {project.stateModel.stateName}
                    </p>
                    <p className="text-secondary mb-0">
                        <span className="text-muted"># of Attributes: </span>
                        {project.stateModel.attributes.length}
                    </p>
                </div>
                <Button onClick={handleShow1} className="bg-primary mb-3">
                    + Add
                </Button>

                <Row className="g-4">
                    {project.stateModel.attributes.map((a, index) => {
                        return (
                            <Col key={index} xs={12} md={4} lg={3}>
                                <Card className="h-100 shadow-sm border-0 bg-light bg-opacity-10">
                                    <Card.Body className="p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span
                                                className="text-uppercase text-muted fw-bold"
                                                style={{
                                                    fontSize: "0.75rem",
                                                    letterSpacing: "0.05rem",
                                                }}
                                            >
                                                {a.type}
                                            </span>
                                        </div>

                                        <Card.Title className="fw-bold fs-5 mb-3 text-dark">
                                            {a.name}
                                        </Card.Title>

                                        <Card.Text className="flex-grow-1">
                                            <div className="mb-3">
                                                <small
                                                    className="d-block text-muted text-uppercase fw-semibold mb-1"
                                                    style={{
                                                        fontSize: "0.7rem",
                                                    }}
                                                >
                                                    Description
                                                </small>
                                                <span
                                                    className="text-dark"
                                                    style={{
                                                        fontSize: "0.95rem",
                                                        lineHeight: "1.5",
                                                    }}
                                                >
                                                    {a.description}
                                                </span>
                                            </div>
                                        </Card.Text>

                                        <div className="mt-auto pt-3 border-top border-light">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <small className="text-muted">
                                                    Updated By
                                                </small>
                                                <small className="fw-medium text-dark">
                                                    {a.updatedBy}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2 mt-2">
                                            <EditButton
                                                id={a.id}
                                                onedit={handleShow2}
                                            ></EditButton>
                                            <DeleteButton
                                                id={a.id}
                                                ondelete={deleteAttribute}
                                            ></DeleteButton>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
                <div
                    className="border-top my-5"
                    style={{ borderColor: "#dee2e6" }}
                ></div>
                <div className="mb-2 pb-3">
                    <h4 className="fw-bold text-dark">Other DataClass: </h4>
                </div>
                <Button onClick={handleShow3} className="bg-primary mb-3">
                    + Add
                </Button>

                {custom.map((cls, Idx) => (
                    <div key={Idx} className="mb-5">
                        <div className="d-flex align-items-center mb-3 ">
                            <Stack className="gap-2">
                                <h6
                                    className="fw-bold mb-0 text-dark"
                                    style={{ letterSpacing: "0.5px" }}
                                >
                                    <span className="text-primary-emphasis">
                                        #
                                    </span>{" "}
                                    {cls.className}
                                </h6>
                                <DeleteButton
                                    id={cls.id}
                                    ondelete={handleDCDelete}
                                ></DeleteButton>
                            </Stack>

                            <div
                                className="flex-grow-1 ms-3 border-top"
                                style={{ opacity: 0.1 }}
                            ></div>
                            <Button
                                variant="link"
                                size="sm"
                                className="text-decoration-none"
                                onClick={() => handleShow4(cls.id)}
                            >
                                + Add Attr
                            </Button>
                        </div>

                        <Row className="g-2">
                            {" "}
                            {cls.attributes.map((attr) => (
                                <Col key={attr.id} xs={12} md={4} lg={3}>
                                    <div
                                        className="p-2 h-100"
                                        style={{
                                            background:
                                                "var(--color-background-secondary)",
                                            border: "0.5px solid var(--color-border-tertiary)",
                                            borderRadius:
                                                "var(--border-radius-md)",
                                            position: "relative",
                                        }}
                                    >
                                        <div
                                            className="text-uppercase text-muted mb-1"
                                            style={{
                                                fontSize: "9px",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {attr.type}
                                        </div>

                                        <div
                                            className="fw-bold text-dark"
                                            style={{ fontSize: "14px" }}
                                        >
                                            {attr.name}
                                        </div>

                                        <div
                                            className="text-muted text-truncate"
                                            style={{ fontSize: "12px" }}
                                        >
                                            {attr.description ||
                                                "No description"}
                                        </div>

                                        <div
                                            className="mt-2 d-flex gap-2 border-top pt-2"
                                            style={{
                                                borderColor: "rgba(0,0,0,0.05)",
                                            }}
                                        >
                                            <span
                                                onClick={() =>
                                                    handleShow5(cls.id, attr.id)
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    fontSize: "11px",
                                                }}
                                                className="text-primary"
                                            >
                                                Edit
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleDCAttriDelete(
                                                        cls.id,
                                                        attr.id,
                                                    )
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    fontSize: "11px",
                                                }}
                                                className="text-danger"
                                            >
                                                Delete
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Container>
            {modalType == 1 && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Attribute</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Attribute Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. userAge"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. String, Number, Array..."
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            type: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Updated By</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the relevant router and page"
                                    value={formData.updatedBy}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            updatedBy: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Describe this attribute..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            disabled={!formData.name}
                        >
                            Save Attribute
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {modalType == 2 && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Attribute</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Attribute Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. userAge"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. String, Number, Array..."
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            type: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Updated By</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the relevant router and page"
                                    value={formData.updatedBy}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            updatedBy: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Describe this attribute..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            disabled={!formData.name}
                        >
                            Save Attribute
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {modalType == 3 && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New DataClass</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>DataClass Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your new DataClass name"
                                    value={dataclassName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleDCSave}
                            disabled={!dataclassName}
                        >
                            Save DataClass
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {modalType == 4 && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Attribute</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Attribute Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. userAge"
                                    value={shortForm.name}
                                    onChange={(e) =>
                                        setShort({
                                            ...shortForm,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. String, Number, Array..."
                                    value={shortForm.type}
                                    onChange={(e) =>
                                        setShort({
                                            ...shortForm,
                                            type: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Describe this attribute..."
                                    value={shortForm.description}
                                    onChange={(e) =>
                                        setShort({
                                            ...shortForm,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleDCAttriSave}
                            disabled={!shortForm.name}
                        >
                            Save Attribute
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {modalType == 5 && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Attribute</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Attribute Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. userAge"
                                    value={shortForm.name}
                                    onChange={(e) =>
                                        setShort({
                                            ...shortForm,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. String, Number, Array..."
                                    value={shortForm.type}
                                    onChange={(e) =>
                                        setShort({
                                            ...shortForm,
                                            type: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Describe this attribute..."
                                    value={shortForm.description}
                                    onChange={(e) =>
                                        setShort({
                                            ...shortForm,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleDCAttriEdit}
                            disabled={!shortForm.name}
                        >
                            Save Attribute
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default StateEditor;
