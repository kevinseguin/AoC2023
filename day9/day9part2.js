const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")


obj = []

   _.each(lines, (line) => {
   obj.push(line.replace("\r","").split(" ").map(Number))  
  })

console.log(obj)

addChild = (obj) => {
    obj.child = []

    for(var i = 0; i < obj.length-1; i++) {
        // console.log(`${obj[i]}+${obj[i+1]} = ${parseInt(obj[i]+obj[i+1])}`)
        obj.child.push(-1*( (obj[i]-obj[i+1])))
    }

    if ( !_.every(obj.child, (c) => { return c === 0 })) {
        addChild(obj.child)
    }
    else {
        return obj
    } 
}

traverseChildren = (obj) => {
    if (obj.child) {
        traverseChildren(obj.child) 
        obj.unshift( _.first(obj) - _.first(obj.child) )
    }
}

 _.each(obj, (o) => {
    addChild(o)
 })

 _.each(obj, (o) => {
    traverseChildren(o)
 })

 console.log(obj)

const x = _.reduce(obj, (memo, o) => {
    return memo + _.first(o)
}, 0)

console.log(x)



