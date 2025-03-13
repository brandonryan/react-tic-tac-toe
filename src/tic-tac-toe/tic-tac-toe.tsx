import { ReactNode, useCallback, useMemo, useState } from "react"
import { useTicTacToe } from "../hooks/use-tic-tac-toe";
import { markerToEmoji, TicTacToeCell } from "./tic-tac-toe-cell";

export interface TicTacToeProps {

}

export function TicTacToe(props: TicTacToeProps) {
    const { playerTurn, result, getCell, onCellClick, reset } = useTicTacToe();

    let statusNode: ReactNode;
    if (result !== undefined) {
        if (result === "tie") {
            statusNode = <h2>Game Tie!</h2>
        } else {
            const emoji = markerToEmoji(result);
            statusNode = <h2>{emoji} Game Winner {emoji}</h2>
        }
    } else {
        statusNode = <h2>Player Turn: {markerToEmoji(playerTurn)}</h2>
    }

    return <div style={{ display: "flex", flexFlow: "column nowrap", width: 600 }}>
        <h2>React Tic-Tac-Toe</h2>
        
        <div style={{display: "flex", flexFlow: "row nowrap", alignItems: "center"}}>
            <div style={{flexGrow: 1}}>
                {statusNode}
            </div>
            <div>
                <button type="button" onClick={reset} style={{ fontSize: 18 }}>
                    Reset Game
                </button>
            </div>
        </div>

        <div className="tic-tac-toe-grid">
            <TicTacToeCell
                value={getCell(0, 0)}
                onClick={() => onCellClick(0, 0)}
            />
            <TicTacToeCell
                value={getCell(1, 0)}
                onClick={() => onCellClick(1, 0)}
            />
            <TicTacToeCell
                value={getCell(2, 0)}
                onClick={() => onCellClick(2, 0)}
            />
            <TicTacToeCell
                value={getCell(0, 1)}
                onClick={() => onCellClick(0, 1)}
            />
            <TicTacToeCell
                value={getCell(1, 1)}
                onClick={() => onCellClick(1, 1)}
            />
            <TicTacToeCell
                value={getCell(2, 1)}
                onClick={() => onCellClick(2, 1)}
            />
            <TicTacToeCell
                value={getCell(0, 2)}
                onClick={() => onCellClick(0, 2)}
            />
            <TicTacToeCell
                value={getCell(1, 2)}
                onClick={() => onCellClick(1, 2)}
            />
            <TicTacToeCell
                value={getCell(2, 2)}
                onClick={() => onCellClick(2, 2)}
            />
        </div>
    </div>;
}