import React from "react";

const Entity = props => {

    const {pos, type} = props;
    const [x, y] = pos;
    
    const entityStyle = {
	gridColumnStart: x,
	gridColumnEnd: x+1,
	gridRowStart: y,
	gridRowEnd: y+1
    }
    
    return (
	<div className={`entity ${type}`} style={entityStyle}></div>
    );

}

export default Entity;
