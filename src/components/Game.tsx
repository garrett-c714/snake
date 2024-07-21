import React, {useState} from "react";
import { randInt } from "../utils.ts";

import Grid from './Grid';

const Game = () => {

    const GRID_SIZE = 25;

    const [snakePos, setSnakePos] = useState([1,1]);
    const [fruitPos, setFruitPos] = useState([randInt(1, GRID_SIZE),randInt(1,GRID_SIZE)]);
    
    return (
	<Grid size={GRID_SIZE}
	      snakePos={snakePos}
	      fruitPos={fruitPos}
	/>
    );

}

export default Game;
