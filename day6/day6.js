
const fs = require("fs")
const _ = require("underscore")

// const lines = fs.readFileSync("data.txt").toString().split("\n")
 
// const data = [[7,9],[15,40],[30,200]]
// const data = [[40,233],[82,1011],[84,1110], [92,1487]] //part 1
// const data  = [[71530,940200]]
const data = [[40828492,233101111101487]] //part 2

// //part 1
var good = 0
var tots = []
data.forEach((d,i) => {
console.log(d[0],d[1])
    _.each(_.range( d[1],0), (x) => {
        if ((  d[0] - x ) *x > d[1]) {
            good++
        }
    })
    tots.push(good)
    good = 0
})
console.log(_.reduce(tots, (a,b) => { return a *b })) 

//part 2
var ans = 0
console.log(data[0],data[1])
 for ( x in _.range(0,data[0]+1)) {
    dx = x * (data[0]-x)
    if (dx >= data[1]) {
        ans++
    }
 }
   console.log(ans)
// console.log(_.reduce(tots, (a,b) => { return a *b })) 