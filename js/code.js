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


	class Person {
		constructor(name,cards) {
			this.name = name;
			this.cards = cards;
			this.counter = 0;
			this.cardGoToLeft = 0;
			this.popCounter = 12;
			this.width = 300;
		}


		removeFromCards = (whichPlayer) => {
			console.log(`.player_${whichPlayer}`);
			let cards = $(`.player_${whichPlayer}`).last();
			
			if( whichPlayer == 1 ) {
				document.getElementById("right").innerHTML = cards.html();
			} else if ( whichPlayer == 2 ) {
				document.getElementById("top").innerHTML = cards.html();
			} else if ( whichPlayer == 3 ) {
				document.getElementById("left").innerHTML = cards.html();
			}

			cards.remove();
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
	
	
	game.drawCards(deckOfCards.deck); // divide cards between players
	game.printPeopleCards();

	console.log(game);
	

	let playerFront = document.getElementById("topContainer");
	let playerRight = document.getElementById("rightContainer");
	let playerLeft = document.getElementById("leftContainer");

	let select_hokm = false;

	let shape = "hearts";
	let number = 9 ;

	let card = document.getElementById("theCard");

	let input = document.getElementById("number");

	input.addEventListener('input', (e) => {
		number = e.target.value;

		drawSeperateCard(number, shape);
	});

	let select = document.getElementById("shapes");


	select.addEventListener('change' , (e) => {
		shape = e.target.value;

		drawSeperateCard(number, shape);
	});


	let container = document.getElementById("myContainer");


	let initialize = () => {
		input.value = 9;
		select.value = "hearts";
	}

	initialize();

	addRandom = document.getElementById("addRandom");

	addRandom.addEventListener("click", () => {
		generateRandomCard();
	});



	let cardHTML = ``;


	let drawSeperateCard = (number, shape) => {
		cardHTML = `<div>`;

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
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 3 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 4 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 5 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 6 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 7 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 8 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 9 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-smaller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col-smaller">
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
				<div class="col-smaller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col-smaller">
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
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} large">&${shape};</span>
				</div>
			</div>
			`;
		}
		
		cardHTML += `</div>
		</div>`;


		let centerCard = document.getElementById('centerCard');
		centerCard.innerHTML = cardHTML;
	}






























	let drawCard = (number, shape , whichPlayer) => {
		//console.log(number + "  " + shape);

		if(whichPlayer != 0) {

			cardHTML = `
			<div class="cardContainer" >
				<div class=" ${whichPlayer == 0 ? `card` : `otherCard player_${whichPlayer}`}" style="top : 0px;
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
		<div  class="cardContainer" >
		<div id="${number}_${shape}" class=" ${whichPlayer == 0 ? `card` : `otherCard`}" style="top : 0px;
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
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 3 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 4 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 5 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 6 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 7 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 8 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
			</div>
			`;
		} else if ( number == 9 ) {
			cardHTML += `
			<div class="rowOfColumns">
				<div class="col-smaller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col-smaller">
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
				<div class="col-smaller">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col">
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`} hidden">&${shape};</span>
					<span class="${shape == "hearts" || shape == "diams" ? `hearts` : `spades`}">&${shape};</span>
				</div>
				<div class="col-smaller">
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
				<div class="col">
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

	//let right;

	changeWidthBasedOnNumberOfCards = (whichPlayer) => {
		if(whichPlayer == 0) {
			if( game.players[whichPlayer].counter <= 5 ) {
				game.players[whichPlayer].width = 300;
				//right = -85;
				//left = -85;
			} else if( game.players[whichPlayer].counter == 9 ) {
				game.players[whichPlayer].width = 360;
				//right = -115;
				//left = -115;
			} else if( game.players[whichPlayer].counter == 13 ) {
				game.players[whichPlayer].width = 460;
				//right = -165;
				//left = -165;
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
		
		drawSeperateCard(number , shape);
		//let randomPlayer = Math.floor(Math.random() * 4);
		//createAndAddCard(randomPlayer);
		//changeWidthBasedOnNumberOfCards(randomPlayer);
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
							sortDeckOfCardsOfPlayer(player)
						}
						
					} 
				}
			}
		}
	});

	let yourTurn = true;

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

			

			
		}
	});


	$(document).on('click','div.card',function(){

		if( yourTurn == false ) {
			return;
		}

		//let z_index = 2;

		//$(this).children().css("left","0px");
		//$(this).children().css("z-index",z_index);
		//$(this).children().css("transform","scale(1.1)");

		let id = $(this).attr("id");
		console.log(id);

		let cutText = document.getElementById(id).innerHTML;
		//console.log(cutText);

		//document.getElementById("down").style.zIndex = z_index;
		document.getElementById("down").innerHTML = cutText;
		//document.getElementById("top").innerHTML = cutText;
		//document.getElementById("right").innerHTML = cutText;
		//document.getElementById("left").innerHTML = cutText;

		document.getElementById(id).remove();
		game.players[0].counter--;
		//changeWidthBasedOnNumberOfCards(0);

		let compareID = id.replace("_", " ");
		//console.log(compareID);
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

		//yourTurn = false;

		/*
		here other players should act
		*/
		game.players[1].removeFromCards(1);
		game.players[1].removeFromCards(2);
		game.players[1].removeFromCards(3);
	});

	


});






