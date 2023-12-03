const fs = require("fs")

//first answer: 55477

var numberwords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
var total = 0


fs.readFile("data_day1.txt", (err, data) => {
    console.log(data.toString())
    console.log("-------------------")
    var line = data.toString().split("\n")
    var wordAry = []
    line.forEach((line) => {
        var onlywordsline = line
        var numArray = []
       
        var chars = line.toString().split("")

        //change all integers to words
        for(var i = 0; i < chars.length; i++) {
            if (parseInt(chars[i])) {
                numArray.push(numberwords[parseInt(chars[i]) - 1])
                onlywordsline = onlywordsline.replaceAll(chars[i].toString(), numberwords[parseInt(chars[i]) - 1])
            }
        }
       
    
        console.log(onlywordsline) 
        
        for (var j = 0; j < numberwords.length ; j++) {
            var foundWordAt = onlywordsline.indexOf(numberwords[j])
            while (foundWordAt != -1) {
                 if (foundWordAt > -1) {
                    wordAry.push({wordIdx: numberwords.findIndex((word) => {return word == numberwords[j]})+1, number: foundWordAt})    
                }  
                foundWordAt = onlywordsline.indexOf(numberwords[j], foundWordAt+1)
                
            }
        }
       
        wordAry.sort((a,b) => {
            return a.number - b.number
        })
        console.log(wordAry)
        _first = wordAry[0].wordIdx
        _last = wordAry[wordAry.length - 1].wordIdx
        console.log(_first, _last)
        var combine  = _first.toString() + _last.toString()
        total += parseInt(combine)
        wordAry = []
    })
console.log(total)
})

      


