class Person {
    constructor(name,cards) {
        this.name = name;
        this.cards = cards;
    }

    printCards() {
        //console.log(`=============================`);
        this.cards.map( (value,index) => {
            console.log(`${this.cards[index]}`);
        });
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
        this.numbers = [1,2,3,4,5,6,7,8,9,10,"J","Q","K"];
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


deckOfCards = new DeckOfCards();
deckOfCards.shuffle();
//deckOfCards.print();
//console.log(deckOfCards.deck);


game.drawCards(deckOfCards.deck);
//game.printPeopleCards();

