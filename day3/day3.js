const fs = require("fs")
const _  = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")

const gridWidth = lines[0].length
const gridHeight = lines.length 

grid = fillGrid()
//console.table(grid)

var i = 0
var length = 0
var line = 4
var foundNumberAt = 0
var foundNumber = false
var foundNumbers = []

for (line = 0; line < gridHeight; line++) {
    for (var i = 0; i < gridWidth; i++) {
        if (parseInt(grid[line][i]) || grid[line][i] == 0 ) {
            if (!foundNumber) { 
                foundNumberAt = i
                foundNumber = true
            }
            length++
        }
        else { 
            if (length > 0) {
            foundNumbers.push({line: line, foundAt: foundNumberAt, length: length, number: parseInt( _.first(_.rest(grid[line],foundNumberAt), length).join(""))})
            }
            foundNumber = false
            length =0   

        }
    }
}

console.log(gridHeight, " x " , gridWidth)
console.table(foundNumbers)
 
for(var i = 0; i < foundNumbers.length; i++) { 
         foundNumbers[i].valid =  hasSymbol(foundNumbers[i].line, foundNumbers[i].foundAt, foundNumbers[i].length)
}


var goodOnes = _.filter(foundNumbers, function(num) { return num.valid == true })
var gt = _.reduce(goodOnes, function(memo, num) { return memo + num.number }, 0)

console.log(gt)

function hasSymbol(lineIndex,startAt,length) {

  var num = _.first(_.rest(grid[lineIndex],startAt), length)
  console.log('look around', num.join(""))
  var diagFullLength = length + parseInt((startAt == 0 || (startAt + length) > gridWidth-1) ? 1 : 2)
  var above = lineIndex - 1
  var below = lineIndex + 1
  var left = startAt - 1
  var right = startAt + length 
  var hasAbove, hasBelow, hasLeft, hasRight = false

  if (above > 0) {
    lineAbove = _.first(_.rest(grid[above],startAt == 0 ? 0 : startAt -1), diagFullLength)
    console.log("Above: ", lineAbove.join(""))
    console.log(_.contains(_.map(lineAbove, function(symbol) { return parseInt(symbol) != NaN && symbol != "." }), true))
    hasAbove = _.contains(_.map(lineAbove, function(symbol) { return parseInt(symbol) != NaN && symbol != "." }), true) 
  }

  if (below < gridHeight) {
    lineBelow = _.first(_.rest(grid[below],startAt == 0 ? 0 : startAt -1), diagFullLength)
    console.log("Below: ", lineBelow.join(""))
    console.log(_.contains(_.map(lineBelow, function(symbol) { return parseInt(symbol) != NaN && symbol != "." }), true))
    hasBelow = _.contains(_.map(lineBelow, function(symbol) { return parseInt(symbol) != NaN && symbol != "." }), true)
  }

  if (left >= 0) {
    symbolLeft = grid[lineIndex][left]
    console.log("Left: ", symbolLeft)
    console.log(parseInt(symbolLeft) != NaN && symbolLeft != ".")
    hasLeft = parseInt(symbolLeft) != NaN && symbolLeft != "."
  }

  if (right < gridWidth-1) {
    symbolRight = grid[lineIndex][right]
    console.log("Right: ", symbolRight)
    console.log(parseInt(symbolRight) != NaN && symbolRight != ".")
    hasRight = parseInt(symbolRight) != NaN && symbolRight != "."
  }

    return hasAbove || hasBelow || hasLeft || hasRight
    
    

}




function fillGrid() {
    const grid = []
    for (var i = 0; i < gridHeight; i++) {
        grid[i] = lines[i].replace("\r", "").split("")
    }
    return grid
}
