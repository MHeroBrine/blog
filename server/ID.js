let ID = null;

const getId = function() {
    return ID;
}

const setId = function(val) {
    ID = val;
}

module.exports = { getId, setId };