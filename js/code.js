$(document).ready(function(){

	class Person {
		constructor(name,cards) {
			this.name = name;
			this.cards = cards;
			this.counter = 0;
			this.cardGoToLeft = 0;
			this.popCounter = 12;
			this.width = 300;
		}

		sortMyDeckOfCards() {
			let max;
			for(let i=0;i<this.cards.length;i++) {
				for(let j=i;j<this.cards.length;j++) {
					let a_split = this.cards[i].split(" ");
					let b_split = this.cards[j].split(" ");

					let a_num = a_split[0];
					a_num = parseInt(a_num);
					let a_shape = a_split[1];

					let b_num = b_split[0];
					b_num = parseInt(b_num);
					let b_shape = b_split[1];

					if(b_shape > a_shape) {
						max = j;
					} else if(b_shape < a_shape) {
						max = i;
					} else if(b_shape == a_shape) {
						if(b_num < a_num) {
							max = j;
						} else {
							max = i;
						}
					}

					let temp = this.cards[i];
					this.cards[i] = this.cards[max];
					this.cards[max] = temp;
				}
			}
		}
	
		printCards() {
			//console.log(`=============================`);
			/*this.cards.map( (value,index) => {
				console.log(`${this.cards[index]}`);
			});*/
			console.log(this.cards);
		}
	}
	
	class Game {
		constructor() {
			this.players = [];
		}
	
		drawCards = (deck) => {
			//console.log(allCards);
			for(let i=0;i<52;i++) {
				this.players[i%4].cards.push(deck.pop());
			}
		}
	
		printPeopleCards() {
			this.players.map( (value,index) => {
				this.players[index].printCards();
			});
		}
	}
	
	
	class Card {
		constructor(number,shape) {
			this.number = number;
			this.shape = shape;
		}
		print() {
			console.log(this.number + "  " + this.shape);
		}
	}
	
	
	class DeckOfCards {
		constructor() {
			this.numbers = [2,3,4,5,6,7,8,9,10,11,12,13,14];
			/*
			J --> 11
			Q --> 12
			K --> 13
			*/
			this.shapes = ["spades","clubs","hearts","diams"];
			this.numberOfCards = 52;
	
			this.deck = [];
	
			this.numbers.map( (value, index) => {
				this.shapes.map( (v, i) => {
					this.deck.push( this.numbers[index] + " " + this.shapes[i]);
				});
			});
		}
	
		shuffle() {
			let rand,x;
			for (let i = this.deck.length - 1; i > 0; i--) {
				rand = Math.floor(Math.random() * (i + 1));
				x = this.deck[i];
				this.deck[i] = this.deck[rand];
				this.deck[rand] = x;
			}
		}
		
	
		print() {
			this.deck.map( (value,index) => {
				console.log(index + " --> " + this.deck[index]);
			});
			//console.log(`-------------------------`);
		}
	}
	
	
	game = new Game();
	
	for(let i=0;i<4;i++) {
		game.players[i] = new Person(i,[]); // Person(name,cards);
	}


	document.addEventListener("keypress", (e) => {
		//console.log(e.keyCode);
		if(e.keyCode == 32) {
			generateRandomCard();
		}
	});
	




	
	deckOfCards = new DeckOfCards();
	deckOfCards.shuffle();
	//deckOfCards.print();
	//console.log(deckOfCards.deck);
	
	
	game.drawCards(deckOfCards.deck);
	game.printPeopleCards();
	

	let playerFront = document.getElementById("topContainer");
	let playerRight = document.getElementById("rightContainer");
	let playerLeft = document.getElementById("leftContainer");

	let select_hokm = false;

	let shape = "spades";
	let number = 14 ;

	let card = document.getElementById("theCard");

	let input = document.getElementById("number");

	input.addEventListener('input', (e) => {
		number = e.target.value;

		//drawCard(number, shape);
	});

	let select = document.getElementById("shapes");


	select.addEventListener('change' , (e) => {
		shape = e.target.value;

		//drawCard(number, shape);
	});


	let container = document.getElementById("myContainer");


	let initialize = () => {
		input.value = 14;
		select.value = "spades";
	}

	initialize();

	addRandom = document.getElementById("addRandom");

	addRandom.addEventListener("click", () => {
		generateRandomCard();
	});



	let cardHTML = ``;

	let drawCard = (number, shape , whichPlayer) => {
		//console.log(number + "  " + shape);

		if(whichPlayer != 0) {

			cardHTML = `
			<div class="cardContainer" id="${number}_${shape}">
				<div class=" ${whichPlayer == 0 ? `card` : `otherCard`}" style="top : 0px;
					left : ${game.players[whichPlayer].cardGoToLeft}px;">
					<div class="greenBack">
						<div class="insideGreen">
							<div class="insideSpades">
								<span>&spades;</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
			
			return;
		}

		cardHTML = `
		<div class="cardContainer" id="${number}_${shape}">
		<div class=" ${whichPlayer == 0 ? `card` : `otherCard`}" style="top : 0px;
		left : ${game.players[whichPlayer].cardGoToLeft}px;">`;

		if(number == 11 ) {
			cardHTML += `
			<div class="number">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">J</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			<div class="numberReverse">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">J</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			`;
		} else if(number == 12 ) {
			cardHTML += `
			<div class="number">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">Q</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			<div class="numberReverse">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">Q</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			`;
		} else if(number == 13 ) {
			cardHTML += `
			<div class="number">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">K</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			<div class="numberReverse">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">K</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			`;
		} else if(number == 14 ) {
			cardHTML += `
			<div class="number">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">A</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			<div class="numberReverse">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">A</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			`;
		} else {
			cardHTML += `
			<div class="number">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">${number}</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			<div class="numberReverse">
				<div class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">${number}</div>
				<div><span class="${shape == "hearts" || shape == "diams" ? `hearts-small` : `spades-small`}">&${shape};</span></div>
			</div>
			`;
		}
		


		if ( number == 2 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 3 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 4 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-very-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col-very-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 5 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-very-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col-very-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 6 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 7 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 8 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 9 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`
		} else if ( number == 10 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col-medium">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 11 ) {
			if( shape == "spades" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/JS.png" />
				</div>
				`;
			} else if( shape == "clubs" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/JC.png" />
				</div>
				`;
			} else if( shape == "hearts" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/JH.png" />
				</div>
				`;
			} else if( shape == "diams" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/JD.png" />
				</div>
				`;
			}
		} else if ( number == 12 ) {
			if( shape == "spades" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/QS.png" />
				</div>
				`;
			} else if( shape == "clubs" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/QC.png" />
				</div>
				`;
			} else if( shape == "hearts" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/QH.png" />
				</div>
				`;
			} else if( shape == "diams" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/QD.png" />
				</div>
				`;
			}
		} else if ( number == 13 ) {
			if( shape == "spades" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/KS.png" />
				</div>
				`;
			} else if( shape == "clubs" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/KC.png" />
				</div>
				`;
			} else if( shape == "hearts" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/KH.png" />
				</div>
				`;
			} else if( shape == "diams" ) {
				cardHTML += `
				<div class="rowOfColumns">
					<img src="./img/KD.png" />
				</div>
				`;
			}
		} else if( number == 14 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-taller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} large">&${shape};</span>
				</div>
			</div>
			`;
		}
		
		cardHTML += `</div>
		</div>`;
		
		//card.innerHTML = cardHTML;
		
		//console.log(cardHTML);
	}

	let addCard = document.getElementById("add");

	let verifyNumberAndShape = (number, shape) => {
		return true;
	}

	let createAndAddCard = (whichPlayer) => {
		drawCard(number, shape , whichPlayer);
		game.players[whichPlayer].counter++;

		if(whichPlayer == 0) {
			game.players[whichPlayer].cardGoToLeft -= 60;
		} else if(whichPlayer == 1){
			game.players[whichPlayer].cardGoToLeft -= 70;
		} else if(whichPlayer == 2) {
			game.players[whichPlayer].cardGoToLeft -= 70;
		} else if(whichPlayer == 3) {
			game.players[whichPlayer].cardGoToLeft -= 70;
		}
		

		if ( verifyNumberAndShape(number, shape) == true ) {
			if(whichPlayer == 0) {
				container.innerHTML += cardHTML;
			} else if(whichPlayer == 1){
				playerRight.innerHTML += cardHTML;
			} else if(whichPlayer == 2) {
				playerFront.innerHTML += cardHTML;
			} else if(whichPlayer == 3) {
				playerLeft.innerHTML += cardHTML;
			}
		} else {
			console.log("Error Happens");
		}
	}

	let right;

	changeWidthBasedOnNumberOfCards = (whichPlayer) => {
		if(whichPlayer == 0) {
			if( game.players[whichPlayer].counter <= 5 ) {
				game.players[whichPlayer].width = 300;
				right = -85;
				left = -85;
			} else if( game.players[whichPlayer].counter == 9 ) {
				game.players[whichPlayer].width = 360;
				right = -115;
				left = -115;
			} else if( game.players[whichPlayer].counter == 13 ) {
				game.players[whichPlayer].width = 460;
				right = -165;
				left = -165;
			}
		} else {
			if( game.players[whichPlayer].counter <= 5 ) {
				game.players[whichPlayer].width = 300;
				//right = -85;
				//left = -85;
			} else if( game.players[whichPlayer].counter == 9 ) {
				game.players[whichPlayer].width = 330;
				//right = -100;
				//left = -100;
				//bottom = 60;
			} else if( game.players[whichPlayer].counter == 13 ) { 
				game.players[whichPlayer].width = 360;
				//right = -115;
				//left = -115;
				//bottom = 70;
			}
		}
		
		//left += 15;
		//leftWithPixel = left + "px";
		if(whichPlayer == 0) {
			$("#myContainer").css("width", game.players[whichPlayer].width);
		} else if(whichPlayer == 1) {
			$(".boxControllerForRight").css("width", game.players[whichPlayer].width);
			//$(".boxControllerForRight").css("right", right);
		} else if(whichPlayer == 2) {
			$(".boxControllerForTop").css("width", game.players[whichPlayer].width);
		} else if(whichPlayer == 3) {
			$(".boxControllerForLeft").css("width", game.players[whichPlayer].width);
			//$(".boxControllerForLeft").css("bottom", bottom + "%");
		}
		
	}



	addCard.addEventListener('click', () => {
		let randomPlayer = Math.floor(Math.random() * 4);
		createAndAddCard(randomPlayer);
		changeWidthBasedOnNumberOfCards(randomPlayer);
	});
	
	


	let whichPlayerGiveCard = 0;

	let generateRandomCard = () => {
		/*
		cards = [2,3,4,5,6,7,8,9,10,11,12,13,14];
		let index = Math.floor(Math.random() * 12) ; // returns a random integer from 0 to 12 	
		number = cards[index];
		
		let randomPlayer = Math.floor(Math.random() * 4);

		shapesOfCard = ["spades", "clubs" , "hearts" , "diams"];
		index = Math.floor(Math.random() * 3) ; // returns a random integer from 0 to 3 	
		shape = shapesOfCard[index];
		*/

		if(game.players[whichPlayerGiveCard%4].counter < 5 || select_hokm == true) {
			if(game.players[whichPlayerGiveCard%4].counter < 13) {
			
				let which_card = game.players[whichPlayerGiveCard%4].cards[game.players[whichPlayerGiveCard%4].counter];
				let card_split = which_card.split(" ");
				number = parseInt(card_split[0]);
				shape = card_split[1];
				createAndAddCard(whichPlayerGiveCard%4);
				changeWidthBasedOnNumberOfCards(whichPlayerGiveCard%4);
	
				if( game.players[whichPlayerGiveCard%4].counter == 5 ) {
					whichPlayerGiveCard++;
				} else if( game.players[whichPlayerGiveCard%4].counter == 9 ) {
					whichPlayerGiveCard++;
				} else if( game.players[whichPlayerGiveCard%4].counter == 13 ) {
					sortDeckOfCardsOfPlayer(whichPlayerGiveCard%4);
					whichPlayerGiveCard++;
				}
			}
		} else {
			$("div.hokmContainer").fadeIn(1000);
			$("div.hokmContainer").css("display", "flex");
		}
	}




	let sortDeckOfCardsOfPlayer = (player) => {
		if(player == 0) {
			container.innerHTML = ``;
		} else if(player == 1) {
			playerRight.innerHTML = ``;
		} else if(player == 2) {
			playerFront.innerHTML = ``;
		} else if(player == 3) {
			playerLeft.innerHTML = ``;
		}
		
		
		game.players[player].counter = 0;
		game.players[player].cardGoToLeft = 0;
		game.players[player].sortMyDeckOfCards();
		//console.log(game.players[player].cards);
		for(let i=0;i<13;i++) {
			randomCard = game.players[player].cards[i];
			splitedCard = randomCard.split(" ");
			number = splitedCard[0];
			shape = splitedCard[1];
	
			createAndAddCard(player);
			changeWidthBasedOnNumberOfCards(player);
		}
	}




	let drawCards = document.getElementById("drawCards");
	let randomCard ;
	let splitedCard ;

	drawCards.addEventListener('click', () => {

		let drawer = [5,4,4];
		
		for(let d=0;d<drawer.length;d++){
			for(let player=0;player<4;player++) {
				for(let insideCounter=0;insideCounter<drawer[d];insideCounter++) {
					if(game.players[player].popCounter >= 0) {
						randomCard = game.players[player].cards[game.players[player].popCounter];
						game.players[player].popCounter--;
						//console.log(randomCard);
						splitedCard = randomCard.split(" ");
						number = splitedCard[0];
						shape = splitedCard[1];
				
						createAndAddCard(player);
						changeWidthBasedOnNumberOfCards(player);
						
						if(game.players[player].popCounter == -1) {
							
							sortDeckOfCardsOfPlayer(player);
							
						}
					} 
				}
			}
		}
	});


	$(document).on('mouseover','div.container div.card',function(){
		$(this).css("top", "-10px");
	});

	$(document).on('mouseleave','div.container div.card',function(){
		$(this).css("top", "0px");
	});



	$(document).on('click','span.hokm',function(){
		if(select_hokm == false) {
			let hokm = $(this).attr('id');
			hokm = hokm.split("_");
			hokm = hokm[1];
			console.log(hokm);
			select_hokm = true;

			$("#hokm_me").html(`&${hokm};`);
			$("#hokm_me").css('color',`${hokm == "spades" || hokm == "clubs" ? `black` : `red` }`);
			
			$("#hokm_top").html(`&${hokm};`);
			$("#hokm_top").css('color',`${hokm == "spades" || hokm == "clubs" ? `black` : `red` }`);
			

			$("#hokm_left").html(`&${hokm};`);
			$("#hokm_left").css('color',`${hokm == "spades" || hokm == "clubs" ? `black` : `red` }`);
			
			$("#hokm_right").html(`&${hokm};`);
			$("#hokm_right").css('color',`${hokm == "spades" || hokm == "clubs" ? `black` : `red` }`);
			
			
			$("div.hokmContainer").fadeOut(1000 , () => {
				$("div.gameBoard").css("display","flex");
			});

			
		}
	});


	$(document).on('click','div#myContainer div.cardContainer',function(){

		let z_index = 2;

		$(this).children().css("left","0px");
		//$(this).children().css("z-index",z_index);
		$(this).children().css("transform","scale(1.1)");

		let id = $(this).attr("id");
		//console.log(id);

		let cutText = document.getElementById(id).innerHTML;
		console.log(cutText);

		document.getElementById("down").style.zIndex = z_index;
		document.getElementById("down").innerHTML = cutText;

		document.getElementById(id).remove();
		game.players[0].counter--;
		//changeWidthBasedOnNumberOfCards(0);

		let compareID = id.replace("_", " ");
		//console.log(compareID);

		game.players[0].cards = game.players[0].cards.filter( (value) => {
			return value != compareID;
		});

		console.log(game.players[0].cards);

		game.players[0].cardGoToLeft = 0;
		var myCardList = document.querySelectorAll("div#myContainer div.cardContainer div.card");

		for(let i=0;i<myCardList.length;i++){
			//console.log(myCardList[i]);
			myCardList[i].style.left = game.players[0].cardGoToLeft + "px";
			game.players[0].cardGoToLeft -= 60;
		}
	});

	

	/*
	$(document).on('mouseover','div.otherCard',function(){
		$(this).css("top", "-10px")
	});

	$(document).on('mouseleave','div.otherCard',function(){
		$(this).css("top", "0px")
	});
	*/

});






