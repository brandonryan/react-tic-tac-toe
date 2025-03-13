import { Marker } from "../hooks/use-tic-tac-toe";

export interface TicTacToeCellProps {
    value: Marker | null,
    onClick: () => void,
}

export function TicTacToeCell(props: TicTacToeCellProps) {
    const { value, onClick } = props;

    return <div onClick={onClick}>
        <span>{markerToEmoji(value)}</span>
    </div>;
}

export function markerToEmoji(value: Marker | null) {
    if (value === "x") {
        return "❌";
    }
    if (value === "o") {
        return "⭕";
    }
    return null;
}