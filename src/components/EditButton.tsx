import Button from "react-bootstrap/esm/Button";

export const EditButton = ({
    id,
    onedit,
}: {
    id: number;
    onedit: (n: number) => void;
}) => {
    return (
        <div>
            <Button
                onClick={() => onedit(id)}
                variant="outline-primary"
                size="sm"
            >
                Edit
            </Button>
        </div>
    );
};
