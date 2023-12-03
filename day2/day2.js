const fs = require("fs")
var async = require("async")


fs.readFile("data.txt", (err, data) => {
    console.log(data.toString())
    console.log("-------------------")
    var line = data.toString().split("\n")

    games = []

    class game {
        id = 0
        red = { valid: true, count: 0, max: 0}
        green = { valid: true, count: 0, max: 0}
        blue =  { valid: true, count: 0, max: 0}
        gamePower = () => this.red.max * this.green.max * this.blue.max

        constructor(id) {
            this.id = id
        }
    }

    const redMax = 12
    const greenMax = 13
    const blueMax = 14
    

    async.each(line, line => {
        var gameSplit = line.split(":")
        gameNo = gameSplit[0].split(" ")[1]
        games[gameNo] = new game(gameNo)
        console.log('----')
        console.log(gameNo)
        bagPull = gameSplit[1].split(";")
   
        async.each(bagPull, pull => { 
            console.log('pulled', pull)
            async.each(pull.split(","),section => {
                var numOfColour = parseInt(section.trim().split(" ")[0])
                var colour = section.trim().split(" ")[1]
                if (colour == "red" && numOfColour > redMax) { games[gameNo][colour].valid = false}
                if (colour == "green" && numOfColour > greenMax) { games[gameNo][colour].valid = false}
                if (colour == "blue" && numOfColour > blueMax) { games[gameNo][colour].valid = false}
        


                games[gameNo][colour].count =  games[gameNo][colour].count += numOfColour
                if ( games[gameNo][colour].max < numOfColour) {
                    games[gameNo][colour].max = numOfColour
                }
            })
        })


    })

    console.log(JSON.stringify(games, null, 4))
    var gt = 0

    games.forEach(game => {
        // if (game.red.valid && game.green.valid && game.blue.valid) {
        //     gt += parseInt(game.id)
        // }
       gt += game.gamePower()
    })
    console.log(gt)
    
})
      


