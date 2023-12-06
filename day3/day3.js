
const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")

const gridWidth = lines[0].length
const gridHeight = lines.length

grid = fillGrid()


checkValid = (coords) => {
    if (coords?.length) {
        console.log( grid[coords.split(',')[0]][coords.split(',')[1]] == '*')
    }
}




var i, cnt = 0
var length = 0
var line = 4
var foundNumberAt = 0
var foundNumber = false
var foundNumbers = []

for (line = 0; line < gridHeight; line++) {
    for (var i = 0; i < gridWidth; i++) {
        if (parseInt(grid[line][i]) || grid[line][i] == 0) {
            if (!foundNumber) {
                foundNumberAt = i
                foundNumber = true
            }
            length++
        }
        else {
            if (length > 0) {
                foundNumbers.push({ id: ++cnt, line: line, foundAt: foundNumberAt, length: length, number: parseInt(_.first(_.rest(grid[line], foundNumberAt), length).join("")) })
            }
            foundNumber = false
            length = 0

        }
    }
 
}

console.log(gridHeight, " x ", gridWidth)
console.log(foundNumbers.length)

for (var i = 0; i < foundNumbers.length; i++) {
    foundNumbers[i].valid = hasSymbol(foundNumbers[i].id, foundNumbers[i].line, foundNumbers[i].foundAt, foundNumbers[i].length)
}

console.log('-------------------')

var groupedguys = _.toArray(_.groupBy(_.filter(foundNumbers, f => { return f.foundGearAt }), 'foundGearAt'))

var matches = _.filter(groupedguys, f => { return f.length == 2 })
  
var part2gt = 0
for (var i = 0; i < matches.length; i++) {
    guy = matches[i] 
    part2gt += guy[0].number * guy[1].number
}   



console.log(part2gt)
var goodOnes = _.filter(foundNumbers, function (num) { return num.valid == true })
var gt = _.reduce(goodOnes, function (memo, num) { return memo + num.number }, 0)

console.log(gt)


//debug - find stars, print around to see what it missed
// _.each(lines, function (line, idx) {
//     line.split("").forEach(function (symbol, symbolIdx) {
//         if (symbol == '*') {
//           if ( _.where(foundNumbers,{ foundGearAt: `${idx},${symbolIdx}` }).length < 2) {
//             console.log(`------${idx},${symbolIdx}----------`)
//             console.log(grid[idx-1][symbolIdx-3], grid[idx-1][symbolIdx-2], grid[idx-1][symbolIdx-1], grid[idx-1][symbolIdx], grid[idx-1][symbolIdx+1], grid[idx-1][symbolIdx+2],grid[idx-1][symbolIdx+3])  
//             console.log(grid[idx][symbolIdx-3], grid[idx][symbolIdx-2], grid[idx][symbolIdx-1], grid[idx][symbolIdx], grid[idx][symbolIdx+1], grid[idx][symbolIdx+2], grid[idx][symbolIdx+3])
//             console.log(grid[idx+1][symbolIdx-3], grid[idx+1][symbolIdx-2], grid[idx+1][symbolIdx-1], grid[idx+1][symbolIdx], grid[idx+1][symbolIdx+1], grid[idx+1][symbolIdx+2], grid[idx+1][symbolIdx+3])
//             console.log(_.where(foundNumbers,{ foundGearAt: `${idx},${symbolIdx}` }))
//            }
//         }
//     })
// })

function hasSymbol(id, lineIndex, startAt, length) {

    var num = _.first(_.rest(grid[lineIndex], startAt), length)
    //   console.log('look around', num.join(""))
    var diagFullLength = length + parseInt((startAt == 0 || (startAt + length) > gridWidth - 1) ? 1 : 2)
    var above = lineIndex - 1
    var below = lineIndex + 1
    var left = startAt - 1
    var right = startAt + length
    var hasAbove, hasBelow, hasLeft, hasRight = false

    if (above > 0) {
        lineAbove = _.first(_.rest(grid[above], startAt == 0 ? 0 : startAt - 1), diagFullLength)
        console.log("Above: ", lineAbove.join(""))
        console.log(_.contains(_.map(lineAbove, function (symbol) { return parseInt(symbol) != NaN && symbol != "." }), true))
        hasAbove = _.contains(_.map(lineAbove, function (symbol) { return parseInt(symbol) != NaN && symbol != "." }), true)
        if (_.contains(lineAbove, "*")) {
            searchNumbers = _.findWhere(foundNumbers, { id: id })
            _.each(_.range(startAt == 0 ? searchNumbers.foundAt : searchNumbers.foundAt - 1, diagFullLength + searchNumbers.foundAt ), function (x) {
                 console.log(id, x, searchNumbers.number.toString().length, searchNumbers.number)

                if (grid[above][x] == "*") {
                    console.log("found gear at ", above, x)
                    if (!searchNumbers["foundGearAt"]) searchNumbers["foundGearAt"] = `${above},${x}`
                    
                }
            })

        }
       
    }

    
    if (below < gridHeight) {
        lineBelow = _.first(_.rest(grid[below], startAt == 0 ? 0 : startAt - 1), diagFullLength)
            // console.log("Below: ", lineBelow.join(""))
            // console.log(_.contains(_.map(lineBelow, function (symbol) { return parseInt(symbol) != NaN && symbol != "." }), true))
        hasBelow = _.contains(_.map(lineBelow, function (symbol) { return parseInt(symbol) != NaN && symbol != "." }), true)
        if (_.contains(lineBelow, "*")) {
          
            searchNumbers = _.findWhere(foundNumbers, { id: id })
           
            _.each(_.range(startAt == 0 ? searchNumbers.foundAt : searchNumbers.foundAt - 1, diagFullLength + searchNumbers.foundAt ), function (x) {
                // console.log(x, searchNumbers.number.toString().length)
                if (grid[below][x] == "*") {
                    // console.log("found gear at ", below, x)
                    if (!searchNumbers["foundGearAt"]  ) searchNumbers["foundGearAt"] = `${below},${x}`
                }
            })
        }
    }


    if (left >= 0) {
        symbolLeft = grid[lineIndex][left]
        // console.log("Left: ", symbolLeft)
        // console.log(parseInt(symbolLeft) != NaN && symbolLeft != ".")
        hasLeft = parseInt(symbolLeft) != NaN && symbolLeft != "."
        if (symbolLeft == '*') {
            searchNumbers = _.findWhere(foundNumbers, { id: id })
            if (!searchNumbers["foundGearAt"] ) searchNumbers["foundGearAt"] = `${lineIndex},${left}`
            // console.log(below, searchNumbers)
        }
    }

    if (right <= gridWidth - 1) {
        symbolRight = grid[lineIndex][right] 
        // console.log("Right: ", symbolRight)
        // console.log(parseInt(symbolRight) != NaN && symbolRight != ".")
        hasRight = parseInt(symbolRight) != NaN && symbolRight != "."
        if (symbolRight == '*') {
            searchNumbers = _.findWhere(foundNumbers, { id: id })
            if (!searchNumbers["foundGearAt"] ) searchNumbers["foundGearAt"] = `${lineIndex},${right}`
            // console.log(below, searchNumbers)
        }
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
