import Button from "react-bootstrap/esm/Button";

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
