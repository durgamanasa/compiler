var VariableNode = function(variable){
	this.value = variable;
}


VariableNode.prototype = {
	assignments:{},
	add:function(variable){
		return this.assignments[this.value] = variable.value;
	},
	evaluate:function(){
		if (this.assignments[this.value] == undefined) {
			throw new Error(this.value +' is not defined.')
		}else{
			return this.assignments[this.value];
		}
	}

};

module.exports = VariableNode;