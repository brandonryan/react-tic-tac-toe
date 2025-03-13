import { useCallback, useState } from "react";

export interface UseGridStateParams<T> {
    width: number,
    initialState: T[],
}

export type GridState<T> = {
    reset: () => void,
    getCell: (x: number, y: number) => T,
    setCell: (x: number, y: number, value: T) => void,
    grid: T[]
}

export function useGridArray<T>(params: UseGridStateParams<T>): GridState<T> {
    const { width, initialState } = params;
    const [grid, setGrid] = useState<T[]>(initialState);

    const getCell = useCallback((x: number, y: number): T => {
        const i = (y * width) + x;
        const value = grid[i];
        //typescript flow analysis is cool: comment this line out and see the error
        if (value === undefined) throw new Error(`Grid cell (x: ${x}, y: ${y}) index out of bounds.`);

        return value;
    }, [grid, width]);

    const setCell = useCallback((x: number, y: number, value: T): void => {
        //we must clone the array, because we dont want to modify by reference.
        //updates to state should be immutable. see: https://react.dev/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax
        //(perfect use case for immer)
        const nextGrid = [...grid];
        const i = (y * width) + x;
        nextGrid[i] = value;
        setGrid(nextGrid);
    }, [grid, width]);

    const reset = useCallback(() => {
        setGrid(initialState);
    }, [initialState]);

    //instead of returning the grid, we return functions to access grid values.
    //makes it easier for the user to think in coordinates.
    return { getCell, setCell, reset, grid };
}