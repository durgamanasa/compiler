var converter = require('number-to-words');

var operators = {
	'+' : 'plus',
	'*' : 'times'
};

var ParseTree = function(leftChild,root,rightChild){
	this.leftChild = leftChild;
	this.root = root;
	this.rightChild = rightChild;
};

ParseTree.prototype = {
	represent : function() {
		var left = this.leftChild instanceof ParseTree ?  this.leftChild.represent() : this.leftChild.value ;
		var right = this.rightChild instanceof ParseTree ?  this.rightChild.represent() : this.rightChild.value ;
		return `(${left} ${this.root.value} ${right})`;
	},
	representInWords : function(){
		var left = this.leftChild instanceof ParseTree ?  this.leftChild.representInWords() : converter.toWords(this.leftChild) ;
		var right = this.rightChild instanceof ParseTree ?  this.rightChild.representInWords() : converter.toWords(this.rightChild) ;
		return `(${left} ${operators[this.root]} ${right})`;	
	},
	representAsJSCode : function(){
		var results = '';
		var exp = this.represent();
		if (exp.indexOf('=') != -1) {
			var expression = exp.substr(1).slice(0,-1);
			results += 'var '+ expression +';';
		}else{
			results += 'console.log'+ exp +';';
		}
		return results;
	},
	evaluate : function(){
		return this.root.evaluate(this.leftChild,this.rightChild);
	}
};
module.exports = ParseTree;