enum abstract Direction(Int){
    var Up = 0;
    var Right = 1;
    var Down = 2;
    var Left = 3;
}

// return the angle (in radians) of the corresponding direction
function directionAngle(direction:Direction):Float {
    return switch (direction){
        case Up:
            0;
        case Right:
            1.570796326794896;
        case Down:
            3.141592741012573;
        case Left:
            4.712388980384689;
    }
}