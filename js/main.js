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
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    init: function () {
        this.DOMElements.forEach((row, i) => row.forEach((column, j) => column.addEventListener('click', x => {
            this.place(x.target, i, j);
        })));
        console.log('%cGame Initalized', 'color: orange');
    },
    turn: 1,
    place: function (target, i, j) {
        console.log(i, j);
        if (target.innerText === '' && !this.checkWin()) {
            if (this.turn % 2 !== 0) {
                target.innerText = 'X';
                this.board[i][j] = 1;
            } else {
                target.innerText = 'O';
                this.board[i][j] = 2;
            }

            this.turn++;
        }
    },
    checkWin: function () {
        console.log('%cChecking Win', 'color: yellow');

        if (this.turn > 4) {

            // // horizontal
            // board[0][0] && board[0][1] && board[0][2];
            // board[1][0] && board[1][1] && board[1][2];
            // board[2][0] && board[2][1] && board[2][2];

            // // vertical
            // board[0][0] && board[1][0] && board[2][0]
            // board[0][1] && board[1][1] && board[2][1]
            // board[0][2] && board[1][2] && board[2][2]

            // // diagnols
            // board[0][0] && board[1][1] && board[2][2];
            // board[0][2] && board[1][1] && board[2][0]

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