let deckId = ""
let cardValues = []
let computerScore = 0
let playerScore = 0


let newDeck = function(){
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
    .then(console.log("hit"))    
    .then(response => response.json())
        .then(data => {
            deckId = data.deck_id
            document.getElementById("remaining").innerText = data.remaining
            document.getElementById("computer-score").innerText = computerScore
            document.getElementById("player-score").innerText = playerScore
        }) 
}

let compare = (card0, card1) =>{
    let cards = [parseInt(card0),parseInt(card1)]
    const notNumCards = {"JACK":11, "QUEEN":12 ,"KING":13 , "ACE":14}
    for(let card in cards){
        if(!cards[card]){
            let replaceCard = eval(`card${card}`)
            console.log(replaceCard)
            console.log(notNumCards[replaceCard])
            cards[card] = notNumCards[replaceCard]
        }
        
    }
    console.log(cards)

    if(cards[0]>cards[1]){
        computerScore ++
        return "Computer Wins!"
    }else if(cards[0]== cards[1]){
        return "War!"
    }else{
        playerScore ++
        return "You Win!"
    }

}

let draw = function(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
                .then(response => response.json())
                .then(data => {
                    cardValues = []
                    for (let card in data.cards){
                        
                        document.getElementById(`card${card}`).innerHTML = `<img src="${data.cards[card].image}" class="card">`
                        cardValues.push(data.cards[card].value)   
                    }
                    
                    let winner = compare(cardValues[0],cardValues[1])
                    document.getElementById("remaining").innerText = data.remaining
                    document.getElementById("winner").innerText = winner
                    document.getElementById("computer-score").innerText = computerScore
                    document.getElementById("player-score").innerText = playerScore


                    if(data.remaining == 0){
                        document.getElementById("draw").disabled = true
                        if(computerScore>playerScore){
                            document.getElementById("winner").innerText = "Computer Wins the Game!"
                        }else if(playerScore>computerScore){
                            document.getElementById("winner").innerText = "Player Wins the Game!"
                        }else{
                            document.getElementById("winner").innerText = "Its a tie!"
                        }
                    }
                })
}

document.getElementById("new-deck").addEventListener("click", newDeck)
document.getElementById("draw").addEventListener("click", draw)

