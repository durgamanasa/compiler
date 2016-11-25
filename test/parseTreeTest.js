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

	describe('representInWords',function(){
		it('should represent a tree in words',function(){
			var tree = new ParseTree(2,'+',2);
			var expected = '(two plus two)';

			assert.deepEqual(tree.representInWords(),expected);
		});

		it('should represent a tree in words for multiple operators',function(){
			var tree = new ParseTree(2,'+',new ParseTree(3,'*',4));
			var expected = '(two plus (three times four))';

			assert.deepEqual(tree.representInWords(),expected);
		});

		it('should represent a tree in words for bigger numbers',function(){
			var tree = new ParseTree(1000000000,'+',2);
			var expected = '(one billion plus two)';

			assert.deepEqual(tree.representInWords(),expected);
		});
	});	

});