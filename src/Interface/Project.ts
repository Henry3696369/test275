export interface PageComponent {
    id: number;
    type: string;
    label: string;
}

export interface Page {
    id: number;
    name: string;
    components: PageComponent[];
}

export interface Route {
    id: number;
    sourcePage: number;
    targetPage: number;
    label: string;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    lastModified: string;
    pages: Page[];
    routes: Route[];
    stateModel: StateModel;
}

export interface ProjectsProps {
    projects: Project[];
    setProjects: (p: Project[]) => void;
}

// for state
// The building block for your state
export interface StateAttribute {
    id: number;
    name: string;
    type: string;
    description: string;
    updatedBy: string;
}

// For additional dataclasses (your second requirement)
export interface DataClass {
    id: number;
    className: string;
    attributes: StateAttribute[];
}

// The main application state
export interface StateModel {
    stateName: string;
    attributes: StateAttribute[];
    customClasses: DataClass[];
}
export const example2: StateAttribute = {
    id: 1,
    name: "whatever",
    type: "string",
    description: "colasdoasldoasdasdasd",
    updatedBy: "string",
};
export const example3: DataClass = {
    id: 5,
    className: "test",
    attributes: [example2, example2, example2],
};
export const example1: StateModel = {
    stateName: "Main State",
    attributes: [example2, example2, example2, example2, example2],
    customClasses: [example3, example3],
};

export interface ProjectOutletContext {
    project: Project;
    projects: Project[];
    setProjects: (p: Project[]) => void;
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        name: "Final Project: Web App",
        lastModified: "2026-04-07",
        pages: [],
        routes: [],
        stateModel: example1,
        description:
            "This project will be a simple web application, like a to-do list, a blog, a tracker, a calculator, or even a video game.",
    },
    {
        id: 2,
        name: "Chemistry Lab Planner",
        lastModified: "2026-04-01",
        pages: [],
        routes: [],
        stateModel: example1,
        description:
            "This project will basically be a digital tool for lab management for your chemistry class, including what you'll need and what you aim to know.",
    },
    {
        id: 3,
        name: "History Site Draft",
        lastModified: "2026-03-25",
        pages: [],
        routes: [],
        stateModel: example1,
        description:
            "This project will be a short draft for your final essay for your history class.",
    },
];
