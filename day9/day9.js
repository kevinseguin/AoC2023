const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")


obj = []

 _.each(lines, (line) => {
   obj.push(line.replace("\r","").split(" ").map(Number))  
// obj.push('10 13 16 21 30 45'.replace("\r","").split(" ").map(Number))
})


addChild = (obj) => {
    obj.child = []

    for(var i = 0; i < obj.length-1; i++) {
        obj.child.push( (Math.abs(obj[i]-obj[i+1])))
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
        // obj.push(_.last(obj.child) + _.last(obj))
    }
}

 _.each(obj, (o) => {
    addChild(o)
 })

 console.log(obj)

 _.each(obj, (o) => {
    traverseChildren(o)
 })

 console.log(obj)
  
const x = _.reduce(obj, (memo, o) => {
    return memo + _.first(o)
}, 0)

console.log(x)



