var isInArray = function isInArray (value, array) {
    for (var ar of array) {
        console.log("check " + value + " "  + ar);
        if (value === ar)
            return true;
    }
    return false;
};
