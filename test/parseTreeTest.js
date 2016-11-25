var assert = require('assert');
var ParseTree = require('../src/parseTree.js');

describe('ParseTree',function(){
	describe('represent',function(){
		it('should represent tree with parenthesis',function(){
			var tree = new ParseTree(2,'+',3);
			var expected = '(2 + 3)';
			assert.equal(tree.represent(),expected);
		});

		it('should represent a nested tree with parenthesis',function(){
			var tree = new ParseTree(new ParseTree(2,'+',4),'+',3);
			var expected = '((2 + 4) + 3)';
			assert.equal(tree.represent(),expected);
		});
	});

});