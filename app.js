document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid")
  const squares = Array.from(document.querySelectorAll(".grid div"))
  const ScoreDisplay = document.querySelector("#score")
  const startButton = document.querySelector("#start")
  const width = 10;
  const lTetrimino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2], 
    [width, width*2+2, width*2, width*2+1]
  ]
  const squareTetriminio = [
    [1, width, width + 1, 0],
    [1, width, width + 1, 0],
    [1, width, width + 1, 0],
    [1, width, width + 1, 0],
  ]

  const zTetriminio = [
    [1, width, width + 1, width*2],
    [0, 1, width+1, width+2],
    [1, width, width + 1, width, width*2],
    [0, 1, width+1, width+2]
  ]
  const lineTetriminio = [
    [0, width, width*2, width*3],
    [-1,0,1,2],
    [0, width, width*2, width*3],
    [-1,0,1,2]
  ]
  const tTetrimino = [
    [-1, 0, 1, width],
    [0, width, width*2, width + 1],
    [width-1, width , width + 1, 0],
    [0, width, width*2, width +-1]
  ]


  
  const tetriminos = [lTetrimino, squareTetriminio, zTetriminio, lineTetriminio, tTetrimino]
  let random = Math.floor(Math.random()*tetriminos.length)
  let currentPos = 4;
  let currentRotation = 0;
  let current = tetriminos[random][currentRotation];
  let nextRandom = 0;
  
  function draw() {
    current.forEach( index => {
      squares[currentPos + index].classList.add("tetrimino")
    })
  }
  // let currentPos = 4;
  // let current = tetriminos[4][3];
  // draw();

  // currentPos = 0;
  // current = tetriminos[2][1]
  // draw()







  function undraw() {
    current.forEach( index => {
      squares[currentPos + index].classList.remove("tetrimino")
    })
  }

  timerId = setInterval(moveDown, 700)
  // assign fucntions to keyCodes
  document.addEventListener('keyup', control)

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }


  function moveDown() {
    undraw()
    currentPos += width
    draw()
    freeze()
  }

  function freeze() {
    if(current.some(index => squares[currentPos + index + width].classList.contains("taken"))) {
      current.forEach(index => squares[currentPos + index].classList.add('taken'))
      random = nextRandom
      nextRandom = Math.floor(Math.random()*tetriminos.length)
      current = tetriminos[random][currentRotation]
      currentPos = 4;
      draw()
      displayShape();
    }
  }

  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => ( currentPos + index) % width === 0)
    if(!isAtLeftEdge) currentPos -=1
    if (current.some(index => squares[currentPos + index].classList.contains("taken"))) {
      currentPos += 1
    }
    draw()
  }
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => ( currentPos + index) % width === width - 1)
    if(!isAtRightEdge) currentPos +=1
    if (current.some(index => squares[currentPos + index].classList.contains("taken"))) {
      currentPos -= 1
    }
    draw()
  }

  function rotate() {
    undraw();
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    console.log(tetriminos[random])
    current = tetriminos[random][currentRotation]
    draw()
  }

  // show next;
  const displaySquare = document.querySelectorAll('.minigrid div')
  const dwidth = 4;
  let displayIndex = 0;
  const nextTetrimino = [
    [1, dwidth+1, dwidth*2+1, 2],
    [1, dwidth, dwidth + 1, 0], 
    [1, dwidth, dwidth + 1, dwidth*2],
    [0, dwidth, dwidth*2, dwidth*3],
    [2, 0, 1, dwidth + 1]
  ]

  console.log(nextTetrimino)
  function displayShape() {
    displaySquare.forEach(square => {
      square.classList.remove('tetrimino')
    })
    nextTetrimino[nextRandom].forEach( index => {
      displaySquare[displayIndex + index].classList.add("tetrimino")
    })
  }

})
