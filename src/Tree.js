var Tree = function(trees) {
	this.childTrees = trees;
}

Tree.prototype = {
	add : function(parseTree) {
		this.childTrees.push(parseTree);
	},

	evaluate : function() {
		var results = [];
		this.childTrees.forEach(function(childTree){
			results.push(childTree.evaluate()); 
		})
		return results[results.length-1];
	}
};

module.exports = Tree;