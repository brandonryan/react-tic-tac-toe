import { useCallback, useMemo, useState } from "react";
import { useGridArray } from "./use-grid-array";

export type Marker = "x" | "o";
export type GameResult = Marker | "tie" | undefined;

export type TicTacToeState = {
    playerTurn: Marker,
    getCell: (x: number, y: number) => Marker | null,
    onCellClick: (x: number, y: number) => void,
    reset: () => void,
    result: GameResult,
}

export function useTicTacToe(): TicTacToeState {
    const [playerTurn, setPlayerTurn] = useState<Marker>("x");
    const { getCell, setCell, reset, grid } = useGridArray<Marker | null>({
        width: 3,
        initialState: new Array(9).fill(null),
    });

    //determine if we have a result
    const result = useMemo(() => {
        //check rows
        for (let x = 0; x < 3; x++) {
            const rowWinner = getLineWinner(getCell(x, 0), getCell(x, 1), getCell(x, 2));
            if (rowWinner) return rowWinner;
        }

        //check columns
        for (let y = 0; y < 3; y++) {
            const colWinner = getLineWinner(getCell(0, y), getCell(1, y), getCell(2, y));
            if (colWinner) return colWinner;
        }

        //check diags
        const diag1Winner = getLineWinner(getCell(0, 0), getCell(1, 1), getCell(2, 2));
        if (diag1Winner) return diag1Winner;

        const diag2Winner = getLineWinner(getCell(2, 0), getCell(1, 1), getCell(0, 2));
        if (diag2Winner) return diag2Winner;

        const boardFull = grid.every(m => m !== null);
        if (boardFull) return "tie";

        return undefined;
    }, [getCell]);

    //provide onclick functionality
    const onCellClick = useCallback((x: number, y: number) => {
        //dont do anything if the cell is already marked
        if (getCell(x, y) !== null) return;

        //dont do anything if there is already a winner
        if (result !== undefined) return;

        //set the cell and make it the next players turn
        setCell(x, y, playerTurn);
        setPlayerTurn(playerTurn === "x" ? "o" : "x");

    }, [getCell, setCell, setPlayerTurn]);

    return {
        playerTurn,
        getCell,
        onCellClick,
        reset,
        result,
    }
}

function getLineWinner(...line: Array<Marker | null>): GameResult {
    if (line.every(m => m === "o")) {
        return "o";
    }
    if (line.every(m => m === "x")) {
        return "x";
    }
}