//import React from "react";

import Entity from './Entity'

interface Props {
    size: number;
    snakePos: number[][];
    fruitPos: number[];
    score: number;
}

const Grid = (props: Props) => {

    const { size, snakePos, fruitPos } = props;

    const gridStyle = {
        gridTemplateRows: `repeat(${size}, 1fr)`,
        gridTemplateColumns: `repeat(${size}, 1fr)`
    }

    const numEmptyGridCells = (size**2) - (snakePos.length + 1);
    
    return (
        <div className="grid" style={gridStyle}>
            {Array.from({length: numEmptyGridCells}).map((_, index) =>
                <div key={`grid-item-${index}`} className="grid-cell"></div>
            )}
            {snakePos.map(pos =>
                <Entity type="snake" pos={pos} />
            )}
            <Entity type="fruit" pos={fruitPos} />
        </div>
    );
}

export default Grid;

