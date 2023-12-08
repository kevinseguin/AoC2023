
const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("testdata.txt").toString().split("\n")

mySeeds = lines[0].split(":")[1].trim().split(" ").map(Number)

let maps = []

console.log('My Seeds', mySeeds)

const categories = ['seed-to-soil map',
    'soil-to-fertilizer map',
    'fertilizer-to-water map',
    'water-to-light map',
    'light-to-temperature map',
    'temperature-to-humidity map',
    'humidity-to-location map'
]


findCategory = (cat) => {
    return lines.find(l => { return l.includes(cat) })
}

findCategoryIndex = (cat) => {
    return lines.findIndex(l => { return l.includes(cat) })
}

makeMap =  (cat) => {
    mapValue = [] 
    
    

    for (var i = findCategoryIndex(cat) + 1; i < lines.length; i++) {

        let curLine = lines[i].split(" ")
        if (curLine.length<3) { return mapValue }
        mapValue.push({
            "category": cat,
            "destination_range_start": parseFloat(curLine[0]),
            "source_range_start": parseFloat(curLine[1]),
            "range_length": parseFloat(curLine[2])
        })

    }

    return mapValue

}


buildMap = (cat) => {
    let ranges = []
    console.log('building map for ', cat.category)
    console.log('dest start', cat.destination_range_start)
     console.log('source start', cat.source_range_start)
     console.log('range length', cat.range_length)
     for(var i = cat.destination_range_start; i < cat.destination_range_start + cat.range_length; i++) {
         ranges.push({"dest":i})
     }
 
    //_.forEach(_.range(cat.destination_range_start, cat.destination_range_start + cat.range_length), (i, idx) => { ranges.push({"dest":i});  })
    _.forEach(_.range(cat.source_range_start, cat.source_range_start +   cat.range_length), (i, idx) => { ranges[idx]["source"] = i })
    return ranges
 }

 

_.each(categories, (cat) => {
    maps[cat] = _.sortBy(makeMap(cat), 'source_range_start')
})


getNextCategory = (cat) => {
    return categories[_.findIndex(categories, (c) => { return c == cat })+1]

} 

dothething = (s, m) => {
    var next = s + m.source_range_start - m.range_length 
    return {next: m.destination_range_start + (s - m.source_range_start ), nextCategory: getNextCategory(m.category) } 
}


findRangeInCategory = (cat, val) => {
    for (var i = 0 ; i < maps[cat].length; i++) {
        var m = maps[cat][i]
        var source = m.source_range_start + m.range_length
        if (val >= m.source_range_start && val <= source ) {
           var out = dothething(val, m)
           return out
        }
    }
    return {next: val, nextCategory: getNextCategory(cat)}
}
    


//part 1
var sortme = []
// _.each(mySeeds , s=> { 
 
//     var n = findRangeInCategory('seed-to-soil map', s)

//     n = findRangeInCategory(n.nextCategory, n.next)
//     n = findRangeInCategory(n.nextCategory, n.next)
//     n = findRangeInCategory(n.nextCategory, n.next)
//     n = findRangeInCategory(n.nextCategory, n.next)
//     n = findRangeInCategory(n.nextCategory, n.next)
//     n = findRangeInCategory(n.nextCategory, n.next)
//     sortme.push(n.next)

// })

 

//part 2 


var lastnum = 99999999999999
_.each(_.chunk(mySeeds, 2), (s, idx) => {
    console.log(s[0], idx)
    for (var i = s[0] ; i < s[0] + s[1]; i++){ 
        var n = findRangeInCategory('seed-to-soil map', i)
        n = findRangeInCategory(n.nextCategory, n.next)
        n = findRangeInCategory(n.nextCategory, n.next)
        n = findRangeInCategory(n.nextCategory, n.next)
        n = findRangeInCategory(n.nextCategory, n.next)
        n = findRangeInCategory(n.nextCategory, n.next)
        n = findRangeInCategory(n.nextCategory, n.next)
        lastnum = _.min([lastnum, n.next])
        
        
        if (i % 1000000 == 0) {console.log ((i/ (s[0] + s[1]) * 100).toFixed(2)) }

    }
    console.log(lastnum)
})
console.log(lastnum)

   
   
  




