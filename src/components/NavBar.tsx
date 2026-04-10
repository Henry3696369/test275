import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Project } from "../Interface/Project";

interface NavBarProps {
    currentProject?: Project;
}

interface NavLinkConfig {
    label: string;
    to: string;
    end?: boolean;
}

const DASHBOARD_LINK: NavLinkConfig = {
    label: "Dashboard",
    to: "/",
    end: true,
};

const PROJECT_LINKS: NavLinkConfig[] = [
    { label: "Project Overview", to: ".", end: true },
    { label: "Page Graph", to: "page-graph" },
    { label: "Page Editor", to: "page-editor" },
    { label: "State Editor", to: "state-editor" },
    { label: "Logic", to: "logic" },
    { label: "Export", to: "export" },
];

const baseStyle: CSSProperties = {
    fontFamily: "monospace",
    fontSize: "13px",
    padding: "6px 12px",
    textDecoration: "none",
};

function getActiveStyle(isActive: boolean): CSSProperties {
    return {
        ...baseStyle,
        border: `1px solid ${isActive ? "#333" : "#ccc"}`,
        color: isActive ? "#fff" : "#333",
        backgroundColor: isActive ? "#333" : "transparent",
        cursor: "pointer",
    };
}

function NavBar({ currentProject }: NavBarProps) {
    const links = currentProject
        ? [DASHBOARD_LINK, ...PROJECT_LINKS]
        : [DASHBOARD_LINK];

    return (
        <Navbar className="border-bottom" style={{ borderBottomWidth: "2px", borderColor: "#333" }}>
            <Container fluid className="px-3">
                <Navbar.Brand
                    as={Link}
                    to="/"
                    style={{ fontWeight: "bold", fontFamily: "monospace", fontSize: "18px" }}
                >
                    Drafter Drafter
                </Navbar.Brand>

                {currentProject && (
                    <span
                        className="text-muted me-3"
                        style={{ fontSize: "13px", fontFamily: "monospace" }}
                    >
                        - {currentProject.name}
                    </span>
                )}

                <Nav className="d-flex flex-row flex-wrap gap-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            end={link.end}
                            style={({ isActive }) => getActiveStyle(isActive)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
