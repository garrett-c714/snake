import React, {useState, useEffect, useRef} from "react";
import { randInt } from "../utils.ts";

import GlobalKeyHandler from "./GlobalKeyHandler";
import Grid from './Grid';

const Game = () => {

    const GRID_SIZE = 25;
    const keyToDir = {
	'w': 'n',
	'a': 'w',
	's': 's',
	'd': 'e'
    }

    const [dir, setDir] = useState('e');
    const dirRef = useRef(dir);
    const [snakePos, setSnakePos] = useState([1,1]);
    const [fruitPos, setFruitPos] = useState([randInt(1, GRID_SIZE),randInt(1,GRID_SIZE)]);

    const moveSnake = dir  => {
	setSnakePos(([oldX, oldY]) => {
	    let newX = oldX;
	    let newY = oldY;
	    
	    switch (dir) {
	    case 'n':
		newY -= 1;
		break;
		
	    case 's':
		newY+=1;
		break;
		
	    case 'e':
		newX += 1;
		break;

	    case 'w':
		newX -= 1;
		
	    }

	    if (newX < 1) { newX = 1; }
	    if (newY < 1) { newY = 1; }
	    if (newX > GRID_SIZE) { newX = GRID_SIZE }
	    if (newY > GRID_SIZE) { newY = GRID_SIZE }

	    return [newX, newY];
	    
	});
    }
    
    const handleKeyDown = event => {
	console.log(`${event.key} key was pressed!`);
	setDir(keyToDir[event.key]);
    }

    // Direction Updates
    useEffect(() => {
	dirRef.current = dir;
    }, [dir])

    // Game Tick
    useEffect(() => {
	const tick = () => {
	    moveSnake(dirRef.current);
	}

	//const intervalId = 0;
	 const intervalId = setInterval(tick, 150);

	return () => {clearInterval(intervalId)}
	
    }, []);
    
    return (
	<>
	    <GlobalKeyHandler handleKeyDown={handleKeyDown} />
	    <Grid size={GRID_SIZE}
		  snakePos={snakePos}
		  fruitPos={fruitPos}
	    />
	</>
    );

}

export default Game;
