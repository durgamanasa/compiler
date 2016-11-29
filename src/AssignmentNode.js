var path = require ('path');
var ParseTree = require(path.resolve('./src/parseTree.js'));

var AssignmentNode = function(operator){
	this.value = operator;
}

AssignmentNode.prototype = {
	evaluate:function(leftChild,rightChild){
		var right;
		if (rightChild instanceof ParseTree) {
			right = {value: rightChild.evaluate()}
		}else{
			right = rightChild;
		}
		return leftChild.add(right);
	}
};

module.exports = AssignmentNode;