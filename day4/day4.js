 
const fs = require("fs") 
const { type } = require("os")
const _  = require("underscore")

const lines = fs.readFileSync("testdata.txt").toString().split("\n")

var scratchTickets = new Array()

class scratchTicket {  

    constructor(cardno, winningNumbers, myNumbers) { 
        this.cardNumber = cardno
        this.winningNumbers = winningNumbers
        this.myNumbers = myNumbers
        this.ticketTotal  = 0
        this.play()
    }

    play = () => { 
        var wins = 0

        _.forEach(this.myNumbers, (num) => {
            if ( _.contains(this.winningNumbers, num)) {
                wins++
                if (this.ticketTotal == 0) { 
                    this.ticketTotal = 1
                } else {
                    this.ticketTotal *= 2  
                }
               
            } 
        }) 
         return {totalWins : wins, totalPoints: this.ticketTotal}
    }

}

_.forEach(lines, function(ticket) {
    var cardNumber = ticket.split(":")[0].split(" ")[1]
    var winningNumbers = ticket.split(":")[1].split("|")[0].trim().split(" ").map(Number);
    var myNumbers = _.filter(ticket.split(":")[1].split("|")[1].trim().split(" "), function(num) { if ( parseInt(num) != NaN) return num }).map(Number);

    scratchTickets.push(new scratchTicket(cardNumber, winningNumbers, myNumbers))
   
})

var gt =0
_.forEach(scratchTickets, ticket => {
    gt+=ticket.ticketTotal
})

console.log(gt)