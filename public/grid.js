var width = 400,
    height = 400;

var N = 1 << 0,
    S = 1 << 1,
    W = 1 << 2,
    E = 1 << 3;

var tails = 1,
    heads = 2

var cellSize = 7,
    cellSpacing = 3,
    cellsWide = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)),
    cellsHigh = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)),
    cells = new Array(cellsWide * cellsHigh);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

context.translate(
  Math.round((width - cellsWide * cellSize - (cellsWide + 1) * cellSpacing) / 2),
  Math.round((height - cellsHigh * cellSize - (cellsHigh + 1) * cellSpacing) / 2)
);

context.fillStyle = "white";

function initGrid() {
  for (var i = 0; i < cellsHigh; i++) {
    for (var j = 0; j < cellsWide; j++) {
      idx = i * cellsWide + j
      cells[idx] = {
        x: j,
        y: i,
        N: i > 0 ? idx - cellsWide : null,
        E: j < cellsWide - 1 ? idx + 1 : null,
        S: i < cellsHigh - 1 ? idx + cellsWide: null,
        W: j > 0 ? idx - 1 : null,
        links: []
      }
    }
  }
}

function drawGrid() {
  cells.forEach(function (cell, idx) {
    fillCell(idx);
    if (cell.links.indexOf(cell.E) >= 0) {
      fillEast(idx);
    }
    if (cell.links.indexOf(cell.S) >= 0) {
      fillSouth(idx);
    }
  })

  function fillCell(index) {
    var i = index % cellsWide, j = index / cellsWide | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
  }

  function fillEast(index) {
    var i = index % cellsWide, j = index / cellsWide | 0;
    context.fillRect((i + 1) * (cellSize + cellSpacing), j * cellSize + (j + 1) * cellSpacing, cellSpacing, cellSize);
  }

  function fillSouth(index) {
    var i = index % cellsWide, j = index / cellsWide | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, (j + 1) * (cellSize + cellSpacing), cellSize, cellSpacing);
  }

}
