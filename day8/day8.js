 
const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")
console.table(lines)

var instructions = lines[0].replace('\r', '').split("")

var lookup = new Map()

var howFar = 0
var current = 'AAA'
var next = ''

drive = (instructions) => {
 
    console.log(instructions.length)
    for(var i = 0; i < instructions.length; i++) {
        var ins = instructions[i]
        console.log(`goto ${current}`)
    
        
        next = lookup.get(current)[ins == 'L' ? 0 : 1]
        console.log(`choose ${ins} = ${next} `)
        current = next
        howFar++
      

        if (current == 'ZZZ') { return howFar }
    }
    drive(instructions)
}



for(var x = 2; x < lines.length; x++) {
    line = lines[x].split("=")
    nextDir = line[1].replace("(", "").replace(")", "").split(",")
    //add to map
    lookup.set(line[0].trim(), [nextDir[0].trim(), nextDir[1].trim()])
}

console.table(lookup)

drive(instructions)

console.log(`AAA -> ZZZ in  ${howFar} steps`)

