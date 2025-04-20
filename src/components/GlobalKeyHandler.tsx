import {useEffect} from "react";

interface Props {
    handleKeyDown: (event: KeyboardEvent) => void;
}

const GlobalKeyHandler = (props: Props) => {

    const {handleKeyDown} = props;

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {window.removeEventListener("keydown", handleKeyDown)};
    }, []);
    
    return null;
    
}

export default GlobalKeyHandler;

