var assert = require('assert');
var expect = require ('chai').expect;
var ParseTree = require('../src/parseTree.js');
var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf8');
var parser = new Parser(grammar);

describe('ParseTree',function(){
	describe('represent',function(){
		it('should represent tree with parenthesis',function(){
			var tree = parser.parse('2+3;');
			var expected = '(2 + 3)';
			assert.equal(tree.represent(),expected);
		});

		it('should represent a nested tree with parenthesis',function(){
			var tree = parser.parse('2+4+3;');
			var expected = '((2 + 4) + 3)';
			assert.equal(tree.represent(),expected);
		});

		it('should represent the given statements as a js code',function(){
			var tree = parser.parse('x=10;5+x*2;');
			var actual = tree.representAsJSCode();
			var expected = 'var x = 10;console.log(5 + (x * 2));';

			assert.equal(actual,expected);	
		});

		it('should represent the given statements as a js code for multiple variables',function(){
			var tree = parser.parse('x=10+y+z;5+x*2;');
			var actual = tree.representAsJSCode();
			var expected = 'var x = ((10 + y) + z);console.log(5 + (x * 2));';

			assert.equal(actual,expected);	
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

		it('should throw an error when the variable is not defined',function(){
			var tree = parser.parse('a+2;');
			var result = function(){tree.evaluate();}

			expect(result).to.throws(Error,'a is not defined')
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

		it('should evaluate the parentheses exponent statement with multiple operators',function(){
			var tree = parser.parse('x=10;y=20;z=30;(x^2)+(y^2)-(z^2);');
			var result = tree.evaluate();			
			
			assert.equal(result,-400);	
		});

		it('should evaluate the variable expressions',function(){
			var tree = parser.parse('x=10;y=x+20;y+5;');
			var result = tree.evaluate();			
			
			assert.equal(result,35);	
		});

		it('should evaluate the variable expressions with multiple operators',function(){
			var tree = parser.parse('x=10;y=x+20;y+5;y+1+2+3/3+4+5-10*0/5;');
			var result = tree.evaluate();			
			
			assert.equal(result,43);	
		});

		it('should evaluate the reassigned variables expressions',function(){
			var tree = parser.parse('x=2;x=2^5;x;');
			var result = tree.evaluate();			
			
			assert.equal(result,32);	
		});

		it('should evaluate the reassigned variables expressions with multiple operators',function(){
			var tree = parser.parse('x=2;x=2^5;x=x*10;');
			var result = tree.evaluate();			
			
			assert.equal(result,320);	
		});
	});
});