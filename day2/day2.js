const fs = require("fs")


fs.readFile("testdata.txt", (err, data) => {
    console.log(data.toString())
    console.log("-------------------")
    var line = data.toString().split("\n")

    games = new Set()

    line.forEach((line) => {
        var gameSplit = line.split(":")
        gameNo = gameSplit[0].split(" ")[1]
        
        bagPull = gameSplit[1].split(";")
        bagPull.forEach(pull => { 
            console.log(pull)
            pull.split(" ").forEach(section => {
                console.log(section)
                console.log('---')
                // numberOfColour = parseInt(section[0])
                // colour = section[1].toString()
                // console.log(numberOfColour, colour)
            })
        })

    })
})
      


