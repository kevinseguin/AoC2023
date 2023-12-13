const { group } = require("console")
const fs = require("fs")
const _ = require("underscore")

const lines = fs.readFileSync("data.txt").toString().split("\n")

var hands = []

var cardVals = [['2',2], ['3',3], ['4',4], ['5',5], ['6',6], ['7',7], ['8',8], ['9',9], ['T',10], ['J',11], ['Q',12], ['K',13], ['A',14]]

cardVal = (card) => {
    for(var i = 0; i < cardVals.length; i++) {
        var c = cardVals[i]
        if (c[0] == card) {
            return c
        }
    }
}

cardByVal = (card) => {
    for(var i = 0; i < cardVals.length; i++) {
        var c = cardVals[i]
        if (c[1] == card) {
            return c[0]
        }
    }
}

scoreHand = (hand) => {
    var ranked = _.sortBy(_.keys(_.groupBy(hand, (h) => { return h.length })))

     // Five of a kind
     if (_.keys(hand).length == 1 && ranked.length == 1) {
        return 7
    }
   
    // if (_.contains(_.keys(hand), 'J')) {
   
    //     var noWildCardHand = _.clone(hand)
    //     delete noWildCardHand['J']
    //     var cardsToValues = _.mapObject(noWildCardHand, (val, key) => {  return cardVal(key) }) 
    //     var gotoMaxVal = _.sortBy(_.filter(_.toArray(hand), f=> { return !_.contains(f, 'J') }), d=> { return d.length }).reverse()[0][0] 
    //     console.log('before', hand, 'gotomaxval:', gotoMaxVal,'cardval', cardVal(gotoMaxVal))
    //     _.times(hand['J'].length, () => { hand[gotoMaxVal].push(gotoMaxVal)})
    //     delete hand['J']
    //     console.log('after', hand) 
    // }


    // ranked = _.sortBy(_.keys(_.groupBy(hand, (h) => { return h.length }))) 
    

    // Four of a kind
    if (ranked.length == 2 && (_.last(ranked) == 4 )) {
        return 6;
    }

    // Full house
    if (ranked.length == 2 && (ranked[0] == '2' && ranked[1] == '3')) {
        return 5
    }

    // Three of a kind
    if (_.keys(hand).length > 2 && _.last(ranked) == 3 ) {
        return 4
    } 

    // Two pairs
    if (_.keys(hand).length == 3 && _.last(ranked) == 2 ) {
        return 3
    }

    //one pair
    if (_.keys(hand).length == 4) {
        return 2
    }
    
    if (ranked.length == 1) {
        return 1
    }


    return 0

    
 

}

description = (handScore) => {
 switch(handScore) {
        case 7:
            return 'Five of a kind'
        case 6:
            return 'Four of a kind'
        case 5:
            return 'Full house'
        case 4:
            return 'Three of a kind'
        case 3:
            return 'Two pairs'
        case 2:
            return 'One Pair'
        default:
            return 'High card'
    }
}

lines.forEach((l) => {
    var hand = l.split(" ")[0]
   
    var gotoMaxVal 
    var grp = _.groupBy(hand)

    if (_.contains(_.keys(grp), 'J')) {  
        var noWildCardHand = _.clone(grp)
        delete noWildCardHand['J']
        var cardsToValues = _.mapObject(noWildCardHand, (val, key) => {  return cardVal(key) }) 
        //gotoMaxVal = cardByVal(_.max(_.map(_.values(cardsToValues), m=> { return m[1] }))) 
        try {
            gotoMaxVal = _.sortBy(_.filter(_.toArray(grp), f=> { return !_.contains(f, 'J') }), d=> { return d.length }).reverse()[0][0] 
            console.log('before', grp, 'gotomaxval:', gotoMaxVal,'cardval', cardVal(gotoMaxVal))
            _.times(grp['J'].length, () => { grp[gotoMaxVal].push(gotoMaxVal)})
            
        } catch(e) {
            gotoMaxVal = 'K'
            grp['K'] = ['K', 'K', 'K', 'K', 'K']
        }
        delete grp['J']
       
        console.log('after', grp)   
    }

    var scoreHandVal = parseInt(scoreHand(grp)) 

    hands.push({
        hand: hand,
        bid: parseInt(l.split(" ")[1].replace('\r', '')),
        cards: grp,
        score: scoreHandVal,
        description: description(scoreHandVal),
        first: cardVal(hand[0])[1],
        second: cardVal(hand[1])[1],
        third: cardVal(hand[2])[1],
        fourth: cardVal(hand[3])[1],
        fifth: cardVal(hand[4])[1]
    }) 
}) 
 

var sorted =_.sortBy(
                _.sortBy(
                    _.sortBy(
                        _.sortBy(
                            _.sortBy(
                                _.sortBy(hands, 'fifth') ,
                            'fourth') ,
                        'third') ,
                    'second') ,
                'first') ,
            'score') 
 

for(var i = 0; i < sorted.length; i++) {
    sorted[i].rank = i + 1
    sorted[i].handScore = (i+1) * sorted[i].bid
}
 
console.table(sorted)

console.log(sorted[sorted.length-1], sorted[sorted.length-2])
console.log(_.reduce(sorted, (memo, num) => { return memo + num.handScore }, 0))
