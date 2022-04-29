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
        console.log('%cGame Initalized', 'color: orange');
    },
    turn: 1,
    place: function (target, i, j) {
        if (target.innerText === '') {
            let char;
            if (this.turn % 2 !== 0) {
                char = 'X';
                target.innerText = char;
                this.board[i][j] = char;
            } else {
                char = 'O'
                target.innerText = char;
                this.board[i][j] = char;
            }

            if(this.turn < 10) {
                this.checkWin(char) ? console.log('%cWINNER!!', 'color: green') : this.turn++;
            }
        }
    },
    checkWin: function (char) {
        if (this.turn > 4) {
            console.log('%cChecking Win...', 'color: yellow');

            // diagnols
            if((this.board[0][0] === char && this.board[1][1]  === char && this.board[2][2] === char) ||(this.board[0][2] === char && this.board[1][1] === char && this.board[2][0] === char))
                return true;

            // horizontal checks
            let win = this.board.some((row, i) => {
                let found = !row.some((e, j) =>  e !== char);

                return found;
            })

            if(win) return win;

            // vertical checks
            for(let i = 0; i < 3; i++) {
                let match;
                for(let j = 0; j < 3; j++) {
                    match = this.board[j][i] === char;
                    
                    if(!match)
                        break;
                    else if(j === 2)
                        return true;
                }
            }
        }

        if(this.turn === 9) {
            console.log('TIE');
        }

        return false;
    },
    reset: function () {
        this.turn = 1;
        this.DOMElements.forEach(e => e.value = '');
        this.board.forEach(row => row.forEach(e => e = 0));
    }
}

TicTacToe.init();