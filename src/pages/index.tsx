import React, { useCallback, useEffect, useRef, useState } from "react";
import produce from "immer";
import { clearGrid } from "../utils/clearGrid";
import { randomGrid } from "../utils/randomGrid";

const numRows = 35;
const numCols = 60;
// const numRows = 5;
// const numCols = 5;
const dir = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const Homepage: React.FC = () => {
  const [grid, setGrid] = useState(clearGrid(numRows, numCols));
  const [running, setRunning] = useState(false);

  const [looper, setLooper] = useState<NodeJS.Timeout>();

  const [speed, setSpeed] = useState(1000);
  const faster = () => {
    if (speed > 100) {
      setSpeed(speed - 100);
    }
  };
  const slower = () => {
    if (speed < 1000) {
      setSpeed(speed + 100);
    }
  };

  const runSimulation = () => {
    setGrid((grid) =>
      produce(grid, (tempGrid) => {
        // console.log(grid);
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let numN = 0;
            for (let k = 0; k < 8; k++) {
              let x = i + dir[k][0];
              let y = j + dir[k][1];
              if (x >= numRows || y >= numCols || x < 0 || y < 0) continue;
              if (grid[x][y] === 1) {
                // console.log(x + " " + y + " -> " + i + " " + j);
                numN++;
              }
            }
            if (grid[i][j] === 1) {
              // console.log(i + " " + j + " -> " + numN);
              if (numN < 2 || numN > 3) {
                tempGrid[i][j] = 0;
                // console.log("dieee");
              }
            } else {
              if (numN === 3) {
                tempGrid[i][j] = 1;
                // console.log("reserect");
              }
            }
          }
        }
      })
    );
  };
  React.useEffect(() => {
    if (running) {
      setLooper(
        setInterval(() => {
          runSimulation();
          console.log("looping");
        }, speed)
      );
    } else {
      clearInterval(looper!);
      setLooper(undefined);
      console.log("stop");
    }
  }, [running]);

  return (
    <div>
      <div>
        <span style={{ fontSize: "2rem", marginRight: "4vh" }}>
          Convoy's Game of Life
        </span>
        <button onClick={() => setRunning(!running)}>
          {running ? "STOP" : "START"}
        </button>
        <button onClick={() => setGrid(clearGrid(numRows, numCols))}>
          clear
        </button>
        <button onClick={() => setGrid(randomGrid(numRows, numCols))}>
          Random
        </button>

        <button onClick={slower}>slower</button>
        <span>{11 - speed / 100}</span>
        <button onClick={faster}>faster</button>
      </div>
      <div>
        {grid.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
            }}
          >
            {row.map((col, j) => (
              <div
                onClick={() => {
                  const newGrid = produce(grid, (tempGrid) => {
                    tempGrid[i][j] = tempGrid[i][j] ^ 1;
                  });
                  setGrid(newGrid);
                }}
                key={i * 17 + j * 173}
                style={{
                  width: "15px",
                  height: "15px",
                  border: "solid 1px grey",
                  background: grid[i][j] === 1 ? "coral" : "white",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
