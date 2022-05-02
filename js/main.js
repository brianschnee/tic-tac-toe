const TicTacToe = {
    DOMElements: [
        [
            document.getElementById('one'),
            document.getElementById('two'),
            document.getElementById('three')
        ],
        [
            document.getElementById('four'),
            document.getElementById('five'),
            document.getElementById('six')
        ],
        [
            document.getElementById('seven'),
            document.getElementById('eight'),
            document.getElementById('nine')
        ]
    ],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    init: function () {
        this.DOMElements.forEach((row, i) => row.forEach((column, j) => column.addEventListener('click', x => {
            this.place(x.target, i, j);
        })));

        document.getElementById('reset').addEventListener('click', () => this.reset());

        console.log('%cGame Initalized', 'color: orange');
    },
    winner: '',
    turn: 1,
    place: function (target, i, j) {
        if (target.innerText === '' && this.turn < 10 && this.winner === '') {
            let char;
            if (this.turn % 2 !== 0) {
                char = 'X';
                target.innerText = char;
                target.style.color = '#ff6b35';
                this.board[i][j] = char;
            } else {
                char = 'O'
                target.innerText = char;
                target.style.color = '#f7c59f';
                this.board[i][j] = char;
            }

            console.log(`%c"${char}" placed at (${i}, ${j})`, 'color: lightblue');

            if(this.checkWin(char)) {
                this.winner = char;

                let title = document.getElementById('title')
                title.innerText = `${char} wins!`;
                title.style.fontFamily = 'Radio Canada';

                console.log('%cWINNER!!', 'color: lightgreen')
            }
            
            this.turn++;
        }
    },
    checkWin: function (char) {
        if (this.turn > 4) {
            console.log('%cChecking Win...', 'color: yellow');

            // diagnols
            if(this.board[1][1] === char) {
                if((this.board[0][0] === char && this.board[2][2] === char)) {
                    for(let i = 0; i < 3; i++) {
                        this.DOMElements[i][i].style.color = 'yellow';
                        this.DOMElements[i][i].style.borderColor = 'rgb(245,199,26)';
                    }
                    console.log('diagnol win 1')
                    return true;
                } else if((this.board[0][2] === char && this.board[2][0] === char)) {
                    this.DOMElements[0][2].style.color = 'yellow';
                    this.DOMElements[0][2].style.borderColor = 'rgb(245,199,26)';
                    this.DOMElements[1][1].style.color = 'yellow';
                    this.DOMElements[1][1].style.borderColor = 'rgb(245,199,26)';
                    this.DOMElements[2][0].style.color = 'yellow';
                    this.DOMElements[2][0].style.borderColor = 'rgb(245,199,26)';
                    console.log('diagnol win 2')
                    return true;
                }
            }

            // horizontal checks
            let location;
            let win = this.board.some((row, i) => {
                let found = !row.some((column, j) =>  column !== char);

                location = i;
                return found;
            })

            if(win) {
                console.log('horizontal win', location)

                for (let i = 0; i < 3; i++) {
                    this.DOMElements[location][i].style.color = 'yellow';
                    this.DOMElements[location][i].style.borderColor = 'rgb(245,199,26)';
                }

                return win;
            }

            // vertical checks
            for(let i = 0; i < 3; i++) {
                let match;
                for(let j = 0; j < 3; j++) {
                    match = this.board[j][i] === char;
                    
                    if(!match)
                        break;
                    else if(j === 2) {
                        console.log('vertical win')

                        for(let k = 0; k < 3; k++) {
                            this.DOMElements[k][i].style.color = 'yellow';
                            this.DOMElements[k][i].style.borderColor = 'rgb(245,199,26)';
                        }

                        return true;
                    }
                }
            }
        }

        if(this.turn === 9) {
            document.getElementById('title').innerText = 'its a tie!';
            console.log('TIE');
        }

        return false;
    },
    reset: function() {
        console.log('%cRessetting Game...', 'color: red');
        
        this.turn = 1;
        this.winner = '';

        this.DOMElements.forEach(row => row.forEach(column => {
            column.innerText = '';
        }));

        this.board.forEach((row, i) => row.forEach((column, j) => {
            this.board[i][j] = null;
            this.DOMElements[i][j].style.borderTop = '.8rem solid #2487d3';
            this.DOMElements[i][j].style.borderRight = '.8rem solid #0d4066';
            this.DOMElements[i][j].style.borderBottom = '.8rem solid #0b3454';
            this.DOMElements[i][j].style.borderLeft = '.8rem solid #004e89';
        }));

        console.log(this.board);

        let title = document.getElementById('title')
        title.innerText = 'tic tac toe';
        title.style.fontFamily = 'Space Mono';

        console.log('%cGame has been Reset.', 'color: pink')
    }
}

TicTacToe.init();