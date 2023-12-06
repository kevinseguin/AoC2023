 
const fs = require("fs") 
const { type } = require("os")
const { nextTick } = require("process")
const _  = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")

var scratchTickets = new Array()

class scratchTicket {  

    cardNumber = 0
    winningNumbers = []
    myNumbers = []
    ticketTotal  = 0
    wins =0
    isCopy = false
    

    constructor(cardno, winningNumbers, myNumbers, isCopy = false) { 
        this.cardNumber = cardno
        this.winningNumbers = winningNumbers
        this.myNumbers = myNumbers
        this.ticketTotal  = 0
        this.wins = 0
        this.isCopy = isCopy
         
    }

    play = () => {   
        // console.log(`playing card ${this.cardNumber}`)
        _.forEach(this.myNumbers, (num) => {
            if ( _.contains(this.winningNumbers, num)) {
                this.wins++
                if (this.ticketTotal == 0) { 
                    this.ticketTotal = 1
                } else {
                    this.ticketTotal *= 2  
                }
               
            } 
        }) 

        // console.log(`${this.isCopy ? 'copy of card ' : 'card'} ${this.cardNumber} won ${this.wins} times, creating ${this.wins} new cards`)
        if (this.wins > 0) {
            _.each(_.range(this.cardNumber, this.wins+this.cardNumber), index => {
                var wonTicket = scratchTickets[index]
                var nextTicket = new scratchTicket(wonTicket.cardNumber, wonTicket.winningNumbers, wonTicket.myNumbers, true)
                nextTicket.play() 
                scratchTickets.push(nextTicket)
                // console.log(`card ${nextTicket.cardNumber} won ${nextTicket.wins} times`)
                
    
            })
        }
         return {wins: this.wins, total: this.ticketTotal, cardNumber: this.cardNumber}
    }

}

_.forEach(lines, function(ticket) {
    var cardNumber =  parseInt(ticket.split(":")[0].replace("Card", "").trim() )
    var winningNumbers = ticket.split(":")[1].split("|")[0].trim().split(" ").map(Number);
    var myNumbers = _.filter(ticket.split(":")[1].split("|")[1].trim().split(" "), function(num) { if ( parseInt(num) != NaN) return num }).map(Number);

    scratchTickets.push(new scratchTicket(cardNumber, winningNumbers, myNumbers))
   
})


console.log(scratchTickets.length + " tickets loaded")

 _.each(scratchTickets, ticket => {
        ticket.play()
    })

    
console.log(scratchTickets.length, " tickets played")