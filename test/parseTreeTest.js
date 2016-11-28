var assert = require('assert');
var ParseTree = require('../src/parseTree.js');
var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf8');
var parser = new Parser(grammar);

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

	describe('evaluate',function(){
		it('should evaluate a statement',function(){
			var tree = parser.parse('2+2;');
			var result = tree.evaluate();

			assert.equal(result,4);	
		});

		it('should evaluate an assignment statement',function(){
			var tree = parser.parse('a=1;');
			var result = tree.evaluate();			
			
			assert.equal(result,1);	
		});

		it('should evaluate multiple statements',function(){
			var tree = parser.parse('a=1;a+2;');
			var result = tree.evaluate();			
			
			assert.equal(result,3);	
		});

		it('should evaluate multiple statements with multiple operators',function(){
			var tree = parser.parse('a=1;a+2+a*2;');
			var result = tree.evaluate();			
			
			assert.equal(result,5);	
		});

		it('should evaluate an exponent statement',function(){
			var tree = parser.parse('2^2;');
			var result = tree.evaluate();			
			
			assert.equal(result,4);	
		});

		it('should evaluate an exponent statement by using the assigned value',function(){
			var tree = parser.parse('a=3;a^2;');
			var result = tree.evaluate();			
			
			assert.equal(result,9);	
		});

		it('should evaluate an exponent statement with multiple operators',function(){
			var tree = parser.parse('a=3;a^2*9+3;');
			var result = tree.evaluate();			
			
			assert.equal(result,84);	
		});
		
	});

});