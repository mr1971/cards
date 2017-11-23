var express = require('express');
var socket = require('socket.io');
var deck = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suit;
var n = 0;
var s, m;
var card = {
    suit: suit,
    rank: n,
    icon: suits[s],
    bgcolor: bgcolor
}
var DECK = [];
var bgcolor = "";

//Set up app
var app = express();
var server = app.listen(4000, function() {
    console.log('Server is listening on port 4000');
})

app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket) {
    socket.on('shuffleDeck', function() {
        DECK = createDeckOfCards();
        DECK = shuffleDeck(DECK, 5);
        firstJackDeal();
    });
});

function createDeckOfCards() {
	 var deck = [];
    for (s in suits) {
        var suit = suits[s][0].toUpperCase();
        var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";

        for (n in ranks) {
            card = {
                suit: suit,
                rank: n,
                icon: suits[s],
                bgcolor: bgcolor
            }
				deck.push(card);
        }
        var x = n + 1;               
	}
}
 
    function shuffleDeck(array, n) {
        var x = Number(n);
        for (c = 0; c < x; c++) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        return array;
        } 
    }
var playerCard = [];
    function firstJackDeal() {
        for (crd = 0; crd < 52; crd++) {
        		playerCard[crd] = DECK.pop();
            if (playerCard.rank == '11') {            
                console.log('Card: ' + playerCard.rank);
                console.log(playerCard);
                break;
            }

        }
    }
