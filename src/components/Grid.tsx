import React from "react";

const Grid = props => {

    const {size} = props;

    const gridStyle = {
	gridTemplateRows: `repeat(${size}, 1fr)`,
	gridTemplateColumns: `repeat(${size}, 1fr)`
    }
    
    return (
	<div className="grid" style={gridStyle}>
	    {Array.from({length: size**2}).map(_ =>
		<div className="grid-cell"></div>
	    )}
	</div>
    );
    
}

export default Grid;
