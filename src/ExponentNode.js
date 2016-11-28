var ExponentNode = function(exponent){
	this.value = exponent;
};

ExponentNode.prototype.evaluate = function(leftChild,rightChild) {
	return Math.pow(leftChild.evaluate(),rightChild.evaluate());
};

module.exports = ExponentNode;