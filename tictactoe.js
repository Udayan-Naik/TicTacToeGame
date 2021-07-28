const headerIcons = $('.winnerIcon');
var boxes = $('.eachBox');
const victory = $('.victory-msg');




var icon = {
    false: "<i class='fas fa-times symbol fa-3x'></i>",
    true: "<i class='far fa-circle symbol fa-3x'></i>",
};
var input = false;
var gameOver = false;


boxes.on('click', function() {
    if(!gameOver) {
        console.log(this);
        if(isEmpty(this)) {
            $(this).html(icon[input]);
            input = !input;
        }
        if(winner(boxes)) {
            console.log("Gameover");
            gameOver = true;
            headerIcons.html(icon[!input]);
            var victor = input ? '1':'2';
            victory.text(`Player ${victor} wins!!`);
            victory.css('opacity', '1');


        }
    }
});

$('#reset').on('click', function() {
    reset();
});

function isEmpty(box) {
    if (box.firstElementChild === null) return true;
    return false;
}

function winner(boxes) {
    return checkRows(boxes) || checkColumns(boxes) || checkDiagonals(boxes);
}

function getClassOfChild(ele) {
    if (ele != undefined && ele.firstElementChild != null) {
        return ele.firstElementChild.getAttribute("class");
    }
    return null;
}

function streakChecker(a, b, c) {
    if (
        !isEmpty(a) &&
        !isEmpty(b) &&
        !isEmpty(c) &&
        getClassOfChild(a) === getClassOfChild(b)
    ) {
        if (getClassOfChild(b) === getClassOfChild(c)) return true;
    }
    return false;
}

function checkRows(boxes) {
    for (var i = 0; i < 7; i += 3) {
        if (streakChecker(boxes[i], boxes[i + 1], boxes[i + 2])) return true;
    }
    return false;
}

function checkColumns(boxes) {
    for (var i = 0; i < 3; i++) {
        if (streakChecker(boxes[i], boxes[i + 3], boxes[i + 6])) return true;
    }
    return false;
}

function checkDiagonals(boxes) {
    return (
        streakChecker(boxes[0], boxes[4], boxes[8]) ||
        streakChecker(boxes[2], boxes[4], boxes[6])
    );
}

function reset() {
    console.log("in reset function");
    $('.symbol').css('opacity', 0);
    setTimeout(function() {
        $('.symbol').remove();
    }, 500);
    headerIcons.remove();
    gameOver = false;
    victory.css({'opacity': '0'});
}
