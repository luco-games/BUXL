var isInArray = function isInArray (value, array) {
    for (var ar of array)
        if (value === ar)
            return true;
    return false;
};
