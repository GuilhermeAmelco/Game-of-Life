function Make2DArray(cols, rows) { // for which cols, has a rows
  let arr = new Array(cols) // return a array with the cols's length
  for(let i = 0; i < arr.length; i++)
    arr[i] = new Array(rows)

  return arr 
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(600, 400)
  cols = width / resolution
  rows = height / resolution

  grid = Make2DArray(cols, rows)
  for(let i = 0; i < cols; i++)
    for(let j = 0; j < cols; j++)
      grid[i][j] = floor(random(2))

  console.table(grid)
}

function draw() {
  background(0);

  for(let i = 0; i < cols; i++) 
    for(let j = 0; j < cols; j++) {
      let x = i * resolution
      let y = j * resolution

      if (grid[i][j] === 1) { // fill the cell alive
        fill(255)
        stroke(0)
        rect(x, y, resolution - 1, resolution - 1)
      }
    } 
    
  let next = Make2DArray(cols, rows);

  for(let i = 0; i < cols; i++) 
    for(let j = 0; j < cols; j++) {
        let state = grid[i][j]
      
  
        let neighbors = CountNeighbors(grid, i, j)
  
        if (state == 0 && neighbors === 3)
          next[i][j] = 1
        else if (state == 1 && ( neighbors < 2 || neighbors > 3 ))
          next[i][j] = 0
        else 
          next[i][j] = state
    }

  grid = next;
  
}

function CountNeighbors(grid, x, y) {
  
  // count live neighnoors
  // [1,   0,    0]
  // [0,  state, 1]
  // [0,   0,    1]
  let sum = 0; 
  for(let i = -1; i < 2; i++)
    for(let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows

      sum += grid[col][row]
  
    }

  sum -= grid[x][y]

  return sum
}