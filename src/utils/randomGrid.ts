export const randomGrid = (numRows: number, numCols: number) => {
  const matrix: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    matrix.push([]);
    for (let j = 0; j < numCols; j++) {
      matrix[i][j] = Math.random() < 0.2 ? 1 : 0;
    }
  }
  return matrix;
};
