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
	},
	represent : function(){
		var results = [];
		this.childTrees.forEach(function(childTree){
			results.push(childTree.represent());
		})
		return results.join();
	},
	representAsJSCode : function(){
		var results = '';
		this.childTrees.forEach(function(childTree){
			var exp = childTree.represent();
			if (exp.indexOf('=') != -1) {
				var expression = exp.substr(1).slice(0,-1);
				results += 'var '+ expression +';';
			}else{
				results += 'console.log'+ exp +';';
			}
		})
		return results;
	}
};

module.exports = Tree;