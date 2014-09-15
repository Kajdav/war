$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { 
			i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	//divide out the cards into the two arrays

	var deal = function(array) {
		cards_player_1 = array.slice(0, 26);
		cards_player_2 = array.slice(26);
	}
	deal(shuffle(deck));
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function (card1, card2) {
		if (card1 > card2) {
			return 1;
		}
		else if (card1 < card2) {
			return 2;
		}
		else if (card1 === card2) {
			return false;
		}
	}
	var tie = function() {
		var outcomeTie = war(cards_player_1[3].number, cards_player_2[3].number);
		if (outcomeTie === 1) {
			for(var i = 0; i < 4; i++){
				cards_player_1.push(cards_player_1[i]);
				cards_player_1.push(cards_player_2[i]);
			}
			cards_player_1.splice(0, 4);
			cards_player_2.splice(0, 4);
		}
		else if (outcomeTie === 2) {
			for(var i = 0; i < 4; i++){
				cards_player_2.push(cards_player_1[i]);
				cards_player_2.push(cards_player_2[i]);
			}
			cards_player_1.splice(0, 4);
			cards_player_2.splice(0, 4);
		}
		else if (outcomeTie === false) {
			alert("42");
			cards_player_1.push(cards_player_1[0]);
			cards_player_2.push(cards_player_2[0]);
			cards_player_1.splice(0, 1);
			cards_player_2.splice(0, 1);
		}
	}
	// console.log(cards_player_1);
	// var showHand = function () {
	//     var firstHand = [];
	//     var secondHand = [];
	//     var displayHand = function (cards, hand) {
	//         for (var i = 0; i < cards.length; i++) {
	//             hand[i] = cards[i].number + " of " + cards[i].suit;
	//         }
	//     }
	//     displayHand(cards_player_1, firstHand);
	//     displayHand(cards_player_2, secondHand);
	//     console.log("Player One's Hand: " + firstHand)
	//     console.log("Player Two's Hand: " + secondHand)
	// }
	//The above, commented code is for testing.  It shows both players' hands in the console every 10 plays.


	var counter = 0;
	function play() {
		// if (counter % 10 ===0) {
		// 	showHand();
		// }   <---- This corresponds with the commented out code above.
		counter++;
		var outcome = war(cards_player_1[0].number, cards_player_2[0].number);
		counter++;
		if (outcome === 1) {
			cards_player_1.push(cards_player_1[0], cards_player_2[0]);
			cards_player_1.splice(0, 1);
			cards_player_2.splice(0, 1);
		}
		else if (outcome === 2) {
			cards_player_2.push(cards_player_1[0], cards_player_2[0]);
			cards_player_1.splice(0, 1);
			cards_player_2.splice(0, 1);
		}
		else if (outcome === false) {
			tie();
		}
		//this function (defined below) will continue to the next turn
		advance();
	}
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});
