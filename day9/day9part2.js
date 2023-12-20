const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")


obj = []

 _.each(lines, (line) => {
   obj.push(line.replace("\r","").split(" ").map(Number))  
})


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
        obj.push(_.last(obj.child) + _.last(obj))
    }
}

 _.each(obj, (o) => {
    addChild(o)
 })

 _.each(obj, (o) => {
    traverseChildren(o)
 })

 

const x = _.reduce(obj, (memo, o) => {
    return memo + _.last(o)
}, 0)

console.log(x)



