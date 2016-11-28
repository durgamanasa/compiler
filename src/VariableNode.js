var VariableNode = function(variable){
	this.value = variable;
}


VariableNode.prototype = {
	assignments:{},
	add:function(variable){
		return this.assignments[this.value] = variable.value;
	},
	evaluate:function(){
		return this.assignments[this.value];
	}
};

module.exports = VariableNode;