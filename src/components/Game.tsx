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
    const oppositeDirections = {
	'n': 's',
	's': 'n',
	'w': 'e',
	'e': 'w'
    }

    const [dir, setDir] = useState('e');
    const dirRef = useRef(dir);
    const [snakePos, setSnakePos] = useState([1,1]);
    const [fruitPos, setFruitPos] = useState([randInt(1, GRID_SIZE),randInt(1,GRID_SIZE)]);
    const [score, setScore] = useState(0);

    const getRandomPos = () => {
	return [randInt(1, GRID_SIZE), randInt(1, GRID_SIZE)];
    }
    
    const handleResetBtnClick = () => {
	setDir('e');
	setSnakePos([1,1]);
	setScore(0);
	setFruitPos(getRandomPos());
    }
    
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
	const DIRECTION_KEYS = ['w', 'a', 's', 'd'];
	if (DIRECTION_KEYS.includes(event.key)
	   && keyToDir[event.key] !== oppositeDirections[dirRef.current]) {
	    setDir(keyToDir[event.key]);
	}
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

	 const intervalId = setInterval(tick, 150);

	return () => {clearInterval(intervalId)}
	
    }, []);

    // Check if fruit is eated
    useEffect(() => {
	if (snakePos[0] === fruitPos[0] && snakePos[1] === fruitPos[1]) {
	    setFruitPos(getRandomPos());
	    setScore(score + 1);
	}
    }, [snakePos]);
    
    return (
	<div className="game-column">
	    <GlobalKeyHandler handleKeyDown={handleKeyDown} />
	    <div className="game-toolbar">
		<p>Score: {score}</p>
		<button onClick={handleResetBtnClick}>Reset</button>
	    </div>
	    <Grid size={GRID_SIZE}
		  snakePos={snakePos}
		  fruitPos={fruitPos}
	    />
	</div>
    );

}

export default Game;
