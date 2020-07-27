$(document).ready(function(){
	
	class Board {
		constructor() {
			this.top = "";
			this.down = "";
			this.left = "";
			this.right = "";
		}
	}

	let board = new Board();
	let zIndex = 4;
	
	let audio = new Audio('./mp3/toss.mp3');
	
	let put = new Audio('./mp3/put.mp3');
	put.volume = 0.1;
	
	let playAudio = () => {
		audio.play();
	}
	
	let putCardSound = () => {
		put.play();
	}
	
	
	let delayFunction = async () => {
		let pleaseWait = new Promise( (resolve , reject) => {
			setTimeout( () => {
				resolve(true);
			} , 200 )
		});
		
		await pleaseWait;
		
	};


	class Person {
		constructor(name,cards) {
			this.name = name;
			this.cards = cards;
			this.counter = 0;
			this.cardGoToLeft = 0;
			this.popCounter = 12;
			this.width = 300;
		}


		removeFromCards = (whichPlayer , where) => {

			let lastCard = this.cards.pop();
			this.counter--;
			let split = lastCard.split(" ");
			let cardNumber = split[0];
			let cardShape  = split[1];

			zIndex++;

			drawSeperateCard(cardNumber, cardShape);

			let cards = $(`.player_${whichPlayer}`).last();
			
			document.getElementById(where).innerHTML = cardHTML;
			document.getElementById(where).style.zIndex = zIndex;

			cards.remove();
			playAudio();
			console.log(cards);
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
			console.log(this.cards);
		}
	}


	
	class Game {
		constructor() {
			this.players = [];
		}
	
		drawCards = (deck) => {
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
		}
	}
	
	
	game = new Game();
	
	for(let i=0;i<4;i++) {
		game.players[i] = new Person(i,[]); // Person(name,cards);
	}

	

	document.addEventListener("keypress", (e) => {
		if(e.keyCode == 32) {
			generateRandomCard();
		}
	});
	




	
	deckOfCards = new DeckOfCards();
	deckOfCards.shuffle();
	
	game.drawCards(deckOfCards.deck); // divide cards between players
	game.printPeopleCards();

	console.log(game);
	

	let playerFront = document.getElementById("topContainer");
	let playerRight = document.getElementById("rightContainer");
	let playerLeft = document.getElementById("leftContainer");

	let select_hokm = false;

	let shape;
	let number;

	let card = document.getElementById("theCard");


	let container = document.getElementById("myContainer");


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



	changeWidthBasedOnNumberOfCards = (whichPlayer) => {
		if(whichPlayer == 0) {
			if( game.players[whichPlayer].counter <= 5 ) {
				game.players[whichPlayer].width = 300;
			} else if( game.players[whichPlayer].counter == 9 ) {
				game.players[whichPlayer].width = 360;
			} else if( game.players[whichPlayer].counter == 13 ) {
				game.players[whichPlayer].width = 460;
			}
		} else {
			if( game.players[whichPlayer].counter <= 5 ) {
				game.players[whichPlayer].width = 300;
			} else if( game.players[whichPlayer].counter == 9 ) {
				game.players[whichPlayer].width = 330;
			} else if( game.players[whichPlayer].counter == 13 ) { 
				game.players[whichPlayer].width = 360;
			}
		}
		

		if(whichPlayer == 0) {
			$("#myContainer").css("width", game.players[whichPlayer].width);
		} else if(whichPlayer == 1) {
			$(".boxControllerForRight").css("width", game.players[whichPlayer].width);
		} else if(whichPlayer == 2) {
			$(".boxControllerForTop").css("width", game.players[whichPlayer].width);
		} else if(whichPlayer == 3) {
			$(".boxControllerForLeft").css("width", game.players[whichPlayer].width);
		}
		
	}





	let whichPlayerGiveCard = 0;

	let generateRandomCard = () => {
		
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

		for(let i=0;i<13;i++) {
			randomCard = game.players[player].cards[i];
			splitedCard = randomCard.split(" ");
			number = splitedCard[0];
			shape = splitedCard[1];
	
			createAndAddCard(player);
			changeWidthBasedOnNumberOfCards(player);
		}
	}




	let randomCard ;
	let splitedCard ;
	let yourTurn = false;

	let d = 0;

	let divideCardsToPlayers = async () => {
		let drawer = [5,4,4];

		for(;d<drawer.length;d++){
			if( d == 0 || select_hokm == true) {
				for(let player=0;player<4;player++) {
					for(let insideCounter=0;insideCounter<drawer[d];insideCounter++) {
						if(game.players[player].popCounter >= 0) {
							randomCard = game.players[player].cards[game.players[player].popCounter];
							game.players[player].popCounter--;
							splitedCard = randomCard.split(" ");
							number = splitedCard[0];
							shape = splitedCard[1];
					
							createAndAddCard(player);
							changeWidthBasedOnNumberOfCards(player);
							
							//putCardSound();
							await delayFunction();
							
							
							if(game.players[player].popCounter == -1) {
								sortDeckOfCardsOfPlayer(player);
							}
						} 
					}
				}
			} else {
				$("div.hokmContainer").fadeIn(1000);
				$("div.hokmContainer").css("display", "flex");
				return;
			}
		}
		
		// all cards are divided to players
		yourTurn = true;

	}

	

	

	$(document).on('mouseover','div.card',function(){
		if(yourTurn == true) {
			$(this).css("top", "-10px");
		}
	});

	$(document).on('mouseleave','div.card',function(){
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
			

			$("div.hokmDetails").fadeIn(1000 , () => {
				$("div.hokmDetails").css("opacity","1");
			});
			
			$("div.hokmContainer").fadeOut(1000 , () => {
				$("div.gameBoard").css("display","flex");
				$("div.hokmContainer").css("display","none");
			});

			divideCardsToPlayers();

		}
	});
	
	

	let delay = 500;
	
	let cleangameBoard = () => {
		document.getElementById("down").innerHTML = ``;
		document.getElementById("top").innerHTML = ``;
		document.getElementById("right").innerHTML = ``;
		document.getElementById("left").innerHTML = ``;

		yourTurn = true;

	}


	let rightTurn = async () => {
		let rightPromise = new Promise( (resolve , reject) => {
			setTimeout( () => {
				resolve(game.players[1].removeFromCards(1,"right"));
			} , delay )
		});
		
		await rightPromise;
	}

	
	let topTurn = async () => {
		let topPromise = new Promise( (resolve , reject) => {
			setTimeout( () => {
				resolve(game.players[2].removeFromCards(2,"top"));
			} , delay );
		});
		
		await topPromise;
	}

	let leftTurn = async () => {
		let leftPromise = new Promise( (resolve , reject) => {
			setTimeout( () => {
				resolve(game.players[3].removeFromCards(3,"left"));
			} , delay );
		});
		
		await leftPromise;
	}


	let clearBoard = async () => {
		let clearPromise = new Promise( (resolve , reject) => {
				setTimeout( () => {
					resolve(cleangameBoard());
			} , delay );
		});
		
		await clearPromise;
	}



	$(document).on('click','div.card', async function () {

		if( yourTurn == false ) {
			return;
		}


		let id = $(this).attr("id");
		console.log(id);
		let compareID = id.replace("_", " ");

		let split = compareID.split(" ");
		let cardNumber = split[0];
		let cardShape = split[1];

		drawSeperateCard(cardNumber, cardShape);


		zIndex++;
		document.getElementById("down").innerHTML = cardHTML;
		document.getElementById("down").style.zIndex = zIndex;

		// play Sound Effect
		playAudio();


		document.getElementById(id).remove();
		game.players[0].counter--;
		changeWidthBasedOnNumberOfCards(0);


		board.down = compareID;
		console.log(board);

		game.players[0].cards = game.players[0].cards.filter( (value) => {
			return value != compareID;
		});

		console.log(game.players[0].cards);


		// adjust all cards in myContainer and set all left px with correct value
		game.players[0].cardGoToLeft = 0;
		var myCardList = document.querySelectorAll("div#myContainer div.cardContainer div.card");

		for(let i=0;i<myCardList.length;i++){
			//console.log(myCardList[i]);
			myCardList[i].style.left = game.players[0].cardGoToLeft + "px";
			game.players[0].cardGoToLeft -= 60;
		}
		//-----------------------------------------

		yourTurn = false;

		/*
		here other players should act
		*/
		await rightTurn();
		await topTurn();
		await leftTurn();
		await clearBoard();
	});


	let startGame = () => {
		divideCardsToPlayers();
	}

	startGame();

});