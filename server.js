var express = require('express');
var socket = require('socket.io');
var deck = [];

//Set up app
var app = express();
var server = app.listen(4000, function(){
  console.log('Server is listening on port 4000');
})

app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('Socket connected:  ' + socket.id);

  /*socket.on('FJD', firstJackDeal());*/
})

function createDeckOfCards() {
    var suits = ["spades", "hearts", "clubs", "diams"];
    var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    for (s in suits) {
        var suit = suits[s][0].toUpperCase();
        var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";

        for (n in ranks) {
          //  table.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + ranks[n] + "</span> ";
            var card = {
                suit: suit,
                rank: n,
                icon: suits[s],
                bgcolor: bgcolor
            }

            deck.push(card);

        }
      }
}

function shuffleDeck(array,n) {
    for(c=0;c<n;c++){
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    return array;
    }
}

function firstJackDeal(){
    console.log('First Jack DEal');
    var x=0
    shuffleDeck(deck,1000);

    for(p=0;p<51;p++){

        var card=deck.pop();
    /*    socket.on(sendCard, function(card){
        displayCard(card);
    }); */
        if(card.rank=='11'){
            //alert('Player '+x+' is the dealer');
            break;
        }

        if(x<5){
            x=x+1
            console.log('player : '+x);
            if (parseInt(x)==4){
                x=0
            }

        }

        /*socket.on('shuffleDeck', function(data){
            //shuffleDeck(deck, 7);
            console.log('shuffling deck');
        })*/
    }

}

createDeckOfCards();
