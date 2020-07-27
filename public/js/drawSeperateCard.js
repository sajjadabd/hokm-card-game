let drawSeperateCard = (number, shape) => {
	cardHTML = `<div class="seperateCard">`;

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

}