var Board = function(){
	//the dealer and player will store card objects
	this.dealer_hand = [];
	this.player_hand = [];
	this.bankroll = 100;// gonna start default with 100pesos
	this.player_bet = 0;
};// end of board factory

Board.prototype.randomize = function() {
	//fisher yates algorithum, need to make my own iteration of it
	//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	var stacked_deck = ["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];
	var card_suit = ["Hearts","Spades","Clovers","Diamonds"];
	var random_index = function(array){
		return Math.floor(Math.random()*array.length);	
	};//end of random index function

	//created a simple "factory" that will return a random card and push that shit towards the array
	var Card = function(){ 
		return{
			card_value:stacked_deck[random_index(stacked_deck)],
			card_suit:card_suit[random_index(card_suit)]
		};
	};//end of card factory (sort of)
	return new Card;//only way to grab freshest of the fresh!
};// end of randomize proto method

Board.prototype.ask_bets = function(amount){
	var staked_pesos = amount;
	if(this.bankroll < amount){
		return "INVALID!!!! U GOT NO MONEY!!!!"
	};
	this.player_bet = staked_pesos;
	this.bankroll -= staked_pesos;

};// end of ask_bets method

Board.prototype.clear_hand = function() {
	this.dealer_hand = [];
	this.player_hand = [];
};//end of clear_hand method

Board.prototype.deal_hands = function(){	
	for(var i = 0; i < 2;i++){
		this.dealer_hand.push(this.randomize());
		this.player_hand.push(this.randomize());
	};// end of for loop that creates new hands for the player
};// end of start round method

Board.prototype.hit_stay = function(string) {

	switch(string){
		case "hit":
			this.player_hand.push(this.randomize());
		break;

		case "stay":
			console.log("robot's turn");
			this.robo();
		break;

		case "dealer"://if dealer string is passed throw that dealer a bone
			this.dealer_hand.push(this.randomize());
		break;
	};// end of switch case conditional for moving player to next round
};// end of hit_stay method(will need to loop this in the main play game method!!!!! until stay is hit)

Board.prototype.grab_value = function(type) {

	var rearrange_current_array = function(array){
		var temp_arr = [];
		for(var i = 0; i<array.length;i++){
			if(array[i].card_value === "Ace"){
				temp_arr.push(array[i]);
				array.splice(i,1);//remove the current item
				i--;//sets i back 1 to account for the removed item
			};// end of conditional
		};// for loop to check the array
		if(temp_arr[0] === undefined){
			return array;
		}else{
			for(var i = 0;i < temp_arr.length;i++){
				array.push(temp_arr[i]);//pushes the card from temp to the current hand
			};// end of for loop
			return array;
		};// end of the conditional
	};// end of rearrange_current_array function
	
	var value_parse = function(array){
	
		var ace_value = function(current_total){
			var i = 0;
			current_total < 11 ? i = 11: i = 1;
			return i;
		};// end of ace_value function need to rewrite the logic
	
	
		var total = 0
		for(var i = 0;i < array.length;i++){
			switch(array[i].card_value){
				case "King":
				case "Jack":
				case "Queen":
					total += 10
				break;

				case "Ace":
					total += ace_value(total);
				break;

				default:
					total += array[i].card_value;
			};// end of switch conditional
		};// end of the for loop
		return total;
	};// end of value parse function

	var return_value = null;
	//This will return the dealer unless player is specifie through ternary
	//can't return it on the actual or else it will give me an error
	type === "player" ? return_value = value_parse(rearrange_current_array(this.player_hand)): return_value = value_parse(rearrange_current_array(this.dealer_hand));
	return return_value;

};// end of grab_value method

Board.prototype.robo = function() {
	var dealers_current_value = this.grab_value("dealer");//grabs the current value for dealer
	while(dealers_current_value < 16){
		this.hit_stay("dealer");
		//reset the value to the current value again
		dealers_current_value = this.grab_value("dealer");
	};// end of while loop
	//add a line to proc the win loss check
};// end of robo method

Board.prototype.find_winner = function(){
	var player = this.grab_value("player");
	var dealer = this.grab_value("dealer");

	var loss = function(){
		this.player_bet = 0;//reset to 0
		return "YOU LOST!"
	}

	var win = function(){
		this.bankroll += (this.player_bet * 2);
		this.player_bet = 0;//reset to 0
		return "YOU WIN!"
	};

	switch(player){
		case 21:
			win();
			return "Blackjack"
		break;
	
		default:
			if(player > 21){
				return loss();
			}else if(dealer > 21){
				return win();
			}else{
				if(player <= dealer){
					return loss();
				}else{
					return win();
				};// end of the if dealer or winner has more or less in between 21
			};// end of the if dealer or winner instant bust from having more than 21
	};// end of conditional switch for checking for blackjack
};// end of find_method


// randomize()
// ask_bets()
// clear_hand()
// deal_hands()
// hit_stay()
// grab_value
// robo()
// find_winner()


//going to load this at the end, so it doesnt distract me with the other stuff
window.onload = function(){
	console.log("loaded");
	//set the background on load of the window
	var body = $("body")
	body.css("background-image","url(http://d2fhka9tf2vaj2.cloudfront.net/premium/034_blackJack/images/9.jpg)");
};// end of window onload 









