import { useState, useEffect, useRef } from "react";
import { randInt } from "../utils.ts";

import GlobalKeyHandler from "./GlobalKeyHandler";
import Grid from './Grid';

const Game = () => {

    const GRID_SIZE = 25;
    const keyToDir: Record<string, string> = {
        'w': 'n',
        'a': 'w',
        's': 's',
        'd': 'e'
    }
    const oppositeDirections: Record<string, string> = {
        'n': 's',
        's': 'n',
        'w': 'e',
        'e': 'w'
    }

    const [snakePos, setSnakePos] = useState<number[][]>([[1,1]]);
    const [lastExited, setLastExited] = useState<number[]>([]);
    const [fruitPos, setFruitPos] = useState<number[]>(() => 
                                                       getRandomPos());

    const [dir, setDir] = useState<string>('e');
    const dirRef = useRef<string>(dir);

    const [score, setScore] = useState<number>(0);

    function getRandomPos() {
        return [randInt(1, GRID_SIZE), randInt(1, GRID_SIZE)];
    }
    
    const handleResetBtnClick = () => {
        setDir('e');
        setSnakePos([[1,1]]);
        setScore(0);
        setFruitPos(getRandomPos());
    }
    
    const moveSnake = (dir: string) => {
        setSnakePos(prev => {
            let prevHead = prev[0];
            let newX = prevHead[0];
            let newY = prevHead[1];
            
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
            if (newX > GRID_SIZE) { newX = GRID_SIZE; }
            if (newY > GRID_SIZE) { newY = GRID_SIZE; }

            prev = [[newX, newY], ...prev];
            const lastTail = prev.pop()

            if (lastTail) {
                setLastExited(lastTail);
            }
            
            return prev;
        });
    }

    
    const handleKeyDown = (event: KeyboardEvent) => {
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
        if (snakePos[0][0] === fruitPos[0] && snakePos[0][1] === fruitPos[1]) {
            setFruitPos(() => {
                let pos = getRandomPos();
                while (snakePos.includes(pos)) {
                    pos = getRandomPos();
                }
                return pos;
            });
            setScore(score + 1);
            setSnakePos([...snakePos, lastExited]);
        }
    }, [snakePos]);
    
    return (
        <div className="game-column">
            <GlobalKeyHandler handleKeyDown={handleKeyDown} />
            <div className="game-toolbar">
                <p>Score: {score}</p>
                <button onClick={handleResetBtnClick}>Reset</button>
            </div>
            <Grid 
                size={GRID_SIZE}
                snakePos={snakePos}
                fruitPos={fruitPos}
                score={score}
            />
        </div>
    );

}

export default Game;

