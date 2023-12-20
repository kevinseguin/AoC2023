 
const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")
// console.table(lines)

var instructions = lines[0].replace('\r', '').split("")

var lookup = new Map()

var howFar = 0
var current = 'GNA'
var next = ''

drive = (ins, paths) => { 
    return  _.map(paths, f=> { return  lookup.get(f)[ins == 'L' ? 0 : 1]}) 
}



for(var x = 2; x < lines.length; x++) {
    line = lines[x].split("=")
    nextDir = line[1].replace("(", "").replace(")", "").split(",")
    lookup.set(line[0].trim(), [nextDir[0].trim(), nextDir[1].trim()])
}
 
// var sorted = _.groupBy([...lookup.keys()], f=> { return f.split("")[2]})
// _
// _.keys(sorted).sort().forEach(function(v) {
//     drive(instructions, sorted[v])
// })

var res = [ 'GNA', 'FCA', 'AAA', 'MXA', 'VVA', 'XHA' ]
 //var res = ['11A', '22A']
 var x = []
var isDone = false

while (!isDone) {
    
    //   console.log(isDone, howFar)
      if (isDone) { break }
    
    _.each(instructions, function(ins) {
        res = drive(ins, res)
        
        // isDone = _.filter(res, f=> { return f.split("")[2] == 'Z'}).length == res.length
        isDone =  _.every(_.map(res, f=> { return f.endsWith('Z') }))
        // for(var i = 0; i < res.length; i++) {
        //   if (!x[i]) {
        //      console.log(x[i], res[i])             
        //   }
        // }
        

        howFar++
        
        //print every 1000 howfar
         if (howFar % 100000 == 0) { console.log(howFar, res) }
    })
    
    
}

console.log('done', howFar, res)
 


 