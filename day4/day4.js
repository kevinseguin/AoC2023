 
const fs = require("fs") 
const _  = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")

var gt = 0 

_.forEach(lines, function(ticket) {
    var cardNumber = ticket.split(":")[0].split(" ")[1]
    var winningNumbers = ticket.split(":")[1].split("|")[0].trim().split(" ")
    var myNumbers = _.filter(ticket.split(":")[1].split("|")[1].trim().split(" "), function(num) { if ( parseInt(num) != NaN) return num })

    var thisTicketTotal = 0
    console.log(`-----Ticket ${cardNumber} -----`)
    console.log(` ${winningNumbers.join(" ")}, My Numbers: ${myNumbers.join(" ")} `)
    
    _.forEach(myNumbers, function(num) {
        if ( _.contains(winningNumbers, num)) {
            console.log(num, "is a winner")
            if (thisTicketTotal == 0) { 
                thisTicketTotal = 1
            } else {
            thisTicketTotal *= 2  
            }
            console.log(thisTicketTotal)
        }
       
        
     })
     gt += thisTicketTotal
   
})
console.log(gt)


