var ParseTree = function(leftChild,root,rightChild){
	this.leftChild = leftChild;
	this.root = root;
	this.rightChild = rightChild;
}
ParseTree.prototype.represent = function() {
	var left = this.leftChild instanceof ParseTree ?  this.leftChild.represent() : this.leftChild ;
	var right = this.rightChild instanceof ParseTree ?  this.rightChild.represent() : this.rightChild ;
	return `(${left} ${this.root} ${right})`;
};
module.exports = ParseTree;