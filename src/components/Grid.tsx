import React from "react";

import Entity from './Entity'

const Grid = props => {

    const {size, snakePos, fruitPos} = props;

    const gridStyle = {
	gridTemplateRows: `repeat(${size}, 1fr)`,
	gridTemplateColumns: `repeat(${size}, 1fr)`
    }
    
    return (
	<div className="grid" style={gridStyle}>
	    {Array.from({length: (size**2)-2}).map(_ =>
		<div className="grid-cell"></div>
	    )}
	    <Entity type="snake" pos={snakePos} />
	    <Entity type="fruit" pos={fruitPos} />
	</div>
    );
    
}

export default Grid;
