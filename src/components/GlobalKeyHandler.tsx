import React, {useEffect} from "react";

const GlobalKeyHandler = props => {

    const {handleKeyDown} = props;

    useEffect(() => {
	window.addEventListener("keydown", handleKeyDown);
	return () => {window.removeEventListener("keydown", handleKeyDown)};
    }, []);
    
    return null;
    
}

export default GlobalKeyHandler;
