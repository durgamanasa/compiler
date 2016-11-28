var NumberNode = function(number){
	this.value = Number(number);
}

NumberNode.prototype.evaluate = function() {
	return this.value;
};

module.exports = NumberNode;