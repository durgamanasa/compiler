var AssignmentNode = function(operator){
	this.value = operator;
}

AssignmentNode.prototype = {
	evaluate:function(leftChild,rightChild){
		return leftChild.add(rightChild);
	}
};

module.exports = AssignmentNode;