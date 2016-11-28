var OperatorNode = function(operator){
	this.value = operator;
};

OperatorNode.prototype.evaluate = function(leftChild,rightChild) {
	return eval(leftChild.evaluate() + this.value + rightChild.evaluate());
};

module.exports = OperatorNode;