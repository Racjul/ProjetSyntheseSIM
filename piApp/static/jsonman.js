
// cc orivoir21
export function fen2array(fen) {
    var rowChars = [];
    var transform = [];
    fen.split('/').forEach(function (row) {
        row.split('').forEach(function (char) {
            if (isNaN(parseInt(char))) {
                rowChars.push(char);
            }
            else {
                var emptySquares = parseInt(char);
                for (var i = 0; i < emptySquares; i++) {
                    rowChars.push("");
                }
            }
        });
        transform.push(rowChars);
        rowChars = [];
    });
    return transform;
}
export var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fen2array_1 = __importDefault(require("../fen2array/fen2array"));
// resolve default values
export function getOptions(options) {
    if (typeof options !== "object") {
        options = {
            isRemoveEmptySquare: true,
            isImplicitColor: false,
            emptySquare: ""
        };
    }
    else {
        if (typeof options.isRemoveEmptySquare !== "boolean") {
            options.isRemoveEmptySquare = true;
        }
        if (typeof options.isImplicitColor !== "boolean") {
            options.isImplicitColor = false;
        }
        if (typeof options.emptySquare === "undefined") {
            options.emptySquare = "";
        }
    }
    return options;
}
export function getColor(square) {
    if (square === square.toLocaleUpperCase()) {
        return "w";
    }
    return "b";
}
export function key2coo(col, row) {
    var colsLetters = "abcdefgh";
    row += 1;
    row = 8 - row + (1);
    var colLetter = colsLetters[col];
    return "" + colLetter + row.toString();
}
export function fen2json(fen, options) {
    options = getOptions(options);
    var fenArray = fen2array_1.default(fen);
    var fenJson = {};
    fenArray.forEach(function (row, keyRow) {
        row.forEach(function (square, keySquare) {
            var coo = key2coo(keySquare, keyRow);
            if (square.length) {
                if (!options.isImplicitColor) {
                    fenJson[coo] = (square.toLocaleLowerCase()) + getColor(square);
                }
                else {
                    // letter case depending color part ( lower = black, upper = white )
                    fenJson[coo] = square;
                }
            }
            else if (!options.isRemoveEmptySquare) {
                fenJson[coo] = options.emptySquare;
            }
        });
    });
    return fenJson;
}
